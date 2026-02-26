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
              <span className={styles.mask}>DINING</span>
            </span>

            <h1 className={styles.title}>
              <span className={styles.mask}>
                DISCOVER PAL HEIGHTS MATRA RESTAURANT
              </span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Curating Memories</span>
              </h2>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>To Treasure</span>
                <span className={styles.line} />
              </h2>
            </div>

            <p className={styles.paragraph}>
              Savour the best cuisines from around the world while revelling in
              the delicately crafted tastes & aromas!
            </p>

            <p className={styles.paragraph}>
              Our banquet experiences are thoughtfully curated to complement
              every celebration, with customized menus, elegant presentation,
              and seamless service. From intimate gatherings to grand occasions,
              each event is designed to feel effortless, memorable, and
              perfectly tailored to your vision.
            </p>
          </div>

          {/* Right Image (keeps video sizing) */}
          <div className={styles.videoWrapper}>
            <img
              src="/dining/pal-heights-mantra/hero.jpg"
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
