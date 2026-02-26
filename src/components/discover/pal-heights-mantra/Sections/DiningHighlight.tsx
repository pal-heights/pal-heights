"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./DiningHighlight.module.css";

gsap.registerPlugin(ScrollTrigger);

const DATA = [
  {
    tab: "Pind Da Dhaba",
    heroTitle: "Dine In The Best Way",
    title: "Pind Da Dhaba",
    image: "/discover/pal-heights/zaika.jpg",
    desc: "Experience the essence of an authentic Punjabi dhaba at Pind Da Dhaba - the best and most genuine family restaurant. This exclusive establishment is thoughtfully decorated to transport you back to the nostalgic charm of Punjab's dhabas. Ideal for cherished get-togethers, Pind Da Dhaba flawlessly combines rustic and refined elements, providing a perfect ambiance for relishing a scrumptious meal.",
  },
  {
    tab: "Tea Kettle",
    heroTitle: "Dine In The Best Way",
    title: "Tea Kettle",
    image: "/discover/pal-heights/breeze.jpg",
    desc: "Coffee beans & Tea leaves from around the world are here for you to choose your cup at the Tea Kettle, a quaint cafe on the highway. Served along with freshly baked cookies and snacks, it makes a great place for journey breaks and having a laugh with friends & family.",
  },
  {
    tab: "Courtyard",
    heroTitle: "Dine In The Best Way",
    title: "Courtyard",
    image: "/discover/pal-heights/desire.jpg",
    desc: "The courtyard is the heart of Pal Heights Mantra. A signature outlet with a contemporary European setting and a scrumptious menu makes it a blend to savour. With its elegant design, it truly offers one of the best fine dining experiences in the city while offering a host of cuisines for your palette.",
  },
];

export default function DiningHighlight() {
  const [active, setActive] = useState(0);
  const animating = useRef(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const heroTitleRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);
  const textTitleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const textSplit = useRef<SplitType | null>(null);

  /* ---------- ENTRANCE (SCROLL) ---------- */
  const animateIn = () => {
    // HERO TITLE — simple translate Y
    gsap.fromTo(
      heroTitleRef.current,
      { y: 150 },
      {
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // line
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // text title
    textSplit.current?.revert();
    textSplit.current = new SplitType(textTitleRef.current!, {
      types: "chars",
    });

    gsap.fromTo(
      textSplit.current.chars ?? [],
      { y: 80 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.035,
        ease: "power3.out",
      }
    );

    // paragraph
    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }
    );

    // image
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: -96 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // INITIAL STATE (prevents flash)
      gsap.set(heroTitleRef.current, { y: 150 });
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(descRef.current, { opacity: 0, y: 16 });
      gsap.set(imageRef.current, { opacity: 0, x: -96 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: animateIn,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      textSplit.current?.revert();
    };
  }, []);

  /* ---------- TAB CHANGE ---------- */
  const animateOut = (onComplete: () => void) => {
    const chars = textSplit.current?.chars ?? [];

    gsap
      .timeline({ onComplete })
      // image OUT (fast)
      .to(
        imageRef.current,
        {
          opacity: 0,
          x: -96,
          duration: 0.35,
          ease: "power2.in",
        },
        0
      )

      // text OUT (fast)
      .to(
        chars,
        {
          y: -80,
          duration: 0.25,
          stagger: 0.025,
          ease: "power3.in",
        },
        0
      )

      .to(
        descRef.current,
        {
          opacity: 0,
          y: 8,
          duration: 0.25,
          ease: "power2.in",
        },
        0
      );
  };

  const animateInFast = () => {
    textSplit.current?.revert();
    textSplit.current = new SplitType(textTitleRef.current!, {
      types: "chars",
    });

    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 96 },
      {
        opacity: 1,
        x: 0,
        duration: 0.45,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      textSplit.current.chars ?? [],
      { y: 80 },
      {
        y: 0,
        duration: 0.35,
        stagger: 0.03,
        ease: "power3.out",
      }
    );

    gsap.fromTo(
      descRef.current,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      }
    );
  };

  const handleTabClick = (index: number) => {
    if (index === active || animating.current) return;
    animating.current = true;

    animateOut(() => {
      setActive(index);
      requestAnimationFrame(() => {
        animateInFast();
        animating.current = false;
      });
    });
  };

  const current = DATA[active];
  useEffect(() => {
    DATA.forEach((item) => {
      const img = new window.Image();
      img.src = item.image;
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-cursor-theme="dark"
    >
      <div className={styles.bgPanel} />

      <div className={styles.container}>
        {/* IMAGE GROUP */}
        <div className={styles.imageGroup}>
          <div className={styles.imageWrap}>
            <div className={styles.titleRow}>
              <div className={styles.heroTitleWrap}>
                <span
                  ref={heroTitleRef}
                  className={`${styles.title} ${styles.imageTitle}`}
                >
                  {current.heroTitle}
                </span>
              </div>
              <span ref={lineRef} className={styles.line} />
            </div>

            <Image
              ref={imageRef}
              src={current.image}
              data-lightbox
              alt="Dining"
              width={960}
              height={540}
              className={styles.image}
              data-cursor-theme="light"
            />
          </div>

          <div className={styles.tabs}>
            {DATA.map((item, i) => (
              <span
                key={item.tab}
                className={styles.tab}
                onClick={() => handleTabClick(i)}
                data-cursor="hover"
              >
                {item.tab}
              </span>
            ))}
          </div>
        </div>

        {/* TEXT GROUP */}
        <div className={styles.textGroup}>
          <h3 key={current.title} ref={textTitleRef} className={styles.title}>
            {current.title}
          </h3>

          <p ref={descRef} className={styles.desc}>
            {current.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
