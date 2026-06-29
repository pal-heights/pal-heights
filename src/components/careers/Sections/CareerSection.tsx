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
  Loader2,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./CareerSection.module.css";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

// ── Types ──────────────────────────────────────────────────────────────────────
type FormState = {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File | null;
  message: string;
};

type Errors = Partial<Record<keyof FormState | "captcha", string>>;

// ── Toast presets ──────────────────────────────────────────────────────────────
const toastStyle = {
  error: {
    style: {
      background: "#7f1d1d",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "14px",
    },
  },
  success: {
    style: {
      background: "#14532d",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "14px",
    },
  },
};

// ── Constants ──────────────────────────────────────────────────────────────────
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_MIME = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ALLOWED_LABEL = "PDF, JPG, PNG or WEBP · Max 2 MB";

const EMPTY_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  position: "",
  resume: null,
  message: "",
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function CareerSection() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement | null>(null);
  const kickerRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const leftLineRef = useRef<HTMLSpanElement | null>(null);
  const rightLineRef = useRef<HTMLSpanElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const actionsRef = useRef<HTMLDivElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const captchaRef = useRef<ReCAPTCHA | null>(null);

  // ── Scroll entrance animation ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      tl.from(kickerRef.current, { y: 50, duration: 0.6, ease: "power3.out" })
        .from(
          titleRef.current?.querySelectorAll("span") || [],
          { y: 80, duration: 0.8, ease: "power3.out" },
          "-=0.3",
        )
        .from(
          leftLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.45",
        )
        .from(
          rightLineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power3.out",
          },
          "<",
        )
        .from(
          formRef.current?.querySelectorAll(
            `.${styles.field}, .${styles.fileField}, .${styles.textareaField}`,
          ) || [],
          {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.2",
        )
        .from(
          actionsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.45,
            ease: "power3.out",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── File change handler ──────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, resume: file }));

    if (!file) return;

    if (!ALLOWED_MIME.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        resume: "Invalid file type. Only PDF, JPG, PNG or WEBP allowed.",
      }));
    } else if (file.size > MAX_FILE_SIZE) {
      setErrors((prev) => ({
        ...prev,
        resume: "File size must be under 2 MB.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, resume: undefined }));
    }
  };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const resetForm = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setCaptchaToken(null);
    captchaRef.current?.reset();
    if (fileRef.current) fileRef.current.value = "";
  };

  // ── Validation ───────────────────────────────────────────────────────────────
  const validateForm = (): boolean => {
    const next: Errors = {};

    if (form.name.trim().length < 2) next.name = "Please enter your full name";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email address";

    if (!/^\d{10,15}$/.test(form.phone.replace(/\D/g, "")))
      next.phone = "Please enter a valid phone number";

    if (!form.position.trim()) next.position = "Position is required";

    if (!form.resume) {
      next.resume = "Resume is required";
    } else if (!ALLOWED_MIME.includes(form.resume.type)) {
      next.resume = "Invalid file type. Only PDF, JPG, PNG or WEBP allowed.";
    } else if (form.resume.size > MAX_FILE_SIZE) {
      next.resume = "File size must be under 2 MB.";
    }

    if (!captchaToken) next.captcha = "Please complete the reCAPTCHA";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("position", form.position);
      fd.append("message", form.message);
      fd.append("captchaToken", captchaToken!);
      if (form.resume) fd.append("resume", form.resume);

      const res = await fetch("/api/forms/career", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Submission failed");

      toast.success("Application submitted successfully!", toastStyle.success);
      resetForm();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, toastStyle.error);
      // Reset captcha on failure so user can retry
      captchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
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
        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
          noValidate
        >
          {/* NAME */}
          <div className={`${styles.field} ${errors.name ? styles.error : ""}`}>
            <User size={18} className={styles.svg} />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              disabled={loading}
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
              type="email"
              placeholder="Email Address"
              value={form.email}
              disabled={loading}
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
              type="tel"
              placeholder="Phone Number"
              defaultValue={+91}
              value={form.phone}
              disabled={loading}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          {/* POSITION */}
          <div
            className={`${styles.field} ${styles.positionField} ${errors.position ? styles.error : ""}`}
          >
            <Briefcase size={18} className={styles.svg} />
            <input
              type="text"
              placeholder="Position Applying For"
              value={form.position}
              disabled={loading}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            />
            {errors.position && (
              <span className={styles.errorText}>{errors.position}</span>
            )}
          </div>

          {/* RESUME */}
          <div
            className={`${styles.fileField} ${errors.resume ? styles.error : ""}`}
          >
            <Upload size={18} className={styles.fileIcon} />
            <input
              ref={fileRef}
              type="file"
              className={styles.fileInput}
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              disabled={loading}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className={styles.fileLabel}
              disabled={loading}
              onClick={() => fileRef.current?.click()}
            >
              {form.resume ? form.resume.name : "Upload Your Resume"}
            </button>
            {/* hint and error on separate rows, never overlapping */}
            <span className={styles.fileHint}>{ALLOWED_LABEL}</span>
            {errors.resume && (
              <span className={styles.fileError}>{errors.resume}</span>
            )}
          </div>

          {/* MESSAGE */}
          <div className={`${styles.field} ${styles.textareaField}`}>
            <MessageSquare size={18} className={styles.svg} />
            <textarea
              placeholder="Why are you a good fit for this position?"
              maxLength={300}
              value={form.message}
              disabled={loading}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <span className={styles.charCount}>{form.message.length}/300</span>
          </div>

          {/* RECAPTCHA */}
          <div className={styles.captchaWrap}>
            <ReCAPTCHA
              ref={captchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={(token) => {
                setCaptchaToken(token);
                if (token)
                  setErrors((prev) => ({ ...prev, captcha: undefined }));
              }}
              onExpired={() => {
                setCaptchaToken(null);
                setErrors((prev) => ({
                  ...prev,
                  captcha: "reCAPTCHA expired, please verify again",
                }));
              }}
            />
            {errors.captcha && (
              <span className={styles.errorText}>{errors.captcha}</span>
            )}
          </div>

          {/* ACTIONS */}
          <div ref={actionsRef} className={styles.actions}>
            <button type="submit" disabled={loading} className={styles.submit}>
              {loading ? (
                <>
                  <Loader2 size={16} className={styles.spinner} />
                  Submitting…
                </>
              ) : (
                "Submit Application"
              )}
            </button>
            <button
              type="button"
              disabled={loading}
              className={styles.cancel}
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
