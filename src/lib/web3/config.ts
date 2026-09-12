/**
 * RainbowKit + wagmi config. EVM only — Solana stays in multi-chain.ts
 * (injected Phantom/Solflare; not a wagmi chain).
 */

import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import {
  abstract,
  apeChain,
  arbitrum,
  avalanche,
  base,
  berachain,
  blast,
  flowMainnet,
  ink,
  mainnet,
  monad,
  optimism,
  polygon,
  ronin,
  sei,
  shape,
  soneium,
  unichain,
  zora,
} from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";

/** Default chain: Ethereum (CyborgPunks Club collection). */
export const PRIMARY_CHAIN = mainnet;

/**
 * OpenSea EVM set, only chains exported by wagmi/viem.
 * Skip any OpenSea network not in wagmi/chains.
 */
export const SUPPORTED_CHAINS = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  avalanche,
  base,
  blast,
  zora,
  sei,
  berachain,
  flowMainnet,
  apeChain,
  soneium,
  shape,
  unichain,
  ronin,
  abstract,
  monad,
  ink,
] as const;

/** Short labels for chrome that still reads chain id. */
export const CHAIN_BADGE_LABELS: Record<number, string> = {
  [mainnet.id]: "ETHEREUM",
  [polygon.id]: "POLYGON",
  [arbitrum.id]: "ARBITRUM",
  [optimism.id]: "OPTIMISM",
  [avalanche.id]: "AVALANCHE",
  [base.id]: "BASE",
  [blast.id]: "BLAST",
  [zora.id]: "ZORA",
  [sei.id]: "SEI",
  [berachain.id]: "BERACHAIN",
  [flowMainnet.id]: "FLOW",
  [apeChain.id]: "APECHAIN",
  [soneium.id]: "SONEIUM",
  [shape.id]: "SHAPE",
  [unichain.id]: "UNICHAIN",
  [ronin.id]: "RONIN",
  [abstract.id]: "ABSTRACT",
  [monad.id]: "MONAD",
  [ink.id]: "INK",
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
