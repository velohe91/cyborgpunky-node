import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSignedChallenge } from "@/lib/allowlist/supabase-server";

const COOKIE_NAME = "cyborgpunk-admin-challenge";

export async function GET() {
  try {
    const nonce = randomBytes(32).toString("hex");
    const signedChallenge = `${nonce}.${createSignedChallenge(nonce)}`;
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, signedChallenge, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 300,
      path: "/",
    });

    return NextResponse.json({ nonce });
  } catch {
    return NextResponse.json(
      { error: "Unable to create admin challenge." },
      { status: 500 },
    );
  }
}
