import Image from "next/image";
import styles from "./PageLoader.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.logoWrap}>
        <Image
          src="/site-logos/logo.png"
          alt="Loading"
          width={140}
          height={140}
          className={styles.logo}
          priority
        />
      </div>
    </>
  );
}
