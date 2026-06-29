import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Blog from "@/models/Blogs";
import { connectDB } from "@lib/mongodb";

export interface ImageData {
  url?: string;
  data?: string;
  mime?: string;
}

export interface BlogData {
  _id: string;
  slug: string;
  featureImageUrl?: string;
  featureImage?: ImageData;
  meta: {
    title: string;
    description: string;
    category: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
  };
  tags: string[];
  content?: any;
  blocks: {
    id: string;
    type: string;
    data: any;
  }[];
}

export async function getBlogBySlug(slug?: string): Promise<BlogData> {
  if (typeof slug !== "string" || !slug.trim()) {
    notFound();
  }

  await connectDB();

  const blog = await Blog.findOne({
    slug: slug.trim(),
    status: "published",
  }).lean();

  if (!blog) {
    notFound();
  }

  return JSON.parse(JSON.stringify(blog));
}

export async function getPublishedBlogSlugs(): Promise<{ slug: string }[]> {
  await connectDB();

  const blogs = await Blog.find(
    {
      status: "published",
      slug: { $exists: true, $ne: "" },
    },
    { slug: 1 },
  ).lean();

  return blogs
    .filter((b) => typeof b.slug === "string" && b.slug.trim().length > 0)
    .map((b) => ({ slug: b.slug.trim() }));
}
