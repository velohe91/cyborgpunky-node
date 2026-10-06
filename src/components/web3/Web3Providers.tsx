"use client";

import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { MultiChainProvider } from "@/components/web3/MultiChainProvider";
import { getWagmiConfig, PRIMARY_CHAIN } from "@/lib/web3/config";

const WALLET_API_PATHS = new Set([
  "/api/arcade/score/challenge",
  "/api/arcade/score",
  "/api/mint/allowlist/status",
  "/api/mint/allowlist/register",
]);

/**
 * Client-only Web3 shell: wagmi + RainbowKit + React Query.
 * Config is created once per browser session (SSR-safe).
 */
export function Web3Providers({ children }: { children: ReactNode }) {
  const [config] = useState(() => getWagmiConfig());
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  useEffect(() => {
    const originalFetch = window.fetch.bind(window);

    window.fetch = (input, init) => {
      const url = new URL(
        typeof input === "string" ? input : input instanceof Request ? input.url : input.toString(),
        window.location.origin,
      );

      if (!WALLET_API_PATHS.has(url.pathname)) {
        return originalFetch(input, init);
      }

      return originalFetch(input, {
        ...init,
        credentials: "include",
      });
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={PRIMARY_CHAIN}
          theme={darkTheme({
            accentColor: "#0CF1FF",
            accentColorForeground: "#000000",
            borderRadius: "none",
            fontStack: "system",
            overlayBlur: "none",
          })}
          modalSize="compact"
          coolMode={false}
        >
          <MultiChainProvider>{children}</MultiChainProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
