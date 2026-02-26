"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Upload,
} from "lucide-react";
import styles from "./CareerSection.module.css";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  position?: string;
  resume?: string;
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

  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "other",
    position: "",
    resume: null as File | null,
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  /* ----------------------------------------
     SCROLL ENTRANCE ANIMATION
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
            ease: "power3.out",
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
            `.${styles.field}, .${styles.fileField}, .${styles.textareaField}`
          ) || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.2"
        )

        .from(
          actionsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ----------------------------------------
     FORM LOGIC (UNCHANGED)
  ---------------------------------------- */
  const validate = () => {
    const next: Errors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address";
    if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Please enter a valid phone number";
    if (!form.position.trim()) next.position = "Position is required";
    if (!form.resume) next.resume = "Resume is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateResume = (file: File | null) => {
    if (!file) return "Resume is required";

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF or image files are allowed";
    }

    if (file.size > 2 * 1024 * 1024) {
      return "File size must be under 2MB";
    }

    return null;
  };

  const validateForm = () => {
    const next: Errors = {};

    if (form.name.trim().length < 2) next.name = "Please enter your full name";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address";

    if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Please enter a valid phone number";

    if (!form.position.trim()) next.position = "Position is required";

    const resumeError = validateResume(form.resume);
    if (resumeError) next.resume = resumeError;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("position", form.position);
      formData.append("message", form.message);

      if (form.resume) {
        formData.append("resume", form.resume);
      }

      const res = await fetch("/api/forms/career", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      toast.success("Application submitted successfully", successToast);

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "other",
        position: "",
        resume: null,
        message: "",
      });

      setErrors({});
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", errorToast);
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
              APPLICATION FORM
            </span>
          </div>

          <div className={styles.titleRow}>
            <span ref={leftLineRef} className={styles.line} />
            <h2 ref={titleRef} className={styles.title}>
              <span>Grow With</span>{" "}
              <span className={styles.span}>Pal Heights</span>
            </h2>
            <span ref={rightLineRef} className={styles.line} />
          </div>
        </div>

        {/* FORM */}
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          {/* NAME */}
          <div className={`${styles.field} ${errors.name ? styles.error : ""}`}>
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

          {/* POSITION */}
          <div
            className={`${styles.field} ${styles.positionField} ${
              errors.position ? styles.error : ""
            }`}
          >
            <Briefcase size={18} className={styles.svg} />
            <input
              placeholder="Position Applying For"
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
            {errors.position && (
              <span className={styles.errorText}>{errors.position}</span>
            )}
          </div>

          {/* RESUME */}
          <div
            className={`${styles.fileField} ${
              errors.resume ? styles.error : ""
            }`}
          >
            <Upload size={18} className={styles.fileIcon} />
            <input
              ref={fileRef}
              type="file"
              className={styles.fileInput}
              accept=".pdf,image/jpeg,image/png,image/webp"
              onChange={(e) =>
                setForm({ ...form, resume: e.target.files?.[0] || null })
              }
            />
            <button
              type="button"
              className={styles.fileLabel}
              onClick={() => fileRef.current?.click()}
            >
              {form.resume ? form.resume.name : "Upload Your Resume"}
            </button>
            {errors.resume && (
              <span className={styles.errorText}>{errors.resume}</span>
            )}
          </div>

          {/* MESSAGE */}
          <div className={`${styles.field} ${styles.textareaField}`}>
            <MessageSquare size={18} className={styles.svg} />
            <textarea
              placeholder="Why are you a good fit for this position?"
              maxLength={300}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <span className={styles.charCount}>{form.message.length}/300</span>
          </div>

          <div ref={actionsRef} className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="reset"
              disabled={loading}
              className={styles.cancel}
              onClick={() => {
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  service: "other",
                  position: "",
                  resume: null,
                  message: "",
                });
                setErrors({});
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
