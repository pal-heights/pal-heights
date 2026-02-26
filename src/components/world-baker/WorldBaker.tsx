import Hero from "./Sections/HeroAutoSlider";
import SectionOne from "./Sections/ImageCardsSection";
import SectionTwo from "./Sections/Products";
import SectionThree from "./Sections/ImageCard";
import SectionFour from "./Sections/ImageCardReverse";
import SectionFive from "./Sections/Baker";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </>
  );
}
