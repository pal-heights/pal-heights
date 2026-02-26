"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImageCardsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ImageCard() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
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

      // KICKER
      tl.from(kickerRef.current, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      })

        // HEADING SPANS
        .from(
          titleRef.current?.querySelectorAll("span") || [],
          {
            y: 80,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0,
          },
          "-=0.3"
        )

        // LINES
        .from(
          leftLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          rightLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "<"
        )

        // CARDS
        .from(
          gridRef.current?.children || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.25"
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
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.kickerWrap}>
            <span ref={kickerRef} className={styles.kicker}>
              WORLD BAKER
            </span>
          </span>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <h2 ref={titleRef} className={styles.sectionTitle}>
              <span>Every Bite is a</span>
              <span className={styles.span}> Celebration</span>
            </h2>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* PAIRS */}
        <div ref={gridRef} className={styles.grid}>
          {/* CARD 1 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/dining/world-baker/section-1.jpg"
                alt=""
                fill
                data-lightbox
              />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Pal Heights Mantra, <span> Pahala</span>
              </h3>

              <p className={styles.desc}>
                <strong>Location –</strong> Pal Heights Mantra, Pahala
              </p>
              <p className={styles.desc}>
                <strong>About –</strong> Our newest outlet at Pal Heights
                Mantra, Pahala, is a testament to our commitment to bringing
                world-class baking closer to you.
                <br />
                Situated on the bustling Bhubaneswar-Cuttack highway, this store
                is a convenient stop for travelers, food lovers, and dessert
                enthusiasts alike. Whether you’re passing by for a quick coffee
                and a pastry, looking for the perfect birthday cake, or
                indulging in our signature cheesecakes, this outlet has
                something special for everyone. The spacious and modern setting
                makes it an ideal place to relax, unwind, and savor the finest
                baked goods.
              </p>
            </div>
          </div>

          {/* CARD 2 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/dining/world-baker/section-2.jpg"
                data-lightbox
                alt=""
                fill
              />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Pal Heights Mall <span>Bhubaneswar</span>
              </h3>

              <p className={styles.desc}>
                <strong>Location –</strong> 2nd Floor, Pal Heights Mall, J/7,
                Jayadev Vihar, Bhubaneswar
              </p>
              <p className={styles.desc}>
                <strong>About –</strong> Located in the heart of Bhubaneswar,
                our Pal Heights Mall outlet is where our journey began.
                <br />
                This flagship store has been delighting dessert lovers with its
                exquisite range of cakes, pastries, and artisanal baked goods.
                With a cozy ambiance and a display filled with mouthwatering
                treats, it’s the perfect spot for a quick indulgence or a
                leisurely coffee break. Whether you’re looking for a custom cake
                for a celebration, freshly baked bread for your home, or a
                little something sweet to brighten your day, this outlet has it
                all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
