"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading) return;

    const ctx = gsap.context(() => {
      const lines = heading.querySelectorAll(`.${styles.line}`);

      const tl = gsap.timeline();

      tl.from(lines, {
        y: 90,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.35,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.bgWrapper}>
        {/* <div className={`${styles.bg} ${styles.bgOne}`} /> */}
        <Image
          src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Banquets%20Pal%20Heights%20Mantra/banquet%20hero.jpg"
          alt="Pal heights Banquet Hero Image"
          fill
          priority
          quality={100}
          objectFit="cover"
          className={styles.bg}
        />
      </div>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <span className={styles.visualLine} />
            <h1 ref={headingRef} className={styles.heading}>
              {/* <div className={styles.mask}>
              <div className={styles.line}>A Sense of Space.</div>
            </div> */}
              <div className={styles.mask}>
                <div className={styles.line}>Pal Heights Banquets</div>
              </div>
            </h1>
          </div>

          {/* <p className={styles.paragraph}>
            Stays shaped by proportion, light, and an understanding of what
            truly matters to a traveller.
          </p> */}
        </div>
      </div>
    </section>
  );
}
