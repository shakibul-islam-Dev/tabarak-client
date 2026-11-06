import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Small JSON-file store used by the preview API routes (newsletter, contact,
 * accounts). It keeps the demo fully functional without any external service.
 * Swap these helpers for a real database client when a backend is available.
 */
const DATA_DIR = path.join(process.cwd(), ".data");

const locks = new Map<string, Promise<unknown>>();

async function readFile<T>(name: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, name), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeFile<T>(name: string, data: T): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const target = path.join(DATA_DIR, name);
  const temp = `${target}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(temp, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(temp, target);
}

export async function readJsonFile<T>(name: string, fallback: T): Promise<T> {
  return readFile(name, fallback);
}

/**
 * Serialises read-modify-write cycles per file so concurrent requests don't
 * clobber each other.
 */
export async function updateJsonFile<T>(
  name: string,
  fallback: T,
  mutate: (current: T) => T | Promise<T>
): Promise<T> {
  const previous = locks.get(name) ?? Promise.resolve();

  const next = previous.then(async () => {
    const current = await readFile(name, fallback);
    const updated = await mutate(current);
    await writeFile(name, updated);
    return updated;
  });

  locks.set(
    name,
    next.catch(() => undefined)
  );

  const result = await next;

  if (locks.get(name) === next) {
    locks.delete(name);
  }

  return result;
}
