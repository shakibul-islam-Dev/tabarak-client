import { NextResponse } from "next/server";
import {
  createSessionToken,
  createUser,
  findUserByEmail,
  setSessionCookie,
  validateRegistration,
} from "@/lib/server/auth";


export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const validationError = validateRegistration(body);
    if (validationError) {
      return NextResponse.json({ message: validationError }, { status: 400 });
    }

    const existing = await findUserByEmail(body.email!);
    if (existing) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const user = await createUser({
      name: body.name!,
      email: body.email!,
      password: body.password!,
    });

    await setSessionCookie(createSessionToken(user));

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 }
      );
    }

    console.error("register error", error);
    return NextResponse.json(
      { message: "We couldn't create your account. Please try again." },
      { status: 500 }
    );
  }
}
