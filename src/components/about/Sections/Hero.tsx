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
              Pal Group of Hotels & Resorts stands as a beacon of exceptional
              hospitality in Bhubaneswar, offering a perfect blend of luxury,
              comfort and personalized service. Recognized among the city's
              premier hospitality brands, we are committed to creating memorable
              experiences for every guest through world-class amenities,
              impeccable service and warm hospitality.
            </p>
            <p className={styles.paragraph}>
              The word "PAL" means friend or close companion and this philosophy
              forms the foundation of our hospitality culture. We believe in
              building lifelong relationships with our guests by treating them
              with genuine care, sincerity and attention to detail.
            </p>
          </div>

          {/* Right Image */}
          <div className={styles.imageWrapper}>
            <Image
              src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/About%20Us/Hero.jpg"
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
