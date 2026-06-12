import Image from "next/image";
import Hero from "./Sections/Hero";
import SectionOne from "./Sections/SectionOne";
import SectionTwo from "./Sections/SectionTwo";
import ExperiencesSlider from "./Sections/BanquetsSlider";
import { occasionsSlides } from "./Sections/data1";
import { celebrationSlides } from "./Sections/data2";
import { invitationSlides } from "./Sections/data3";
import { cabanaSlides } from "./Sections/data4";
import styles from "../Banquets.module.css";

export default function Banquets() {
  return (
    <div className={styles.wrapper}>
      <Hero />
      <div className={styles.linearGradient}></div>
      <div className={styles.bg}>
        <Image
          src="/banquets/background.jpg"
          alt="background"
          fill
          quality={100}
          className={styles.bgImage}
          priority
        />
        <SectionOne />
        <ExperiencesSlider
          slides={occasionsSlides}
          kicker="BALLROOM"
          titleLine1="Pal Heights Mantra"
          titleLine2="Ballroom"
        />
        <ExperiencesSlider
          slides={celebrationSlides}
          kicker="FEELINGS"
          titleLine1="Pal Heights Mantra"
          titleLine2="Feelings"
        />
        <ExperiencesSlider
          slides={invitationSlides}
          kicker="INVITATION"
          titleLine1="Pal Heights Mantra"
          titleLine2="Invitation"
        />
        <ExperiencesSlider
          slides={cabanaSlides}
          kicker="CABANA"
          titleLine1="Pal Heights Mantra"
          titleLine2="Cabana"
        />
        <SectionTwo />
      </div>
    </div>
  );
}
