"use client";

import { useState } from "react";
import CommentsSection, { CommentItem } from "./CommentsSection";
import CommentForm from "../../../../components/forms/CommentForm";

export default function CommentsClient({
  blogSlug,
  blogId,
}: {
  blogSlug: string;
  blogId: string;
}) {
  const [pendingComment, setPendingComment] = useState<CommentItem | null>(
    null,
  );

  return (
    <>
      <CommentsSection blogSlug={blogSlug} pendingComment={pendingComment} />

      <CommentForm
        blogSlug={blogSlug}
        blogId={blogId}
        onCommentSuccess={(comment) => {
          setPendingComment(comment);
        }}
      />
    </>
  );
}
