"use client";

import { useEffect, useRef } from "react";
// import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Detail.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function DetailSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const bottomImagesRef = useRef<HTMLDivElement | null>(null);
  const rightImageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      // Animate kicker if active
      if (kickerRef.current) {
        tl.from(kickerRef.current, {
          y: 50,
          duration: 0.6,
          ease: "power3.out",
        });
      }

      // Target all headings, lines, and paragraphs dynamically inside the container
      tl.from(
        `.${styles.heading}`,
        {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.3",
      )
        .from(
          `.${styles.line}`,
          {
            scaleX: 0,
            transformOrigin: "left center",
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .from(
          `.${styles.paragraph}`,
          {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          bottomImagesRef.current?.children || [],
          {
            y: 32,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.3",
        )
        .from(
          rightImageRef.current,
          {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
          "-=0.6",
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
        <div className={styles.layout}>
          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>
            <div className={styles.header}>
              {/* <div className={styles.kickerWrap}>
                <span ref={kickerRef} className={styles.kicker}>
                  OUR JOURNEY
                </span>
              </div> */}

              <div className={styles.headingRow}>
                <span className={styles.headingWrap}>
                  <h2 className={styles.heading}>Our Journey</h2>
                </span>
                <span className={styles.line} />
              </div>

              <div className={styles.textGroup}>
                <p className={styles.paragraph}>
                  Pal Heights was born in 2001 with a small restaurant that
                  introduced authentic North Indian and Chinese cuisine to the
                  people of Bhubaneswar. Encouraged by the overwhelming response
                  and trust of our patrons, we expanded our horizons. In 2005 we
                  established one of the largest convention facilities in
                  Bhubaneswar.
                </p>
                <p className={styles.paragraph}>
                  In 2008 we launched our first shopping arcade and hotel. Then
                  came World Baker, the premium Bakery outlet which is the best
                  feather of our cap as it has always a tempting story to tell.
                </p>
                <p className={styles.paragraph}>
                  Flight catering with precision and discipline is our pride
                  which caters to 85% flights of Bhubaneswar including
                  International.
                </p>
                <p className={styles.paragraph}>
                  Hotel Pal Heights is located at the heart of the city center,
                  is 6 kms from airport and 3 kms from railway station and
                  kalinga stadium the sports hub is our next neighbour.
                </p>
              </div>

              <div className={styles.textGroup}>
                <p className={styles.paragraph}>
                  Pal Heights Mantra, born in 2017, our second resort property
                  boasts of the most popular cuisine and mouth watering food
                  with quality. Sandwiched between Bhubaneswar and cuttack it
                  draws a straight road of about 55km to the PURI beach.
                </p>
                <p className={styles.paragraph}>
                  The reciepe of success of Pal Heights Mantra is the 5 star
                  rated Pind Da Dhaba alongwith an english restaurant named
                  Courtyard offering mouth watering authentic north Indian and
                  Pan Asian cusine.
                </p>
                <p className={styles.paragraph}>
                  Over the years, Pal Group has evolved into one of Odisha's
                  most respected hospitality groups, known for excellence in
                  accommodation, dining, events, and guest services.
                </p>
              </div>

              <div className={styles.headingRow}>
                <span className={styles.headingWrap}>
                  <h2 className={styles.heading}>
                    Exceptional Hospitality & Experiences
                  </h2>
                </span>
                <span className={styles.line} />
              </div>

              <div className={styles.textGroup}>
                <p className={styles.paragraph}>
                  Whether you are visiting for business, leisure, celebrations
                  or corporate events, we deliver an unmatched hospitality
                  experience. Our luxurious accommodations, diverse culinary
                  offerings, elegant banquet facilities, and modern conference
                  venues cater to every requirement with perfection.
                </p>
                <p className={styles.paragraph}>
                  Our banquet and conference facilities are among the finest in
                  the Twin Cities, making Pal a preferred destination for
                  weddings, social gatherings, corporate meetings, MICE and
                  special celebrations.
                </p>
                <p className={styles.paragraph}>
                  At Pal Group of Hotels & Resorts, we go beyond expectations to
                  ensure every guest enjoys comfort, elegance and personalized
                  service. From luxury stays to exceptional dining experiences,
                  our commitment remains unwavering—creating lasting memories
                  and friendships that endure for a lifetime.
                </p>
                <p className={styles.paragraph}>
                  Pal Group of Hotels & Resorts Where Hospitality Creates
                  Friends for Life is gearing up for the new 5 star deluxe
                  resort in PURI beach to go live shortly. We are looking to
                  make you and your company our next friend which basically
                  means PAL.
                </p>
              </div>
            </div>

            {/* <div ref={bottomImagesRef} className={styles.bottomImages}>
              <div className={styles.imageBox} data-cursor-theme="light">
              <Image
              src="/about/small-left.jpg"
                  data-lightbox
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>

              <div className={styles.imageBox} data-cursor-theme="light">
                <Image
                  src="/about/small-right.jpg"
                  data-lightbox
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>
            </div> */}
          </div>

          {/* RIGHT COLUMN */}
          {/* <div
            ref={rightImageRef}
            className={styles.rightCol}
            data-cursor-theme="light"
          >
            <Image
              src="/about/right-large.jpg"
              data-lightbox
              alt=""
              fill
              className={styles.image}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
}
