import { NextResponse } from "next/server";
import {
  createSessionToken,
  findUserByEmail,
  setSessionCookie,
  verifyPassword,
} from "@/lib/server/auth";


export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { message: "Enter your email and password." },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(body.email);

    if (!user || !verifyPassword(body.password, user)) {
      return NextResponse.json(
        { message: "That email and password combination doesn't match." },
        { status: 401 }
      );
    }

    await setSessionCookie(
      createSessionToken({ id: user.id, name: user.name, email: user.email })
    );

    return NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("login error", error);
    return NextResponse.json(
      { message: "We couldn't sign you in. Please try again." },
      { status: 500 }
    );
  }
}
