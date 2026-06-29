import type { ReactNode } from "react";
import styles from "./Editor.module.css";

interface BlogContentRendererProps {
  content: any;
}

function renderMarks(text: string, marks?: any[]) {
  if (!marks || marks.length === 0) {
    return text;
  }

  return marks.reduce<ReactNode>((node, mark) => {
    if (mark.type === "bold" || mark.type === "strong") {
      return <strong key={Math.random()}>{node}</strong>;
    }

    if (mark.type === "italic" || mark.type === "em") {
      return <em key={Math.random()}>{node}</em>;
    }

    if (mark.type === "underline") {
      return <u key={Math.random()}>{node}</u>;
    }

    if (mark.type === "strike" || mark.type === "strikethrough") {
      return <s key={Math.random()}>{node}</s>;
    }

    if (mark.type === "highlight" || mark.type === "mark") {
      return <mark key={Math.random()}>{node}</mark>;
    }

    if (mark.type === "subscript" || mark.type === "sub") {
      return <sub key={Math.random()}>{node}</sub>;
    }

    if (mark.type === "superscript" || mark.type === "sup") {
      return <sup key={Math.random()}>{node}</sup>;
    }

    if (mark.type === "code") {
      return <code key={Math.random()}>{node}</code>;
    }

    if (mark.type === "link") {
      return (
        <a
          key={Math.random()}
          href={mark.attrs?.href || mark.attrs?.link || "#"}
          target={mark.attrs?.target || "_blank"}
          rel="noopener noreferrer"
        >
          {node}
        </a>
      );
    }

    return node;
  }, text);
}

function renderNode(node: any, index: number): React.ReactNode {
  const children = node.content?.map((child: any, idx: number) =>
    renderNode(child, idx),
  );

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "paragraph":
      return <p key={index}>{children}</p>;

    case "heading": {
      const level = Math.min(6, Math.max(1, node.attrs?.level || 1));
      if (level === 1) return <h1 key={index}>{children}</h1>;
      if (level === 2) return <h2 key={index}>{children}</h2>;
      if (level === 3) return <h3 key={index}>{children}</h3>;
      if (level === 4) return <h4 key={index}>{children}</h4>;
      if (level === 5) return <h5 key={index}>{children}</h5>;
      return <h6 key={index}>{children}</h6>;
    }

    case "bulletList":
      return <ul key={index}>{children}</ul>;

    case "orderedList":
      return <ol key={index}>{children}</ol>;

    case "listItem":
      return <li key={index}>{children}</li>;

    case "blockquote":
      return <blockquote key={index}>{children}</blockquote>;

    case "codeBlock":
      return (
        <pre key={index}>
          <code>{node.content?.[0]?.text || ""}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr key={index} />;

    case "table":
      return <table key={index}>{children}</table>;

    case "tableRow":
      return <tr key={index}>{children}</tr>;

    case "tableHeader":
      return <th key={index}>{children}</th>;

    case "tableCell":
      return <td key={index}>{children}</td>;

    case "image": {
      const src = node.attrs?.src || node.attrs?.src || node.attrs?.imageUrl;
      if (!src) return null;
      return (
        <img
          key={index}
          src={src}
          alt={node.attrs?.alt || node.attrs?.title || ""}
          className={styles.inlineImage}
        />
      );
    }

    case "hardBreak":
      return <br key={index} />;

    case "text":
      return (
        <span key={index}>{renderMarks(node.text || "", node.marks)}</span>
      );

    default:
      return <div key={index}>{children || node.text || null}</div>;
  }
}

export default function BlogContentRenderer({
  content,
}: BlogContentRendererProps) {
  const parsedContent =
    typeof content === "string" ? safeParseContent(content) : content;

  if (!parsedContent || !parsedContent.content?.length) {
    return null;
  }

  return (
    <div className={styles.editor}>
      <div className="ProseMirror">{parsedContent.content.map(renderNode)}</div>
    </div>
  );
}

function safeParseContent(value: string) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
