import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Comment from "@/models/Comment";

const MONGO_URI = process.env.MONGO_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, { dbName: "test" });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { message: "Missing blog slug" },
        { status: 400 },
      );
    }

    await connectDB();

    const comments = await Comment.find({
      blogSlug: slug,
      isDeleted: false,
    })
      .select("name comment createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(comments, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}
