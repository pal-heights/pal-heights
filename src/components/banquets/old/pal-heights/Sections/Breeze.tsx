"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DiscoverRoomsDark.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROOM_SET = {
  images: [
    { label: "Couple Simple Room", src: "/banquets/breeze-1.jpeg" },
    { label: "Luxe Room", src: "/banquets/breeze-2.jpeg" },
    { label: "Premium Room", src: "/banquets/breeze-3.jpg" },
    { label: "Master Room", src: "/banquets/breeze-4.png" },
    { label: "Family Luxe", src: "/banquets/breeze-5.jpg" },
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

        // IMAGES – LARGE
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
      data-cursor-theme="light"
    >
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 ref={headingRef} className={styles.heading}>
              Breeze
            </h2>
            <span ref={lineRef} className={styles.line} />
          </div>

          <div className={styles.headerRight}>
            <p ref={descRef} className={styles.desc}>
              If you’re looking to add a touch of elegance and charm to your
              corporate event, Breeze is the venue to choose. The open terrace
              provides a breathtaking panoramic view of Bhubaneswar, making it a
              unique location for evening corporate events, team-building
              activities, and networking sessions. With a seating arrangement
              for 250 guests, this venue is ideal for smaller corporate
              functions with an unforgettable view.
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
                {/* <span className={styles.label}>{img.label}</span> */}
              </div>
            ))}
          </div>
        </div>

        {/* INFO BAR */}
        <div ref={infoBarRef} className={styles.infoBar}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Ideal For</span>
            <p className={styles.infoValue}>
              Corporate parties, networking events, team-building
            </p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Capacity</span>
            <p className={styles.infoValue}> 250-400 people</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>USPs</span>
            <p className={styles.infoValue}>
              Stunning city views, outdoor seating, live tandoor, and bar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
