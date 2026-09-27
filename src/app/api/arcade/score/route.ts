import { NextResponse } from "next/server";
import { isAddress, verifyMessage } from "viem";
import {
  supabaseServerRequest,
  verifySignedChallenge,
} from "@/lib/allowlist/supabase-server";

const COOKIE_NAME = "cyborgpunky-arcade-score-challenge";

type ArcadePlayer = {
  wallet_address: string;
  high_score: number;
  total_score: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      address?: string;
      score?: number;
      signature?: string;
      nonce?: string;
    };

    const address = body.address?.trim().toLowerCase();
    const score = body.score;

    if (!address || !isAddress(address)) {
      return NextResponse.json(
        { error: "A valid wallet address is required." },
        { status: 400 },
      );
    }

    if (
      typeof score !== "number" ||
      !Number.isSafeInteger(score) ||
      score < 0
    ) {
      return NextResponse.json(
        { error: "A valid score is required." },
        { status: 400 },
      );
    }

    if (!body.signature || !body.nonce) {
      return NextResponse.json(
        { error: "A wallet signature is required." },
        { status: 400 },
      );
    }

    const challengeCookie = request.headers
      .get("cookie")
      ?.split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${COOKIE_NAME}=`))
      ?.slice(COOKIE_NAME.length + 1);

    if (!challengeCookie) {
      return NextResponse.json(
        { error: "Score challenge is missing or expired." },
        { status: 401 },
      );
    }

    const [cookieNonce, cookieSignature] = challengeCookie.split(".");

    if (
      !cookieNonce ||
      !cookieSignature ||
      cookieNonce !== body.nonce ||
      !verifySignedChallenge(cookieNonce, cookieSignature)
    ) {
      return NextResponse.json(
        { error: "Invalid score challenge." },
        { status: 401 },
      );
    }

    const message = [
      "CyborgPunks Club Arcade Score",
      `Wallet: ${address}`,
      `Score: ${score}`,
      `Nonce: ${body.nonce}`,
    ].join("\n");

    const validSignature = await verifyMessage({
      address,
      message,
      signature: body.signature as `0x${string}`,
    });

    if (!validSignature) {
      return NextResponse.json(
        { error: "Wallet signature could not be verified." },
        { status: 401 },
      );
    }

    const existingResponse = await supabaseServerRequest(
      `arcade_players?select=wallet_address,high_score,total_score&wallet_address=eq.${encodeURIComponent(address)}&limit=1`,
    );

    if (!existingResponse.ok) {
      return NextResponse.json(
        { error: "Could not read the arcade score." },
        { status: 502 },
      );
    }

    const existing = (await existingResponse.json()) as ArcadePlayer[];

    const current = existing[0];
    const highScore = current ? Math.max(current.high_score, score) : score;
    const totalScore = current ? current.total_score + score : score;

    const saveResponse = await supabaseServerRequest(
      "arcade_players?on_conflict=wallet_address",
      {
        method: "POST",
        headers: {
          Prefer: "resolution=merge-duplicates,return=representation",
        },
        body: JSON.stringify({
          wallet_address: address,
          high_score: highScore,
          total_score: totalScore,
        }),
      },
    );

    if (!saveResponse.ok) {
      return NextResponse.json(
        { error: "Could not save the arcade score." },
        { status: 502 },
      );
    }

    const saved = (await saveResponse.json()) as ArcadePlayer[];

    const response = NextResponse.json({
      saved: true,
      score,
      highScore,
      totalScore,
      player: saved[0] ?? {
        wallet_address: address,
        high_score: highScore,
        total_score: totalScore,
      },
    });

    response.cookies.set(COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/api/arcade/score",
      maxAge: 0,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to save the arcade score." },
      { status: 500 },
    );
  }
}
