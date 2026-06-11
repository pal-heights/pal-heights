"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ExperiencesSlider.module.css";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  title: string;
  description: string;
  image: string;
};

const slides: Slide[] = [
  {
    title: "Pal Heights",
    description:
      "At Pal, every gathering unfolds into a thoughtfully curated experience. From corporate meetings and conferences to incentive celebrations and social events, our versatile venues, refined hospitality and seamless service create the perfect setting for meaningful connections and memorable occasions.",
    image: "/home/meetings.jpg",
  },
  {
    title: "Timeless Weddings",
    description:
      "Celebrate the beginning of your forever at Pal. From vibrant pre-wedding festivities to elegant receptions, our beautiful venues, personalised planning and warm hospitality come together to create wedding celebrations that remain cherished for a lifetime.",
    image: "/home/grand-weddings-celebrations.jpg",
  },
  {
    title: "Holidays",
    description:
      "Create lasting memories with the ones who matter most. Spacious stays, thoughtful experiences and warm hospitality ensure every family holiday at Pal is filled with comfort, joy and togetherness.",
    image: "/home/holidays.jpg",
  },
  {
    title: "Family Holidays",
    description:
      "Create lasting memories with the ones who matter most. Spacious stays, thoughtful experiences and warm hospitality ensure every family holiday at Pal is filled with comfort, joy and togetherness.",
    image: "/home/family-holidays.jpg",
  },
  {
    title: "Couple Holidays",
    description:
      "Escape into moments of quiet romance and shared discovery. Whether it is a weekend retreat or a leisurely getaway, Pal offers the perfect setting for couples to unwind, reconnect and celebrate their time together.",
    image: "/home/honeymoon-stay.jpg",
  },
  {
    title: "Bachelorette Getaways",
    description:
      "Celebrate friendship and the spirit of new beginnings with an unforgettable bachelorette escape. From lively evenings to indulgent stays, Pal sets the stage for a celebration filled with laughter and lasting memories.",
    image: "/home/bachelorette.jpg",
  },
  {
    title: "Corporate Incentive Holidays",
    description:
      "Reward achievement with experiences that inspire. Curated stays, engaging activities and seamless service make Pal an ideal destination for corporate incentive trips that motivate teams and celebrate success.",
    image: "/home/corporate-incentive-holiday.jpg",
  },
  {
    title: "Restaurants",
    description:
      "Discover a culinary journey where flavours, creativity and hospitality come together. At Pal, each dining experience celebrates fresh ingredients, thoughtful preparation and inviting ambience, offering guests memorable moments around the table.",
    image: "/home/zaika-people-eating-food.jpg",
  },
];

export default function ExperiencesSlider() {
  const [current, setCurrent] = useState(0);

  /* =========================
     Heading Refs
  ========================== */
  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const kicker = kickerRef.current;
    const title = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;

    if (!header || !kicker || !title || !leftLine || !rightLine) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      /* Kicker */
      tl.from(kicker, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      });

      /* Title masked lines */
      tl.from(
        title.querySelectorAll(`.${styles.lineInner}`),
        {
          y: 70,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.3",
      );

      /* Left decorative line */
      tl.from(
        leftLine,
        {
          x: 40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4",
      );

      /* Right decorative line */
      tl.from(
        rightLine,
        {
          x: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<",
      );
    }, header);

    return () => ctx.revert();
  }, []);

  const prev = (current - 1 + slides.length) % slides.length;
  const next = (current + 1) % slides.length;

  return (
    <section className={styles.SectionWrapper}>
      <div ref={headerRef} className={styles.header}>
        <div className={styles.kickerWrapper}>
          <span ref={kickerRef} className={styles.kicker}>
            ORDINARY MADE EXTRAORDINARY
          </span>
        </div>

        <div className={styles.titleRow}>
          <span ref={leftLineRef} className={styles.line} />

          <h2 ref={titleRef} className={styles.title}>
            <span className={styles.lineMask}>
              <span className={styles.lineInner}>Curated Experiences.</span>
            </span>

            <span className={styles.lineMask}>
              <span className={`${styles.lineInner} ${styles.highlight}`}>
                Crafted To Inspire.
              </span>
            </span>
          </h2>

          <span ref={rightLineRef} className={styles.line} />
        </div>
      </div>
      <div className={styles.section}>
        {/* LEFT NAV */}
        <button
          className={`${styles.nav} ${styles.left}`}
          onClick={() => setCurrent(prev)}
        >
          <div className={styles.border} />
          <div className={styles.navContent}>
            <ChevronLeft size={30} />
            <span>{slides[prev].title}</span>
          </div>
        </button>

        {/* CENTER CARD */}
        <div className={styles.center}>
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`${styles.card} ${i === current ? styles.active : ""}`}
            >
              <div className={styles.imageWrap}>
                <img src={slide.image} alt={slide.title} />
              </div>

              <div className={styles.cardBody}>
                <div className={styles.text}>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                </div>

                <a href="#" className={styles.more} data-cursor="hover">
                  More <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT NAV */}
        <button
          className={`${styles.nav} ${styles.right}`}
          onClick={() => setCurrent(next)}
        >
          <div className={styles.border} />
          <div className={styles.navContent}>
            <span>{slides[next].title}</span>
            <ChevronRight size={30} />
          </div>
        </button>
      </div>
    </section>
  );
}
