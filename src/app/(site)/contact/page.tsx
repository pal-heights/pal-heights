import type { Metadata } from "next";
import Contact from "../../../components/contact/Contact";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.palheights.com"),

  title: "Contact Pal Heights Bhubaneswar - Reservations and Events",

  description:
    "Connect with Pal Heights Bhubaneswar for hotel reservations, dining experiences, banquet bookings, wedding and corporate events, meetings and guest services.",
  keywords: [
    "Pal Heights contact",
    "Contact Pal Heights Bhubaneswar",
    "Pal Heights reservations",
    "Hotel booking Bhubaneswar",
    "Banquet booking Bhubaneswar",
    "Wedding venue booking Bhubaneswar",
    "Corporate event booking Bhubaneswar",
    "Pal Heights Bhubaneswar",
  ],
  alternates: {
    canonical: "https://www.palheights.com/contact/",
  },
  openGraph: {
    title: "Contact Pal Heights Bhubaneswar - Reservations and Events",
    description:
      "Connect with Pal Heights Bhubaneswar for hotel reservations, dining experiences, banquet bookings, wedding and corporate events, meetings and guest services.",
    url: "https://www.palheights.com/contact/",
    siteName: "Pal Heights",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Contact/Hero.jpg", // keep your existing image URL if different
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
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Pal Heights",
  url: "https://www.palheights.com/contact/",
  description:
    "Connect with Pal Heights Bhubaneswar for hotel reservations, dining experiences, banquet bookings, wedding and corporate events, meetings and guest services.",
};
export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <Contact />
    </main>
  );
}
