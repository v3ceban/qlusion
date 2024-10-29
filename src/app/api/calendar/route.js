import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const feed = await prisma.ics_feed.findUnique({ where: { id: "default" } });
    if (!feed)
      return NextResponse.json(
        { error: "ICS feed not found" },
        { status: 404 },
      );

    return new NextResponse(feed.content, {
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=club-events.ics",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "A server error occurred" },
      { status: 500 },
    );
  }
}
