import type { Metadata } from "next";
import Dining from "src/components/dining/pal-heights/Dining";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Best Rooftop Cafe and Restaurant in Bhubaneswar Odisha",

  description:
    "Experience one of the best restaurants in BBSR, Odisha. Enjoy fine dining, stunning rooftop views at a top rooftop restaurant and cafe in Bhubaneswar.",

  keywords: [
    "Best restaurant in Bhubaneswar Odisha",
    "Rooftop restaurants in BBSR",
    "Best rooftop cafe in Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/dining/pal-heights",
  },
  openGraph: {
    title: "Best Rooftop Cafe and Restaurant in Bhubaneswar Odisha",
    description:
      "Experience one of the best restaurants in BBSR, Odisha. Enjoy fine dining, stunning rooftop views at a top rooftop restaurant and cafe in Bhubaneswar.",
    url: "https://www.palheights.com/dining/pal-heights",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights/Hero.webp",
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
const diningPalHeightsSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Dining at Pal Heights",
  url: "https://www.palheights.com/dining/pal-heights",
  servesCuisine: ["Indian", "Chinese", "Continental"],
  description:
    "Experience one of the best restaurants in BBSR, Odisha. Enjoy fine dining, stunning rooftop views at a top rooftop restaurant and cafe in Bhubaneswar.",
};
export default function DiningPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(diningPalHeightsSchema),
        }}
      />
      <Dining />
    </main>
  );
}
