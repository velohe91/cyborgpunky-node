import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { createSignedChallenge } from "@/lib/allowlist/supabase-server";

const COOKIE_NAME = "cyborgpunky-arcade-score-challenge";
const MAX_AGE_SECONDS = 5 * 60;

export async function GET() {
  try {
    const nonce = randomBytes(32).toString("hex");
    const signature = createSignedChallenge(nonce);

    const response = NextResponse.json({ nonce });

    response.cookies.set(COOKIE_NAME, `${nonce}.${signature}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/arcade/score",
      maxAge: MAX_AGE_SECONDS,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to create an arcade score challenge." },
      { status: 500 },
    );
  }
}
