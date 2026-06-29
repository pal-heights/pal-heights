"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Desire.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function DiningHighlight() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subTitleOneRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  const largeImgRef = useRef<HTMLDivElement | null>(null);
  const smallImgRef = useRef<HTMLDivElement | null>(null);

  const titleSplit = useRef<SplitType | null>(null);

  const animateIn = () => {
    titleSplit.current?.revert();
    titleSplit.current = new SplitType(titleRef.current!, { types: "chars" });

    const tl = gsap.timeline();

    // IMAGES + TITLE (TOGETHER)
    tl.to(
      [largeImgRef.current, smallImgRef.current],
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: "power3.out",
      },
      0,
    )
      .fromTo(
        titleSplit.current.chars ?? [],
        { y: 120 },
        {
          y: 0,
          duration: 0.9,
          stagger: 0.045,
          ease: "power4.out",
        },
        0,
      )

      // PARAGRAPH
      .fromTo(
        subTitleOneRef.current,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        ">-0.5",
      )

      // PARAGRAPH
      .fromTo(
        descRef.current,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        ">-0.5",
      )

      // BUTTON
      .fromTo(
        buttonRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        ">-0.3",
      );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // INITIAL STATE (NO FLASH)
      gsap.set([largeImgRef.current, smallImgRef.current], {
        autoAlpha: 0,
        y: 90,
      });

      gsap.set(descRef.current, { autoAlpha: 0, y: 26 });
      gsap.set(buttonRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(titleRef.current, { visibility: "hidden" });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          gsap.set(titleRef.current, { visibility: "visible" });
          animateIn();
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      titleSplit.current?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-cursor-theme="light"
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className={styles.curveOne}
      >
        <path
          d="M0 120 C 240 40, 480 40, 720 100 C 960 160, 1200 160, 1440 80"
          fill="none"
          stroke="#FBF4DE"
          strokeWidth="0.5"
        />
      </svg>

      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className={styles.curveTwo}
      >
        <path
          d="M0 120 C 240 40, 480 40, 720 100 C 960 160, 1200 160, 1440 80"
          fill="none"
          stroke="#FBF4DE"
          strokeWidth="0.5"
        />
      </svg>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT CONTENT */}
          <div className={styles.content}>
            <span className={styles.titleWrap}>
              <h3 ref={titleRef} className={styles.title}>
                Desire
              </h3>
            </span>
            <span className={styles.subTitleOneWrap}>
              <h4 ref={subTitleOneRef} className={styles.subTitle}>
                Breakfast 12 pm to 11 pm
              </h4>
            </span>

            <p ref={descRef} className={styles.desc}>
              The perfect lounge bar to catch up with friends over a few drinks
              and forget the mundane humdrum of life. The pulsating beats make
              for the perfect recipe for relaxation and enjoyment with friends.
              Boasting an extensive choice of revival cocktails prepared with
              flair and panache; Desire caters to all your desires and more!
            </p>
            <div className={styles.btnWrapper}>
              <a
                ref={buttonRef}
                href="https://wa.me/7751809666"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Book Now
              </a>
              <a
                ref={buttonRef}
                href="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights/pal%20desire%20menu%20.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Our Menu
              </a>
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className={styles.images}>
            <div
              ref={largeImgRef}
              className={`${styles.imageWrap} ${styles.large}`}
            >
              <Image
                src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights/image-5.jpg"
                data-lightbox
                alt="Desire Restaurant Interior"
                fill
                className={styles.image}
              />
            </div>

            <div
              ref={smallImgRef}
              className={`${styles.imageWrap} ${styles.small}`}
            >
              <Image
                src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights/image-6.jpg"
                data-lightbox
                alt="Desire Seating Area"
                fill
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
