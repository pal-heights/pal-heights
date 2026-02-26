"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DiscoverRooms.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROOM_SET = {
  images: [
    { label: "Couple Simple Room", src: "/banquets/harmony-3.jpg" },
    { label: "Luxe Room", src: "/banquets/harmony-4.jpg" },
    { label: "Premium Room", src: "/banquets/harmony-1.jpg" },
    { label: "Master Room", src: "/banquets/harmony-2.jpg" },
    { label: "Family Luxe", src: "/banquets/harmony-3.jpg" },
  ],
};

export default function DiscoverRooms() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const infoBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // HEADER
      tl.from(headingRef.current, {
        y: 70,
        duration: 0.7,
        ease: "power3.out",
      })
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 26,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35"
        )

        // IMAGES – LARGE FIRST
        .from(
          galleryRef.current?.querySelectorAll(
            `.${styles.leftTall}, .${styles.rightLarge}`
          ) || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.3"
        )

        // IMAGES – SMALL
        .from(
          galleryRef.current?.querySelectorAll(`.${styles.smallImage}`) || [],
          {
            y: 32,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4"
        )

        // INFO BAR
        .from(
          infoBarRef.current?.children || [],
          {
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.08,
          },
          "-=0.3"
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
          <div className={styles.headerLeft}>
            <h2 ref={headingRef} className={styles.heading}>
              Celebration
            </h2>
            <span ref={lineRef} className={styles.line} />
          </div>

          <div className={styles.headerRight}>
            <p ref={descRef} className={styles.desc}>
              For those seeking an intimate yet elegant wedding, Celebration is
              the ideal choice. The beautifully designed banquet hall provides a
              warm and inviting ambiance, creating a romantic backdrop for your
              wedding festivities. Celebration offers top-notch services,
              including a team of experienced event planners who ensure that
              every detail from floral arrangements to seating plans is
              meticulously handled. The in-house catering service presents a
              delectable menu featuring a range of cuisines, crafted to delight
              your guests and enhance your celebration.
            </p>
          </div>
        </div>

        {/* IMAGE LAYOUT */}
        <div ref={galleryRef} className={styles.gallery}>
          <div className={styles.topRow}>
            <div className={styles.leftTall}>
              <div className={styles.overlay}></div>
              <img src={ROOM_SET.images[0].src} alt="" data-lightbox />
              {/* <span className={styles.label}>{ROOM_SET.images[0].label}</span> */}
            </div>

            <div className={styles.rightLarge}>
              <div className={styles.overlay}></div>
              <img src={ROOM_SET.images[1].src} alt="" data-lightbox />
              {/* <span className={styles.label}>{ROOM_SET.images[1].label}</span> */}
            </div>
          </div>

          <div className={styles.bottomRow}>
            {ROOM_SET.images.slice(2).map((img, i) => (
              <div key={i} className={styles.smallImage}>
                <div className={styles.overlay}></div>
                <img src={img.src} alt="" data-lightbox />
                {/* <span className={styles.label}>{img.label}</spans> */}
              </div>
            ))}
          </div>
        </div>

        {/* INFO BAR */}
        <div ref={infoBarRef} className={styles.infoBar}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Ideal For</span>
            <p className={styles.infoValue}>
              Intimate weddings and smaller gatherings
            </p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Capacity</span>
            <p className={styles.infoValue}>350-550 people</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>USPs</span>
            <p className={styles.infoValue}>
              Cozy atmosphere, beautiful decor, seamless service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
