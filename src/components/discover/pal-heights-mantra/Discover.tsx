import Hero from "./Sections/Hero";
import SectionOne from "./Sections/DiscoverRooms";
import SectionTwo from "./Sections/DiscoverRoomsDark";
import SectionThree from "./Sections/PalSuites";
import SectionFour from "./Sections/PresidentialSuite";
import SectionFive from "./Sections/DiningHighlight";
import SectionFiveTwo from "./Sections/DiningHighlightTwo";
import SectionSix from "./Sections/Wellness";
import SectionSeven from "./Sections/Gym";
import SectionEight from "./Sections/Banquets";

export default function Discover() {
  return (
    <>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionFiveTwo />
      <SectionSix />
      <SectionSeven />
      <SectionEight />
    </>
  );
}
