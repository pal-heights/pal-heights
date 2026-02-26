"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { errorToast, successToast } from "@lib/toast";
import styles from "./CommentForm.module.css";

interface CommentFormProps {
  blogSlug: string;
  blogId: string;
  onCommentSuccess?: (comment: {
    name: string;
    comment: string;
    createdAt: string;
  }) => void;
}

interface CommentFormData {
  userName: string;
  userEmail: string;
  userComment: string;
  saveCredentialsInBrowser: boolean;
  website?: string;
}

interface FormErrors {
  userName?: string;
  userEmail?: string;
  userComment?: string;
}

export default function CommentForm({
  blogSlug,
  blogId,
  onCommentSuccess,
}: CommentFormProps) {
  const [formLoadedAt] = useState<number>(() => Date.now());

  const [formData, setFormData] = useState<CommentFormData>({
    userName: "",
    userEmail: "",
    userComment: "",
    saveCredentialsInBrowser: false,
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------- Load saved credentials ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("blog-comment-user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData((prev) => ({
        ...prev,
        userName: parsed.userName || "",
        userEmail: parsed.userEmail || "",
        saveCredentialsInBrowser: true,
      }));
    }
  }, []);

  /* ---------- Validation ---------- */
  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.userName.trim()) {
      nextErrors.userName = "Name is required";
    }

    if (!emailRegex.test(formData.userEmail)) {
      nextErrors.userEmail = "Valid email is required";
    }

    if (formData.userComment.trim().length < 10) {
      nextErrors.userComment = "Comment must be at least 10 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  /* ---------- Handlers ---------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({ ...prev, [name]: val }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/forms/comment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blogId,
          blogSlug,
          name: formData.userName,
          email: formData.userEmail,
          comment: formData.userComment,
          website: formData.website,
          formLoadedAt,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success(
        "Your comment has been submitted successfully",
        successToast,
      );

      /* ---------- INSTANT UI UPDATE ---------- */
      onCommentSuccess?.({
        name: formData.userName,
        comment: formData.userComment,
        createdAt: new Date().toISOString(),
      });

      /* ---------- Save / remove credentials ---------- */
      if (formData.saveCredentialsInBrowser) {
        localStorage.setItem(
          "blog-comment-user",
          JSON.stringify({
            userName: formData.userName,
            userEmail: formData.userEmail,
          }),
        );
      } else {
        localStorage.removeItem("blog-comment-user");
      }

      /* ---------- Reset form ---------- */
      setFormData({
        userName: "",
        userEmail: "",
        userComment: "",
        saveCredentialsInBrowser: false,
        website: "",
      });
    } catch {
      toast.error(
        "Unable to submit comment. Please try again later.",
        errorToast,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------- Render ---------- */
  return (
    <div className={styles.formContainer} data-cursor-theme="dark">
      <h2 className={styles.title}>Leave a Reply</h2>
      <p className={styles.subtitle}>
        Your email address will not be published.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          value={formData.website || ""}
          onChange={handleChange}
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className={errors.userName ? styles.errorInput : ""}
            />
            {errors.userName && (
              <span className={styles.errorMessage}>{errors.userName}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              name="userEmail"
              type="email"
              value={formData.userEmail}
              onChange={handleChange}
              className={errors.userEmail ? styles.errorInput : ""}
            />
            {errors.userEmail && (
              <span className={styles.errorMessage}>{errors.userEmail}</span>
            )}
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Comment</label>
          <textarea
            name="userComment"
            rows={5}
            value={formData.userComment}
            onChange={handleChange}
            className={errors.userComment ? styles.errorInput : ""}
          />
          {errors.userComment && (
            <span className={styles.errorMessage}>{errors.userComment}</span>
          )}
        </div>

        <div className={styles.checkboxWrapper}>
          <input
            type="checkbox"
            name="saveCredentialsInBrowser"
            checked={formData.saveCredentialsInBrowser}
            onChange={handleChange}
          />
          <label>Save my name and email for next time</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={styles.submitButton}
          data-cursor="hover"
        >
          {isSubmitting ? "Submitting…" : "Submit Comment"}
        </button>
      </form>
    </div>
  );
}
