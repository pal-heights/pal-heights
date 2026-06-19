import mongoose from "mongoose";

const AnnouncementImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: false,
    },
    data: {
      type: String,
      required: false,
    },
    mime: {
      type: String,
      required: false,
    },
    size: {
      type: Number, // bytes
      required: false,
    },
  },
  {
    _id: false,
    validate: {
      validator(image: { url?: string; data?: string; mime?: string }) {
        return Boolean(image.url || (image.data && image.mime));
      },
      message: "Announcement image must contain either a url or data/mime",
    },
  },
);

const AnnouncementSchema = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ["single", "slider"],
      required: true,
    },

    images: {
      type: [AnnouncementImageSchema],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", AnnouncementSchema);
