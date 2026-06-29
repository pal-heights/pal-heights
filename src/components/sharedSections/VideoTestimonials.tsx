"use client";

import { useEffect, useRef, useState } from "react";
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
  const [supportsHover, setSupportsHover] = useState(true);
  const [videoStates, setVideoStates] = useState(
    [
      { isPlaying: false, showIcon: true },
      { isPlaying: false, showIcon: true },
    ],
  );
  const hideTimeouts = useRef<(number | null)[]>([null, null]);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover)");
    const updateHoverSupport = () => setSupportsHover(query.matches);

    updateHoverSupport();
    if (query.addEventListener) {
      query.addEventListener("change", updateHoverSupport);
    } else {
      query.addListener(updateHoverSupport);
    }

    return () => {
      if (query.removeEventListener) {
        query.removeEventListener("change", updateHoverSupport);
      } else {
        query.removeListener(updateHoverSupport);
      }
    };
  }, []);

  const clearHideTimeout = (index: number) => {
    if (hideTimeouts.current[index] !== null) {
      window.clearTimeout(hideTimeouts.current[index]!);
      hideTimeouts.current[index] = null;
    }
  };

  const setVideoState = (
    index: number,
    nextState: Partial<{ isPlaying: boolean; showIcon: boolean }>,
  ) => {
    setVideoStates((current) =>
      current.map((state, i) =>
        i === index ? { ...state, ...nextState } : state,
      ),
    );
  };

  const scheduleHideIcon = (index: number) => {
    clearHideTimeout(index);
    hideTimeouts.current[index] = window.setTimeout(() => {
      setVideoState(index, { showIcon: false });
      hideTimeouts.current[index] = null;
    }, 2000);
  };

  const playVideo = (index: number, video: HTMLVideoElement) => {
    video.muted = false;
    video.play();
    setVideoState(index, { isPlaying: true, showIcon: true });

    if (!supportsHover) {
      scheduleHideIcon(index);
    }
  };

  const pauseVideo = (index: number, video: HTMLVideoElement) => {
    video.pause();
    setVideoState(index, { isPlaying: false, showIcon: true });
    clearHideTimeout(index);
  };

  const handleControlClick = (index: number, video: HTMLVideoElement) => {
    const state = videoStates[index];

    if (supportsHover) {
      if (state.isPlaying) {
        pauseVideo(index, video);
      } else {
        playVideo(index, video);
      }
      return;
    }

    if (!state.isPlaying) {
      playVideo(index, video);
      return;
    }

    if (!state.showIcon) {
      setVideoState(index, { showIcon: true });
      scheduleHideIcon(index);
      return;
    }

    pauseVideo(index, video);
  };

  useEffect(() => {
    return () => {
      hideTimeouts.current.forEach((timeout) => {
        if (timeout !== null) window.clearTimeout(timeout);
      });
    };
  }, []);

  const buildImageWrapClass = (index: number) => {
    const state = videoStates[index];
    return [
      styles.imageWrap,
      styles.large,
      state.isPlaying ? styles.playing : "",
      !supportsHover ? styles.noHover : "",
      !state.showIcon ? styles.hideControl : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const getVideoButtonLabel = (index: number) =>
    videoStates[index].isPlaying ? "Pause video" : "Play video";

  const renderVideoBlock = (
    index: number,
    src: string,
    poster: string,
  ) => (
    <div className={buildImageWrapClass(index)}>
      <div className={styles.media}>
        <video
          className={styles.video}
          src={src}
          poster={poster}
          playsInline
        />

        <button
          className={styles.centerControl}
          aria-label={getVideoButtonLabel(index)}
          onClick={(e) => {
            e.preventDefault();
            const wrapper = e.currentTarget.closest(`.${styles.imageWrap}`) as HTMLDivElement;
            const video = wrapper.querySelector("video") as HTMLVideoElement;
            handleControlClick(index, video);
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
  );

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
            {renderVideoBlock(
              0,
              "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/testimonial-video-1.mp4",
              "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-17.png",
            )}
            {renderVideoBlock(
              1,
              "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/testimonial-video-2.mp4",
              "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/image-18.png",
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
