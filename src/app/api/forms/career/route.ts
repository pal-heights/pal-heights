import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import CareerApplication from "@/models/CareerApplication";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: false,
});

export async function POST(req: Request) {
  try {
    const { connectDB } = await import("@lib/db");

    const formData = await req.formData();

    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const position = (formData.get("position") as string)?.trim();
    const message = (formData.get("message") as string)?.trim() ?? "";
    const captchaToken = (formData.get("captchaToken") as string)?.trim();
    const resume = formData.get("resume") as File | null;

    // ── Field validation ──────────────────────────────────────────────
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 },
      );
    }

    // ── reCAPTCHA verification ────────────────────────────────────────
    if (!captchaToken) {
      return NextResponse.json(
        { error: "Please complete the reCAPTCHA" },
        { status: 400 },
      );
    }

    const captchaRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
      },
    );
    const captchaData = await captchaRes.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed. Please try again." },
        { status: 400 },
      );
    }

    // ── File validation ───────────────────────────────────────────────
    if (!resume) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(resume.type)) {
      return NextResponse.json(
        { error: "Only PDF, JPG, PNG, or WEBP files are allowed" },
        { status: 400 },
      );
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size must be under 2 MB" },
        { status: 400 },
      );
    }

    // ── Upload to Cloudflare R2 ───────────────────────────────────────
    const buffer = Buffer.from(await resume.arrayBuffer());
    const ext = resume.name.split(".").pop() ?? "bin";
    const key = `Applicants/${randomUUID()}-${Date.now()}.${ext}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: resume.type,
      }),
    );

    // ── Save to MongoDB ───────────────────────────────────────────────
    await connectDB();

    await CareerApplication.create({
      name,
      email,
      phone,
      position,
      message,
      resume: {
        filename: resume.name,
        mimetype: resume.type,
        size: resume.size,
        key,
      },
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Career API]", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 },
    );
  }
}
