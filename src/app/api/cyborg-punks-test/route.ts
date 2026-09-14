import { NextResponse } from "next/server";
import {
  getLiveCyborgPunks,
  getMintedTokenIds,
  getLiveTokenIds,
} from "@/lib/web3/cyborg-punk";

export async function GET() {
  try {
    const mintedTokenIds = await getMintedTokenIds();
    const liveTokenIds = await getLiveTokenIds();
    const tokens = await getLiveCyborgPunks();

    return NextResponse.json({
      success: true,
      mintedCount: mintedTokenIds.length,
      liveCount: liveTokenIds.length,
      mintedTokenIds,
      liveTokenIds,
      tokens,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}