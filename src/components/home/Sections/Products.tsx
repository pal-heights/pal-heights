"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Products.module.css";
import { ChevronsRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ImageCard() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const grid = gridRef.current;

    if (!header || !kicker || !title || !leftLine || !rightLine || !grid)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Kicker
      tl.from(kicker, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      // Title lines stagger
      tl.from(
        title.querySelectorAll(`.${styles.lineInner}`),
        {
          y: 60,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.3",
      );

      // Lines fade/slide
      tl.from(
        [leftLine, rightLine],
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.5",
      );

      // Product cards stagger upwards
      tl.from(
        grid.children,
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.4",
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div className={styles.container}>
        {/* HEADER */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              EXPLORE MORE
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <h2 ref={titleRef} className={styles.sectionTitle}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner}>Pal Heights</span>
              </span>
              <span className={styles.lineMask}>
                <span className={`${styles.lineInner} ${styles.span}`}>
                  Restaurant
                </span>
              </span>
            </h2>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* PAIRS */}
        <div ref={gridRef} className={styles.grid}>
          {/* PAIR 1 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image src="/home/blog-1.jpg" alt="" fill data-lightbox />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Signature <span>Stays</span>
              </h3>

              <a href="#" data-cursor="hover">
                Explore More <ChevronsRight size={12} />
              </a>
            </div>
          </div>

          {/* PAIR 2 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image src="/home/blog-2.jpg" alt="" fill data-lightbox />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Timeless <span>Residences</span>
              </h3>

              <a
                href="https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0"
                data-cursor="hover"
              >
                Explore More <ChevronsRight size={12} />
              </a>
            </div>
          </div>

          {/* PAIR 3 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image src="/home/blog-3.jpg" alt="" fill data-lightbox />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Crafted <span>Escapes</span>
              </h3>

              <a
                href="https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0"
                data-cursor="hover"
              >
                Explore More <ChevronsRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
