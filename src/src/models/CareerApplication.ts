import mongoose, { Schema, models, model } from "mongoose";

const CareerApplicationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 20,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    resume: {
      filename: String,
      mimetype: String,
      size: Number,
    },
  },
  { timestamps: true }
);

export default models.CareerApplication ||
  model("CareerApplication", CareerApplicationSchema);
