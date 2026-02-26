"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Awards.module.css";

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  "/awards/1.jpeg",
  "/awards/2.jpeg",
  "/awards/3.jpeg",
  "/awards/4.jpeg",
  "/awards/5.jpeg",
  "/about/awards-6.jpg",
  "/about/awards-7.jpg",
  "/about/awards-8.jpg",
  "/about/awards-9.jpg",
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
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
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          headingRef.current,
          {
            y: 70,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          paragraphRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          gridRef.current?.children || [],
          {
            y: 30,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-cursor-theme="dark"
    >
      <div className={styles.inner}>
        {/* TEXT CONTENT */}
        <div className={styles.header}>
          <div className={styles.kickerWrap}>
            <span ref={kickerRef} className={styles.kicker}>
              WHERE EVERY DETAIL CREATES A LASTING MEMORY
            </span>
          </div>

          <div className={styles.headingRow}>
            <span ref={lineRef} className={styles.line} />
            <div className={styles.headingWrap}>
              <h2 ref={headingRef} className={styles.heading}>
                Acknowledged Over the Years
              </h2>
            </div>
          </div>

          <p ref={paragraphRef} className={styles.paragraph}>
            Recognition that reflects our enduring focus on quality,
            consistency, and guest trust.
          </p>
        </div>

        {/* IMAGES GRID */}
        <div ref={gridRef} className={styles.grid}>
          {IMAGES.map((src, i) => (
            <div key={i} className={styles.imageBox} data-cursor-theme="light">
              <Image
                src={src}
                data-lightbox
                alt={`Award ${i + 1}`}
                fill
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
