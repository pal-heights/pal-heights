import Hero from "./Sections/Hero";
import SectionOne from "./Sections/DiscoverRooms";
import SectionTwo from "./Sections/DiscoverRoomsDark";
import SectionSix from "./Sections/Invitation";
import SectionSeven from "./Sections/Cabana";
import SectionThree from "./Sections/WeddingGallery";
import SectionFour from "./Sections/CorporateGallery";
import SectionFive from "src/components/sharedSections/InstaPosts";

export default function Banquets() {
  return (
    <>
      <Hero />
      <SectionOne />
      <SectionTwo />
      <SectionSix />
      <SectionSeven />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </>
  );
}
