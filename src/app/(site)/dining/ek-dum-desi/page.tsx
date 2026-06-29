import type { Metadata } from "next";
import About from "src/components/ek-dum-desi/EkDumDesi";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Ek Dum Desi Bhubaneswar - Authentic North Indian Restaurant",

  description:
    "Experience traditional North Indian dishes at Ek Dum Desi, a leading Pind Da Dhaba Bhubaneswar destination for food lovers and families with warm hospitality.",
  keywords: [
    "Ek Dum Desi Bhubaneswar",
    "Ek Dum Desi restaurant",
    "North Indian restaurant Bhubaneswar",
    "Pind Da Dhaba Bhubaneswar",
    "Best North Indian restaurant in Bhubaneswar",
    "Authentic North Indian food Bhubaneswar",
    "Family restaurant Bhubaneswar",
    "Pal Heights restaurants",
  ],
  alternates: {
    canonical: "https://www.palheights.com/dining/ek-dum-desi",
  },
  openGraph: {
    title: "Ek Dum Desi Bhubaneswar - Authentic North Indian Restaurant",
    description:
      "Experience traditional North Indian dishes at Ek Dum Desi, a leading Pind Da Dhaba Bhubaneswar destination for food lovers and families with warm hospitality.",
    url: "https://www.palheights.com/dining/ek-dum-desi",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Ek%20Dum%20Desi/Hero-1.jpg",
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
const ekDumDesiSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Ek Dum Desi",
  url: "https://www.palheights.com/dining/ek-dum-desi",
  servesCuisine: ["North Indian", "Indian"],
  description:
    "Experience traditional North Indian dishes at Ek Dum Desi, a leading Pind Da Dhaba Bhubaneswar destination for food lovers and families with warm hospitality.",
};
export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ekDumDesiSchema),
        }}
      />
      <About />
    </main>
  );
}
