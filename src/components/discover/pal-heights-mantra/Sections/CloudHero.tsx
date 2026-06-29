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
  const hideTimeoutRef = useRef<number | null>(null);

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
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
      setShowIcon(true);
      return;
    }

    if (!isPlaying) {
      setShowIcon(true);
      return;
    }

    if (showIcon) {
      hideTimeoutRef.current = window.setTimeout(() => {
        setShowIcon(false);
        hideTimeoutRef.current = null;
      }, 2000);
    }
  }, [supportsHover, isPlaying, showIcon]);

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

  const handleVideoClick = () => {
    if (supportsHover) {
      togglePlay();
      return;
    }

    if (!isPlaying) {
      playVideo();
      return;
    }

    if (!showIcon) {
      setShowIcon(true);
      return;
    }

    pauseVideo();
  };

  const shouldShowPlay = !isPlaying && (supportsHover ? true : showIcon);
  const shouldShowPause = isPlaying && (supportsHover ? isHovering : showIcon);

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
              <span className={styles.mask}>PAL HEIGHTS MANTRA</span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Luxury Has Never</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Looked Better</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              Located in the heart of the Twin Cities; Bhubaneswar and Cuttack,
              our hotel, Pal Heights Mantra is a luxury hotel with
              state-of-the-art services and amenities. A premium business and
              luxury hotel, Pal Heights Mantra Bhubaneswar is the next
              generation of world-class hospitality. This luxurious property
              overlooks the bustling NH5 on one side and the green space on the
              other. PAL Heights Mantra is packed with amenities with several
              restaurants, cafes, bars, gyms and swimming pools, all in one
              place.
            </p>

            <p className={styles.paragraph}>
              Mantra and the Twin Cities bring to you a variety of exciting
              adventures, making for a great destination for short business
              trips, honeymoons, vacations, weddings and meetings. We at PAL
              Mantra Bhubaneswar also have the best banquet halls for marriage
              functions, events and corporate events, making it easier for
              guests to seamlessly organize their special days without
              compromising on quality or experience.
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
              src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Discover%20Pal%20Heights%20Mantra/Hero.mp4"
              poster="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Discover%20Pal%20Heights%20Mantra/Hero.jpg"
              loop
              muted
              playsInline
              onClick={handleVideoClick}
            />

            {/* PLAY BUTTON */}
            <button
              className={`${styles.videoControl} ${
                shouldShowPlay ? styles.visible : styles.hidden
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
                shouldShowPause ? styles.visible : styles.hidden
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
