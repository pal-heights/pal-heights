"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [supportsHover, setSupportsHover] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const clearHideTimeout = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

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

  useEffect(() => {
    clearHideTimeout();
    if (supportsHover) {
      setShowIcon(!isPlaying || isHovering);
      return;
    }
    if (!isPlaying) {
      setShowIcon(true);
      return;
    }
    if (showIcon) {
      timeoutRef.current = window.setTimeout(() => {
        setShowIcon(false);
        timeoutRef.current = null;
      }, 2000);
    }
    return () => clearHideTimeout();
  }, [supportsHover, isPlaying, isHovering, showIcon]);

  useEffect(() => {
    return () => clearHideTimeout();
  }, []);

  const playVideo = () => {
    if (!playerRef.current) return;
    playerRef.current.play();
    setIsPlaying(true);
    setShowIcon(true);
  };

  const pauseVideo = () => {
    if (!playerRef.current) return;
    playerRef.current.pause();
    setIsPlaying(false);
    setShowIcon(true);
    clearHideTimeout();
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          {/* Left Content */}
          <div className={styles.content}>
            <span className={styles.kicker}>
              <span className={styles.mask}>DINING</span>
            </span>

            <h1 className={styles.title}>
              <span className={styles.mask}>
                DISCOVER PAL HEIGHTS RESTAURANT
              </span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Have A Truly Memorable</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Experience</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              Enjoy the delicacies crafted by our in-house chefs and immerse
              yourself in the rich tapestry of flavours.
            </p>

            <p className={styles.paragraph}>
              Our banquet experiences are thoughtfully curated to complement
              every celebration, with customized menus, elegant presentation,
              and seamless service. From intimate gatherings to grand occasions,
              each event is designed to feel effortless, memorable, and
              perfectly tailored to your vision.
            </p>
          </div>

          {/* Right Pane — centers video in right half */}
          <div className={styles.rightPane}>
            <div
              data-cursor="hover"
              className={styles.videoWrapper}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <video
                ref={playerRef}
                className={styles.video}
                src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights/hero-video.mp4"
                poster="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights/Hero.webp"
                loop
                muted
                playsInline
                preload="metadata"
                onClick={() => {
                  if (!supportsHover && isPlaying && !showIcon) {
                    setShowIcon(true);
                    return;
                  }
                  togglePlay();
                }}
              />

              {/* PLAY BUTTON */}
              <button
                className={`${styles.videoControl} ${
                  !isPlaying && showIcon ? styles.visible : styles.hidden
                }`}
                onClick={playVideo}
                aria-label="Play video"
              >
                <span className={styles.controlBg}>
                  <span className={styles.controlInner}>
                    <Play fill="#856D4780" stroke="none" />
                  </span>
                </span>
              </button>

              {/* PAUSE BUTTON */}
              <button
                className={`${styles.videoControl} ${
                  isPlaying && showIcon ? styles.visible : styles.hidden
                }`}
                onClick={pauseVideo}
                aria-label="Pause video"
              >
                <span className={styles.controlBg}>
                  <span className={styles.controlInner}>
                    <Pause fill="#856D4780" stroke="none" />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
