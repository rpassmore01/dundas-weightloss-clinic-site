// lib/analytics.js
import { promises as fs } from "fs";
import path from "path";

const analyticsPath = path.join(process.cwd(), "data", "analytics.json");
const visitorPath = path.join(process.cwd(), "data", "visitors.json");

async function ensureFileExists(filePath, defaultData = {}) {
  try {
    await fs.access(filePath);
  } catch (err) {
    if (err?.code === "ENOENT") {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2), "utf-8");
      return;
    }
    throw err;
  }
}

const defaultAnalytics = {
  totalPageViews: 0,
  uniqueVisitors: 0,
  pageViews: {},      // { "/path": count }
  dailyStats: {},     // { "2026-01-28": { views: 0, visitors: 0, hourly: { "0": count, ... } } }
  referrers: {},      // { "google.com": count }
  devices: {          // device type breakdown
    desktop: 0,
    mobile: 0,
    tablet: 0
  },
  browsers: {},       // { "Chrome": count }
};

const defaultVisitors = {
  visitors: {}  // { visitorId: { firstVisit, lastVisit, visitCount, pages: [] } }
};

async function readAnalytics() {
  await ensureFileExists(analyticsPath, defaultAnalytics);
  const raw = await fs.readFile(analyticsPath, "utf-8");
  return raw ? JSON.parse(raw) : defaultAnalytics;
}

async function writeAnalytics(data) {
  await fs.writeFile(analyticsPath, JSON.stringify(data, null, 2), "utf-8");
}

async function readVisitors() {
  await ensureFileExists(visitorPath, defaultVisitors);
  const raw = await fs.readFile(visitorPath, "utf-8");
  return raw ? JSON.parse(raw) : defaultVisitors;
}

async function writeVisitors(data) {
  await fs.writeFile(visitorPath, JSON.stringify(data, null, 2), "utf-8");
}

function getDeviceType(userAgent) {
  if (!userAgent) return "desktop";
  const ua = userAgent.toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return "mobile";
  return "desktop";
}

function getBrowser(userAgent) {
  if (!userAgent) return "Unknown";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Edg")) return "Edge";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Other";
}

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

function getCurrentHour() {
  return new Date().getHours().toString();
}

/**
 * Track a page view
 * @param {Object} data - Page view data
 * @param {string} data.page - The page path
 * @param {string} data.visitorId - Unique visitor identifier
 * @param {string} data.referrer - Referrer URL
 * @param {string} data.userAgent - User agent string
 */
export async function trackPageView({ page, visitorId, referrer, userAgent }) {
  const [analytics, visitorsData] = await Promise.all([
    readAnalytics(),
    readVisitors()
  ]);

  const todayKey = getTodayKey();
  const currentHour = getCurrentHour();
  const isNewVisitor = !visitorsData.visitors[visitorId];

  // Check if this visitor has already viewed this page
  const viewedPages = visitorsData.visitors[visitorId]?.viewedPages || [];
  const hasViewedPage = viewedPages.includes(page);

  // Only count page view if this visitor hasn't seen this page before
  if (!hasViewedPage) {
    // Update total page views
    analytics.totalPageViews = (analytics.totalPageViews || 0) + 1;

    // Update page-specific views
    analytics.pageViews = analytics.pageViews || {};
    analytics.pageViews[page] = (analytics.pageViews[page] || 0) + 1;

    // Update daily stats
    analytics.dailyStats = analytics.dailyStats || {};
    if (!analytics.dailyStats[todayKey]) {
      analytics.dailyStats[todayKey] = { views: 0, visitors: 0, hourly: {} };
    }
    analytics.dailyStats[todayKey].views += 1;

    // Update hourly activity for today
    analytics.dailyStats[todayKey].hourly = analytics.dailyStats[todayKey].hourly || {};
    analytics.dailyStats[todayKey].hourly[currentHour] = (analytics.dailyStats[todayKey].hourly[currentHour] || 0) + 1;

    // Update referrer stats (if present and not same domain)
    if (referrer) {
      try {
        const refUrl = new URL(referrer);
        const refHost = refUrl.hostname;
        if (!refHost.includes("localhost") && !refHost.includes("dundasweightloss")) {
          analytics.referrers = analytics.referrers || {};
          analytics.referrers[refHost] = (analytics.referrers[refHost] || 0) + 1;
        }
      } catch {
        // Invalid URL, ignore
      }
    }
  }

  // Only count device and browser once per unique visitor
  if (isNewVisitor) {
    // Update device stats
    const deviceType = getDeviceType(userAgent);
    analytics.devices = analytics.devices || { desktop: 0, mobile: 0, tablet: 0 };
    analytics.devices[deviceType] = (analytics.devices[deviceType] || 0) + 1;

    // Update browser stats
    const browser = getBrowser(userAgent);
    analytics.browsers = analytics.browsers || {};
    analytics.browsers[browser] = (analytics.browsers[browser] || 0) + 1;
  }

  // Update visitor data
  const now = new Date();
  const nowIso = now.toISOString();
  if (isNewVisitor) {
    analytics.uniqueVisitors = (analytics.uniqueVisitors || 0) + 1;
    analytics.dailyStats = analytics.dailyStats || {};
    if (!analytics.dailyStats[todayKey]) {
      analytics.dailyStats[todayKey] = { views: 0, visitors: 0, hourly: {} };
    }
    analytics.dailyStats[todayKey].visitors += 1;
    visitorsData.visitors[visitorId] = {
      firstVisit: nowIso,
      lastVisit: nowIso,
      visitCount: 1,
      viewedPages: [page],
      pages: [{ page, timestamp: nowIso }]
    };
  } else {
    // Only increment visitCount if more than 1 hour has passed since first visit
    const firstVisit = new Date(visitorsData.visitors[visitorId].firstVisit);
    const hoursSinceFirstVisit = (now - firstVisit) / (1000 * 60 * 60);

    if (hoursSinceFirstVisit > 1) {
      visitorsData.visitors[visitorId].visitCount += 1;
    }

    visitorsData.visitors[visitorId].lastVisit = nowIso;
    visitorsData.visitors[visitorId].pages.push({ page, timestamp: nowIso });

    // Add page to viewedPages if not already there
    if (!hasViewedPage) {
      visitorsData.visitors[visitorId].viewedPages = visitorsData.visitors[visitorId].viewedPages || [];
      visitorsData.visitors[visitorId].viewedPages.push(page);
    }

    // Keep only last 50 page visits per visitor to prevent data bloat
    if (visitorsData.visitors[visitorId].pages.length > 50) {
      visitorsData.visitors[visitorId].pages =
        visitorsData.visitors[visitorId].pages.slice(-50);
    }
  }

  await Promise.all([
    writeAnalytics(analytics),
    writeVisitors(visitorsData)
  ]);

  return { success: true };
}

