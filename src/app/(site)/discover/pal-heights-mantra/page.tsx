import type { Metadata } from "next";
import Discover from "src/components/discover/pal-heights-mantra/Discover";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Pal Heights Mantra Bhubaneswar - Hotel Near Cuttack Highway",

  description:
    "Experience comfort at Pal Heights Mantra Hotel Bhubaneswar Cuttack, a preferred choice among hotels in Bhubaneswar near highway. Contact us now.",

  keywords: [
    "Pal heights Mantra Bhubaneswar",
    "pal heights mantra Bhubaneswar Cuttack",
    "pal heights mantra hotel Bhubaneswar Cuttack",
    "Hotels in Bhubaneswar near highway",
  ],
  alternates: {
    canonical: "https://www.palheights.com/discover/pal-heights-mantra",
  },
  openGraph: {
    title: "Pal Heights Mantra Bhubaneswar - Hotel Near Cuttack Highway",
    description:
      "Experience comfort at Pal Heights Mantra Hotel Bhubaneswar Cuttack, a preferred choice among hotels in Bhubaneswar near highway. Contact us now.",
    url: "https://www.palheights.com/discover/pal-heights-mantra",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Discover%20Pal%20Heights%20Mantra/Hero.jpg",
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
  //     "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Dining%20Pal%20Heights%20Mantra/Hero.jpg",
  //   ],
  // },
};
const palHeightsMantraSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Pal Heights Mantra",
  url: "https://www.palheights.com/discover/pal-heights-mantra",
  description:
    "Experience comfort at Pal Heights Mantra Hotel Bhubaneswar Cuttack, a preferred choice among hotels in Bhubaneswar near highway. Contact us now.",
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
          __html: JSON.stringify(palHeightsMantraSchema),
        }}
      />
      <Discover />
    </main>
  );
}
