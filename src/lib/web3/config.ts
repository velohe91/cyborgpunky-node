/**
 * Central Web3 config for VΣLOHE SYSTEM Phase 1.
 * Edit chains / app name here only.
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, mainnet, polygon, bsc } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

/** Preferred chain for “Switch network” when unsupported */
export const PRIMARY_CHAIN = base;

/**
 * Supported EVM networks (display / connect order).
 * Base → Ethereum → Polygon → BSC
 */
export const SUPPORTED_CHAINS = [base, mainnet, polygon, bsc] as const;

/** Short cyberpunk labels for the header network badge */
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [base.id]: "BASE",
  [mainnet.id]: "ETHEREUM",
  [polygon.id]: "POLYGON",
  [bsc.id]: "BSC",
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

export const WC_PROJECT_ID =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "MISSING_WC_PROJECT_ID";

export const APP_NAME = "VΣLOHE SYSTEM";

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
      projectId: WC_PROJECT_ID,
    },
  );

  return createConfig({
    connectors,
    chains: [base, mainnet, polygon, bsc],
    transports: {
      [base.id]: http(),
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [bsc.id]: http(),
    },
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export type WagmiConfig = ReturnType<typeof getWagmiConfig>;
