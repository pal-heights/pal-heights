"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import styles from "./Properties.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function TwoProperties() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const propOneRef = useRef<HTMLDivElement | null>(null);
  const propTwoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const propOne = propOneRef.current;
    const propTwo = propTwoRef.current;

    if (
      !header ||
      !kicker ||
      !title ||
      !leftLine ||
      !rightLine ||
      !propOne ||
      !propTwo
    )
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Kicker – translate up
      tl.from(kicker, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      });

      // Title lines – translate up with stagger
      tl.from(
        title.querySelectorAll(`.${styles.lineInner}`),
        {
          y: 70,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.3"
      );

      // Left line → fade in from right
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

      // Right line → fade in from left
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

      tl.from(
        propOne,
        {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<"
      );
      tl.from(
        propTwo,
        {
          y: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<"
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div className={styles.container}>
        {/* Heading */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              ORDINARY MADE EXTRAORDINARY
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />

            <h2 ref={titleRef} className={styles.title}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner}>Two Addresses.</span>
              </span>

              <span className={styles.lineMask}>
                <span className={`${styles.lineInner} ${styles.highlight}`}>
                  One Way of Welcoming.
                </span>
              </span>
            </h2>

            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* Cards (unchanged) */}
        <div className={styles.grid}>
          {/* cardOne */}
          <div
            ref={propOneRef}
            data-cursor-theme="light"
            className={`${styles.card} ${styles.cardOne}`}
          >
            <div className={styles.overlay}>
              <div className={styles.cardContent}>
                <div className={styles.textWrap}>
                  <h3>Pal Heights</h3>
                  <p>BHUBANESWAR</p>
                </div>

                <div className={styles.actions}>
                  <a
                    href="https://www.google.com/maps?q=J-7,+Jayadev+Vihar+Rd,+Bhubaneswar,+Odisha+751013"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.locationIcon}`}
                    aria-label="View location on Google Maps"
                    data-cursor="hover"
                  >
                    <MapPin className={styles.icon} />
                  </a>

                  <a href="/discover/pal-heights" data-cursor="hover">
                    Explore More
                  </a>
                  <a
                    href="https://www.swiftbook.io/inst/#home?propertyId=403MjY0mz4AXGyU2TvxXWbbcUP1Njk=&JDRN=Y"
                    data-cursor="hover"
                    className={styles.primary}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* cardTwo */}
          <div
            ref={propTwoRef}
            data-cursor-theme="light"
            className={`${styles.card} ${styles.cardTwo}`}
          >
            <div className={styles.overlay}>
              <div className={styles.cardContent}>
                <div className={styles.textWrap}>
                  <h3>Pal Heights Mantra</h3>
                  <p>BHUBANESWAR | CUTTACK</p>
                </div>

                <div className={styles.actions}>
                  <a
                    href="https://www.google.com/maps?q=Plot+No-26,+Pahal,+Bhubaneswar,+Odisha+752010"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.locationIcon}`}
                    aria-label="View location on Google Maps"
                    data-cursor="hover"
                  >
                    <MapPin className={styles.icon} />
                  </a>
                  <a href="/discover/pal-heights-mantra" data-cursor="hover">
                    Explore More
                  </a>
                  <a
                    href="https://www.swiftbook.io/inst/#home?propertyId=381M8aX5CCCT9l9RgYkswL8jY1Njg=&JDRN=Y"
                    data-cursor="hover"
                    className={styles.primary}
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
