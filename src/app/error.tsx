"use client";

import Link from "next/link";
import styles from "./status.module.css";

export default function Error({
  reset: _reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className={styles.page} data-cursor-theme="light">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.container}>
        <span className={styles.kicker}>UNEXPECTED ERROR</span>

        <div className={styles.titleRow}>
          <span className={styles.line} />
          <h1 className={styles.title}>Something Went Wrong</h1>
          <span className={styles.line} />
        </div>

        <p className={styles.subtitle}>
          We hit a snag while loading this page. Please head back home or reach
          out to us and we&apos;ll help you get back on track.
        </p>

        <div className={styles.actions}>
          <Link href="/" className={styles.button} data-cursor="hover">
            Home
          </Link>
          <Link
            href="/contact"
            className={`${styles.button} ${styles.buttonSecondary}`}
            data-cursor="hover"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
