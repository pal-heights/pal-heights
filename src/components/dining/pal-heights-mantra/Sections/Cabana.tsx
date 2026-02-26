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
  const subTitleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const buttonPrimaryRef = useRef<HTMLAnchorElement | null>(null);

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

      // subheading
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
      // subheading
      .fromTo(
        subTitleRef.current,
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

      // BUTTON PRIMARY
      .fromTo(
        buttonPrimaryRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        },
        ">-0.3",
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
      gsap.set(buttonPrimaryRef.current, { autoAlpha: 0, y: 20 });
      gsap.set(titleRef.current, { visibility: "hidden" });
      gsap.set(subTitleRef.current, { autoAlpha: 0, y: 26 });
      gsap.set(subTitleOneRef.current, { autoAlpha: 0, y: 26 });

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
            <span className={`${styles.titleWrap} ${styles.primaryTitleWrap}`}>
              <h3 ref={titleRef} className={styles.title}>
                Cabana
              </h3>
            </span>
            <span className={styles.subTitleWrap} style={{marginBottom: "0.5rem"}}>
              <h4 ref={subTitleOneRef} className={styles.subTitle} >
                (Breakfast- 7 am to 10.30 am)
              </h4>
            </span>
            <span className={styles.subTitleWrap}>
              <h4 ref={subTitleRef} className={styles.subTitle}>
                (Dinner - 5.00 pm to 11. 30 pm)
              </h4>
            </span>

            <p ref={descRef} className={styles.desc}>
              Cabana, one of the best rooftop restaurants in Bhubaneswar and
              Cuttack, offers a mesmerizing vantage view of the twin cities,
              creating a captivating backdrop for an unforgettable dining
              experience. Prepare to be enchanted by the romantic candle-light
              dinner setting, where every moment becomes a cherished memory.
              Nestled by the poolside deck, Cabana provides a serene ambiance
              that sets the stage for relaxation and indulgence. With a stocked
              bar and lounge, it offers the perfect blend of flavors and
              ambiance for an exquisite evening. The light and inviting
              atmosphere make it an ideal choice for a relaxing and romantic
              evening, while the Cabanas provide a perfect setting for enjoying
              a delightful dinner with a group of friends. From sunrise to
              moonlit nights, Cabana promises to immerse you in a vivid sensory
              experience that will leave you craving for more. Discover the
              magic of Cabana, where fine dining meets stunning rooftop views,
              and create moments to treasure forever.
            </p>

            <div className={styles.btnWrapper}>
              <a
                ref={buttonPrimaryRef}
                href="https://wa.me/9776001010"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Book Now
              </a>
              <a
                ref={buttonRef}
                href="/menus/Cabana.pdf"
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
                src="/dining/pal-heights-mantra/cabana-1.jpeg"
                data-lightbox
                alt="Desire Restaurant Interior"
                fill
                priority
                className={styles.image}
              />
            </div>

            <div
              ref={smallImgRef}
              className={`${styles.imageWrap} ${styles.small}`}
            >
              <Image
                src="/dining/pal-heights-mantra/cabana-2.jpg"
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
