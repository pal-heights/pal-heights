"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Hero.module.css";

const BG_IMAGES = ["/home/hero.jpg", "/placeholder.jpg", "/placeholder.jpg"];

export default function Hero() {
  const currentBgRef = useRef<HTMLDivElement | null>(null);
  const nextBgRef = useRef<HTMLDivElement | null>(null);

  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  const [active, setActive] = useState(0);
  const animating = useRef(false);

  /* -----------------------------
     TEXT – RUN ONCE
  ----------------------------- */
  useEffect(() => {
    gsap.fromTo(
      headingRef.current?.querySelectorAll(`.${styles.line}`) || [],
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.in",
      },
    );

    gsap.fromTo(
      paragraphRef.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.in",
      },
    );
  }, []);

  /* -----------------------------
     SLIDE CHANGE (SAME DIRECTION)
  ----------------------------- */
  const slideTo = (nextIndex: number) => {
    if (animating.current) return;
    animating.current = true;

    const current = currentBgRef.current!;
    const next = nextBgRef.current!;

    next.style.backgroundImage = `url(${BG_IMAGES[nextIndex]})`;

    // prepare next layer (always comes from right)
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

          // reset layers
          gsap.set(current, { clipPath: "inset(0 0% 0 0)" });
          gsap.set(next, { clipPath: "inset(0 100% 0 0)" });

          animating.current = false;
        },
      })
      .to(
        next,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2,
          ease: "power3.out",
        },
        0,
      )
      .to(
        current,
        {
          clipPath: "inset(0 0 0 100%)",
          duration: 2,
          ease: "power3.out",
        },
        0,
      );
  };

  /* -----------------------------
     CONTROLS
  ----------------------------- */
  const handleNext = () => {
    slideTo((active + 1) % BG_IMAGES.length);
  };

  const handlePrev = () => {
    slideTo((active - 1 + BG_IMAGES.length) % BG_IMAGES.length);
  };

  return (
    <section className={styles.hero}>
      {/* BACKGROUND */}
      <div className={styles.bgWrap}>
        <div
          ref={currentBgRef}
          className={styles.bg}
          style={{ backgroundImage: `url(${BG_IMAGES[active]})` }}
        />
        <div ref={nextBgRef} className={styles.bg} />
      </div>

      {/* CONTROLS */}
      <div className={styles.controls}>
        <button onClick={handlePrev} aria-label="Previous">
          <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} aria-label="Next">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* TEXT – NEVER TOUCHED */}
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 ref={headingRef} className={styles.heading}>
            <span className={styles.mask}>
              <span className={styles.line}>World Baker</span>
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
