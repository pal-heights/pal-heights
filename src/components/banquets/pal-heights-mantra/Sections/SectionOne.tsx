import styles from "./SectionOne.module.css";

export default function SectionOne() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <span className={styles.line} />
          <h2 className={styles.heading}>
            MAKING YOUR WEDDING <br /> DREAMS COME TRUE
          </h2>
          <span className={styles.line} />
        </div>

        <p className={styles.description}>
          For generations, weddings at Pal Heights are synonymous with cherished
          memories. Embark on a journey of timeless romance as our dedicated
          experts ensure that every detail is a reflection of your dream
          celebration...
        </p>

        <a
          href="/contact"
          data-cursor="hover"
          style={{ textDecoration: "none" }}
        >
          <button className={styles.button} data-cursor="hover">
            PLAN YOUR DREAM WEDDING
          </button>
        </a>
      </div>
    </section>
  );
}
