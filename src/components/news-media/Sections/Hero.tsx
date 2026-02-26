"use client";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          {/* Left Content */}
          <div className={styles.content}>
            <span className={styles.kicker}>
              <span className={styles.mask}>NEWS & MEDIA</span>
            </span>

            <h1 className={styles.title}>
              <span className={styles.mask}>PAL STORIES</span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>We love staying </span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>in hotels</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              Stories, insights, and experiences that capture the essence of Pal
              Heights where hospitality, culture, and thoughtful living come
              together.
            </p>

            <p className={styles.paragraph}>
              Our blog explores the moments behind the stay, from culinary
              inspirations and wellness philosophies to celebrations, design
              details, and local culture. Each story offers a closer look at the
              experiences we curate, inviting you to discover the ideas, people,
              and places that shape life at Pal Heights.
            </p>
          </div>

          {/* Right Image (keeps video sizing) */}
          <div className={styles.videoWrapper}>
            <img
              src="/news-media/hero.jpg"
              data-lightbox
              alt="Pal Heights Restaurant"
              className={styles.video}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
