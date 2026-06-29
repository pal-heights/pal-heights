import type { Metadata } from "next";
import Dining from "src/components/dining/pal-heights-mantra/Dining";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Best Rooftop Restaurants in Bhubaneswar Cuttack",

  description:
    "Finding rooftop restaurants in Bhubaneswar Cuttack? Pal Heights Mantra the best rooftop restaurant and the best dining destination in Bhubaneswar Cuttack.",

  keywords: [
    "Best restaurant in Bhubaneswar Cuttack",
    "Rooftop restaurants in Bhubaneswar Cuttack",
  ],
  alternates: {
    canonical: "https://www.palheights.com/dining/pal-heights-mantra",
  },
  openGraph: {
    title: "Best Rooftop Restaurants in Bhubaneswar Cuttack",
    description:
      "Finding rooftop restaurants in Bhubaneswar Cuttack? Pal Heights Mantra the best rooftop restaurant and the best dining destination in Bhubaneswar Cuttack.",
    url: "https://www.palheights.com/dining/pal-heights-mantra",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights%20Mantra/Hero.jpg",
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
const diningPalHeightsMantraSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Dining at Pal Heights Mantra",
  url: "https://www.palheights.com/dining/pal-heights-mantra",
  servesCuisine: ["Indian", "Continental"],
  description:
    "Finding rooftop restaurants in Bhubaneswar Cuttack? Pal Heights Mantra the best rooftop restaurant and the best dining destination in Bhubaneswar Cuttack.",
};
export default function DiningPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(diningPalHeightsMantraSchema),
        }}
      />
      <Dining />
    </main>
  );
}
