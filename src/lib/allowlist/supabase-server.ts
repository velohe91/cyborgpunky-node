import { createHmac, timingSafeEqual } from "node:crypto";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

export function getSupabaseServerConfig() {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    throw new Error("Supabase server environment variables are not configured.");
  }

  return {
    url: SUPABASE_URL,
    secretKey: SUPABASE_SECRET_KEY,
  };
}

export async function supabaseServerRequest(
  path: string,
  init?: RequestInit,
) {
  const { url, secretKey } = getSupabaseServerConfig();

  return fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: secretKey,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
}

export function createSignedChallenge(nonce: string) {
  const { secretKey } = getSupabaseServerConfig();
  return createHmac("sha256", secretKey).update(nonce).digest("hex");
}

export function verifySignedChallenge(nonce: string, signature: string) {
  const expected = createSignedChallenge(nonce);

  if (expected.length !== signature.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(signature, "utf8"),
  );
}
