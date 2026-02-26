import Hero from "./Sections/Hero";
import SectionOne from "./Sections/Properties";
import SectionTwo from "./Sections/ExperiencesSlider";
import SectionThree from "./Sections/Products";
import SectionFour from "./Sections/Blogs";
import SectionFive from "../sharedSections/VideoTestimonials";

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
