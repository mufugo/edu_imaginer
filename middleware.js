import { NextResponse } from "next/server";
import { applyRateLimiting } from "./utils/rate-limitings";

export async function middleware(req) {
  try {
    await applyRateLimiting(req, NextResponse);
  } catch (error) {
    return new NextResponse("Too many requests", { status: 429 });
  }
}

export const config = {
  matcher: "/api/(.*)",
};
