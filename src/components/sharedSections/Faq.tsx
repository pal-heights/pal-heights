"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Faq.module.css";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const faqContent = {
  banquets: {
    kicker: "PAL HEIGHTS MANTRA BANQUETS",
    titleLine1: "Frequently Asked",
    titleLine2: "Questions",
    groups: [
      {
        heading: "About Our Banquets",
        faqs: [
          {
            question: "What events can be hosted at Pal Heights Mantra Banquets?",
            answer:
              "Pal Heights Mantra hosts weddings, receptions, pre-wedding functions, corporate events, birthdays, anniversaries, and private celebrations.",
          },
          {
            question: "Is Pal Heights Mantra a good wedding venue in Bhubaneswar?",
            answer:
              "Yes, Pal Heights Mantra offers elegant banquet spaces, catering, and event support for memorable weddings.",
          },
          {
            question: "Can I host a destination wedding at Pal Heights Mantra?",
            answer:
              "Yes, Pal Heights Mantra can be considered for destination-style wedding celebrations with accommodation and event spaces.",
          },
          {
            question: "Does Pal Heights Mantra host pre-wedding functions?",
            answer:
              "Yes, you can host functions like mehendi, haldi, sangeet, and engagement celebrations.",
          },
          {
            question:
              "Can Pal Heights Mantra accommodate both intimate and large wedding celebrations?",
            answer:
              "Yes, the venue offers spaces suitable for both intimate gatherings and larger celebrations.",
          },
          {
            question: "Does Pal Heights Mantra provide catering for banquet events?",
            answer:
              "Yes, catering services are available for banquet events, with menus suited to different occasions.",
          },
          {
            question: "Where is Pal Heights Mantra located?",
            answer:
              "Pal Heights Mantra is located in Pahala, Bhubaneswar, along the Bhubaneswar-Cuttack Highway.",
          },
          {
            question: "Can I host corporate events at Pal Heights Mantra?",
            answer:
              "Yes, Pal Heights Mantra is suitable for meetings, conferences, seminars, corporate parties, and other business events.",
          },
          {
            question:
              "How can I enquire about booking a banquet at Pal Heights Mantra?",
            answer:
              "You can contact the Pal Heights Mantra banquet team to discuss your event requirements, dates, and booking options.",
          },
          {
            question:
              "Does Pal Heights Mantra offer venues for birthday and anniversary celebrations?",
            answer:
              "Yes, its banquet spaces are suitable for birthdays, anniversaries, and other family celebrations.",
          },
          {
            question: "Can I host a cocktail party at Pal Heights Mantra?",
            answer:
              "Yes, Pal Heights Mantra can host cocktail parties and other private social gatherings.",
          },
          {
            question:
              "Is Pal Heights Mantra suitable for corporate events in Bhubaneswar?",
            answer:
              "Yes, its banquet spaces and event facilities make it suitable for corporate events in Bhubaneswar.",
          },
          {
            question:
              "Can Pal Heights Mantra host private parties and family celebrations?",
            answer:
              "Yes, the venue is suitable for private parties, family gatherings, and milestone celebrations.",
          },
          {
            question:
              "How can I check availability for an event at Pal Heights Mantra?",
            answer:
              "Simply contact the Pal Heights Mantra banquet team with your preferred date, event type, and guest count to check availability.",
          },
        ],
      },
    ],
  },
  hotel: {
    kicker: "PAL HEIGHTS",
    titleLine1: "Frequently Asked",
    titleLine2: "Questions",
    groups: [
      {
        heading: "Hotel & Accommodation",
        faqs: [
          {
            question: "What is the best luxury hotel in Bhubaneswar?",
            answer:
              "Pal Heights is among the best luxury hotels in Bhubaneswar, offering elegant rooms, exceptional hospitality, fine dining, and premium amenities. Its central location makes it ideal for both business and leisure guests.",
          },
          {
            question:
              "Why is Pal Heights considered one of the best hotels in Bhubaneswar?",
            answer:
              "Pal Heights combines luxury accommodation, award-winning dining, modern event spaces, and personalized service under one roof. Its convenient location and consistent guest experience make it a preferred choice in Bhubaneswar.",
          },
          {
            question:
              "What makes a premium hotel in Bhubaneswar different from other hotels?",
            answer:
              "A premium hotel offers spacious rooms, refined hospitality, superior dining experiences, modern amenities, and personalized guest services. Pal Heights delivers all these with thoughtfully designed spaces for business, leisure, and celebrations.",
          },
          {
            question: "Is Pal Heights a 5-star hotel in Bhubaneswar?",
            answer:
              "Pal Heights offers a premium luxury hospitality experience with world-class amenities, sophisticated accommodations, and exceptional dining. Guests choose Pal Heights for its comfort, service quality, and central location in Bhubaneswar.",
          },
          {
            question: "Which is the best business hotel in Bhubaneswar?",
            answer:
              "Pal Heights is a preferred business hotel with executive rooms, conference facilities, high-speed Wi-Fi, and easy airport access. Its location near major business hubs makes corporate travel convenient and efficient.",
          },
          {
            question: "Which hotel offers luxury rooms in Bhubaneswar?",
            answer:
              "Pal Heights offers elegantly designed luxury rooms and suites equipped with modern amenities for a comfortable stay. Every room is thoughtfully crafted to provide a relaxing experience for business and leisure travellers alike.",
          },
          {
            question: "Where can I book luxury suites in Bhubaneswar?",
            answer:
              "You can book luxury suites directly at Pal Heights through its official website for the best rates and exclusive offers. The suites feature spacious interiors, premium amenities, and exceptional hospitality.",
          },
          {
            question:
              "Which family hotel in Bhubaneswar offers premium amenities?",
            answer:
              "Pal Heights is an excellent choice for families with spacious rooms, multiple dining options, banquet facilities, and attentive service. Its central location also provides easy access to the city's major attractions and shopping destinations.",
          },
          {
            question:
              "Which boutique hotel in Bhubaneswar is best for leisure travellers?",
            answer:
              "Pal Heights offers a boutique luxury experience with stylish interiors, personalized hospitality, and exceptional dining. It is perfect for travellers looking to relax while exploring the cultural charm of Bhubaneswar.",
          },
          {
            question: "How can I book a luxury stay in Bhubaneswar online?",
            answer:
              "You can easily reserve your stay by visiting the official Pal Heights website or contacting the reservations team directly. Booking online allows you to explore room options, exclusive packages, and seasonal offers.",
          },
        ],
      },
      {
        heading: "Airport & Location",
        faqs: [
          {
            question:
              "Which hotel is closest to Biju Patnaik Airport in Bhubaneswar?",
            answer:
              "Pal Heights is conveniently located just a short drive from Biju Patnaik International Airport, making travel effortless. Its prime location is ideal for both business travellers and transit guests.",
          },
          {
            question: "What are the best hotels near Bhubaneswar Airport?",
            answer:
              "Pal Heights is one of the preferred luxury hotels near Bhubaneswar Airport, offering premium accommodation and modern facilities. Guests enjoy quick airport access without compromising on comfort and hospitality.",
          },
          {
            question:
              "Which hotel near Jaydev Vihar offers luxury accommodation?",
            answer:
              "Located near Jaydev Vihar, Pal Heights provides luxury rooms, fine dining, banquet spaces, and premium guest services. It is a popular choice for business visitors and leisure travellers alike.",
          },
          {
            question: "Are there premium hotels near Infocity Bhubaneswar?",
            answer:
              "Yes, Pal Heights offers premium accommodation within convenient reach of Infocity, making daily business travel easier. Its executive facilities and comfortable rooms are ideal for corporate guests.",
          },
          {
            question: "Which hotel is best near KIIT University?",
            answer:
              "Pal Heights is a preferred stay for visitors to KIIT University due to its comfortable accommodation and easy connectivity. Families, faculty members, and professionals appreciate its premium hospitality and convenient location.",
          },
          {
            question: "What are the best hotels near AIIMS Bhubaneswar?",
            answer:
              "Pal Heights offers luxury accommodation with convenient access to AIIMS Bhubaneswar and other important city landmarks. Guests enjoy a peaceful stay supported by excellent service and modern amenities.",
          },
          {
            question: "Which hotel is near Bhubaneswar Railway Station?",
            answer:
              "Pal Heights is located within easy driving distance of Bhubaneswar Railway Station, making it convenient for rail travellers. Its central location ensures quick access to commercial and tourist destinations across the city.",
          },
          {
            question: "Which hotels are located near Kalinga Stadium?",
            answer:
              "Pal Heights is among the preferred luxury hotels near Kalinga Stadium, ideal for athletes, sports enthusiasts, and event attendees. Guests can enjoy premium accommodation with excellent dining and hospitality.",
          },
          {
            question: "Which hotel is near Esplanade One Mall in Bhubaneswar?",
            answer:
              "Pal Heights is conveniently located close to Esplanade One Mall, offering guests easy access to shopping and entertainment. Its location makes it perfect for both leisure stays and weekend getaways.",
          },
          {
            question:
              "Which hotel is conveniently located near Ekamra Haat?",
            answer:
              "Pal Heights is situated close to Ekamra Haat, allowing guests to explore Odisha's traditional handicrafts and cultural heritage. After sightseeing, guests can return to luxurious comfort and exceptional dining.",
          },
        ],
      },
    ],
  },
};

