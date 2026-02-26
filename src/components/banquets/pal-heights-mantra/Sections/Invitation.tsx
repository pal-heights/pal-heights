"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./DiscoverRooms.module.css";

gsap.registerPlugin(ScrollTrigger);

const ROOM_SET = {
  images: [
    {
      label: "Couple Simple Room",
      src: "/banquets/pal-heights-mantra/invitation-1.jpeg",
    },
    {
      label: "Luxe Room",
      src: "/banquets/pal-heights-mantra/invitation-2.jpeg",
    },
    {
      label: "Premium Room",
      src: "/banquets/pal-heights-mantra/invitation-3.png",
    },
    {
      label: "Master Room",
      src: "/banquets/pal-heights-mantra/invitation-4.jpeg",
    },
    {
      label: "Family Luxe",
      src: "/banquets/pal-heights-mantra/invitation-1.jpeg",
    },
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
              Invitation
            </h2>
            <span ref={lineRef} className={styles.line} />
          </div>

          <div className={styles.headerRight}>
            <p ref={descRef} className={styles.desc}>
              Designed for warm and intimate gatherings, Feelings is a banquet
              that exudes charm and elegance. With a capacity to host up to 250
              guests, it is the perfect choice for small weddings, engagement
              ceremonies, birthdays, and family celebrations. The beautifully
              designed space creates a welcoming ambiance, ensuring that every
              moment feels special. Whether you’re planning a cozy get-together
              or a formal event, Feelings offers a seamless blend of comfort and
              sophistication, making your occasion truly memorable.
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
            <p className={styles.infoValue}>Ideal for Intimate Gatherings</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Capacity</span>
            <p className={styles.infoValue}> 250 people</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>USPs</span>
            <p className={styles.infoValue}>
              Elegant & Customizable Interior, Warm & Welcoming Ambiance ,
              Seamless Service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
