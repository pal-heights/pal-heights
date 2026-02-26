"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./PageTransition.module.css";

export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");

  // EXIT animation when route changes (page mounted)
  useEffect(() => {
    if (phase === "enter") {
      requestAnimationFrame(() => {
        setPhase("exit");
      });
    }
  }, [pathname]);

  // Listen for clicks on elements with data-transition
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest(
        "[data-transition]"
      ) as HTMLElement | null;

      if (!target) return;

      setPhase("enter");
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (phase === "idle") return null;

  return (
    <div
      className={`${styles.wrapper} ${
        phase === "enter" ? styles.enter : styles.exit
      }`}
    >
      <div className={styles.logo}>
        <Image
          src="/site-logos/logo.png"
          alt="Logo"
          width={140}
          height={140}
          priority
        />
      </div>
    </div>
  );
}
