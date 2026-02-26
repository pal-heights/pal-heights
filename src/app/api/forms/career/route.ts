import { NextResponse } from "next/server";
import CareerApplication from "@/models/CareerApplication";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export async function POST(req: Request) {
  try {
    // Dynamic imports to avoid module-level errors
    const { connectDB } = await import("@lib/db");
    const { transporter } = await import("@lib/mailer");
    
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const position = formData.get("position") as string;
    const message = formData.get("message") as string;
    const resume = formData.get("resume") as File | null;

    // Basic validation
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    if (!resume) {
      return NextResponse.json(
        { error: "Resume is required" },
        { status: 400 }
      );
    }

    // File validation
    if (!ALLOWED_TYPES.includes(resume.type)) {
      return NextResponse.json(
        { error: "Only PDF or image files are allowed" },
        { status: 400 }
      );
    }

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 2MB" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    await connectDB();

    // Save to DB
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
      },
    });

    // Send Email
    await transporter.sendMail({
      from: `"Career Form" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.GMAIL_USER,
      subject: `New Career Application – ${position}`,
      html: `
        <h3>New Job Application</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Message:</strong><br/>${message || "-"}</p>
        <p><strong>Resume:</strong></p>
      `,
      attachments: [
        {
          filename: resume.name,
          content: buffer,
          contentType: resume.type,
        },
      ],
    });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Career API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
