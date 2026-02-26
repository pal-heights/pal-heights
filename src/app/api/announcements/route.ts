import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Announcement from "@/models/Announcements";

/* =========================================
   Edge / ISR caching
========================================= */
export const revalidate = 300; // 5 minutes (ISR)

/* =========================================
   DB CONNECT (cold-start safe)
========================================= */
const MONGODB_URI = process.env.MONGO_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGODB_URI);
}

/* =========================================
   GET: Public Announcements
   (base64-safe, no filesystem)
========================================= */
export async function GET() {
  try {
    await connectDB();

    /**
     * Expect ONLY ONE active document
     * Shape:
     * {
     *   mode: "single" | "slider",
     *   images: [{ data, mime, size }]
     * }
     */
    const announcement = await Announcement.findOne({ isActive: true })
      .select("mode images -_id")
      .lean<{
        mode: "single" | "slider";
        images: {
          data: string;
          mime: string;
          size: number;
        }[];
      }>();

    if (!announcement || !announcement.images?.length) {
      return NextResponse.json({ mode: "single", images: [] }, { status: 200 });
    }

    return NextResponse.json(
      {
        mode: announcement.mode,
        images: announcement.images,
      },
      {
        status: 200,
        headers: {
          // Strong CDN caching on Vercel
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      },
    );
  } catch (error) {
    console.error("Public announcements error:", error);
    return NextResponse.json(
      { message: "Failed to fetch announcements" },
      { status: 500 },
    );
  }
}
