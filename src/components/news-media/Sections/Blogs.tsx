"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoading } from "src/context/LoadingContext";
import styles from "./Blogs.module.css";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  _id: string;
  slug: string;
  meta: {
    title: string;
    description: string;
    category: string;
  };
  featureImage: {
    data: string;
    mime: string;
  };
  createdAt: string;
}

function getPaginationPages(current: number, total: number) {
  if (total <= 6) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1, 2, 3];

  if (current > 4 && current < total - 3) {
    pages.push("...", current - 1, current, current + 1, "...");
  } else {
    pages.push("...");
  }

  pages.push(total - 2, total - 1, total);
  return Array.from(new Set(pages));
}

function truncateWords(text: string, limit = 26) {
  const words = text.trim().split(/\s+/);
  if (words.length <= limit) return text;
  return words.slice(0, limit).join(" ") + "…";
}

const PER_PAGE = 9;

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setIsLoading } = useLoading();

  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const paginationRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- FETCH BLOGS ---------------- */
  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch blogs");
        return res.json();
      })
      .then(setBlogs)
      .catch(console.error);
  }, []);

  const totalPages = Math.ceil(blogs.length / PER_PAGE);
  const visibleBlogs = blogs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleReadMore = (slug: string) => {
    setIsLoading(true);
    startTransition(() => {
      router.push(`/news-media/${slug}`);
    });
  };

  /* ---------------- SCROLL ENTRANCE ---------------- */
  useEffect(() => {
    if (!blogs.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(kickerRef.current, {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          titleRef.current?.querySelectorAll("span") || [],
          {
            y: 80,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          leftLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          rightLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "<"
        )
        .from(
          gridRef.current?.children || [],
          {
            y: 50,
            autoAlpha: 0,
            duration: 0.55,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .from(
          paginationRef.current,
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [blogs]);

  /* ---------------- PAGE CHANGE ANIMATION ---------------- */
  useEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { y: 40, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [page]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-cursor-theme="dark"
    >
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.kickerWrap}>
            <span ref={kickerRef} className={styles.kicker}>
              NEWS & MEDIA
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <span className={styles.titleWrap}>
              <h2 ref={titleRef} className={styles.title}>
                <span>Latest </span>
                <span className={styles.span}>Stories</span>
              </h2>
            </span>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* GRID */}
        <div ref={gridRef} className={styles.grid}>
          {visibleBlogs.map((blog) => {
            const imageSrc = blog.featureImage.data.startsWith("data:")
              ? blog.featureImage.data
              : `data:${blog.featureImage.mime};base64,${blog.featureImage.data}`;

            return (
              <article key={blog._id} className={styles.card}>
                <div
                  data-cursor-theme="light"
                  className={styles.image}
                  style={{ backgroundImage: `url(${imageSrc})` }}
                />

                <div className={styles.content}>
                  <div className={styles.contentInner}>
                    <span className={styles.category}>
                      {blog.meta.category}
                    </span>
                    <h3>{blog.meta.title}</h3>
                    <p>{truncateWords(blog.meta.description, 30)}</p>
                  </div>

                  <button
                    onClick={() => handleReadMore(blog.slug)}
                    className={styles.readMore}
                    data-cursor="hover"
                    type="button"
                  >
                    Read more
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div ref={paginationRef} className={styles.pagination}>
            {getPaginationPages(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={`dots-${i}`} className={styles.dots}>
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={page === p ? styles.active : ""}
                  data-cursor={page === p ? "" : "hover"}
                >
                  {p}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}
