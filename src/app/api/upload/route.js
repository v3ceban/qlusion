import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(req) {
  const file = req.body || "";
  const contentType = req.headers.get("content-type") || "text/plain";

  const randomString = Math.random().toString(36).substring(7);

  const filename = `${randomString}-${file.name}.${contentType.split("/")[1]}`;

  const blob = await put(filename, file, {
    contentType,
    access: "public",
  });

  return NextResponse.json(blob);
}
