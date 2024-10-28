// app/api/calendar/route.js
import { NextResponse } from "next/server";
import ical from "ical-generator";

export async function GET() {
  const calendar = ical({ name: "My App Events" });

  // Fetch events from your database or state
  const events = [
    {
      start: "2022-01-01T12:00:00Z",
      end: "2022-01-01T13:00:00Z",
      title: "New Year Celebration",
      description: "Welcome to 2022!",
      location: "Your Home",
      recurrence: "FREQ=WEEKLY",
    },
    {
      start: "2022-12-25T12:00:00Z",
      end: "2022-12-25T13:00:00Z",
      title: "Christmas Celebration",
      description: "Merry Christmas!",
      location: "Your Home",
      recurrence: "FREQ=WEEKLY",
    },
  ];

  events.forEach((event) => {
    calendar.createEvent({
      start: new Date(event.start), // Set event start
      end: new Date(event.end), // Set event end
      summary: event.title, // Event title
      description: event.description,
      location: event.location,
      repeating: event.recurrence, // Set recurrence rule
    });
  });

  return new NextResponse(calendar.toString(), {
    headers: { "Content-Type": "text/calendar" },
  });
}
