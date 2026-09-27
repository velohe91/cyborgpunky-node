import { NextResponse } from "next/server";
import { isAddress } from "viem";
import { supabaseServerRequest } from "@/lib/allowlist/supabase-server";

type ArcadePlayer = {
  wallet_address: string;
  high_score: number;
  total_score: number;
};

export async function GET(request: Request) {
  try {
    const address = new URL(request.url).searchParams.get("address")?.trim().toLowerCase();

    if (!address || !isAddress(address)) {
      return NextResponse.json(
        { error: "A valid wallet address is required." },
        { status: 400 },
      );
    }

    const response = await supabaseServerRequest(
      "arcade_players?select=wallet_address,high_score,total_score&wallet_address=eq." + encodeURIComponent(address) + "&limit=1",
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not read the arcade score." },
        { status: 502 },
      );
    }

    const players = (await response.json()) as ArcadePlayer[];
    const player = players[0];

    return NextResponse.json({
      highScore: player?.high_score ?? 0,
      totalScore: player?.total_score ?? 0,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to read the arcade score." },
      { status: 500 },
    );
  }
}