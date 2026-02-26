"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WeddingGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function WeddingGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
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

      tl.from(titleRef.current, {
        y: 80,
        duration: 0.8,
        ease: "power3.out",
      })
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
          descRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
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
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <span ref={lineRef} className={styles.line} />
            <span className={styles.titleWrap}>
              <h2 ref={titleRef} className={styles.title}>
                Dream Weddings at Pal Heights
              </h2>
            </span>
          </div>

          <p ref={descRef} className={styles.desc}>
            Dream weddings come to life at Pal Heights with sophisticated
            banquet spaces, curated menus, and seamless planning designed to
            host celebrations that are as grand, graceful, and unique as your
            journey together.
          </p>
        </div>

        {/* Image Grid */}
        <div className={styles.gridWrapper}>
          <div className={styles.bgPanel} />
          <div ref={gridRef} className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={styles.imageWrap}>
                <Image
                  src={`/banquets/pal-heights/wedding-${i + 1}.jpg`}
                  data-lightbox
                  alt="Wedding at Pal Heights"
                  fill
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
