"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const bgOne = document.querySelector(`.${styles.bgOne}`);
    const bgTwo = document.querySelector(`.${styles.bgTwo}`);

    const ctx = gsap.context(() => {
      /* ----------------------------------------
       BACKGROUND CROSS-FADE
    ---------------------------------------- */
      if (bgOne && bgTwo) {
        gsap
          .timeline({
            repeat: -1,
            repeatDelay: 2,
          })
          .to(bgTwo, {
            opacity: 1,
            duration: 1.8,
            ease: "power2.out",
          })
          .to(
            bgOne,
            {
              opacity: 0,
              duration: 1.8,
              ease: "power2.out",
            },
            "<"
          )
          .to(
            bgTwo,
            {
              opacity: 0,
              duration: 1.8,
              ease: "power2.out",
            },
            "+=3"
          )
          .to(
            bgOne,
            {
              opacity: 1,
              duration: 1.8,
              ease: "power2.out",
            },
            "<"
          );
      }

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
        "-=0.3"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        <div className={`${styles.bg} ${styles.bgOne}`} />
        <div className={`${styles.bg} ${styles.bgTwo}`} />
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
