"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
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
              <span className={styles.mask}>CAREERS</span>
            </span>

            <h1 className={styles.title}>
              <span className={styles.mask}>JOB APPLICATION</span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Grow your future with</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>a culture of hospitality</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              At Pal Heights, our people are at the heart of every experience we
              create. Across service, culinary, and operations teams, each role
              contributes to delivering thoughtful, consistent, and meaningful
              hospitality.
            </p>

            <p className={styles.paragraph}>
              We foster an environment that encourages learning, collaboration,
              and personal growth. Whether you are beginning your career or
              taking the next step forward, Pal Heights provides the support,
              exposure, and opportunities to grow with a trusted hospitality
              brand.
            </p>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="/careers/hero.jpg"
              data-lightbox
              alt="Pal Heights Interior"
              fill
              priority
              className={styles.image}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
