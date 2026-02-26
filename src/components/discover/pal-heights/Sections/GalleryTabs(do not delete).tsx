"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import styles from "./GalleryTabs.module.css";

const ROOM_SETS = [
  {
    images: [
      { label: "Couple Simple Room", src: "/discover/tab-1/left-tall.png" },
      { label: "Luxe Room", src: "/discover/tab-1/right-large.png" },
      { label: "Premium Room", src: "/discover/tab-1/small-1.png" },
      { label: "Master Room", src: "/discover/tab-1/small-2.png" },
      { label: "Family Luxe", src: "/discover/tab-1/small-3.png" },
    ],
  },
  {
    images: [
      { label: "Couple Simple Room", src: "/discover/tab-1/left-tall.png" },
      { label: "Luxe Room", src: "/discover/tab-1/right-large.png" },
      { label: "Premium Room", src: "/discover/tab-1/small-1.png" },
      { label: "Master Room", src: "/discover/tab-1/small-2.png" },
      { label: "Family Luxe", src: "/discover/tab-1/small-3.png" },
    ],
  },
];

const ICONS = [
  "Free Wi-Fi",
  "AC",
  "Swimming Pool",
  "GYM",
  "Parking",
  "Laundry",
  "Room Service",
];

export default function DiscoverRooms() {
  const [active, setActive] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const handleIconClick = (index: number) => {
    if (!galleryRef.current || animating.current) return;
    animating.current = true;

    const images = galleryRef.current.querySelectorAll("img");
    const labels = galleryRef.current.querySelectorAll(`.${styles.label}`);

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: () => {
        setActive(index % ROOM_SETS.length);

        requestAnimationFrame(() => {
          const newImages = galleryRef.current!.querySelectorAll("img");
          const newLabels = galleryRef.current!.querySelectorAll(
            `.${styles.label}`
          );

          gsap.fromTo(
            newImages,
            { opacity: 0, scale: 0.985, y: -6 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              stagger: 0.04,
              duration: 0.45,
              ease: "power3.out",
            }
          );

          gsap.fromTo(
            newLabels,
            { opacity: 0, y: 6 },
            {
              opacity: 1,
              y: 0,
              delay: 0.25,
              duration: 0.35,
              ease: "power2.out",
              onComplete: () => {
                animating.current = false;
              },
            }
          );
        });
      },
    });

    // OUT
    tl.to(images, {
      opacity: 0,
      scale: 1.015,
      y: 8,
      stagger: 0.03,
      duration: 0.25,
    });

    tl.to(
      labels,
      {
        opacity: 0,
        y: 6,
        duration: 0.2,
      },
      "<"
    );
  };

  const current = ROOM_SETS[active];

  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.kickerRow}>
              <span className={styles.kicker}>OUR CHOICE</span>
              <span className={styles.line} />
            </div>
            <h2 className={styles.heading}>Pal Grande</h2>
          </div>

          <div className={styles.headerRight}>
            <p className={styles.desc}>
              A heart-warming stay of comfort, space and convenience, with
              expanded living and sleeping areas awaits you at the superior
              Grande rooms. With attached terraces, settle into your evening
              moods with food & beverages at your disposal. Let the glowing
              lights of the surrounding city set your spirit soaring.
            </p>
            <a
              href="https://wa.me/9937144455"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.cta} data-cursor="hover">
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
        <div className={styles.iconBar}>
          {ICONS.map((item, i) => (
            <button
              key={i}
              className={styles.iconItem}
              onClick={() => handleIconClick(i)}
              type="button"
              data-cursor="hover"
            >
              <img src={`/discover/tab-1/${i + 1}.png`} alt={item} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
