"use client";

import YouTube from "react-youtube";
import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import styles from "./Hero.module.css";

export default function Hero() {
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const onReady = (event: any) => {
    playerRef.current = event.target;
  };

  const togglePlay = () => {
    if (!playerRef.current) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.unMute(); // 🔑 REQUIRED
      playerRef.current.playVideo();
      setIsPlaying(true);
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
                <span className={styles.mask}>Celebrate Grand Moments</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>at Pal Heights Banquet</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              Perfect for weddings, corporate gatherings, and special occasions.
            </p>

            <p className={styles.paragraph}>
              Celebrate life’s grand moments at Pal Heights Banquet, where
              refined spaces and attentive service come together to create
              memorable weddings, seamless corporate gatherings, and
              thoughtfully curated special occasions. Pal Heights Banquet offers
              an elegant setting designed for weddings, corporate events, and
              milestone celebrations combining flexible venues, curated menus,
              and dedicated service to ensure every event unfolds flawlessly.
            </p>
          </div>

          {/* Right Video */}
          <div
            data-cursor="hover"
            className={styles.videoWrapper}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <YouTube
              videoId="lMJXxhRFO1k"
              className={styles.video}
              onReady={onReady}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0, // must be 0
                  controls: 0, // hide YT controls
                  mute: 1, // MUST start muted
                  loop: 1,
                  playlist: "lMJXxhRFO1k",
                  modestbranding: 1,
                  rel: 0,
                  playsinline: 1,
                  fs: 0, // disable fullscreen button
                  iv_load_policy: 3, // hide annotations
                  showinfo: 0, // legacy but safe
                },
              }}
            />

            {/* PLAY BUTTON */}
            <button
              className={`${styles.videoControl} ${
                !isPlaying ? styles.visible : styles.hidden
              }`}
              onClick={togglePlay}
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
                isPlaying && isHovering ? styles.visible : styles.hidden
              }`}
              onClick={togglePlay}
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
