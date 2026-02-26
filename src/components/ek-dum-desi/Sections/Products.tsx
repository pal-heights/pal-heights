import Image from "next/image";
import styles from "./Products.module.css";

export default function ImageCard() {
  return (
    <section className={styles.section} data-cursor-theme="dark">
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <span className={styles.kicker}>WORLD BAKER</span>

          <div className={styles.titleRow}>
            <span className={styles.line} />
            <h2 className={styles.sectionTitle}>
              Crafted with <br className={styles.br} />{" "}
              <span className={styles.span}>Happiness</span>
            </h2>
            <span className={styles.line} />
          </div>
        </div>

        {/* PAIRS */}
        <div className={styles.grid}>
          {/* PAIR 1 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/dining/ek-dum-desi/product-1.jpg"
                alt=""
                fill
                data-lightbox
              />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Ek Dum <span>Desi</span>
              </h3>

              <p className={styles.desc}>
                Homely, rich flavours prepared with care, bringing comfort and
                familiarity to every bite—thoughtfully packed for convenience
                without compromising on taste or quality.
              </p>

              <a href="#" data-cursor="hover">
                Explore More
              </a>
            </div>
          </div>

          {/* PAIR 2 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/dining/ek-dum-desi/product-1.jpg"
                alt=""
                fill
                data-lightbox
              />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Truly <span>Oriental</span>
              </h3>

              <p className={styles.desc}>
                Homely, rich flavours crafted from quality ingredients,
                balancing tradition and taste, and carefully packed to ensure
                freshness and ease wherever you choose to enjoy them.
              </p>

              <a
                href="https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0"
                data-cursor="hover"
              >
                Explore More
              </a>
            </div>
          </div>

          {/* PAIR 3 */}
          <div className={styles.card}>
            <div className={styles.imageWrap}>
              <Image
                src="/dining/ek-dum-desi/product-1.jpg"
                alt=""
                fill
                data-lightbox
              />
            </div>

            <div className={styles.content}>
              <h3 className={styles.title}>
                Taste meets <span>Health</span>
              </h3>

              <p className={styles.desc}>
                Homely, rich flavours that feel comforting and satisfying, made
                to travel well and packed for everyday convenience while keeping
                the experience wholesome and fulfilling.
              </p>

              <a
                href="https://api.whatsapp.com/send/?phone=918342000662&text&type=phone_number&app_absent=0"
                data-cursor="hover"
              >
                Explore More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
