"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "src/context/LoadingContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Blogs.module.css";

gsap.registerPlugin(ScrollTrigger);

/* -------- Word Truncator (30 words) -------- */
const truncateWords = (text: string, limit = 30) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

type Blog = {
  _id: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    category: string;
  };
  featureImage: {
    data: string; // base64
    mime: string;
    size: number;
  };
};

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setIsLoading } = useLoading();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);

  /* -------- Fetch recent 3 blogs -------- */
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      }
    };

    fetchBlogs();
  }, []);

  /* -------- GSAP Animation -------- */
  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;

    if (!container || !header || !kicker || !title || !leftLine || !rightLine)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(kicker, { y: 50, duration: 0.6, ease: "power3.out" });

      tl.from(
        title.querySelectorAll("span"),
        { y: 70, duration: 0.7, ease: "power3.out" },
        "-=0.3"
      );

      tl.from(
        leftLine,
        { x: 40, opacity: 0, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      );

      tl.from(
        rightLine,
        { x: -40, opacity: 0, duration: 0.5, ease: "power3.out" },
        "<"
      );

      tl.from(
        `.${styles.card}`,
        {
          y: 50,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.15,
        },
        "<"
      );

      tl.from(
        `.${styles.ctaWrap}`,
        {
          y: 40,
          opacity: 0,
          duration: 0.45,
          ease: "power3.out",
        },
        "<"
      );
    }, container);

    return () => ctx.revert();
  }, [blogs]);

  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div ref={containerRef} className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              THE COMFORT CORNER
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />

            <h2 ref={titleRef} className={styles.title}>
              <span>Blogs for</span> <br className={styles.br} />
              <span className={styles.span}>Curious Travelers</span>
            </h2>

            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* Cards */}
        <div className={styles.grid}>
          {blogs.map((blog) => (
            <article key={blog._id} className={styles.card}>
              <div
                data-cursor-theme="light"
                className={styles.image}
                style={{
                  backgroundImage: `url(data:${blog.featureImage.mime};base64,${blog.featureImage.data})`,
                }}
              />

              <div className={styles.content}>
                <div>
                  <span className={styles.category}>{blog.meta.category}</span>
                  <h3>{blog.meta.title}</h3>
                  <p>{truncateWords(blog.meta.description, 30)}</p>
                </div>
                <button
                  onClick={() => {
                    setIsLoading(true);
                    startTransition(() => {
                      router.push(`/news-media/${blog.slug}`);
                    });
                  }}
                  className={styles.readMore}
                  data-cursor="hover"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.ctaWrap}>
          <a href="/news-media" className={styles.cta} data-cursor="hover">
            Explore News & Media
          </a>
        </div>
      </div>
    </section>
  );
}
