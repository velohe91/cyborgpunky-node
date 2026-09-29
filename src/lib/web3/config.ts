/**
 * RainbowKit + wagmi config. EVM only — Solana stays in multi-chain.ts
 * (injected Phantom/Solflare; not a wagmi chain).
 */

import { defineChain } from "viem";
import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
  robinhood,
} from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

/** Default chain: Ethereum (CyborgPunks Club collection). */
export const PRIMARY_CHAIN = mainnet;

/** Arc mainnet — Circle's EVM chain. */
export const arc = defineChain({
  id: 5042,
  name: "Arc",
  nativeCurrency: {
    name: "USDC",
    symbol: "USDC",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.mainnet.arc.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "Arc Explorer",
      url: "https://explorer.arc.io",
    },
  },
});

/**
 * CyborgPunks Club EVM network set.
 * Keep this list aligned with the Network Switch modal.
 */
export const SUPPORTED_CHAINS = [
  mainnet,
  base,
  polygon,
  bsc,
  arbitrum,
  optimism,
  avalanche,
  robinhood,
  arc,
] as const;

/** Short labels for chrome that still reads chain id. */
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [mainnet.id]: "ETHEREUM",
  [base.id]: "BASE",
  [polygon.id]: "POLYGON",
  [bsc.id]: "BNB SMART CHAIN",
  [arbitrum.id]: "ARBITRUM ONE",
  [optimism.id]: "OP MAINNET",
  [avalanche.id]: "AVALANCHE",
  [robinhood.id]: "ROBINHOOD",
  [arc.id]: "ARC",
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
  const host: Record<number, string> = {
    [mainnet.id]: "eth-mainnet",
    [polygon.id]: "polygon-mainnet",
    [base.id]: "base-mainnet",
    [arbitrum.id]: "arb-mainnet",
    [optimism.id]: "opt-mainnet",
  };
  const slug = host[chainId];
  if (!slug) return undefined;
  return `https://${slug}.g.alchemy.com/v2/${id}`;
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

  const transports = Object.fromEntries(
    SUPPORTED_CHAINS.map((chain) => [chain.id, transportFor(chain.id)]),
  ) as Record<(typeof SUPPORTED_CHAINS)[number]["id"], ReturnType<typeof http>>;

  return createConfig({
    connectors,
    chains: SUPPORTED_CHAINS,
    transports,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });
}

export type WagmiConfig = ReturnType<typeof getWagmiConfig>;
