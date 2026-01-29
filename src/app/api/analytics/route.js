import { NextResponse } from "next/server";
import { trackPageView, getAnalyticsSummary, resetAnalytics } from "../../../lib/analytics";
import { isAuthenticated } from "../../../lib/auth";

// Track a page view (public endpoint)
export async function POST(request) {
  try {
    const body = await request.json();
    const { page, visitorId, referrer } = body;

    if (!page || !visitorId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user agent from request headers
    const userAgent = request.headers.get("user-agent") || "";

    await trackPageView({
      page,
      visitorId,
      referrer,
      userAgent
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track page view" },
      { status: 500 }
    );
  }
}

// Get analytics summary (admin only)
export async function GET() {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch (error) {
    console.error("Analytics fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}

// Reset analytics (admin only)
export async function DELETE() {
  try {
    const authed = await isAuthenticated();
    if (!authed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await resetAnalytics();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset analytics" },
      { status: 500 }
    );
  }
}
