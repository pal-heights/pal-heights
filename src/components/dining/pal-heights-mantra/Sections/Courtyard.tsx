"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Breeze.module.css";

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
        ">-0.5"
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
        ">-0.5"
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
          {/* LEFT IMAGES */}
          <div className={styles.images}>
            <div
              ref={largeImgRef}
              className={`${styles.imageWrap} ${styles.large}`}
            >
              <Image
                src="/dining/pal-heights-mantra/courtyard-1.jpg"
                data-lightbox
                alt="Breeze Dining Area"
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
                src="/dining/pal-heights-mantra/courtyard-2.jpg"
                data-lightbox
                alt="Breeze Seating"
                fill
                className={styles.image}
              />
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className={styles.content}>
            <span className={`${styles.titleWrap} ${styles.primaryTitleWrap}`}>
              <h3 ref={titleRef} className={styles.title}>
                Courtyard
              </h3>
            </span>
            <span className={styles.subTitleWrap} style={{marginBottom: "0.5rem"}}>
              <h4 ref={subTitleOneRef} className={styles.subTitle} >
                (Lunch -12.30 pm to 3. 30 pm)
              </h4>
            </span>
            <span className={styles.subTitleWrap}>
              <h4 ref={subTitleRef} className={styles.subTitle}>
                (Dinner - 7 pm to 11. 30 pm. )
              </h4>
            </span>

            <p ref={descRef} className={styles.desc}>
              Courtyard, the best restaurant in Bhubaneswar and Cuttack, offers
              a fine-dining experience that transports you to the realms of
              European architecture and charm. Impeccably decorated to
              perfection, Courtyard sets the stage for an unforgettable culinary
              journey. Step into our restaurant and be enchanted by the soft
              ambience that envelops you, creating an atmosphere of tranquility
              and elegance. Our menu is a masterpiece, featuring the finest
              delicacies carefully crafted to tantalize your taste buds and
              leave you craving for more. At Courtyard, we take pride on
              providing an exotic blend of flavors that take your palate on a
              delightful adventure. The soothing aura of our restaurant is
              perfect for creating enthralling dinner nights with your loved
              ones, where every moment becomes a cherished memory. Indulge in
              the exceptional dining experience that Courtyard offers and savor
              the enchanting blend of flavors, all in the comfort of our
              remarkable establishment.
            </p>

            <div className={styles.btnWrapper}>
              <a
                ref={buttonPrimaryRef}
                href="https://wa.me/8342000662"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Book Now
              </a>
              <a
                ref={buttonRef}
                href="/menus/Courtyard.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Our Menu
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
