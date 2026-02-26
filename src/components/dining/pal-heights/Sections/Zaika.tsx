"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Zaika.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function DiningHighlight() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subTitleOneRef = useRef<HTMLHeadingElement | null>(null);
  const subTitleTwoRef = useRef<HTMLHeadingElement | null>(null);
  const subTitleThreeRef = useRef<HTMLHeadingElement | null>(null);
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

    // IMAGES + TITLE (START TOGETHER)
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

      // PARAGRAPH (AFTER)
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
      // PARAGRAPH (AFTER)
      .fromTo(
        subTitleTwoRef.current,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        ">-0.5",
      )
      // PARAGRAPH (AFTER)
      .fromTo(
        subTitleThreeRef.current,
        { autoAlpha: 0, y: 26 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        },
        ">-0.5",
      )

      // PARAGRAPH (AFTER)
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

      // BUTTON (LAST)
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

      // BUTTON (LAST)
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
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={`${styles.titleWrap} ${styles.primaryTitleWrap}`}>
              <h3 ref={titleRef} className={styles.title}>
                Zaika
              </h3>
            </span>
            <span className={styles.subTitleOneWrap}>
              <h4 ref={subTitleOneRef} className={styles.subTitle}>
                Zaika - 5 pm to 11. 30 pm
              </h4>
            </span>
            <span className={styles.subTitleTwoWrap}>
              <h4 ref={subTitleTwoRef} className={styles.subTitle}>
                Lunch - 12.30 to 3.30 pm
              </h4>
            </span>
            <span className={styles.subTitleThreeWrap}>
              <h4 ref={subTitleThreeRef} className={styles.subTitle}>
                Dinner - 7 pm to 11. 30 pm
              </h4>
            </span>

            <p ref={descRef} className={styles.desc}>
              Zaika, the best restaurant in Bhubaneswar, is a hidden gem nestled
              within our hotel, offering an exceptional fine-dining experience.
              Step into Zaika and be enchanted by its contemporary aesthetics
              and welcoming family-friendly ambience. As the top choice for food
              enthusiasts, we take pride in delivering a diverse and tantalizing
              selection of cuisines. At Zaika, we go above and beyond to provide
              impeccable service that leaves a lasting impression on our guests.
              One of the highlights of our restaurant is the captivating live
              tandoor experience, where you can witness the mastery of our chefs
              as they prepare fresh and delectable delights right before your
              eyes.
            </p>

            <div className={styles.btnWrapper}>
              <a
                ref={buttonPrimaryRef}
                href="https://wa.me/919937028918"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Book Now
              </a>
              <a
                ref={buttonRef}
                href="/menus/Zaika.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.button}
                data-cursor="hover"
              >
                Our Menu
              </a>
            </div>
          </div>

          <div className={styles.images}>
            <div
              ref={largeImgRef}
              className={`${styles.imageWrap} ${styles.large}`}
            >
              <Image
                src="/dining/pal-heights/zaika-1.jpg"
                data-lightbox
                alt="Zaika Restaurant Interior"
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
                src="/dining/pal-heights/zaika-2.jpg"
                data-lightbox
                alt="Zaika Seating Area"
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
