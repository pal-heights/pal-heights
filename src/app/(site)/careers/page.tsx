import type { Metadata } from "next";
import Careers from "../../../components/careers/Careers";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Careers | Pal Heights",

  description:
    "Explore career opportunities at Pal Heights. Join our hospitality team and build your career in luxury hotels, dining, events, and guest services in Bhubaneswar.",
  keywords: [
    "Pal Heights careers",
    "Careers at Pal Heights",
    "Hospitality jobs Bhubaneswar",
    "Hotel jobs Bhubaneswar",
    "Hotel careers Odisha",
    "Hospitality careers Odisha",
    "Luxury hotel jobs",
    "Pal Heights Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/careers",
  },
  openGraph: {
    title: "Careers | Pal Heights",
    description:
      "Explore career opportunities at Pal Heights. Join our hospitality team and build your career in luxury hotels, dining, events, and guest services in Bhubaneswar.",
    url: "https://www.palheights.com/careers",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Careers/Hero.jpg",
        width: 1200,
        height: 630,
        alt: "Pal Heights Hotel",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Pal Heights | Premier Hotel Experience",
  //   description:
  //     "Premium rooms, dining, and banquet spaces at Pal Heights, Bhubaneswar.",
  //   images: [
  //     "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Pal%20Icons/Logo.png",
  //   ],
  // },
};

export default function CareersPage() {
  return (
    <main>
      <Careers />
    </main>
  );
}
