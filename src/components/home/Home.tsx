import Hero from "./Sections/VideoHero";
import SectionOne from "./Sections/Properties";
import SectionTwo from "./Sections/ExperiencesSlider";
import SectionThree from "./Sections/Restaurants";
// import SectionFour from "./Sections/Products";
import SectionFive from "./Sections/Blogs";
import SectionSix from "../sharedSections/VideoTestimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      {/* <SectionFour /> */}
      <SectionFive />
      <SectionSix />
    </>
  );
}
