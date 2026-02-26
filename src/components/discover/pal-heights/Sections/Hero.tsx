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
            <YouTube
              videoId="m0mquDly-ls"
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
                  playlist: "m0mquDly-ls",
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
