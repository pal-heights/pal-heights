// /* ===================== IMPORTS ===================== */
// import Image from "next/image";
// import { notFound } from "next/navigation";
// import styles from "./page.module.css";
// import CommentForm from "../../../../components/forms/CommentForm";
// import Blog from "@/models/Blogs";
// import { connectDB } from "@lib/mongodb";

// /* ===================== ISR ===================== */
// export const revalidate = 3600;
// export const dynamicParams = false;

// /* ===================== STATIC PARAMS ===================== */
// export async function generateStaticParams() {
//   await connectDB();

//   const blogs = await Blog.find(
//     {
//       status: "published",
//       slug: { $exists: true, $ne: "" },
//       "meta.title": { $exists: true },
//       "featureImage.data": { $exists: true },
//     },
//     { slug: 1 }
//   ).lean();

//   return blogs
//     .filter((b) => typeof b.slug === "string" && b.slug.trim().length > 0)
//     .map((b) => ({
//       slug: b.slug.trim(),
//     }));
// }

// /* ===================== TYPES ===================== */
// interface BlogData {
//   _id: string;
//   slug: string;
//   featureImage: {
//     data: string;
//     mime: string;
//   };
//   meta: {
//     title: string;
//     description: string;
//     category: string;
//   };
//   tags: string[];
//   blocks: {
//     id: string;
//     type: string;
//     data: any;
//   }[];
// }

// /* ===================== DATA FETCH ===================== */
// async function getBlog(slug?: string): Promise<BlogData> {
//   if (typeof slug !== "string" || !slug.trim()) {
//     notFound();
//   }

//   await connectDB();

//   const blog = await Blog.findOne({
//     slug: slug.trim(),
//     status: "published",
//   }).lean();

//   if (!blog) {
//     notFound();
//   }

//   return JSON.parse(JSON.stringify(blog));
// }

// /* ===================== PAGE ===================== */
// export default async function BlogPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const blog = await getBlog(params.slug);

//   return (
//     <article className={styles.wrapper}>
//       <div className={styles.hero}>
//         <Image
//           src={`data:${blog.featureImage.mime};base64,${blog.featureImage.data}`}
//           alt={blog.meta.title}
//           fill
//           priority
//           className={styles.heroImage}
//         />

//         <div className={styles.overlay}>
//           <div className={styles.overlayInner}>
//             <div className={styles.author}>
//               <div className={styles.authorImageWrap}>
//                 <img
//                   src="/site-logos/logo.png"
//                   alt="Pal Heights"
//                   className={styles.authorImage}
//                 />
//               </div>
//               <div className={styles.authorInfo}>
//                 <span className={styles.authorName}>Pal Heights</span>
//                 <span className={styles.authorRole}>Official Insights</span>
//               </div>
//             </div>

//             <h1 className={styles.title}>{blog.meta.title}</h1>

//             <div className={styles.metaRow}>
//               <div className={styles.categoryWrap}>
//                 <span className={styles.categoryLabel}>Category -</span>
//                 <span className={styles.category}>{blog.meta.category}</span>
//               </div>

//               {blog.tags?.length > 0 && (
//                 <div className={styles.tags}>
//                   {blog.tags.map((tag) => (
//                     <span key={tag} className={styles.tag}>
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className={styles.content}>
//         <p className={styles.description}>{blog.meta.description}</p>

//         <div className={styles.blocks}>
//           {blog.blocks.map((block) => {
//             switch (block.type) {
//               case "heading":
//                 return block.data.level === "h3" ? (
//                   <h3 key={block.id}>{block.data.text}</h3>
//                 ) : (
//                   <h2 key={block.id}>{block.data.text}</h2>
//                 );

//               case "paragraph":
//                 return <p key={block.id}>{block.data.text}</p>;

//               case "list":
//                 return block.data.style === "ordered" ? (
//                   <ol key={block.id}>
//                     {block.data.items.map((i: string, idx: number) => (
//                       <li key={idx}>{i}</li>
//                     ))}
//                   </ol>
//                 ) : (
//                   <ul key={block.id}>
//                     {block.data.items.map((i: string, idx: number) => (
//                       <li key={idx}>{i}</li>
//                     ))}
//                   </ul>
//                 );

//               case "image":
//                 return (
//                   <img
//                     key={block.id}
//                     src={`data:${block.data.mime};base64,${block.data.data}`}
//                     className={styles.inlineImage}
//                     alt=""
//                   />
//                 );

//               default:
//                 return null;
//             }
//           })}
//         </div>
//       </div>

//       <div className={styles.commentsSection}>
//         <CommentForm blogSlug={blog.slug} blogId={blog._id} />
//       </div>
//     </article>
//   );
// }

/* ===================== ISR ===================== */
// export const revalidate = 3600;
// export const dynamicParams = false;

/* ===================== STATIC PARAMS ===================== */
import type { Metadata } from "next";
import BlogPageInner from "./BlogPageInner";
import {
  getBlogBySlug,
  getPublishedBlogSlugs,
  type BlogData,
} from "./blog-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  const title = blog.meta.seoTitle?.trim() || blog.meta.title;
  const description = blog.meta.seoDescription?.trim() || blog.meta.description;

  const seoKeywords = blog.meta.seoKeywords
    ?.split(",")
    .map((keyword) => keyword.trim())
    .filter(Boolean);

  const keywords =
    seoKeywords && seoKeywords.length
      ? seoKeywords
      : blog.tags && blog.tags.length
        ? blog.tags
        : blog.meta.category
          ? [blog.meta.category]
          : undefined;

  return {
    title,
    description,
    keywords,
  };
}

export async function generateStaticParams() {
  return getPublishedBlogSlugs();
}

/* ===================== PAGE ===================== */
export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return <BlogPageInner slug={slug} blog={blog} />;
}