type FaqVariant = keyof typeof faqContent;

/* ─── Single accordion item ────────────────────────────────────────────────── */
function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className={styles.item}>
      <button
        className={styles.trigger}
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span
          className={`${styles.iconWrap}${isOpen ? ` ${styles.iconWrapOpen}` : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`${styles.panel}${isOpen ? ` ${styles.panelOpen}` : ""}`}
        role="region"
      >
        <div className={styles.panelInner}>
          <p className={styles.answer}>{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Group with its own accordion state ───────────────────────────────────── */
function FaqGroup({
  heading,
  faqs,
  groupRef,
}: {
  heading: string;
  faqs: { question: string; answer: string }[];
  groupRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const handleToggle = useCallback(
    (idx: number) => {
      setOpenIndex((prev) => (prev === idx ? -1 : idx));
    },
    [],
  );

  return (
    <div ref={groupRef} className={styles.group}>
      {/* Sub-heading label */}
      <div className={styles.groupLabel}>
        <span className={styles.groupLabelLine} />
        <h3 className={styles.groupHeading}>{heading}</h3>
        <span className={styles.groupLabelLine} />
      </div>

      {/* Accordion */}
      {faqs.map((faq, idx) => (
        <FaqItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        />
      ))}
    </div>
  );
}

/* ─── Main export ───────────────────────────────────────────────────────────── */
export default function Faq({ variant = "banquets" }: { variant?: FaqVariant }) {
  const { kicker, titleLine1, titleLine2, groups } = faqContent[variant];

  const headerRef = useRef<HTMLDivElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const group1Ref = useRef<HTMLDivElement | null>(null);
  const group2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const header = headerRef.current;
    const kickerEl = kickerRef.current;
    const titleEl = titleRef.current;
    const leftLine = leftLineRef.current;
    const rightLine = rightLineRef.current;

    if (!header || !kickerEl || !titleEl || !leftLine || !rightLine) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      // Kicker slides up
      tl.from(kickerEl, {
        y: 40,
        duration: 0.55,
        ease: "power3.out",
      });

      // Title lines stagger up
      tl.from(
        titleEl.querySelectorAll(`.${styles.lineInner}, .${styles.lineInnerAccent}`),
        {
          y: 65,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.12,
        },
        "-=0.3",
      );

      // Decorative lines scale in
      tl.from(
        [leftLine, rightLine],
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.45",
      );

      // Groups fade up
      const groupEls = [group1Ref.current, group2Ref.current].filter(Boolean);
      if (groupEls.length) {
        tl.from(
          groupEls,
          {
            y: 36,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.18,
          },
          "-=0.3",
        );
      }
    }, header);

    return () => ctx.revert();
  }, []);

  const isSingle = groups.length === 1;

  return (
    <section className={styles.section} aria-label="Frequently Asked Questions">
      <div className={styles.container}>
        {/* ── Section Header ── */}
        <div ref={headerRef} className={styles.header}>
          <div className={styles.kickerWrapper}>
            <span ref={kickerRef} className={styles.kicker}>
              {kicker}
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />

            <h2 ref={titleRef} className={styles.sectionTitle}>
              <span className={styles.lineMask}>
                <span className={styles.lineInner}>{titleLine1}</span>
              </span>
              <span className={styles.lineMask}>
                <span className={styles.lineInnerAccent}>{titleLine2}</span>
              </span>
            </h2>

            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* ── FAQ Groups ── */}
        <div className={`${styles.body}${isSingle ? ` ${styles.bodySingle}` : ""}`}>
          {groups.map((group, idx) => (
            <FaqGroup
              key={group.heading}
              heading={group.heading}
              faqs={group.faqs}
              groupRef={idx === 0 ? group1Ref : group2Ref}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
