import mongoose, { Schema, models, model } from "mongoose";

/* ---------- Sub Schemas ---------- */

const ImageSchema = new Schema(
  {
    data: { type: String, required: true }, // base64
    mime: { type: String, required: true },
    size: { type: Number, required: true },
  },
  { _id: false }
);

const BlockSchema = new Schema(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "heading",
        "paragraph",
        "list",
        "table",
        "faq",
        "divider",
        "image",
        "link", // ✅ FIXED: added
      ],
      required: true,
    },
    data: { type: Schema.Types.Mixed },
  },
  { _id: false }
);

/* ---------- Main Blog Schema ---------- */

const BlogSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    featureImage: {
      type: ImageSchema,
      required: true,
    },

    meta: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
    },

    tags: {
      type: [String], // ✅ FIXED: added
      default: [],
    },

    blocks: {
      type: [BlockSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* ---------- Export ---------- */

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
