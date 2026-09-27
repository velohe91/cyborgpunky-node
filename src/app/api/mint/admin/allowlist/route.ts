import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { CYBORGPUNK_ADMIN_WALLET } from "@/lib/allowlist/config";
import {
  supabaseServerRequest,
  verifySignedChallenge,
} from "@/lib/allowlist/supabase-server";

const COOKIE_NAME = "cyborgpunk-admin-challenge";

type AdminPayload = {
  nonce?: string;
  signature?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AdminPayload;
    const cookieStore = await cookies();
    const storedChallenge = cookieStore.get(COOKIE_NAME)?.value;

    if (!body.nonce || !body.signature || !storedChallenge) {
      return NextResponse.json({ error: "Admin authentication required." }, { status: 401 });
    }

    const [storedNonce, challengeSignature] = storedChallenge.split(".");

    if (
      storedNonce !== body.nonce ||
      !challengeSignature ||
      !verifySignedChallenge(storedNonce, challengeSignature)
    ) {
      return NextResponse.json({ error: "Invalid admin challenge." }, { status: 401 });
    }

    const message = [
      "CyborgPunks Club Admin Access",
      `Nonce: ${body.nonce}`,
    ].join("\n");

    const authorized = await verifyMessage({
      address: CYBORGPUNK_ADMIN_WALLET,
      message,
      signature: body.signature as `0x${string}`,
    });

    cookieStore.delete(COOKIE_NAME);

    if (!authorized) {
      return NextResponse.json({ error: "Admin wallet not authorized." }, { status: 403 });
    }

    const response = await supabaseServerRequest(
      "allowlist?select=id,wallet_address,x_username,x_profile_url,status,registered_at&order=registered_at.desc",
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not load the allowlist." },
        { status: 502 },
      );
    }

    return NextResponse.json({ entries: await response.json() });
  } catch {
    return NextResponse.json(
      { error: "Unable to load the allowlist." },
      { status: 500 },
    );
  }
}
