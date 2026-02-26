"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experiences.module.css";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  {
    id: 1,
    label: "Deluxe",
    title: "Where Days Unfold Naturally",
    rating: 4,
    src: "/default.mp4",
    thumb: "/home/video-1.jpg",
  },
  {
    id: 2,
    label: "Deluxe",
    title: "Mornings that arrive without urgency.",
    rating: 4,
    src: "/default.mp4",
    thumb: "/home/video-2.jpg",
  },
  {
    id: 3,
    label: "Premium",
    title: "Evenings that invite you to linger a little longer.",
    rating: 5,
    src: "/default.mp4",
    thumb: "/home/video-3.jpg",
  },
];

export default function Experiences() {
  const [active, setActive] = useState(0);
  const current = videos[active];

  // Scroll refs
  const mainRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const mainVideoRef = useRef<HTMLDivElement | null>(null);

  // Overlay refs
  const overlayTitleRef = useRef<HTMLHeadingElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  /* ----------------------------------------
     SCROLL ENTRANCE (FIXED + SAFE)
  ---------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(kickerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          titleRef.current?.querySelectorAll("span, br") || [],
          {
            y: 70,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .from(
          leftLineRef.current,
          {
            x: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          rightLineRef.current,
          {
            x: -40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          },
          "<"
        )
        .from(
          mainVideoRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          "<"
        )
        .from(
          `.${styles.tab}`,
          {
            y: 40,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.1,
            clearProps: "opacity,transform",
          },
          "<"
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  /* ----------------------------------------
     MAIN VIDEO OVERLAY (TAB CLICK)
  ---------------------------------------- */
  useEffect(() => {
    if (!overlayTitleRef.current || !buttonRef.current) return;

    gsap.fromTo(
      [overlayTitleRef.current, buttonRef.current],
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.12,
      }
    );
  }, [active]);

  return (
    <section ref={mainRef} className={styles.section} data-cursor-theme="dark">
      <div className={styles.container}>
        {/* Header */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              WHERE EVERY DETAIL CREATES A LASTING MEMORY
            </span>
          </div>

          {/* ✅ ORIGINAL TITLE ROW RESTORED */}
          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <h2 ref={titleRef} className={styles.title}>
              <span>Real Experiences</span> <br className={styles.br} />
              <span className={styles.span}>Real Reviews</span>
            </h2>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* Layout */}
        <div className={styles.layout}>
          {/* Main Video */}
          <div ref={mainVideoRef} className={styles.mainVideo}>
            <video
              key={current.id}
              src={current.src}
              muted
              autoPlay
              loop
              playsInline
            />

            {/* Overlay */}
            <div className={styles.mainOverlay} data-cursor-theme="light">
              <h3 ref={overlayTitleRef}>{current.title}</h3>

              <button
                ref={buttonRef}
                className={styles.exploreBtn}
                data-cursor="hover"
              >
                Explore All Videos
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {videos.map((item, index) => (
              <button
                key={item.id}
                className={`${styles.tab} ${
                  index === active ? styles.active : ""
                }`}
                onClick={() => setActive(index)}
              >
                <div className={styles.tabImage} data-cursor="hover">
                  <Image src={item.thumb} alt={item.label} fill />

                  <div className={styles.playWrap}>
                    <Image
                      src="/home/play.png"
                      alt="Play"
                      width={32}
                      height={32}
                      className={styles.playButton}
                    />
                  </div>

                  <div className={styles.tabOverlay}>
                    <span className={styles.tabLabel}>{item.label}</span>
                    <div className={styles.stars}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Image
                          key={i}
                          src={
                            i < item.rating
                              ? "/home/filledStar.png"
                              : "/home/hollowStar.png"
                          }
                          alt="Star"
                          width={16}
                          height={16}
                          className={styles.star}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
