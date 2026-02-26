import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Blog from "@/models/Blogs";

const MONGO_URI = process.env.MONGO_URI!;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(MONGO_URI, {
    dbName: "test",
  });
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await context.params;

    console.log("REQUESTED SLUG:", slug);

    await connectDB();
    console.log("DB HIT: For Single Blog", slug);

    const blog = await Blog.findOne({
      slug,
      status: "published",
    }).lean();

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch blog" },
      { status: 500 },
    );
  }
}
