import Image from "next/image";
import styles from "./PageLoader.module.css";

export default function Loading() {
  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.logoWrap}>
        <Image
          src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Pal%20Icons/Logo.png"
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
