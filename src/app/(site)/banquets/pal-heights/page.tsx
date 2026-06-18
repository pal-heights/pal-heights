import type { Metadata } from "next";
import Banquets from "src/components/banquets/pal-heights/Banquets";

export const metadata: Metadata = {
  metadataBase: new URL("https:/palheights.com/"),
  title: "Pal Heights | Premier Hotel & Hospitality Experience",
  description:
    "Banquets Pal Heights — elegant rooms, fine dining, premium banquets, and exceptional hospitality in the heart of Bhubaneswar.",
  keywords: [
    "Pal Heights",
    "Hotel Bhubaneswar",
    "Luxury Hotel",
    "Fine Dining",
    "Banquet Halls",
    "Hospitality",
    "Rooms",
    "Restaurant",
    "Events",
  ],
  openGraph: {
    title: "Pal Heights | Premier Hotel & Hospitality Experience",
    description:
      "Experience premium rooms, gourmet dining, banquets, and warm hospitality at Pal Heights.",
    url: "https:/palheights.com/",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/banquets/pal-heights/hero.jpg", // replace when you add real image
        width: 1200,
        height: 630,
        alt: "Pal Heights Hotel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pal Heights | Premier Hotel Experience",
    description:
      "Premium rooms, dining, and banquet spaces at Pal Heights, Bhubaneswar.",
    images: [
      "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Pal%20Icons/Logo.png",
    ],
  },
};

export default function BanquetsPage() {
  return (
    <main>
      {" "}
      <Banquets />{" "}
    </main>
  );
}
