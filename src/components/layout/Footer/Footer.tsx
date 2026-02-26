import styles from "./Footer.module.css";
import { Facebook, Instagram, Twitter, MapPin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const brandLogos = Array(10).fill("/site-logos/logo.png");

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.container}>
          <div className={styles.top}>
            {/* Column 1 */}
            <div className={styles.colLeft}>
              <h4 className={styles.smallHeading}>
                Welcome to Pal Heights <br />
                Group of Hotels
              </h4>

              <p className={styles.paragraph}>
                Pal Heights Group of Hotels happens to be the best hotels in
                Bhubaneswar and stands as a beacon of exceptional hospitality.
                Renowned as one of the premier luxury hotels in the city, we are
                dedicated to ensuring that our guests enjoy an unforgettable
                stay, thanks to our top-notch amenities and extraordinary
                service.
              </p>

              <div className={styles.socialWrapper}>
                <div className={styles.socialEntity}>
                  <span className={styles.socialTitle}>Pal Heights</span>
                  <div className={styles.socialIcons}>
                    <a
                      href="https://www.facebook.com/PalHeights/"
                      aria-label="Pal Heights Facebook"
                    >
                      <Facebook className={styles.socialIcon} />
                    </a>
                    <a
                      href="https://www.instagram.com/palheightshotel/"
                      aria-label="Pal Heights Instagram"
                    >
                      <Instagram className={styles.socialIcon} />
                    </a>
                    <a
                      href="https://x.com/hotelpalheights"
                      aria-label="Pal Heights X"
                    >
                      <FaXTwitter className={styles.socialIcon} />
                    </a>
                    <a
                      href="https://www.tripadvisor.in/Hotel_Review-g297661-d1585589-Reviews-Pal_Heights-Bhubaneswar_Khurda_District_Odisha.html"
                      aria-label="Pal Heights Tripadvisor"
                    >
                      <img
                        src="/tripadvisorlight.png"
                        className={`${styles.socialIcon} ${styles.socialIconImage}`}
                      />
                    </a>
                  </div>
                </div>

                <div
                  className={`${styles.socialEntity} ${styles.socialEntityMantra}`}
                >
                  <span className={styles.socialTitle}>Pal Heights Mantra</span>
                  <div className={styles.socialIcons}>
                    <a
                      href="https://www.facebook.com/palheightsmantra/"
                      aria-label="Pal Heights Mantra Facebook"
                    >
                      <Facebook className={styles.socialIcon} />
                    </a>
                    <a
                      href="https://www.tripadvisor.in/Hotel_Review-g297661-d12102141-Reviews-Pal_Heights_Mantra-Bhubaneswar_Khurda_District_Odisha.html"
                      aria-label="Pal Heights Mantra Tripadvisor"
                    >
                      <img
                        src="/tripadvisorlight.png"
                        className={`${styles.socialIcon} ${styles.socialIconImage}`}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className={styles.col}>
              <ul className={styles.links}>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/about">About Us</a>
                </li>
                <li>
                  <a href="/services">Services</a>
                </li>
                <li>
                  <a href="/products">Products</a>
                </li>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </div>

            {/* Column 3 — Contact */}
            <div className={styles.col}>
              <div className={styles.footerBlock}>
                <h5 className={styles.footerBlockTitle}>Contact Details</h5>

                <div className={styles.footerSubBlock}>
                  <span className={styles.footerLabel}>Pal Heights -</span>
                  <a href="tel:9937144455">9937144455</a>
                  <a href="mailto:gm@palheights.com">gm@palheights.com</a>
                </div>

                <div className={styles.footerSubBlock}>
                  <span className={styles.footerLabel}>
                    Pal Heights Mantra -
                  </span>
                  <a href="tel:8342000661">8342000661</a>
                  <a href="tel:8342000662">8342000662</a>
                  <a href="mailto:gm@palheightsmantra.com">
                    gm@palheightsmantra.com
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4 — Location */}
            <div className={styles.colRight}>
              <div className={styles.footerBlock}>
                <h5 className={styles.footerBlockTitle}>Reach us at</h5>

                <div className={styles.footerSubBlock}>
                  <span className={styles.footerLabel}>Pal Heights -</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=J-7,+Jayadev+Vihar+Rd,+Jayadev+Vihar,+Bhubaneswar,+Odisha+751013"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    J-7, Jayadev Vihar Rd, Jayadev Vihar, Bhubaneswar, Odisha
                    751013
                  </a>

                  <a href="tel:06742361156">06742361156</a>
                </div>

                <div className={styles.footerSubBlock}>
                  <span className={styles.footerLabel}>
                    Pal Heights Mantra -
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plot+No-26,+Pahal,+Bhubaneswar,+Odisha+752010"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Plot No-26, Pahal, Bhubaneswar, Odisha 752010
                  </a>

                  <a href="tel:06742460811">06742460811</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.brandsContainer}>
            <span className={styles.brandsTitle}>OUR BRANDS</span>
            <div className={styles.brandsList}>
              {brandLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className={styles.brandLogo}
                />
              ))}
              {/* Duplicating for double as requested */}
              {brandLogos.map((logo, index) => (
                <img
                  key={index + 10}
                  src={logo}
                  alt={`Brand ${index + 1}`}
                  className={styles.brandLogo}
                />
              ))}
            </div>
          </div>
          {/* Bottom */}
          <div className={styles.bottom}>
            <div className={styles.policyLinks}>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Policy</a>
              <a href="#">About Cookies</a>
            </div>

            <div className={styles.bottomRow}>
              <p className={styles.disclaimer}>
                This product focuses on providing organizations with tools to
                achieve financial transparency. It might include features for
                budgeting, expense tracking, financial reporting, and analytics
                to help businesses understand and communicate their financial
                health clearly.
              </p>

              <a href="#" className={styles.bottomTerms}>
                Terms and Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
