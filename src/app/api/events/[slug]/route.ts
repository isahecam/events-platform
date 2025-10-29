import { NextRequest, NextResponse } from "next/server";

import { Event } from "@/database";

import connectDB from "@/lib/mongodb";

// Define the route params type
interface RouteParams {
  params: Promise<{
    slug: string;
  }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  try {
    // Validate slug parameter
    const { slug } = await params;

    if (!slug || typeof slug !== "string" || slug.trim() === "") {
      return NextResponse.json({ error: "Invalid or missing slug parameter" }, { status: 400 });
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug: slug.trim().toLowerCase() }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    // Return event data
    return NextResponse.json({ success: true, event }, { status: 200 });
  } catch (error) {
    // Log error for debugging (use proper logging service in production)
    console.error("Error fetching event by slug:", error);

    // Handle different error types
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Internal server error", message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
