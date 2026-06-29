import type { Metadata } from "next";
import About from "../../../components/about/About";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Premium Hotels in Bhubaneswar Near Airport and Highway",

  description:
    "Looking for premium hotels in Bhubaneswar? Pal Heights is a leading choice among hotels near Bhubaneswar airport and hotels in Bhubaneswar near highway.",

  keywords: [
    "premium hotels in Bhubaneswar",
    "Hotels near Bhubaneswar airport",
    "Hotels in Bhubaneswar near highway",
  ],
  alternates: {
    canonical: "https://www.palheights.com/about",
  },

  openGraph: {
    title: "Premium Hotels in Bhubaneswar Near Airport and Highway",
    description:
      "Looking for premium hotels in Bhubaneswar? Pal Heights is a leading choice among hotels near Bhubaneswar airport and hotels in Bhubaneswar near highway.",
    url: "https://www.palheights.com/about/",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/About%20Us/Hero.jpg",
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

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Pal Heights",
  url: "https://www.palheights.com/about/",
  description:
    "Looking for premium hotels in Bhubaneswar? Pal Heights is a leading choice among hotels near Bhubaneswar airport and hotels in Bhubaneswar near highway.",
};

export default function AboutPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <About />
    </main>
  );
}
