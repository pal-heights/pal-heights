import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blogs";

export const revalidate = 60;

const MONGO_URI = process.env.MONGO_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, {
    dbName: "test",
  });
}

export async function GET() {
  try {
    await connectDB();
    console.log("DB HIT: For All Blogs");

    const blogs = await Blog.find({ status: "published" })
      .select("slug meta featureImage createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(blogs, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}
