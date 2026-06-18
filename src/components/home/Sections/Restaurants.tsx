"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Restaurants.module.css";
import { ChevronsRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const RESTAURANTS_DATA = [
  {
    id: 1,
    name: "Zaika",
    images: [
      "/home/zaika.jpg",
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-11.jpg",
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-19.jpg",
    ],
    description:
      "A celebration of rich Indian flavours and timeless recipes, Zaika brings together aromatic spices, traditional techniques and contemporary presentation. Every dish is crafted to offer a comforting yet refined dining experience.",
    link: "#",
  },
  {
    id: 2,
    name: "Breeze",
    images: [
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-12.jpg",
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-13.jpg",
    ],
    description:
      "Set against an open and refreshing ambience, Breeze is where relaxed evenings meet vibrant flavours. From leisurely lunches to sunset gatherings, it offers the perfect setting to unwind and savour delightful culinary creations.",
    link: "https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0",
  },
  {
    id: 3,
    name: "Cabana",
    images: [
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-14.jpg",
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-15.jpg",
    ],
    description:
      "An inviting escape designed for laid-back indulgence, Cabana pairs a stylish setting with flavourful bites and refreshing beverages. It is the ideal spot for casual conversations, relaxed moments and memorable evenings.",
    link: "https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0",
  },
  {
    id: 4,
    name: "Pind Da Dhaba",
    images: [
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-16.jpg",
    ],
    description:
      "Rooted in the rustic charm of North Indian highways, Pind Da Dhaba celebrates hearty Punjabi flavours and authentic cooking traditions. Warm, bold and soulful, it brings the spirit of a lively dhaba to your dining experience.",
    link: "https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0",
  },
];

const RotatingImage = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Single image case: Render directly without motion wrappers to avoid blur
  if (images.length <= 1) {
    return (
      <Image
        src={images[0]}
        alt={name}
        fill
        data-lightbox
        priority
        style={{ objectFit: "cover" }}
      />
    );
  }

  return (
    <div className={styles.rotatingImageContainer}>
      <AnimatePresence initial={false}>
        <motion.div
          key={images[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={styles.rotatingImageWrapper}
          style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <Image
            src={images[index]}
            alt={name}
            fill
            data-lightbox
            style={{ objectFit: "cover" }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function RestaurantsSlider() {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sliderWrapperRef = useRef<HTMLDivElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = RESTAURANTS_DATA.length;

  useEffect(() => {
    const updateImageHeight = () => {
      if (gridRef.current && sliderWrapperRef.current) {
        const firstCard = gridRef.current.children[0] as HTMLElement;
        const imageWrap = firstCard?.querySelector(
          `[class*="imageWrap"]`,
        ) as HTMLElement;
        if (imageWrap) {
          sliderWrapperRef.current.style.setProperty(
            "--image-height",
            `${imageWrap.offsetHeight}px`,
          );
        }
      }
    };

    // Initial measure
    updateImageHeight();

    // Remeasure on resize
    window.addEventListener("resize", updateImageHeight);

    // Also measure after a short delay to ensure images are rendered
    const timer = setTimeout(updateImageHeight, 500);

    return () => {
      window.removeEventListener("resize", updateImageHeight);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;
    const grid = gridRef.current;

    if (!header || !kicker || !title || !leftLine || !rightLine || !grid)
      return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // Kicker
      tl.from(kicker, {
        y: 30,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });

      // Title lines stagger
      tl.from(
        title.querySelectorAll(`.${styles.lineInner}`),
        {
          y: 60,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
        },
        "-=0.3",
      );

      // Lines fade/slide
      tl.from(
        [leftLine, rightLine],
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.5",
      );

      // Product cards stagger upwards
      tl.from(
        grid.children,
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.4",
      );
    }, header);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    // Determine visible slides based on window width
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const visibleSlides = isMobile ? 1 : 2;
    const maxIndex = totalSlides - visibleSlides;

    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    const visibleSlides = isMobile ? 1 : 2;
    const maxIndex = totalSlides - visibleSlides;

    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div className={styles.container}>
        {/* HEADER */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              Pal Heights
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <h2 ref={titleRef} className={styles.sectionTitle}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner}>Our Signature</span>
              </span>
              <span className={styles.lineMask}>
                <span className={`${styles.lineInner} ${styles.span}`}>
                  Restaurants
                </span>
              </span>
            </h2>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* SLIDER WRAPPER */}
        <div ref={sliderWrapperRef} className={styles.sliderWrapper}>
          {/* Navigation Buttons */}
          <button
            className={`${styles.navButton} ${styles.prev}`}
            onClick={handlePrev}
            aria-label="Previous slide"
            data-cursor="hover"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            className={`${styles.navButton} ${styles.next}`}
            onClick={handleNext}
            aria-label="Next slide"
            data-cursor="hover"
          >
            <ChevronRight size={18} />
          </button>

          {/* SLIDER VIEWPORT */}
          <div className={styles.sliderViewport}>
            <div
              ref={gridRef}
              className={styles.sliderTrack}
              style={{
                transform: `translateX(calc(-${currentIndex} * (var(--slide-width) + var(--slide-gap))))`,
              }}
            >
              {RESTAURANTS_DATA.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.imageWrap}>
                    <RotatingImage images={item.images} name={item.name} />
                  </div>

                  <div className={styles.content}>
                    <h3 className={styles.title}>{item.name}</h3>

                    <p className={styles.description}>{item.description}</p>

                    <a href={item.link} data-cursor="hover">
                      Explore More <ChevronsRight size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
