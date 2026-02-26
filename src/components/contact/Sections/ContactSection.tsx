"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Mail,
  Phone,
  Building2,
  MessageSquare,
  ChevronDown,
  MapPin,
  PhoneCall,
} from "lucide-react";
import styles from "./ContactSection.module.css";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { label: "Pal Heights", value: "pal-heights" },
  { label: "Pal Heights Mantra", value: "pal-heights-mantra" },
  { label: "Other", value: "other" },
];

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
};

const errorToast = {
  style: {
    background: "#7f1d1d",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "14px",
  },
};

const successToast = {
  style: {
    background: "#14532d",
    color: "#fff",
    borderRadius: "8px",
    fontSize: "14px",
  },
};

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "other",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  /* CLOSE DROPDOWN */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ----------------------------------------
     SCROLL ENTRANCE (GSAP)
  ---------------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(kickerRef.current, {
        y: 50,
        duration: 0.6,
        ease: "power3.out",
      })

        .from(
          titleRef.current?.querySelectorAll("span") || [],
          {
            y: 80,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.3"
        )

        .from(
          leftLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          rightLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "<"
        )

        .from(
          formRef.current?.querySelectorAll(
            `.${styles.field}, .${styles.dropdown}, .${styles.textareaField}`
          ) || [],
          {
            y: 26,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.1,
          },
          ">-0.5"
        )

        .from(
          `.${styles.actions} button`,
          {
            y: 20,
            autoAlpha: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.08,
          },
          ">-0.3"
        )

        .from(
          infoRef.current?.children || [],
          {
            y: 30,
            autoAlpha: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.12,
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* VALIDATION */
  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address";
    if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Please enter a valid phone number";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/forms/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service ? [form.service] : [],
          message: form.message,
          verified: true,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);

        if (res.status === 429) {
          toast.error(
            data?.error || "Too many requests. Please try again later.",
            errorToast
          );
          return;
        }

        throw new Error(data?.error || "Failed to submit form");
      }

      toast.success("Thank you! We’ll get back to you shortly.", successToast);

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "other",
        message: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", errorToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      data-cursor-theme="dark"
    >
      <div className={styles.container}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.kickerWrap}>
            <span ref={kickerRef} className={styles.kicker}>
              CONTACT US
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <h2 ref={titleRef} className={styles.title}>
              <span> Get in</span> <span className={styles.span}>Touch</span>
            </h2>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        <div className={styles.grid}>
          {/* FORM */}
          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            {/* NAME */}
            <div
              className={`${styles.field} ${errors.name ? styles.error : ""}`}
            >
              <User size={18} className={styles.svg} />
              <input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            {/* EMAIL */}
            <div
              className={`${styles.field} ${errors.email ? styles.error : ""}`}
            >
              <Mail size={18} className={styles.svg} />
              <input
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            {/* PHONE */}
            <div
              className={`${styles.field} ${errors.phone ? styles.error : ""}`}
            >
              <Phone size={18} className={styles.svg} />
              <input
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              {errors.phone && (
                <span className={styles.errorText}>{errors.phone}</span>
              )}
            </div>

            {/* SERVICE DROPDOWN */}
            <div
              ref={dropdownRef}
              className={`${styles.field} ${styles.dropdown}`}
            >
              <Building2 size={18} className={styles.svg} />

              <button
                type="button"
                className={`${styles.dropdownValue} ${styles.selected}`}
                onClick={() => setOpen((v) => !v)}
              >
                {SERVICES.find((s) => s.value === form.service)?.label}
              </button>

              <ChevronDown
                size={18}
                className={open ? styles.chevronOpen : ""}
              />

              {open && (
                <div className={styles.dropdownMenu}>
                  {SERVICES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setForm({ ...form, service: item.value });
                        setOpen(false);
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* MESSAGE */}
            <div className={`${styles.field} ${styles.textareaField}`}>
              <MessageSquare size={18} className={styles.svg} />
              <textarea
                placeholder="Your Message (optional)"
                maxLength={300}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <span className={styles.charCount}>
                {form.message.length}/300
              </span>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                disabled={loading}
                data-cursor="hover"
                className={styles.submit}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>

              <button
                type="reset"
                disabled={loading}
                className={styles.cancel}
                data-cursor="hover"
                onClick={() => {
                  setForm({
                    name: "",
                    email: "",
                    phone: "",
                    service: "other",
                    message: "",
                  });
                  setErrors({});
                }}
              >
                Clear
              </button>
            </div>
          </form>

          {/* INFO */}
          <div ref={infoRef} className={styles.info}>
            <div className={styles.card}>
              <h3>PAL HEIGHTS MANTRA</h3>

              <a
                href="https://maps.google.com/?q=Plot No-26, Pahal, Bhubaneswar, Odisha 752010"
                target="_blank"
                className={styles.linkRow}
              >
                <MapPin size={16} className={styles.svg} />
                <span>
                  Plot No-26, Pahal,
                  <br />
                  Bhubaneswar, Odisha 752010
                </span>
              </a>

              <a href="tel:8342000661" className={styles.linkRow}>
                <PhoneCall size={16} className={styles.svg} />
                83420 00661
              </a>
              <a href="tel:8342000662" className={styles.linkRow}>
                <PhoneCall size={16} className={styles.svg} />
                83420 00662
              </a>
            </div>

            <div className={styles.card}>
              <h3>PAL HEIGHTS</h3>

              <a
                href="https://maps.google.com/?q=J-7, Jayadev Vihar Rd, Bhubaneswar, Odisha 751013"
                target="_blank"
                className={styles.linkRow}
              >
                <MapPin size={16} className={styles.svg} />
                <span>
                  J-7, Jayadev Vihar Rd,
                  <br />
                  Bhubaneswar, Odisha 751013
                </span>
              </a>

              <a href="tel:9937144455" className={styles.linkRow}>
                <PhoneCall size={16} className={styles.svg} />
                99371 44455
              </a>
            </div>

            <div className={styles.map}>
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Bhubaneswar&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
