import type { Metadata } from "next";
import Discover from "src/components/discover/pal-heights/Discover";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Pal Heights - Best Hotels in Bhubaneswar, Odisha",

  description:
    "Choose Pal Heights Hotel in Bhubaneswar for a luxury stay. Enjoy modern rooms, fine dining and the comfort of one of the best hotels in Bhubaneswar.",

  keywords: [
    "Pal heights hotel Bhubaneswar",
    "Pal heights Bhubaneswar",
    "Best hotels in Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/discover/pal-heights",
  },
  openGraph: {
    title: "Pal Heights - Best Hotels in Bhubaneswar, Odisha",
    description:
      "Choose Pal Heights Hotel in Bhubaneswar for a luxury stay. Enjoy modern rooms, fine dining and the comfort of one of the best hotels in Bhubaneswar.",
    url: "https://www.palheights.com/discover/pal-heights",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Discover%20Pal%20Heights/Hero.jpg",
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
const palHeightsSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Pal Heights",
  url: "https://www.palheights.com/discover/pal-heights",
  description:
    "Choose Pal Heights Hotel in Bhubaneswar for a luxury stay. Enjoy modern rooms, fine dining and the comfort of one of the best hotels in Bhubaneswar.",
  starRating: {
    "@type": "Rating",
    ratingValue: "5",
  },
};
export default function DiscoverPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(palHeightsSchema),
        }}
      />
      <Discover />
    </main>
  );
}
