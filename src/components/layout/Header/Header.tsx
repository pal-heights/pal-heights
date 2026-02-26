"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div
        className={`${styles.inner} ${scrolled ? styles.innerScrolled : ""}`}
      >
        {/* Logo */}
        <a href="/" className={styles.logo}>
          <Image
            src="/site-logos/logo.png"
            alt="Pal Heights"
            className={`${styles.siteLogo} ${
              scrolled ? styles.logoScrolled : ""
            }`}
            data-cursor="hover"
            width={200}
            height={60}
            priority
          />
        </a>

        {/* Desktop Navbar */}
        <div className={styles.desktopNav}>
          <Navbar />
        </div>

        {/* Mobile Navbar */}
        <div className={styles.mobileNav}>
          <NavbarMobile />
        </div>
      </div>
    </header>
  );
}
