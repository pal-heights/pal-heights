import type { Metadata } from "next";
import NewsMedia from "../../../components/news-media/NewsMedia";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "News & Media | Pal Heights",

  description:
    "Stay updated with the latest news, events, announcements, hospitality insights, and stories from Pal Heights in Bhubaneswar.",

  keywords: [
    "Pal Heights news",
    "Pal Heights blog",
    "Pal Heights media",
    "Hospitality news Bhubaneswar",
    "Hotel news Bhubaneswar",
    "Luxury hotel updates",
    "Pal Heights events",
    "Travel and hospitality blog",
  ],

  alternates: {
    canonical: "https://www.palheights.com/news-media",
  },

  openGraph: {
    title: "News & Media | Pal Heights",
    description:
      "Stay updated with the latest news, events, announcements, hospitality insights, and stories from Pal Heights in Bhubaneswar.",
    url: "https://www.palheights.com/news-media",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/News%20&%20Media/Hero.jpg",
        width: 1200,
        height: 630,
        alt: "Pal Heights News & Media",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Pal Heights | Premier Hotel Experience",
  //   description:
  //     "Premium rooms, dining, and banquet spaces at Pal Heights, Bhubaneswar.",
  //   images: [
  //     "/https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Pal%20Icons/Logo.png",
  //   ],
  // },
};

export default function NewsMediaPage() {
  return (
    <main>
      <NewsMedia />
    </main>
  );
}
