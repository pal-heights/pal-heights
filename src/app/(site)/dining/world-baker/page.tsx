import type { Metadata } from "next";
import About from "src//components/world-baker/WorldBaker";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Best Bakery and Cafe in Bhubaneswar - World Baker",

  description:
    "Visit World Baker by Pal Heights for fresh cakes, pastries, gourmet hampers, coffee and delightful treats at one of the best bakeries in Bhubaneswar.",
  keywords: [
    "World Baker Bhubaneswar",
    "Best bakery in Bhubaneswar",
    "Best cafe in Bhubaneswar",
    "Bakery and cafe in Bhubaneswar",
    "Fresh cakes in Bhubaneswar",
    "Pastries in Bhubaneswar",
    "Coffee shop Bhubaneswar",
    "Pal Heights World Baker",
  ],
  alternates: {
    canonical: "https://www.palheights.com/dining/world-baker",
  },
  openGraph: {
    title: "Best Bakery and Cafe in Bhubaneswar - World Baker",
    description:
      "Visit World Baker by Pal Heights for fresh cakes, pastries, gourmet hampers, coffee and delightful treats at one of the best bakeries in Bhubaneswar.",
    url: "https://www.palheights.com/dining/world-baker",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20World%20Baker/Hero-1.jpg",
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
const worldBakerSchema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "World Baker",
  url: "https://www.palheights.com/dining/world-baker",
  description:
    "Visit World Baker by Pal Heights for fresh cakes, pastries, gourmet hampers, coffee and delightful treats at one of the best bakeries in Bhubaneswar.",
};
export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(worldBakerSchema),
        }}
      />
      <About />
    </main>
  );
}
