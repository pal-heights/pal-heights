"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImageCardReverse.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function ImageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // IMAGE — fade in
      tl.from(imageRef.current, {
        autoAlpha: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // CONTENT — fade right (reverse layout)
      tl.from(
        contentRef.current,
        {
          x: -60,
          autoAlpha: 0,
          duration: 0.75,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          {/* IMAGE */}
          <div ref={imageRef} className={styles.imageWrap}>
            <Image
              src="/dining/world-baker/box-2.jpg"
              alt=""
              data-lightbox
              fill
              priority
            />
          </div>

          {/* CONTENT */}
          <div ref={contentRef} className={styles.content}>
            <span className={styles.kicker}>WORLD BAKER</span>

            <h2 className={styles.title}>
              Tea Time Delights <br />
              for <span>Every Mood</span>
            </h2>

            <p className={styles.desc}>
              There’s nothing quite like the comfort of a warm cup of tea paired
              with a delightful baked treat to slow down the moment and make it
              special. At World Baker, we bring you an irresistible range of Tea
              Time Delights thoughtfully baked, lightly sweetened, and carefully
              crafted to enhance every sip.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