/**
 * Get analytics summary
 */
export async function getAnalyticsSummary() {
  const [analytics, visitorsData] = await Promise.all([
    readAnalytics(),
    readVisitors()
  ]);

  const todayKey = getTodayKey();
  const today = analytics.dailyStats?.[todayKey] || { views: 0, visitors: 0 };

  // Get last 7 days stats
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    last7Days.push({
      date: key,
      views: analytics.dailyStats?.[key]?.views || 0,
      visitors: analytics.dailyStats?.[key]?.visitors || 0
    });
  }

  // Get last 30 days stats
  const last30Days = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split("T")[0];
    last30Days.push({
      date: key,
      views: analytics.dailyStats?.[key]?.views || 0,
      visitors: analytics.dailyStats?.[key]?.visitors || 0
    });
  }

  // Get top pages
  const topPages = Object.entries(analytics.pageViews || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([page, views]) => ({ page, views }));

  // Get top referrers
  const topReferrers = Object.entries(analytics.referrers || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([referrer, count]) => ({ referrer, count }));

  // Get browser breakdown
  const browsers = Object.entries(analytics.browsers || {})
    .sort((a, b) => b[1] - a[1])
    .map(([browser, count]) => ({ browser, count }));

  // Get hourly activity for today
  const todayHourly = analytics.dailyStats?.[todayKey]?.hourly || {};
  const hourlyActivity = [];
  for (let i = 0; i < 24; i++) {
    hourlyActivity.push({
      hour: i,
      count: todayHourly[i.toString()] || 0
    });
  }

  // Calculate active visitors (visited in last 30 minutes)
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const activeVisitors = Object.values(visitorsData.visitors || {})
    .filter(v => v.lastVisit > thirtyMinutesAgo)
    .length;

  // Calculate returning visitors
  const totalVisitors = Object.values(visitorsData.visitors || {}).length;
  const returningVisitors = Object.values(visitorsData.visitors || {})
    .filter(v => v.visitCount > 1)
    .length;

  return {
    overview: {
      totalPageViews: analytics.totalPageViews || 0,
      uniqueVisitors: analytics.uniqueVisitors || 0,
      activeVisitors,
      todayViews: today.views,
      todayVisitors: today.visitors,
      returningVisitors,
      returningRate: totalVisitors > 0
        ? Math.round((returningVisitors / totalVisitors) * 100)
        : 0
    },
    devices: analytics.devices || { desktop: 0, mobile: 0, tablet: 0 },
    browsers,
    topPages,
    topReferrers,
    last7Days,
    last30Days,
    hourlyActivity
  };
}

/**
 * Reset analytics data (admin only)
 */
export async function resetAnalytics() {
  await Promise.all([
    writeAnalytics(defaultAnalytics),
    writeVisitors(defaultVisitors)
  ]);
  return { success: true };
}
