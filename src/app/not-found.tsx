import Link from "next/link";
import styles from "./status.module.css";

export default function NotFound() {
  return (
    <section className={styles.page} data-cursor-theme="light">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <span className={styles.kicker}>PAGE NOT FOUND</span>

        <div className={styles.titleRow}>
          <span className={styles.line} />
          <h1 className={styles.title}>
            <span className={styles.titleAccent}>404</span> Not Found
          </h1>
          <span className={styles.line} />
        </div>

        <p className={styles.subtitle}>
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back to Pal Heights.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.button} data-cursor="hover">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
