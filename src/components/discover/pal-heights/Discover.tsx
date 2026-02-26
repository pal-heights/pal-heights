import Hero from "./Sections/Hero";
import SectionOne from "./Sections/DiscoverRooms";
import SectionTwo from "./Sections/DiscoverRoomsDark";
import SectionThree from "./Sections/PalSuites";
import SectionFour from "./Sections/DiningHighlight";
import SectionFive from "./Sections/Wellness";
import SectionSix from "./Sections/Gym";
import SectionSeven from "./Sections/Banquets";

export default function Discover() {
  return (
    <>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
      <SectionSix />
      <SectionSeven />
    </>
  );
}
