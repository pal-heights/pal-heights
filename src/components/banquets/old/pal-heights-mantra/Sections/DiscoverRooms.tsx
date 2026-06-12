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
      src: "/banquets/pal-heights-mantra/ballroom-1.jpg",
    },
    { label: "Luxe Room", src: "/banquets/pal-heights-mantra/ballroom-2.jpg" },
    {
      label: "Premium Room",
      src: "/banquets/pal-heights-mantra/ballroom-3.jpg",
    },
    {
      label: "Master Room",
      src: "/banquets/pal-heights-mantra/ballroom-4.jpg",
    },
    {
      label: "Family Luxe",
      src: "/banquets/pal-heights-mantra/ballroom-5.jpg",
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
              Ballroom
            </h2>
            <span ref={lineRef} className={styles.line} />
          </div>

          <div className={styles.headerRight}>
            <p ref={descRef} className={styles.desc}>
              Mantra’s Ballroom is a grand and spacious venue, perfect for
              hosting lavish celebrations. With the capacity to comfortably
              accommodate 750 to 1,000 guests, it is ideal for a Big Fat Indian
              Wedding. Whether it’s a traditional ceremony or a glamorous
              reception, every event here is crafted to perfection. From the
              warm hospitality to the seamless event experience, Mantra’s
              Ballroom ensures that every moment is as spectacular as the
              occasion itself.
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
            <p className={styles.infoValue}>Large and spacious</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Capacity</span>
            <p className={styles.infoValue}> 600-1000 people</p>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Intake Capacity</span>
            <p className={styles.infoValue}> 750-1000 people</p>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>USPs</span>
            <p className={styles.infoValue}>
              Live kitchen, custom decor and an impressive multi-cuisine buffet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
