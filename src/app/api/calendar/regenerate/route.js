import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateCalendar } from "@/lib/calendar";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (user.role !== "admin") {
      throw new Error("Unauthorized");
    }

    await updateCalendar();
    return NextResponse.json({ message: "Calendar updated" });
  } catch (error) {
    console.error(error);
    if (
      error.message === "Unauthorized" ||
      error.message === "User not found"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: "A server error occurred" },
      { status: 500 },
    );
  }
}
