"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Gym.module.css";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  { image: "/discover/pal-heights/gym-1.jpg" },
  { image: "/discover/pal-heights/gym-2.jpg" },
  { image: "/discover/pal-heights/gym-3.jpg" },
];

export default function Wellness() {
  const [active, setActive] = useState(0);
  const animating = useRef(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const subtitleRefs = useRef<HTMLHeadingElement[]>([]);
  const subtitleSplits = useRef<SplitType[]>([]);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const titleSplit = useRef<SplitType | null>(null);

  /* ---------- SCROLL ENTRANCE ---------- */
  const animateIn = () => {
    // reveal text wrappers (prevents flash)
    gsap.set(titleRef.current, { visibility: "visible" });
    subtitleRefs.current.forEach((el) =>
      gsap.set(el, { visibility: "visible" })
    );

    // cleanup previous splits
    titleSplit.current?.revert();
    subtitleSplits.current.forEach((s) => s.revert());
    subtitleSplits.current = [];

    // TITLE (unchanged)
    titleSplit.current = new SplitType(titleRef.current!, {
      types: "words,chars",
    });

    // SUBTITLES — target inner text span (subRow structure)
    subtitleRefs.current.forEach((el) => {
      if (!el) return;

      const textEl = el.querySelector(
        `.${styles.subtitleText}`
      ) as HTMLElement | null;

      if (!textEl) return;

      subtitleSplits.current.push(
        new SplitType(textEl, {
          types: "words,chars",
        })
      );
    });

    const titleChars = titleSplit.current.chars ?? [];
    const subtitleChars = subtitleSplits.current.flatMap((s) => s.chars ?? []);

    const tl = gsap.timeline();

    tl.to(imageRef.current, {
      autoAlpha: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .fromTo(
        titleChars,
        { y: 100 },
        {
          y: 0,
          duration: 0.8,
          stagger: 0.045,
          ease: "power4.out",
        },
        0
      )
      .fromTo(
        subtitleChars,
        { y: 80 },
        {
          y: 0,
          duration: 0.1,
          stagger: 0.03,
          ease: "power4.out",
        },
        0
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          duration: 0.6,
          ease: "power3.out",
        },
        0.6
      )
      .fromTo(
        descRef.current,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        0.8
      );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // initial state (NO FLASH)
      gsap.set(imageRef.current, { autoAlpha: 0, x: -96 });
      gsap.set(descRef.current, { autoAlpha: 0, y: 16 });
      gsap.set(titleRef.current, { visibility: "hidden" });

      subtitleRefs.current.forEach((el) =>
        gsap.set(el, { visibility: "hidden" })
      );

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        once: true,
        onEnter: animateIn,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      titleSplit.current?.revert();
      subtitleSplits.current.forEach((s) => s.revert());
    };
  }, []);

  /* ---------- IMAGE CHANGE ONLY ---------- */
  const changeImage = (index: number) => {
    if (animating.current || index === active) return;
    animating.current = true;

    gsap.to(imageRef.current, {
      autoAlpha: 0,
      // x: -96,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => {
        setActive(index);
        requestAnimationFrame(() => {
          gsap.fromTo(
            imageRef.current,
            { autoAlpha: 0 },
            // { autoAlpha: 0, x: 96 },
            {
              autoAlpha: 1,
              // x: 0,
              duration: 0.45,
              ease: "power3.out",
              onComplete: () => {
                animating.current = false;
              },
            }
          );
        });
      },
    });
  };
  useEffect(() => {
    SLIDES.forEach((slide) => {
      const img = new window.Image();
      img.src = slide.image;
    });
  }, []);
  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          <div ref={imageRef} className={styles.imageWrapper}>
            <Image
              key={SLIDES[active].image}
              data-lightbox
              src={SLIDES[active].image}
              alt="Wellness"
              fill
              priority
              className={styles.image}
            />

            <div className={styles.slideIcons}>
              <button
                className={styles.slideIcon}
                onClick={() =>
                  changeImage((active - 1 + SLIDES.length) % SLIDES.length)
                }
                data-cursor="hover"
              >
                <Image
                  src="/discover/slide-left.png"
                  alt=""
                  width={48}
                  height={48}
                />
              </button>

              <button
                className={styles.slideIcon}
                onClick={() => changeImage((active + 1) % SLIDES.length)}
                data-cursor="hover"
              >
                <Image
                  src="/discover/slide-right.png"
                  alt=""
                  width={48}
                  height={48}
                />
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <h1 ref={titleRef} className={styles.title}>
              GYM
            </h1>

            <div className={styles.subRow}>
              {["Strengthen Your Body.", "Elevate Your Energy."].map(
                (text, i) => (
                  <h2
                    key={i}
                    ref={(el) => {
                      subtitleRefs.current[i] = el!;
                    }}
                    className={styles.subtitle}
                  >
                    <span className={styles.subtitleText}>{text}</span>
                    {i === 0 && <span ref={lineRef} className={styles.line} />}
                  </h2>
                )
              )}
            </div>

            <p ref={descRef} className={styles.paragraph}>
              At Pal Heights, wellness goes beyond relaxation. Our fully
              equipped gym and fitness center are designed for guests who value
              balance, strength, and vitality. Featuring modern equipment and a
              focused, energising environment, the space supports everything
              from quick workouts to dedicated training sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
