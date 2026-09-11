/**
 * RainbowKit + wagmi config. EVM only — Solana stays in multi-chain.ts
 * (injected Phantom/Solflare; not a wagmi chain).
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

/** Default chain: Ethereum (CyborgPunks Club collection). */
export const PRIMARY_CHAIN = mainnet;

/** EVM networks exposed in RainbowKit: Ethereum + Polygon. */
export const SUPPORTED_CHAINS = [mainnet, polygon] as const;

/** Short labels for chrome that still reads chain id. */
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [mainnet.id]: "ETHEREUM",
  [polygon.id]: "POLYGON",
};

export function getChainBadgeLabel(
  chainId: number,
  fallbackName?: string,
): string {
  return (
    CHAIN_BADGE_LABELS[chainId] ??
    (fallbackName ? fallbackName.toUpperCase() : `CHAIN ${chainId}`)
  );
}

function readWalletConnectProjectId(): string {
  return (
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_WC_PROJECT_ID?.trim() ||
    ""
  );
}

export const WC_PROJECT_ID = readWalletConnectProjectId();

export const HAS_WALLETCONNECT_PROJECT_ID = Boolean(
  WC_PROJECT_ID && WC_PROJECT_ID !== "MISSING_WC_PROJECT_ID",
);

/** RainbowKit requires a 32-char hex string even when the real ID is missing. */
const WALLETCONNECT_PROJECT_ID_FOR_SDK = HAS_WALLETCONNECT_PROJECT_ID
  ? WC_PROJECT_ID
  : "00000000000000000000000000000000";

export const APP_NAME = "CyborgPunks Club";

function alchemyRpc(chainId: number): string | undefined {
  const id = process.env.NEXT_PUBLIC_ALCHEMY_ID?.trim();
  if (!id) return undefined;
  if (chainId === mainnet.id) {
    return `https://eth-mainnet.g.alchemy.com/v2/${id}`;
  }
  if (chainId === polygon.id) {
    return `https://polygon-mainnet.g.alchemy.com/v2/${id}`;
  }
  return undefined;
}

function transportFor(chainId: number) {
  const url = alchemyRpc(chainId);
  return url ? http(url) : http();
}

/** Create wagmi config in the client provider (not at import time). */
export function getWagmiConfig() {
  // coinbaseWallet omitted — CDP SDK optional @x402 deps break Next builds.
  const connectors = connectorsForWallets(
    [
      {
        groupName: "Recommended",
        wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet],
      },
    ],
    {
      appName: APP_NAME,
      projectId: WALLETCONNECT_PROJECT_ID_FOR_SDK,
    },
  );

  return createConfig({
    connectors,
    chains: [mainnet, polygon],
    transports: {
      [mainnet.id]: transportFor(mainnet.id),
      [polygon.id]: transportFor(polygon.id),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export type WagmiConfig = ReturnType<typeof getWagmiConfig>;
