"use client";

import { useEffect, useState } from "react";
import styles from "./CommentsSection.module.css";

export interface CommentItem {
  name: string;
  comment: string;
  createdAt: string;
}

interface CommentsSectionProps {
  blogSlug: string;
  /** optional: used for instant UI update after submit */
  pendingComment?: CommentItem | null;
}

export default function CommentsSection({
  blogSlug,
  pendingComment,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  /* ---------- Fetch comments AFTER page load ---------- */
  useEffect(() => {
    let active = true;

    async function fetchComments() {
      try {
        const res = await fetch(`/api/comments?slug=${blogSlug}`);
        if (!res.ok) return;

        const data = await res.json();
        if (active) setComments(data);
      } catch {
        // silent fail — comments must never break blog
      } finally {
        if (active) setLoaded(true);
      }
    }

    fetchComments();
    return () => {
      active = false;
    };
  }, [blogSlug]);

  /* ---------- Inject newly added comment instantly ---------- */
  useEffect(() => {
    if (!pendingComment) return;

    setComments((prev) => {
      // prevent duplicate injection
      const exists = prev.some(
        (c) =>
          c.comment === pendingComment.comment &&
          c.name === pendingComment.name,
      );

      return exists ? prev : [pendingComment, ...prev];
    });
  }, [pendingComment]);

  if (!loaded || comments.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Comments</h2>

      <div className={styles.list}>
        {comments.map((c, i) => (
          <div key={i} className={styles.comment}>
            <strong className={styles.name}>{c.name}</strong>
            <p className={styles.text}>{c.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
