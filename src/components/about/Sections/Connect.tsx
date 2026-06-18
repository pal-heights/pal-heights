"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Dribbble,
  MessageCircle,
  Twitch,
} from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Connect.module.css";

gsap.registerPlugin(ScrollTrigger);

const ICON_PROPS = {
  size: 0.75 * 18,
};

export default function Connect() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const iconsRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(kickerRef.current, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          headingRef.current,
          {
            y: 70,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          imageRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          "-=0.6",
        )
        .from(
          iconsRef.current?.children || [],
          {
            y: 24,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.25",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* LEFT CONTENT */}
        <div className={styles.content}>
          <div className={styles.kickerWrap}>
            <span ref={kickerRef} className={styles.kicker}>
              ORDINARY MADE EXTRAORDINARY
            </span>
          </div>

          <div className={styles.headingRow}>
            <div className={styles.headingWrap}>
              <h2 ref={headingRef} className={styles.heading}>
                Connect with us
              </h2>
            </div>
            <span ref={lineRef} className={styles.line} />
          </div>

          <div ref={iconsRef} className={styles.icons}>
            <a
              className={styles.icon}
              href="https://www.facebook.com/PalHeights/"
              aria-label="Pal Heights Facebook"
              data-cursor="hover"
            >
              <Facebook {...ICON_PROPS} />
            </a>
            <a
              className={styles.icon}
              href="https://www.instagram.com/palheightshotel/"
              aria-label="Pal Heights Instagram"
              data-cursor="hover"
            >
              <Instagram {...ICON_PROPS} />
            </a>
            <a
              className={styles.icon}
              href="https://x.com/hotelpalheights"
              aria-label="Pal Heights X"
              data-cursor="hover"
            >
              <FaXTwitter {...ICON_PROPS} />
            </a>
            <span>|</span>
            <a
              className={styles.icon}
              href="https://www.facebook.com/palheightsmantra/"
              aria-label="Pal Heights Mantra Facebook"
              data-cursor="hover"
            >
              <Facebook {...ICON_PROPS} />
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div ref={imageRef} className={styles.imageWrapper}>
          <Image
            src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Connect/image-1.webp"
            data-lightbox
            alt="Pal Heights Interior"
            fill
            priority
            className={styles.image}
          />
        </div>
      </div>
    </section>
  );
}
