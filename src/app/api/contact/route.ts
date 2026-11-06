import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { updateJsonFile } from "@/lib/server/store";


type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const message = body.message?.trim();
    const subject = body.subject?.trim() || "General enquiry";

    if (!name || name.length < 2) {
      return NextResponse.json(
        { message: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { message: "Please write a message of at least 10 characters." },
        { status: 400 }
      );
    }

    const entry: ContactMessage = {
      id: randomUUID(),
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    };

    await updateJsonFile<ContactMessage[]>("messages.json", [], (messages) => [
      ...messages,
      entry,
    ]);

    return NextResponse.json(
      {
        message:
          "Thank you — your message is in. We reply within one working day.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("contact error", error);
    return NextResponse.json(
      { message: "We couldn't send your message. Please try again." },
      { status: 500 }
    );
  }
}
