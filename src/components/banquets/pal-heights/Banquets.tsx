import Image from "next/image";
import Hero from "./Sections/Hero";
import SectionOne from "./Sections/SectionOne";
import SectionTwo from "./Sections/SectionTwo";
import ExperiencesSlider from "./Sections/BanquetsSlider";
import { occasionsSlides } from "./Sections/data1";
import { celebrationSlides } from "./Sections/data2";
import styles from "../Banquets.module.css";

export default function Banquets() {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <div className={styles.linearGradient}></div>
      <div className={styles.bg}>
        <Image
          src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Shared%20assets/bg-1.jpg"
          alt="background"
          fill
          quality={100}
          className={styles.bgImage}
          priority
        />
        <SectionOne />
        <ExperiencesSlider
          slides={occasionsSlides}
          kicker="OCCASION"
          titleLine1="Pal Heights"
          titleLine2="Occassions"
        />
        <ExperiencesSlider
          slides={celebrationSlides}
          kicker="CELEBRATION"
          titleLine1="Pal Heights"
          titleLine2="Celebrations"
        />
        <SectionTwo />
      </div>
    </div>
  );
}
