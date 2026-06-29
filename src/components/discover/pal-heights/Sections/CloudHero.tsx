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
            {/* KICKER */}
            <span className={styles.kicker}>
              <span className={styles.mask}>DISCOVER</span>
            </span>

            <h1 className={styles.title}>
              <span className={styles.mask}>PAL HEIGHTS </span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Have a truly memorable</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>experience</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              Pal Heights, the centrepiece of Bhubaneswar, is a luxury 4 Star
              hotel beside a new-age shopping mall making it the perfect
              location for your stay. We welcome our guests to the rich cultural
              heritage of Odisha while being accessible and ready to cater to
              all your needs
            </p>

            <p className={styles.paragraph}>
              At Pal Heights Bhubaneswar, we take immense pleasure in
              introducing you to a world of exemplary hospitality. We adhere to
              the international standards of service and offer you a truly
              business-class experience in the center of the templecity with
              every amenity you need. Whether on a vacation, business trip or a
              short getaway, Pal Heights, Bhubaneswar looks forward to adding a
              deeper meaning and satisfaction to your journey.
            </p>
          </div>

          {/* Right Video */}
          <div
            data-cursor="hover"
            className={styles.videoWrapper}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <video
              ref={playerRef}
              className={styles.video}
              src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Discover%20Pal%20Heights/Hero.mp4"
              poster="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Discover%20Pal%20Heights/Hero.jpg"
              loop
              muted
              playsInline
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

          {/* PLAY BUTTON */}
          {/* <button
              className={`${styles.videoControl} ${
                !isPlaying ? styles.visible : styles.hidden
              }`}
              onClick={togglePlay}
              aria-label="Play video"
            >
              <span data-cursor="hover" className={styles.controlBg}>
                <span className={styles.controlInner}>
                  <Play fill="#856D4780" stroke="none" />
                </span>
              </span>
            </button> */}

          {/* PAUSE BUTTON */}
          {/* <button
              className={`${styles.videoControl} ${
                isPlaying && isHovering ? styles.visible : styles.hidden
              }`}
              onClick={togglePlay}
              aria-label="Pause video"
            >
              <span data-cursor="hover" className={styles.controlBg}>
                <span className={styles.controlInner}>
                  <Pause fill="#856D4780" stroke="none" />
                </span>
              </span>
            </button> */}
        </div>
      </div>
    </section>
  );
}
