import {
  createHmac,
  randomBytes,
  randomUUID,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { readJsonFile, updateJsonFile } from "@/lib/server/store";

const SESSION_COOKIE = "tabark_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const SECRET = process.env.AUTH_SECRET ?? "tabark-preview-secret-change-me";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type SessionPayload = SessionUser & { exp: number };

function usersFile() {
  return readJsonFile<StoredUser[]>("users.json", []);
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function hashPassword(password: string, salt?: string) {
  const nextSalt = salt ?? randomBytes(16).toString("hex");
  const hash = scryptSync(password, nextSalt, 64).toString("hex");
  return { salt: nextSalt, hash };
}

export function verifyPassword(password: string, user: StoredUser) {
  const { hash } = hashPassword(password, user.salt);
  const stored = Buffer.from(user.passwordHash, "hex");
  const candidate = Buffer.from(hash, "hex");

  if (stored.length !== candidate.length) return false;
  return timingSafeEqual(stored, candidate);
}

export async function findUserByEmail(email: string) {
  const users = await usersFile();
  const normalized = normalizeEmail(email);
  return users.find((user) => user.email === normalized);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
}): Promise<SessionUser> {
  const email = normalizeEmail(input.email);
  const { salt, hash } = hashPassword(input.password);

  const user: StoredUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email,
    passwordHash: hash,
    salt,
    createdAt: new Date().toISOString(),
  };

  await updateJsonFile<StoredUser[]>("users.json", [], (users) => {
    if (users.some((existing) => existing.email === email)) {
      throw new Error("EMAIL_TAKEN");
    }
    return [...users, user];
  });

  return { id: user.id, name: user.name, email: user.email };
}

function sign(value: string) {
  return createHmac("sha256", SECRET).update(value).digest("base64url");
}

export function createSessionToken(user: SessionUser, ttl = SESSION_TTL_SECONDS) {
  const payload: SessionPayload = {
    ...user,
    exp: Date.now() + ttl * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string): SessionUser | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== signatureBuffer.length) return null;
  if (!timingSafeEqual(expectedBuffer, signatureBuffer)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as SessionPayload;

    if (!payload.exp || payload.exp < Date.now()) return null;

    return { id: payload.id, name: payload.name, email: payload.email };
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = verifySessionToken(token);
  if (!session) return null;

  const users = await usersFile();
  const user = users.find((candidate) => candidate.id === session.id);
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email };
}

export function validateRegistration(input: {
  name?: string;
  email?: string;
  password?: string;
}) {
  if (!input.name || input.name.trim().length < 2) {
    return "Please enter your name.";
  }
  if (!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    return "Please enter a valid email address.";
  }
  if (!input.password || input.password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return null;
}
