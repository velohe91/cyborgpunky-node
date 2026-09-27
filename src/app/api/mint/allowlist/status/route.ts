import { NextResponse } from "next/server";
import { supabaseServerRequest } from "@/lib/allowlist/supabase-server";

export async function GET(request: Request) {
  try {
    const address = new URL(request.url).searchParams.get("address")?.toLowerCase();

    if (!address) {
      return NextResponse.json(
        { error: "Wallet address is required." },
        { status: 400 },
      );
    }

    const response = await supabaseServerRequest(
      `allowlist?select=wallet_address,x_username,x_profile_url,status&wallet_address=eq.${encodeURIComponent(address)}&limit=1`,
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not check the allowlist." },
        { status: 502 },
      );
    }

    const entries = (await response.json()) as Array<{
      wallet_address: string;
      x_username: string;
      x_profile_url: string;
      status: string;
    }>;

    if (entries.length === 0) {
      return NextResponse.json({ registered: false });
    }

    const entry = entries[0];

    return NextResponse.json({
      registered: true,
      profile: {
        walletAddress: entry.wallet_address,
        xUsername: entry.x_username,
        xProfileUrl: entry.x_profile_url,
        followCompleted: true,
        engagementCompleted: true,
      },
      status: entry.status,
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to check the allowlist." },
      { status: 500 },
    );
  }
}
