"use client";

import { useState } from "react";
import styles from "./FooterCta.module.css";
import { Ripple } from "src/components/ui/Ripple";
import { toast } from "react-hot-toast";

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

export default function FooterCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const res = await fetch("/api/forms/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verified: false,
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

        throw new Error(data?.error || "Subscription failed");
      }

      toast.success("You’re subscribed! We’ll keep you updated.", successToast);

      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.", errorToast);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.footer}>
      {/* Background Animation */}
      <div className={styles.rippleWrap}>
        <Ripple />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h2>
          Get Exclusive Updates
          <br />
          Sign up now to be in the know!
        </h2>

        <p>
          Will be used in accordance with our <a>Privacy Policy</a>
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputWrap}>
            <input
              id="subscribe"
              type="email"
              placeholder="email@email.com"
              aria-label="Email address"
              data-cursor-theme="dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
            />
            <button type="submit" data-cursor-theme="dark" disabled={loading}>
              {loading ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
