import { verifyMessage } from "viem";
import { NextResponse } from "next/server";
import { supabaseServerRequest } from "@/lib/allowlist/supabase-server";

const MAX_SIGNATURE_AGE_MS = 5 * 60 * 1000;

type RegistrationPayload = {
  address?: string;
  signature?: string;
  xUsername?: string;
  xProfileUrl?: string;
  timestamp?: number;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegistrationPayload;
    const {
      address,
      signature,
      xUsername,
      xProfileUrl,
      timestamp,
    } = body;

    if (
      !address ||
      !signature ||
      !xUsername ||
      !xProfileUrl ||
      !timestamp
    ) {
      return NextResponse.json(
        { error: "Missing registration data." },
        { status: 400 },
      );
    }

    if (Math.abs(Date.now() - timestamp) > MAX_SIGNATURE_AGE_MS) {
      return NextResponse.json(
        { error: "Registration signature expired." },
        { status: 400 },
      );
    }

    let normalizedAddress: `0x${string}`;

    try {
      normalizedAddress = address as `0x${string}`;
    } catch {
      return NextResponse.json(
        { error: "Invalid wallet address." },
        { status: 400 },
      );
    }

    const message = [
      "CyborgPunks Club Allowlist Registration",
      `Wallet: ${normalizedAddress.toLowerCase()}`,
      `X Username: ${xUsername}`,
      `X Profile: ${xProfileUrl}`,
      "Follow: true",
      "Engagement: true",
      `Timestamp: ${timestamp}`,
    ].join("\n");

    const validSignature = await verifyMessage({
      address: normalizedAddress,
      message,
      signature: signature as `0x${string}`,
    });

    if (!validSignature) {
      return NextResponse.json(
        { error: "Wallet signature could not be verified." },
        { status: 401 },
      );
    }

    const existingResponse = await supabaseServerRequest(
      `allowlist?select=id&wallet_address=eq.${encodeURIComponent(normalizedAddress.toLowerCase())}&limit=1`,
    );

    if (!existingResponse.ok) {
      const supabaseError = await existingResponse.text();

      console.error("Allowlist lookup failed:", {
        status: existingResponse.status,
        statusText: existingResponse.statusText,
        body: supabaseError,
      });

      return NextResponse.json(
        {
          error: "Could not check the allowlist.",
          debug: {
            status: existingResponse.status,
            statusText: existingResponse.statusText,
            supabaseError,
          },
        },
        { status: 502 },
      );
    }

    const existing = (await existingResponse.json()) as Array<{ id: string }>;

    if (existing.length > 0) {
      return NextResponse.json(
        { registered: true, message: "Wallet is already registered." },
        { status: 409 },
      );
    }

    const insertResponse = await supabaseServerRequest("allowlist", {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        wallet_address: normalizedAddress.toLowerCase(),
        x_username: xUsername,
        x_profile_url: xProfileUrl,
        status: "eligible",
      }),
    });

    if (!insertResponse.ok) {
      const supabaseError = await insertResponse.text();

      console.error("Allowlist registration failed:", {
        status: insertResponse.status,
        statusText: insertResponse.statusText,
        body: supabaseError,
      });

      return NextResponse.json(
        {
          error: "Could not register the wallet.",
          debug: {
            status: insertResponse.status,
            statusText: insertResponse.statusText,
            supabaseError,
          },
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ registered: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to register the wallet." },
      { status: 500 },
    );
  }
}
