"use client";

import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const isDarkBg = [
    "/about",
    "/discover/pal-heights",
    "/discover/pal-heights-mantra",
    "/dining/pal-heights",
    "/dining/pal-heights-mantra",
    "/banquets/pal-heights",
    "/banquets/pal-heights-mantra",
    "/news-media",
    "/careers",
    "/contact",
  ].includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.menu}>
        <li>
          <a href="/" className={styles.a}>
            Home
          </a>
        </li>

        <li>
          <a href="/about" className={styles.a}>
            About Us
          </a>
        </li>

        {/* <li>
          <a href="/discover"  className={styles.a}>
            Discover Our Hotels
          </a>
        </li> */}

        {/* Discover Our Hotels */}
        <li className={styles.dropdown}>
          <span className={styles.dropdownTrigger}>
            Discover Our Hotels <ChevronDown size={14} />
          </span>

          <div className={styles.dropdownWrap} data-cursor-theme="dark">
            <div className={styles.dropdownMenu}>
              <a href="/discover/pal-heights">Pal Heights</a>
              <a href="/discover/pal-heights-mantra">Pal Heights Mantra</a>
            </div>
          </div>
        </li>

        {/* DINING DROPDOWN */}
        <li className={styles.dropdown}>
          <span className={styles.dropdownTrigger}>
            Dining <ChevronDown size={14} />
          </span>

          <div className={styles.dropdownWrap} data-cursor-theme="dark">
            <div className={styles.dropdownMenu}>
              <a href="/dining/pal-heights">Pal Heights</a>
              <a href="/dining/pal-heights-mantra">Pal Heights Mantra</a>
              <a href="/dining/world-baker">World Baker</a>
              <a href="/dining/ek-dum-desi">Ek Dum Desi</a>
            </div>
          </div>
        </li>

        {/* BANQUETS – NORMAL LINK */}
        {/* <li>
          <a href="/banquets"  className={styles.a}>
            Banquets
          </a>
        </li> */}

        {/* Discover Our Hotels */}
        <li className={styles.dropdown}>
          <span className={styles.dropdownTrigger}>
            Banquets <ChevronDown size={14} />
          </span>

          <div className={styles.dropdownWrap} data-cursor-theme="dark">
            <div className={styles.dropdownMenu}>
              <a href="/banquets/pal-heights">Pal Heights</a>
              <a href="/banquets/pal-heights-mantra">Pal Heights Mantra</a>
            </div>
          </div>
        </li>

        <li>
          <a href="/news-media" className={styles.a}>
            News & Media
          </a>
        </li>

        <li>
          <a href="/careers" className={styles.a}>
            Careers
          </a>
        </li>

        <li>
          <a href="/contact" className={styles.a}>
            Contact Us
          </a>
        </li>

        <li className={styles.dropdown}>
          <span
            className={`${styles.bookNow} ${isDarkBg ? styles.light : ""} ${
              scrolled ? styles.scrolledButton : ""
            }`}
          >
            Book Now
          </span>

          <div className={styles.dropdownWrap} data-cursor-theme="dark">
            <div className={styles.dropdownMenu}>
              <a href="https://www.swiftbook.io/inst/#home?propertyId=403MjY0mz4AXGyU2TvxXWbbcUP1Njk=&JDRN=Y">
                Pal Heights
              </a>
              <a href="https://www.swiftbook.io/inst/#home?propertyId=381M8aX5CCCT9l9RgYkswL8jY1Njg=&JDRN=Y">
                Pal Heights Mantra
              </a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
