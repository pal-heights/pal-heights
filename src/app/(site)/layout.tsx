import type { Metadata } from "next";
import "@styles/globals.css";
import "@styles/variables.css";
import { Merriweather, Inter, Alegreya_Sans, Habibi } from "next/font/google";
import Cursor from "src/components/layout/Cursor/morphing-outline/CustomCursor";
import Header from "src/components/layout/Header/Header";
import Footer from "src/components/layout/Footer/Footer";
import FooterCta from "src/components/layout/Footer/FooterCta";
import RouteLoader from "src/components/loaders/RouteLoader";
import PopUp from "src/components/popup/kidney";
import PageTransition from "src/components/loaders/PageTransition";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "src/context/LoadingContext";
import Script from "next/script";

const palHeading = Merriweather({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const palSmallHeading = Inter({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-small-heading",
});

const palParagraph = Alegreya_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-paragraph",
});

const palAllCaps = Habibi({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-allcaps",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://palheights.com/"),

  title: {
    default: "Pal Heights | Luxury Hotel, Dining & Banquets",
    template: "%s | Pal Heights",
  },

  description:
    "Pal Heights is a luxury hotel offering premium stays, fine dining, elegant banquets, and exceptional hospitality experiences.",

  keywords: [
    "Pal Heights",
    "Luxury Hotel",
    "Hotel in Bhubaneswar",
    "Fine Dining",
    "Banquet Hall",
    "Resort",
    "Business Hotel",
    "Wedding Venue",
    "Premium Hospitality",
  ],

  authors: [{ name: "Pal Heights" }],
  creator: "Pal Heights",
  publisher: "Pal Heights",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Pal Heights | Luxury Hotel, Dining & Banquets",
    description:
      "Experience premium hospitality at Pal Heights — luxury rooms, fine dining, and elegant banquets.",
    url: "http://palheights.com/",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Pal Heights Hotel",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pal Heights | Luxury Hotel & Hospitality",
    description: "Luxury stays, dining, and banquets at Pal Heights.",
    images: ["/site-logos/logo.png"],
  },

  icons: {
    icon: "/site-logos/favicon.ico",
    shortcut: "/site-logos/favicon-16x16.png",
  },

  alternates: {
    canonical: "http://palheights.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${palHeading.variable}
          ${palSmallHeading.variable}
          ${palParagraph.variable}
          ${palAllCaps.variable}
        `}
      >
        <LoadingProvider>
          <RouteLoader />
          {/* <PageTransition /> */}
          <Toaster position="top-right" />
          <Cursor />
          <PopUp />
          <Header />
          {children}
          <Script src="/scripts/lightbox.js" strategy="afterInteractive" />
          <FooterCta />
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}
