/* ===================== IMPORTS ===================== */
import Image from "next/image";
import styles from "./page.module.css";
import { getBlogBySlug, type BlogData } from "./blog-data";
import CommentsClient from "./CommentsClient";

/* ===================== INNER PAGE ===================== */
export default async function BlogPageInner({
  slug,
  blog,
}: {
  slug?: string;
  blog?: BlogData;
}) {
  const resolvedBlog = blog ?? (await getBlogBySlug(slug));

  return (
    <>
      <article className={styles.wrapper}>
        <div className={styles.hero}>
          {(() => {
            const heroSrc =
              resolvedBlog.featureImageUrl ||
              resolvedBlog.featureImage?.url ||
              (resolvedBlog.featureImage?.data &&
              resolvedBlog.featureImage?.mime
                ? `data:${resolvedBlog.featureImage.mime};base64,${resolvedBlog.featureImage.data}`
                : undefined);

            return heroSrc ? (
              <Image
                src={heroSrc}
                alt={resolvedBlog.meta.title}
                fill
                priority
                className={styles.heroImage}
              />
            ) : null;
          })()}

          <div className={styles.overlay}>
            <div className={styles.overlayInner}>
              <div className={styles.author}>
                <div className={styles.authorImageWrap}>
                  <img
                    src="https://pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev/Pal%20Icons/Logo.png"
                    alt="Pal Heights"
                    className={styles.authorImage}
                  />
                </div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>Pal Heights</span>
                  <span className={styles.authorRole}>Official Insights</span>
                </div>
              </div>

              <h1 className={styles.title}>{resolvedBlog.meta.title}</h1>

              <div className={styles.metaRow}>
                <div className={styles.categoryWrap}>
                  <span className={styles.categoryLabel}>Category -</span>
                  <span className={styles.category}>
                    {resolvedBlog.meta.category}
                  </span>
                </div>

                {resolvedBlog.tags?.length > 0 && (
                  <div className={styles.tags}>
                    {resolvedBlog.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.description}>{resolvedBlog.meta.description}</p>

          <div className={styles.blocks}>
            {resolvedBlog.blocks.map((block) => {
              switch (block.type) {
                case "heading":
                  return block.data.level === "h3" ? (
                    <h3 key={block.id}>{block.data.text}</h3>
                  ) : (
                    <h2 key={block.id}>{block.data.text}</h2>
                  );

                case "paragraph":
                  return <p key={block.id}>{block.data.text}</p>;

                case "list":
                  return block.data.style === "ordered" ? (
                    <ol key={block.id}>
                      {block.data.items.map((i: string, idx: number) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ol>
                  ) : (
                    <ul key={block.id}>
                      {block.data.items.map((i: string, idx: number) => (
                        <li key={idx}>{i}</li>
                      ))}
                    </ul>
                  );

                case "image": {
                  const imageSrc =
                    block.data.imageUrl ||
                    block.data.url ||
                    (block.data.data && block.data.mime
                      ? `data:${block.data.mime};base64,${block.data.data}`
                      : undefined);

                  return imageSrc ? (
                    <img
                      key={block.id}
                      src={imageSrc}
                      className={styles.inlineImage}
                      alt={block.data.alt || ""}
                    />
                  ) : null;
                }

                default:
                  return null;
              }
            })}
          </div>
        </div>

        <div className={styles.commentsSection}>
          <CommentsClient
            blogSlug={resolvedBlog.slug}
            blogId={resolvedBlog._id}
          />
        </div>
      </article>
    </>
  );
}
