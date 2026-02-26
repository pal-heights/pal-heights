import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={`${styles.hero} ${styles.isVisible}`}>
      <div className={styles.inner}>
        <div className={styles.wrapper}>
          {/* Left Content */}
          <div className={styles.content}>
            <h1 className={styles.title}>
              <span className={styles.mask}>About Us</span>
            </h1>

            <div className={styles.subRow}>
              <h2 className={styles.subtitle}>
                <span className={styles.mask}>Our Philosophy</span>
              </h2>
              <span className={styles.line} />
            </div>

            <p className={styles.paragraph}>
              For us, hospitality is about making you feel comfortable,  from the moment you arrive.
            </p>
            <p className={styles.paragraph}>
              At Pal Group, we create spaces that feel warm, open, and easy to be in. Our service is friendly and thoughtful, never formal. We believe the little things matter, and we want you to feel relaxed, cared for, and at home long after your stay.
            </p>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="/about/hero.jpg"
              alt="Pal Heights Interior"
              data-lightbox
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
