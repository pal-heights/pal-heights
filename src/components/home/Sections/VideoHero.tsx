"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./VideoHero.module.css";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;

    const ctx = gsap.context(() => {
      /* ----------------------------------------
       HEADING + PARAGRAPH ANIMATION
    ---------------------------------------- */
      if (!heading || !paragraph) return;

      const lines = heading.querySelectorAll(`.${styles.line}`);

      const tl = gsap.timeline();

      tl.from(lines, {
        y: 90,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.35,
      });

      tl.from(
        paragraph,
        {
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.3",
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        <video
          className={styles.bgVideo}
          src="https://res.cloudinary.com/dfx58zgtm/video/upload/q_auto/f_auto/v1781009387/hero_1_1_njdgys.mp4"
          poster="https://res.cloudinary.com/dfx58zgtm/image/upload/q_auto/f_auto/v1781010794/Screenshot_2026-06-09_184201_rmag3r.png"
          autoPlay
          loop
          muted
          playsInline
          onEnded={(e) => e.currentTarget.play()}
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 ref={headingRef} className={styles.heading}>
            <div className={styles.mask}>
              <div className={styles.line}>A Sense of Space.</div>
            </div>
            <div className={styles.mask}>
              <div className={styles.line}>A Sense of Belonging.</div>
            </div>
          </h1>

          <p ref={paragraphRef} className={styles.paragraph}>
            Stays shaped by proportion, light, and an understanding of what
            truly matters to a traveller.
          </p>
        </div>
      </div>
    </section>
  );
}
