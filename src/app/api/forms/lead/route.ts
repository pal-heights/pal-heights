import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Lead from "@/models/Lead";

/* ---------- DB ---------- */
const MONGO_URI = process.env.MONGO_URI as string;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, { dbName: "test" });
}

/* ---------- Rate Limit ---------- */
const rateLimitWindowMs = 60 * 1000;
const rateLimitMax = 5;
const rateLimitMap: Record<string, { count: number; lastRequest: number }> = {};

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  );
}

export async function POST(request: NextRequest) {
  /* ---- Rate limiting ---- */
  const ip = getClientIp(request);
  const now = Date.now();
  const entry = rateLimitMap[ip] || { count: 0, lastRequest: now };

  if (now - entry.lastRequest > rateLimitWindowMs) {
    entry.count = 1;
    entry.lastRequest = now;
  } else {
    entry.count++;
  }

  rateLimitMap[ip] = entry;

  if (entry.count > rateLimitMax) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const { fullName, email, phone, phoneNumber, message, service, verified } =
      body;

    await connectDB();

    const lead = await Lead.create({
      fullName,
      email,
      phoneNumber: phoneNumber || phone,
      message,
      service: Array.isArray(service) ? service : service ? [service] : [],
      status: "pending",
      assignedBo: "none",
      trash: false,
      verified: verified === true ? true : false,
    });

    return NextResponse.json(
      { success: true, leadId: lead._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead create error:", error);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
