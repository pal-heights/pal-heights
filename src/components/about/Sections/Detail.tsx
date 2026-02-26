"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Detail.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function DetailSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const bottomImagesRef = useRef<HTMLDivElement | null>(null);
  const rightImageRef = useRef<HTMLDivElement | null>(null);

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
          "-=0.3"
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          paragraphRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .from(
          bottomImagesRef.current?.children || [],
          {
            y: 32,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.3"
        )
        .from(
          rightImageRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          "-=0.6"
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
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>
            <div className={styles.header}>
              <div className={styles.kickerWrap}>
                <span ref={kickerRef} className={styles.kicker}>
                  WHERE EVERY DETAIL CREATES A LASTING MEMORY
                </span>
              </div>

              <div className={styles.headingRow}>
                <span className={styles.headingWrap}>
                  <h2 ref={headingRef} className={styles.heading}>
                    Rooted in Craft, Guided by Time
                  </h2>
                </span>
                <span ref={lineRef} className={styles.line} />
              </div>

              <p ref={paragraphRef} className={styles.paragraph}>
                Inspired by architectural detail, cultural nuance, and an
                appreciation for things that age well.
              </p>
            </div>

            <div ref={bottomImagesRef} className={styles.bottomImages}>
              <div className={styles.imageBox} data-cursor-theme="light">
                <Image
                  src="/about/small-left.jpg"
                  data-lightbox
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.imageBox} data-cursor-theme="light">
                <Image
                  src="/about/small-right.jpg"
                  data-lightbox
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div
            ref={rightImageRef}
            className={styles.rightCol}
            data-cursor-theme="light"
          >
            <Image
              src="/about/right-large.jpg"
              data-lightbox
              alt=""
              fill
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
