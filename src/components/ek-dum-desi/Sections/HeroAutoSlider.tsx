"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Hero.module.css";

const BG_IMAGES = [
  "/dining/ek-dum-desi/hero-1.jpg",
  "/dining/ek-dum-desi/hero-2.jpg",
  "/dining/ek-dum-desi/hero-3.jpg",
];

export default function Hero() {
  const currentBgRef = useRef<HTMLDivElement | null>(null);
  const nextBgRef = useRef<HTMLDivElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const [active, setActive] = useState(0);
  const animating = useRef(false);
  const intervalRef = useRef<number | null>(null);

  /* -----------------------------
     TEXT – RUN ONCE
  ----------------------------- */
  useEffect(() => {
    gsap.fromTo(
      headingRef.current?.querySelectorAll(`.${styles.line}`) || [],
      { autoAlpha: 0, y: 120 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.25,
        ease: "power4.out",
      }
    );

    gsap.fromTo(
      paragraphRef.current,
      { autoAlpha: 0, y: 26 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
      }
    );
  }, []);

  /* -----------------------------
     SLIDE TRANSITION
  ----------------------------- */
  const slideTo = (nextIndex: number) => {
    if (animating.current) return;
    animating.current = true;

    const current = currentBgRef.current!;
    const next = nextBgRef.current!;

    next.style.backgroundImage = `url(${BG_IMAGES[nextIndex]})`;

    gsap.set(next, {
      clipPath: "inset(0 100% 0 0)",
      zIndex: 2,
    });

    gsap.set(current, { zIndex: 1 });

    gsap
      .timeline({
        onComplete: () => {
          setActive(nextIndex);

          current.style.backgroundImage = `url(${BG_IMAGES[nextIndex]})`;

          gsap.set(current, { clipPath: "inset(0 0% 0 0)" });
          gsap.set(next, { clipPath: "inset(0 100% 0 0)" });

          animating.current = false;
        },
      })
      .to(
        next,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 3,
          ease: "power3.inOut",
        },
        0
      )
      .to(
        current,
        {
          clipPath: "inset(0 0 0 100%)",
          duration: 3,
          ease: "power3.inOut",
        },
        0
      );
  };

  /* -----------------------------
     AUTO SLIDE (EVERY 1s)
  ----------------------------- */
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      slideTo((active + 1) % BG_IMAGES.length);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [active]);

  return (
    <section className={styles.hero}>
      {/* BACKGROUND */}
      <div className={styles.bgOverlay}></div>
      <div className={styles.bgWrap}>
        <div
          ref={currentBgRef}
          className={styles.bg}
          style={{ backgroundImage: `url(${BG_IMAGES[active]})` }}
        />
        <div ref={nextBgRef} className={styles.bg} />
      </div>

      {/* TEXT */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 ref={headingRef} className={styles.heading}>
            <span className={styles.mask}>
              <span className={styles.line}>Authentic Flavors,</span>
            </span>
            <span className={styles.mask}>
              <span className={styles.line}>Packed with Love!</span>
            </span>
            <span className={styles.mask}>
              <span className={styles.line}></span>
            </span>
          </h1>

          <p ref={paragraphRef} className={styles.paragraph}>
            True hospitality at your service
          </p>
        </div>
      </div>
    </section>
  );
}
