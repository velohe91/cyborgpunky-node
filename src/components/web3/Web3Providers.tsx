"use client";

import { useEffect, useState, type ReactNode } from "react";
import { reconnect, WagmiProvider } from "wagmi";
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

  useEffect(() => {
    let resumeTimer: number | undefined;

    const resumeWalletSession = () => {
      if (document.visibilityState !== "visible") return;

      window.clearTimeout(resumeTimer);
      // Give mobile browsers a tick to restore the wallet provider after the
      // app returns from a wallet deeplink before wagmi rehydrates it.
      resumeTimer = window.setTimeout(() => {
        void reconnect(config).catch(() => {
          // A failed background reconnect must never interrupt the active UI.
        });
      }, 150);
    };

    window.addEventListener("pageshow", resumeWalletSession);
    window.addEventListener("focus", resumeWalletSession);
    document.addEventListener("visibilitychange", resumeWalletSession);

    return () => {
      window.clearTimeout(resumeTimer);
      window.removeEventListener("pageshow", resumeWalletSession);
      window.removeEventListener("focus", resumeWalletSession);
      document.removeEventListener("visibilitychange", resumeWalletSession);
    };
  }, [config]);

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
