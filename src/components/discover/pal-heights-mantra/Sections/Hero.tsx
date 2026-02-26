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
            <YouTube
              videoId="j6FDp1SepnQ"
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
                  playlist: "j6FDp1SepnQ",
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
