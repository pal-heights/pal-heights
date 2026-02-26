import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Comment from "@/models/Comment";

const MONGO_URI = process.env.MONGO_URI!;

/* ---------- DB ---------- */
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, { dbName: "test" });
}

/* ---------- Rate limit (simple, effective) ---------- */
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;
const rateMap = new Map<string, { count: number; time: number }>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry) {
    rateMap.set(ip, { count: 1, time: now });
    return false;
  }

  if (now - entry.time > RATE_LIMIT_WINDOW) {
    rateMap.set(ip, { count: 1, time: now });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS;
}

/* ---------- POST ---------- */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      blogId,
      blogSlug,
      name,
      email,
      comment,
      website, // honeypot
      formLoadedAt, // timestamp
    } = body;

    /* ---------- Honeypot ---------- */
    if (website) {
      return NextResponse.json({ message: "Spam detected" }, { status: 400 });
    }

    /* ---------- Time check ---------- */
    if (!formLoadedAt || Date.now() - formLoadedAt < 3000) {
      return NextResponse.json({ message: "Too fast" }, { status: 400 });
    }

    /* ---------- Validation ---------- */
    if (!blogId || !blogSlug) {
      return NextResponse.json({ message: "Invalid blog" }, { status: 400 });
    }

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ message: "Invalid name" }, { status: 400 });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }

    if (!comment || comment.length < 10 || comment.length > 800) {
      return NextResponse.json(
        { message: "Invalid comment length" },
        { status: 400 }
      );
    }

    /* ---------- Rate limit ---------- */
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many comments. Try later." },
        { status: 429 }
      );
    }

    /* ---------- Save ---------- */
    await Comment.create({
      blogId,
      blogSlug,
      name,
      email,
      comment,
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") || "",
    });

    return NextResponse.json({ message: "Comment submitted" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
