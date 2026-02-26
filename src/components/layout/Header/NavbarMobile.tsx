"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import styles from "./NavbarMobile.module.css";

export default function NavbarMobile() {
  const [open, setOpen] = useState(false);
  const [hotelsOpen, setHotelsOpen] = useState(false);
  const [diningOpen, setDiningOpen] = useState(false);
  const [banquetsOpen, setBanquetsOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className={`${styles.toggle} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className={styles.icon}>
          {open ? (
            <X size={28} strokeWidth={1.5} />
          ) : (
            <Menu size={28} strokeWidth={1.5} />
          )}
        </span>
      </button>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${open ? styles.show : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <a href="/" className={styles.navLink}>
            Home
          </a>
          <a href="/about" className={styles.navLink}>
            About Us
          </a>

          {/* Discover Our Hotels DROPDOWN */}
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setHotelsOpen(!hotelsOpen)}
              aria-expanded={hotelsOpen}
            >
              Discover Our Hotels
              <ChevronDown
                size={18}
                className={`${styles.chevron} ${
                  hotelsOpen ? styles.rotate : ""
                }`}
              />
            </button>

            <div
              className={`${styles.dropdownMenu} ${
                hotelsOpen ? styles.show : ""
              }`}
            >
              <a
                href="/discover/pal-heights"
                className={`${styles.subLink} ${styles.subLink} ${styles.subLinkOne} `}
              >
                Pal Heights
              </a>
              <a href="/discover/pal-heights-mantra" className={styles.subLink}>
                Pal Heights Mantra
              </a>
            </div>
          </div>

          {/* DINING DROPDOWN */}
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setDiningOpen(!diningOpen)}
              aria-expanded={diningOpen}
            >
              Dining
              <ChevronDown
                size={18}
                className={`${styles.chevron} ${
                  diningOpen ? styles.rotate : ""
                }`}
              />
            </button>

            <div
              className={`${styles.dropdownMenu} ${
                diningOpen ? styles.show : ""
              }`}
            >
              <a
                href="/dining/pal-heights"
                className={`${styles.subLink} ${styles.subLink} ${styles.subLinkOne} `}
              >
                Pal Heights
              </a>
              <a href="/dining/pal-heights-mantra" className={styles.subLink}>
                Pal Heights Mantra
              </a>
              <a href="/dining/world-baker" className={styles.subLink}>
                World Baker
              </a>
              <a href="/dining/ek-dum-desi" className={styles.subLink}>
                Ek Dum Desi
              </a>
            </div>
          </div>

          {/* BANQUETS DROPDOWN */}
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setBanquetsOpen(!banquetsOpen)}
              aria-expanded={banquetsOpen}
            >
              Banquets
              <ChevronDown
                size={18}
                className={`${styles.chevron} ${
                  banquetsOpen ? styles.rotate : ""
                }`}
              />
            </button>

            <div
              className={`${styles.dropdownMenu} ${
                banquetsOpen ? styles.show : ""
              }`}
            >
              <a
                href="/banquets/pal-heights"
                className={`${styles.subLink} ${styles.subLink} ${styles.subLinkOne} `}
              >
                Pal Heights
              </a>
              <a href="/banquets/pal-heights-mantra" className={styles.subLink}>
                Pal Heights Mantra
              </a>
            </div>
          </div>

          <a href="/news-media" className={styles.navLink}>
            News & Media
          </a>
          <a href="/careers" className={styles.navLink}>
            Careers
          </a>
          <a href="/contact" className={styles.navLink}>
            Contact Us
          </a>

          <div className={styles.dropdown}>
            <button
              className={styles.bookNow}
              onClick={() => setBookOpen(!bookOpen)}
              aria-expanded={bookOpen}
            >
              Book Now
              <ChevronDown
                size={18}
                className={`${styles.chevron} ${bookOpen ? styles.rotate : ""}`}
              />
            </button>

            <div
              className={`${styles.bookNowDropdownMenu} ${
                bookOpen ? styles.show : ""
              }`}
            >
              <a
                href="https://www.swiftbook.io/inst/#home?propertyId=403MjY0mz4AXGyU2TvxXWbbcUP1Njk=&JDRN=Y"
                className={styles.subLink}
              >
                Pal Heights
              </a>
              <a
                href="https://www.swiftbook.io/inst/#home?propertyId=381M8aX5CCCT9l9RgYkswL8jY1Njg=&JDRN=Y"
                className={styles.subLink}
              >
                Pal Heights Mantra
              </a>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
