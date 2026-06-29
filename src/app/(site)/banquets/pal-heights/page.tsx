import type { Metadata } from "next";
import Banquets from "src/components/banquets/pal-heights/Banquets";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Best Wedding Venues, Conference Halls in Bhubaneswar",

  description:
    "Host weddings, conferences and special events at Pal Heights, featuring the best wedding venues and conference halls in Bhubaneswar. Contact Today.",

  keywords: [
    "best wedding venues in Bhubaneswar",
    "Best conference halls in Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/banquets/pal-heights",
  },
  openGraph: {
    title: "Best Wedding Venues, Conference Halls in Bhubaneswar",
    description:
      "Host weddings, conferences and special events at Pal Heights, featuring the best wedding venues and conference halls in Bhubaneswar. Contact Today.",
    url: "https://www.palheights.com/banquets/pal-heights",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Banquets%20Pal%20Heights/Hero.jpg",
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
const palHeightsBanquetsSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Pal Heights Banquets",
  url: "https://www.palheights.com/banquets/pal-heights",
  description:
    "Host weddings, conferences and special events at Pal Heights, featuring the best wedding venues and conference halls in Bhubaneswar. Contact Today.",
};
export default function BanquetsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(palHeightsBanquetsSchema),
        }}
      />
      <Banquets />
    </main>
  );
}
