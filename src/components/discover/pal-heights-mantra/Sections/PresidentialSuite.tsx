"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DiscoverRoomsDark.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROOM_SETS = [
  {
    images: [
      {
        label: "Couple Simple Room",
        src: "/discover/pal-heights-mantra/presedential-suite-1.jpg",
      },
      {
        label: "Luxe Room",
        src: "/discover/pal-heights-mantra/presedential-suite-2.jpg",
      },
      {
        label: "Premium Room",
        src: "/discover/pal-heights-mantra/presedential-suite-3.jpg",
      },
      {
        label: "Master Room",
        src: "/discover/pal-heights-mantra/presedential-suite-4.jpg",
      },
      {
        label: "Family Luxe",
        src: "/discover/pal-heights-mantra/presedential-suite-5.jpg",
      },
    ],
  },
];

const ICONS = [
  { label: "Mini Bar", icon: "minibar.png" },
  { label: "Hair dryer", icon: "hair-dryer.png" },
  { label: "Free Wi-Fi", icon: "wifi.png" },
  { label: "Bottled water", icon: "water-bottle.png" },
  { label: "Fitness Center", icon: "fitness.png" },
  { label: "Electronic safe", icon: "e-safe.png" },
  { label: "In room tea/coffee maker", icon: "coffe.png" },
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

      /* TEXT (same language as before) */
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

        /* GALLERY WRAPPERS (NOT IMAGES) */
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
      data-cursor-theme="light"
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
              Presidential Suite
            </h2>
          </div>

          <div className={styles.headerRight}>
            <p ref={descRef} className={styles.desc}>
              The flagship Presidential Suite spread over 674 sq ft, boasts of
              unparalleled luxury and comfort. This suite gives our guests a
              beautiful and memorable view. The luxurious bath area equipped
              with a gorgeous bath tub is perfect to wash away all your stress.
              Guests can relish on refreshing beverages and good night
              chocolates which are included in your package in the courtesy
              tray.
            </p>
            <a
              href="https://wa.me/8342000661"
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
              <img src={current.images[0].src} alt="" data-lightbox />
              {/* <span className={styles.label}>{current.images[0].label}</span> */}
            </div>

            <div className={styles.rightLarge}>
              <div className={styles.overlay}></div>
              <img src={current.images[1].src} alt="" data-lightbox />
              {/* <span className={styles.label}>{current.images[1].label}</span> */}
            </div>
          </div>

          <div className={styles.bottomRow}>
            {current.images.slice(2).map((img, i) => (
              <div key={i} className={styles.smallImage}>
                <div className={styles.overlay}></div>
                <img src={img.src} alt="" data-lightbox />
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
