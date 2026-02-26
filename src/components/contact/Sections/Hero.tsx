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
              <span className={styles.mask}>PAL HEIGHTS</span>
            </span>

            <h1 className={styles.title}>
              <span className={styles.mask}>CONTACT US</span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Let us assist you</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>with your enquiry</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              We’re here to help with reservations, event enquiries, and any
              information you may need. Whether you are planning a stay,
              organizing a function, or reaching out with a general query, our
              team is ready to assist you.
            </p>

            <p className={styles.paragraph}>
              Use the contact details or enquiry form alongside to get in touch
              with us. We look forward to assisting you and ensuring a smooth
              and pleasant experience from the very first conversation.
            </p>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="/about/connect.jpg"
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
