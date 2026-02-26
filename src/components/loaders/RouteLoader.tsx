"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLoading } from "src/context/LoadingContext";
import styles from "./RouteLoader.module.css";

const MIN_DURATION = 1000;

export default function RouteLoader() {
  const pathname = usePathname();
  const { isLoading } = useLoading();
  const first = useRef(true);
  const [show, setShow] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
      if (timer.current) clearTimeout(timer.current);
      return;
    }
  }, [isLoading]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    setShow(true);
    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setShow(false);
    }, MIN_DURATION);
  }, [pathname]);

  if (!show) return null;

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

        {/* SVG Loader */}
        <svg
          className={styles.loader}
          viewBox="0 0 120 12"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="10" cy="6" r="4" />
          <circle cx="40" cy="6" r="4" />
          <circle cx="70" cy="6" r="4" />
          <circle cx="100" cy="6" r="4" />
        </svg>

        <p className={styles.loadingText}>Stories are being built</p>
      </div>
    </>
  );
}
