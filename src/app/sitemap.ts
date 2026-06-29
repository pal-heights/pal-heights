import type { MetadataRoute } from "next";
import { connectDB } from "@lib/mongodb";
import Blog from "@/models/Blogs";

const BASE_URL = "https://www.palheights.com";

const LAST_MODIFIED = new Date("2026-06-23T07:44:26+00:00");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: LAST_MODIFIED,
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/discover/pal-heights`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/discover/pal-heights-mantra`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dining/pal-heights`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dining/pal-heights-mantra`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dining/world-baker`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dining/ek-dum-desi`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/banquets/pal-heights`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/banquets/pal-heights-mantra`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/news-media`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    },
  ];

  await connectDB();

  const blogs = await Blog.find({ status: "published" })
    .select("slug updatedAt createdAt")
    .sort({ createdAt: -1 })
    .lean();

//   console.log(`Sitemap: ${blogs.length} published blogs found`);

  const blogPages: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${BASE_URL}/news-media/${blog.slug}`,
    lastModified: blog.updatedAt ?? blog.createdAt ?? LAST_MODIFIED,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}