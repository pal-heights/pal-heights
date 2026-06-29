import type { Metadata } from "next";
import Banquets from "src/components/banquets/pal-heights-mantra/Banquets";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Marriage Banquet Halls, Corporate Event Venue in Bhubaneswar",

  description:
    "Choose Pal Heights Mantra for elegant marriage banquet halls in Bhubaneswar and the best venue for corporate events in Bhubaneswar. Contact Us Today.",

  keywords: [
    "Marriage Banquet Halls in Bhubaneswar",
    "Best venue for corporate event in Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/banquets/pal-heights-mantra",
  },
  openGraph: {
    title: "Marriage Banquet Halls, Corporate Event Venue in Bhubaneswar",
    description:
      "Choose Pal Heights Mantra for elegant marriage banquet halls in Bhubaneswar and the best venue for corporate events in Bhubaneswar. Contact Us Today.",
    url: "https://www.palheights.com/banquets/pal-heights-mantra",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Banquets%20Pal%20Heights%20Mantra/Hero.jpg",
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
const palHeightsMantraBanquetsSchema = {
  "@context": "https://schema.org",
  "@type": "EventVenue",
  name: "Pal Heights Mantra Banquets",
  url: "https://www.palheights.com/banquets/pal-heights-mantra",
  description:
    "Choose Pal Heights Mantra for elegant marriage banquet halls in Bhubaneswar and the best venue for corporate events in Bhubaneswar. Contact Us Today.",
};
export default function BanquetsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(palHeightsMantraBanquetsSchema),
        }}
      />
      <Banquets />
    </main>
  );
}
