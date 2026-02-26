"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ImageCard.module.css";

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

      // CONTENT — fade left
      tl.from(
        contentRef.current,
        {
          x: 60,
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
              src="/dining/world-baker/box-1.jpg"
              alt=""
              fill
              priority
              data-lightbox
            />
          </div>

          {/* CONTENT */}
          <div ref={contentRef} className={styles.content}>
            <span className={styles.kicker}>WORLD BAKER</span>

            <h2 className={styles.title}>
              A box full <br />
              of <span>Happiness</span>
            </h2>

            <p className={styles.desc}>
              Looking for the perfect gift that’s thoughtful, delicious, and
              beautifully crafted? At World Baker, we curate customized gifts
              and gourmet hampers designed to delight, surprise, and leave a
              lasting impression.
            </p>

            <p className={styles.desc}>
              From birthdays and anniversaries to weddings, corporate events,
              and festive celebrations, each hamper is carefully put together to
              indulge the senses and make every occasion truly special.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
