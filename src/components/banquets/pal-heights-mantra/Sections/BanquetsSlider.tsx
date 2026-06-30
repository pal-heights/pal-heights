"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BanquetsSlider.module.css";

gsap.registerPlugin(ScrollTrigger);

export type Slide = {
  title: string;
  description: string;
  image: string;
};

interface ExperiencesSliderProps {
  slides: Slide[];
  kicker: string;
  titleLine1: string;
  titleLine2: string;
  highlightedLine?: "line1" | "line2";
}

export default function BanquetsSlider({
  slides,
  kicker,
  titleLine1,
  titleLine2,
  highlightedLine = "line2",
}: ExperiencesSliderProps) {
  const [current, setCurrent] = useState(0);

  /* =========================
     Heading Refs
  ========================== */
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;

    if (!header || !kicker || !title || !leftLine || !rightLine) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      /* Kicker */
      tl.from(kicker, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      });

      /* Title masked lines */
      tl.from(
        title.querySelectorAll(`.${styles.lineInner}`),
        {
          y: 70,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.3",
      );

      /* Left decorative line */
      tl.from(
        leftLine,
        {
          x: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4",
      );

      /* Right decorative line */
      tl.from(
        rightLine,
        {
          x: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<",
      );
    }, header);

    return () => ctx.revert();
  }, []);

  const prev = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;

  return (
    <section className={styles.SectionWrapper}>
      <div ref={headerRef} className={styles.header}>
        <div className={styles.kickerWrapper}>
          <span ref={kickerRef} className={styles.kicker}>
            {kicker}
          </span>
        </div>

        <div className={styles.titleRow}>
          <span ref={leftLineRef} className={styles.line} />

          <h2 ref={titleRef} className={styles.title}>
            <span className={styles.lineMask}>
              <span
                className={`${styles.lineInner} ${
                  highlightedLine === "line1" ? styles.highlight : ""
                }`}
              >
                {titleLine1}
              </span>
            </span>

            <span className={styles.lineMask}>
              <span
                className={`${styles.lineInner} ${
                  highlightedLine === "line2" ? styles.highlight : ""
                }`}
              >
                {titleLine2}
              </span>
            </span>
          </h2>

          <span ref={rightLineRef} className={styles.line} />
        </div>
      </div>
      <div className={styles.section}>
        {/* LEFT NAV */}
        <button
          className={`${styles.nav} ${styles.left}`}
          onClick={() => setCurrent(prev)}
        >
          <div className={styles.border} />
          <div className={styles.navContent}>
            <ChevronLeft size={30} />
            <span>Previous</span>
          </div>
        </button>

        {/* CENTER CARD */}
        <div className={styles.center}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${styles.card} ${i === current ? styles.active : ""}`}
            >
              <div className={styles.imageWrap}>
                <img src={slide.image} alt={slide.title} />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.text}>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>

                <a href="/contact" className={styles.more}>
                  More <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT NAV */}
        <button
          className={`${styles.nav} ${styles.right}`}
          onClick={() => setCurrent(next)}
        >
          <div className={styles.border} />
          <div className={styles.navContent}>
            <span>next</span>
            <ChevronRight size={30} />
          </div>
        </button>
      </div>
    </section>
  );
}
