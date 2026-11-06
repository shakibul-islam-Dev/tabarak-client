import { NextResponse } from "next/server";
import { updateJsonFile } from "@/lib/server/store";


type Subscriber = {
  email: string;
  createdAt: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let alreadySubscribed = false;

    await updateJsonFile<Subscriber[]>(
      "subscribers.json",
      [],
      (subscribers) => {
        if (subscribers.some((subscriber) => subscriber.email === email)) {
          alreadySubscribed = true;
          return subscribers;
        }

        return [
          ...subscribers,
          { email, createdAt: new Date().toISOString() },
        ];
      }
    );

    return NextResponse.json(
      {
        message: alreadySubscribed
          ? "You're already on the list."
          : "You're subscribed.",
      },
      { status: alreadySubscribed ? 200 : 201 }
    );
  } catch (error) {
    console.error("newsletter error", error);
    return NextResponse.json(
      { message: "We couldn't add you to the list. Please try again." },
      { status: 500 }
    );
  }
}
