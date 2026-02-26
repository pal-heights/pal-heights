"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DiscoverRooms.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROOM_SETS = [
  {
    images: [
      {
        label: "Couple Simple Room",
        src: "/discover/pal-heights/pal-suites-1.jpg",
      },
      { label: "Luxe Room", src: "/discover/pal-heights/pal-suites-2.jpg" },
      { label: "Premium Room", src: "/discover/pal-heights/pal-suites-3.jpg" },
      { label: "Master Room", src: "/discover/pal-heights/pal-suites-4.jpeg" },
      { label: "Family Luxe", src: "/discover/pal-heights/pal-suites-5.jpeg" },
    ],
  },
];

const ICONS = [
  { label: "Spa", icon: "spa.png" },
  { label: "Mini Bar", icon: "minibar.png" },
  { label: "Free Wi-Fi", icon: "wifi.png" },
  { label: "Hair dryer", icon: "hair-dryer.png" },
  { label: "Bottled water", icon: "water-bottle.png" },
  { label: "Electronic safe", icon: "e-safe.png" },
  { label: "Complementary Bed Tea", icon: "tea.png" },
  { label: "In room tea/coffee maker", icon: "coffe.png" },
  { label: "Evening Mood changing Drink", icon: "drinks.png" },
  { label: "Iron and ironing board (On request)", icon: "iron-board.png" },
  { label: "Smart TV (42 inches) + 24 OTT channels", icon: "tv.png" },
];

export default function DiscoverRooms() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const iconBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      /* TEXT */
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
          descRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          ctaRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.25",
        )

        /* IMAGE WRAPPERS (NOT IMAGES) */
        .from(
          galleryRef.current?.querySelectorAll(
            `.${styles.leftTall}, .${styles.rightLarge}`,
          ) || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.3",
        )
        .from(
          galleryRef.current?.querySelectorAll(`.${styles.smallImage}`) || [],
          {
            y: 32,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4",
        )

        /* ICON BAR */
        .from(
          iconBarRef.current?.children || [],
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
            stagger: 0.05,
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const current = ROOM_SETS[0];

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
            <div className={styles.kickerRow}>
              <span ref={kickerRef} className={styles.kicker}>
                PREMIUM ACCOMMODATION
              </span>
              <span ref={lineRef} className={styles.line} />
            </div>
            <h2 ref={headingRef} className={styles.heading}>
              PAL Suites
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p ref={descRef} className={styles.desc}>
              Unwind in the grandeur of our flagship Suites. A perfect escape
              after a busy day with a lavish bedroom, a living room and a
              Jacuzzi to create a perfect blend of comfort and luxury for you.
              Draw the curtains and take in the sensational view of the
              sprawling Bhubaneswar city or the invigorating glow of the city
              lights.
            </p>
            <a
              href="https://wa.me/9937144455"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button ref={ctaRef} className={styles.cta} data-cursor="hover">
                Book Now
              </button>
            </a>
          </div>
        </div>

        {/* IMAGE LAYOUT */}
        <div ref={galleryRef} className={styles.gallery}>
          <div className={styles.topRow}>
            <div className={styles.leftTall}>
              <div className={styles.overlay}></div>
              <img
                src={current.images[0].src}
                alt={current.images[0].label}
                data-lightbox
              />
              {/* <span className={styles.label}>{current.images[0].label}</span> */}
            </div>

            <div className={styles.rightLarge}>
              <div className={styles.overlay}></div>
              <img
                src={current.images[1].src}
                alt={current.images[0].label}
                data-lightbox
              />
              {/* <span className={styles.label}>{current.images[1].label}</span> */}
            </div>
          </div>

          <div className={styles.bottomRow}>
            {current.images.slice(2).map((img, i) => (
              <div key={i} className={styles.smallImage}>
                <div className={styles.overlay}></div>
                <img src={img.src} alt={img.label} data-lightbox />
                {/* <span className={styles.label}>{img.label}</span> */}
              </div>
            ))}
          </div>
        </div>

        {/* ICON BAR */}
        <div ref={iconBarRef} className={styles.iconBar}>
          {ICONS.map((item, i) => (
            <button key={i} className={styles.iconItem} type="button">
              <img
                src={`/discover/icons/${item.icon}`}
                alt={item.label}
                loading="lazy"
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
