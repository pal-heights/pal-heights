"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoTestimonials.module.css";
import { Play, Pause } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function DiningHighlight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleTopRef = useRef<HTMLHeadingElement | null>(null);
  const titleBottomRef = useRef<HTMLHeadingElement | null>(null);
  const lineRef = useRef<HTMLSpanElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const imagesRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(titleTopRef.current, {
        y: 60,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          titleBottomRef.current,
          {
            y: 70,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          descRef.current,
          {
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.35",
        )
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 18,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .fromTo(
          imagesRef.current?.children || [],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.15,
          },
          "-=0.3",
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
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className={styles.curveOne}
      >
        <path
          d="M0 120 C 240 40, 480 40, 720 100 C 960 160, 1200 160, 1440 80"
          fill="none"
          stroke="#9b804e"
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
          stroke="#9b804e"
          strokeWidth="0.5"
        />
      </svg>

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* LEFT CONTENT */}
          <div className={styles.content}>
            <span className={styles.titleWrap}>
              <h2 ref={titleTopRef} className={styles.title}>
                Straight from
              </h2>
            </span>

            <div className={styles.titleRow}>
              <span className={styles.titleWrap}>
                <h2 ref={titleBottomRef} className={styles.title}>
                  their Hearts
                </h2>
              </span>
              <span ref={lineRef} className={styles.line} />
            </div>

            <p ref={descRef} className={styles.desc}>
              Real voices. Real experiences. Listen as our guests share honest
              stories about their time at Pal Heights—speaking about the
              service, attention to detail, and moments that stood out. Each
              testimonial reflects genuine trust, heartfelt appreciation, and
              memories that continue long after their stay.
            </p>

            {/* <a
              ref={buttonRef}
              href="https://www.swiftbook.io/inst/#home?propertyId=403MjY0mz4AXGyU2TvxXWbbcUP1Njk=&JDRN=Y"
              className={styles.button}
              data-cursor="hover"
            >
              Book Now
            </a> */}
          </div>

          <div ref={imagesRef} className={styles.images}>
            {/* VIDEO 1 */}
            <div className={`${styles.imageWrap} ${styles.large}`}>
              <div className={styles.media}>
                <video
                  className={styles.video}
                  src="https://www.palheights.com/wp-content/uploads/2021/02/Testimonial-one.mp4?_=1"
                  playsInline
                />

                <button
                  className={styles.centerControl}
                  aria-label="Play or pause video"
                  onClick={(e) => {
                    const wrap = e.currentTarget.closest(
                      `.${styles.imageWrap}`,
                    )!;
                    const video = wrap.querySelector(
                      "video",
                    ) as HTMLVideoElement;

                    if (video.paused) {
                      video.muted = false;
                      video.play();
                      wrap.classList.add(styles.playing);
                    } else {
                      video.pause();
                      wrap.classList.remove(styles.playing);
                    }
                  }}
                >
                  <span className={styles.outerRing} data-cursor="hover">
                    <span className={styles.innerCircle}>
                      <Play className={styles.playIcon} />
                      <Pause className={styles.pauseIcon} />
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* VIDEO 2 */}
            <div className={`${styles.imageWrap} ${styles.large}`}>
              <div className={styles.media}>
                <video
                  className={styles.video}
                  src="https://www.palheights.com/wp-content/uploads/2021/02/Testimonial-two.mp4?_=2"
                  playsInline
                />

                <button
                  className={styles.centerControl}
                  aria-label="Play or pause video"
                  onClick={(e) => {
                    const wrap = e.currentTarget.closest(
                      `.${styles.imageWrap}`,
                    )!;
                    const video = wrap.querySelector(
                      "video",
                    ) as HTMLVideoElement;

                    if (video.paused) {
                      video.muted = false;
                      video.play();
                      wrap.classList.add(styles.playing);
                    } else {
                      video.pause();
                      wrap.classList.remove(styles.playing);
                    }
                  }}
                >
                  <span className={styles.outerRing} data-cursor="hover">
                    <span className={styles.innerCircle}>
                      <Play className={styles.playIcon} />
                      <Pause className={styles.pauseIcon} />
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
