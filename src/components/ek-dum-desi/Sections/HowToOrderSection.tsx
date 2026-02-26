import { ArrowRight } from "lucide-react";
import styles from "./HowToOrderSection.module.css";

export default function HowToOrderSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.kicker}>CORPORATE & BULK DINING</span>

          <div className={styles.titleRow}>
            <span className={styles.line} />
            <h2 className={styles.title}>
              How to <span>Order</span>
            </h2>
            <span className={styles.line} />
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepIndex}>01</span>
              <div>
                <h3>Choose Your Meal</h3>
                <p>
                  Select from Indian, Oriental, or Healthy meal options curated
                  for offices and large gatherings.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepIndex}>02</span>
              <div>
                <h3>Customize & Confirm</h3>
                <p>
                  Pick veg or non-veg preferences, quantity, and delivery slot
                  with ease.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <span className={styles.stepIndex}>03</span>
              <div>
                <h3>Bulk Order & Enjoy</h3>
                <p>
                  Get fresh, hygienic, and delicious food delivered seamlessly
                  to your office or event.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <h4 className={styles.h4}>
                Delicious & Diverse Menu -{" "}
                <span className={styles.p}>
                  From comforting Indian meals to flavorful Oriental dishes and
                  healthy options, there’s something for everyone.
                </span>
              </h4>
            </div>

            <div className={styles.feature}>
              <h4 className={styles.h4}>
                Perfect for Bulk Orders -{" "}
                <span className={styles.p}>
                  Ideal for offices, events, and corporate gatherings - packed
                  fresh and delivered hassle-free.
                </span>
              </h4>
            </div>

            <div className={styles.feature}>
              <h4 className={styles.h4}>
                Veg & Non-Veg Options -{" "}
                <span className={styles.p}>
                  A wide variety to suit different preferences and dietary
                  needs.
                </span>
              </h4>
            </div>

            <div className={styles.feature}>
              <h4 className={styles.h4}>
                Quality & Hygiene Assured -{" "}
                <span className={styles.p}>
                  Prepared with premium ingredients under strict hygiene
                  standards.
                </span>
              </h4>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={styles.ctaRow}>
          <button className={styles.primaryCta} data-cursor="hover">
            <a href="https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0">
              Start Your Order
            </a>
            <ArrowRight size={16} />
          </button>

          <button className={styles.secondaryCta} data-cursor="hover">
            <a href="https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0">
              Order from Pal Mantra
            </a>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
