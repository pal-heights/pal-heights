import type { Metadata } from "next";
import Home from "../../components/home/Home";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com/"),
  title: "Pal Heights - Best Luxury Hotels in Bhubaneswar, Odisha",
  description:
    "Stay at one of the best luxury hotels in Bhubaneswar, Odisha. Pal Heights offers premium accommodations, amenities and exceptional hospitality. Contact now.",
  keywords: [
    "Best hotels in Bhubaneswar",
    "Hotels in Bhubaneswar Odisha",
    "Hotel in Bhubaneswar city",
    "Best luxury hotels in Bhubaneswar",
    "Luxury hotels Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/",
  },
  openGraph: {
    title: "Pal Heights - Best Luxury Hotels in Bhubaneswar, Odisha",
    description:
      "Stay at one of the best luxury hotels in Bhubaneswar, Odisha. Pal Heights offers premium accommodations, amenities and exceptional hospitality. Contact now.",
    url: "https://www.palheights.com/",

    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Homepage/Hero.jpg",
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
  //   images: ["/site-logos/logo.png"],
  // },
};

const hotelSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Pal Heights",
  url: "https://www.palheights.com/",
  logo: "https://www.palheights.com/logo.png", // replace if different
  description:
    "Stay at one of the best luxury hotels in Bhubaneswar, Odisha. Pal Heights offers premium accommodations, amenities and exceptional hospitality. Contact now.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bhubaneswar",
    addressRegion: "Odisha",
    addressCountry: "IN",
  },
  telephone: "+91-9937144455",
  priceRange: "₹₹₹",
  sameAs: [],
};

export default function HomePage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />
      <Home />
    </main>
  );
}
