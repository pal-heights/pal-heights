"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Reviews.module.css";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    image: "/home/review-1.jpg",
    title: "Exceptional stay with beautiful ambience",
    text: "The experience was seamless from arrival to departure, with attentive staff, elegant interiors, and a calm atmosphere that made the stay genuinely memorable.(temp)",
    author: "Sarah Williams",
    role: "Marketing Director",
  },
  {
    id: 2,
    image: "/home/review-2.jpg",
    title: "A refined experience with warm hospitality",
    text: "Every detail felt thoughtfully planned, from the comfort of the rooms to the quality of service, creating a stay that felt both relaxing and premium.(temp)",
    author: "Michael Carter",
    role: "Operations Manager",
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    scale: 0.95,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    scale: 0.95,
    opacity: 0,
  }),
};

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // GSAP refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const slider = sliderRef.current;

    if (!container || !kicker || !title || !leftLine || !rightLine || !slider)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // kicker → translate only
      tl.from(kicker, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      });

      // title spans → translate only
      tl.from(
        title.querySelectorAll("span"),
        {
          y: 70,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0,
        },
        "-=0.3"
      );

      // left line → fade + translate
      tl.from(
        leftLine,
        {
          x: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // right line → fade + translate
      tl.from(
        rightLine,
        {
          x: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<"
      );

      // slider wrapper → fade + translate
      tl.from(
        slider,
        {
          y: 60,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "<"
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div ref={containerRef} className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <span className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              WHERE EVERY DETAIL CREATES A LASTING MEMORY
            </span>
          </span>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />

            {/* Updated structure */}
            <h2 ref={titleRef} className={styles.title}>
              <span>Voices</span> <br className={styles.br} />
              <span className={styles.span}>That Matter</span>
            </h2>

            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* Slider */}
        <div ref={sliderRef} className={styles.slider}>
          {/* Left */}
          <button
            className={`${styles.nav} ${styles.hideSm}`}
            onClick={prev}
            data-cursor="hover"
            aria-label="Previous"
          >
            <ChevronLeft className={styles.navIcon} size={26} />
          </button>

          <div className={styles.slideWrap}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={reviews[index].id}
                className={styles.card}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className={styles.cardContent}>
                  <Image
                    className={`${styles.image} ${styles.hideSm}`}
                    src={reviews[index].image}
                    alt={reviews[index].title}
                    width={300}
                    height={300}
                  />

                  <div className={styles.textContent}>
                    <h3>{reviews[index].title}</h3>
                    <p>&quot;{reviews[index].text}&quot;</p>

                    <div className={`${styles.author} ${styles.hideSm}`}>
                      <strong>{reviews[index].author}</strong>
                      <span>{reviews[index].role}</span>
                    </div>
                  </div>

                  <div className={styles.hideLg}>
                    <Image
                      className={styles.image}
                      src={reviews[index].image}
                      alt={reviews[index].title}
                      width={300}
                      height={300}
                    />
                    <div className={styles.author}>
                      <strong>{reviews[index].author}</strong>
                      <span>{reviews[index].role}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Mobile Nav */}
          <div className={styles.navMobile}>
            <button className={styles.nav} onClick={prev} aria-label="Previous">
              <ChevronLeft className={styles.navIcon} size={26} />
            </button>

            <button className={styles.nav} onClick={next} aria-label="Next">
              <ChevronRight className={styles.navIcon} size={26} />
            </button>
          </div>

          {/* Right */}
          <button
            className={`${styles.nav} ${styles.hideSm}`}
            onClick={next}
            data-cursor="hover"
            aria-label="Next"
          >
            <ChevronRight className={styles.navIcon} size={26} />
          </button>
        </div>
      </div>
    </section>
  );
}
