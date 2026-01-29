"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUsers,
  faUserClock,
  faChartLine,
  faDesktop,
  faMobile,
  faTablet,
  faGlobe,
  faArrowRotateRight,
  faTrash,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

function StatCard({ icon, label, value, subValue, bgColor = "bg-sky-100", iconColor = "text-sky-600" }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} p-3 rounded-xl flex items-center justify-center`}>
          <FontAwesomeIcon icon={icon} className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div>
          <p className="text-sky-700 text-sm">{label}</p>
          <p className="text-2xl font-semibold text-sky-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {subValue && <p className="text-xs text-gray-500">{subValue}</p>}
        </div>
      </div>
    </div>
  );
}

function SimpleBarChart({ data, label }) {
  if (!data || data.length === 0) return <p className="text-gray-500 text-sm">No data yet</p>;
  const maxValue = Math.max(...data.map((d) => d.views || d.count || 0), 1);

  return (
    <div className="w-full">
      <div className="flex items-end gap-1 h-32">
        {data.map((item, i) => {
          const value = item.views || item.count || 0;
          const height = Math.max((value / maxValue) * 100, 2);
          return (
            <div
              key={i}
              className="flex-1 bg-sky-500 rounded-t hover:bg-sky-600 transition-colors relative group"
              style={{ height: `${height}%` }}
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-sky-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                {item.date || item.hour}: {value}
              </div>
            </div>
          );
        })}
      </div>
      {label && (
        <p className="text-center text-xs text-gray-500 mt-2">{label}</p>
      )}
    </div>
  );
}

function DeviceBreakdown({ devices }) {
  const total = (devices?.desktop || 0) + (devices?.mobile || 0) + (devices?.tablet || 0);
  if (total === 0) return <p className="text-gray-500 text-sm">No data yet</p>;

  const getPercentage = (value) => Math.round((value / total) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faDesktop} className="h-4 w-4 text-sky-600" />
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Desktop</span>
            <span className="text-sky-900 font-medium">{getPercentage(devices.desktop)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500"
              style={{ width: `${getPercentage(devices.desktop)}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faMobile} className="h-4 w-4 text-sky-600" />
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Mobile</span>
            <span className="text-sky-900 font-medium">{getPercentage(devices.mobile)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-400"
              style={{ width: `${getPercentage(devices.mobile)}%` }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FontAwesomeIcon icon={faTablet} className="h-4 w-4 text-sky-600" />
        <div className="flex-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Tablet</span>
            <span className="text-sky-900 font-medium">{getPercentage(devices.tablet)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-300"
              style={{ width: `${getPercentage(devices.tablet)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [timeRange, setTimeRange] = useState("7days");

  const fetchAnalytics = async () => {
    try {
      const res = await fetch("/api/analytics");
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAnalytics();
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset all analytics data? This cannot be undone.")) {
      return;
    }
    setResetting(true);
    try {
      await fetch("/api/analytics", { method: "DELETE" });
      await fetchAnalytics();
    } catch (error) {
      console.error("Failed to reset analytics:", error);
    } finally {
      setResetting(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <main>
        <section className="w-full">
          <div className="flex items-center justify-center h-64">
            <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 animate-spin text-sky-600" />
          </div>
        </section>
      </main>
    );
  }

  const chartData = timeRange === "7days" ? analytics?.last7Days : analytics?.last30Days;

  return (
    <main>
      <section className="w-full space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-sky-900">
              Analytics
            </h1>
            <p className="text-sky-700 text-sm mt-1">
              Track your site performance and visitor behavior
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="rounded-xl bg-sky-600 px-5 py-3 text-white text-base font-medium hover:bg-sky-700 disabled:bg-sky-400 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <FontAwesomeIcon
                icon={faArrowRotateRight}
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              onClick={handleReset}
              disabled={resetting}
              className="rounded-xl bg-red-600 px-5 py-3 text-white text-base font-medium hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <FontAwesomeIcon
                icon={resetting ? faSpinner : faTrash}
                className={`h-4 w-4 ${resetting ? "animate-spin" : ""}`}
              />
              Reset
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div>
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={faEye}
              label="Total Page Views"
              value={analytics?.overview?.totalPageViews || 0}
              bgColor="bg-sky-100"
              iconColor="text-sky-600"
            />
            <StatCard
              icon={faUsers}
              label="Unique Visitors"
              value={analytics?.overview?.uniqueVisitors || 0}
              bgColor="bg-green-100"
              iconColor="text-green-600"
            />
            <StatCard
              icon={faUserClock}
              label="Active Now"
              value={analytics?.overview?.activeVisitors || 0}
              subValue="Last 30 minutes"
              bgColor="bg-purple-100"
              iconColor="text-purple-600"
            />
            <StatCard
              icon={faChartLine}
              label="Returning Rate"
              value={`${analytics?.overview?.returningRate || 0}%`}
              subValue={`${analytics?.overview?.returningVisitors || 0} returning`}
              bgColor="bg-orange-100"
              iconColor="text-orange-600"
            />
          </div>
        </div>

        {/* Today's Stats & Devices */}
        <div>
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Today&apos;s Activity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-sky-900 mb-4">Today</h3>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-semibold text-sky-600">
                    {analytics?.overview?.todayViews || 0}
                  </p>
                  <p className="text-sm text-gray-500">Page Views</p>
                </div>
                <div>
                  <p className="text-3xl font-semibold text-sky-600">
                    {analytics?.overview?.todayVisitors || 0}
                  </p>
                  <p className="text-sm text-gray-500">New Visitors</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-sky-900 mb-4">Devices</h3>
              <DeviceBreakdown devices={analytics?.devices} />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div>
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Traffic</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Traffic Over Time */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-sky-900">Traffic Over Time</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
              </div>
              <SimpleBarChart data={chartData} label="Daily page views" />
            </div>

            {/* Hourly Activity */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-sky-900 mb-4">Hourly Activity</h3>
              <SimpleBarChart
                data={analytics?.hourlyActivity}
                label="Views by hour (0-23)"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          <h2 className="text-xl font-semibold text-sky-900 mb-4">Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top Pages */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-sky-900 mb-4">Top Pages</h3>
              {analytics?.topPages?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.topPages.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                        {item.page}
                      </span>
                      <span className="text-sm font-medium text-sky-900">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No data yet</p>
              )}
            </div>

            {/* Top Referrers */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <FontAwesomeIcon icon={faGlobe} className="h-4 w-4 text-sky-600" />
                <h3 className="text-lg font-medium text-sky-900">Top Referrers</h3>
              </div>
              {analytics?.topReferrers?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.topReferrers.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate flex-1 mr-2">
                        {item.referrer}
                      </span>
                      <span className="text-sm font-medium text-sky-900">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No external referrers yet</p>
              )}
            </div>

            {/* Browsers */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-medium text-sky-900 mb-4">Browsers</h3>
              {analytics?.browsers?.length > 0 ? (
                <div className="space-y-3">
                  {analytics.browsers.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.browser}</span>
                      <span className="text-sm font-medium text-sky-900">
                        {item.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No data yet</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
