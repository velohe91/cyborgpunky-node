"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  connectSolanaNode,
  connectTezosNode,
  disconnectSolanaNode,
  disconnectTezosNode,
  walletErrorMessage,
  type LinkedSession,
} from "@/lib/web3/multi-chain";

/** Which namespace drives the header network badge / switcher highlight */
export type FocusedNamespace = "evm" | "solana" | "tezos";

type MultiChainContextValue = {
  solana: LinkedSession | null;
  tezos: LinkedSession | null;
  connecting: "solana" | "tezos" | null;
  error: string | null;
  clearError: () => void;
  /** Shared banner writer (EVM / Solana / Tezos) */
  setWalletError: (message: string | null) => void;
  connectSolana: () => Promise<void>;
  connectTezos: () => Promise<void>;
  disconnectSolana: () => Promise<void>;
  disconnectTezos: () => Promise<void>;
  hasAnyAltChain: boolean;
  /** Last-focused namespace for badge + switcher active state */
  focusedNamespace: FocusedNamespace;
  setFocusedNamespace: (ns: FocusedNamespace) => void;
};

const MultiChainContext = createContext<MultiChainContextValue | null>(null);

export function MultiChainProvider({ children }: { children: ReactNode }) {
  const [solana, setSolana] = useState<LinkedSession | null>(null);
  const [tezos, setTezos] = useState<LinkedSession | null>(null);
  const [connecting, setConnecting] = useState<"solana" | "tezos" | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [focusedNamespace, setFocusedNamespace] =
    useState<FocusedNamespace>("evm");

  const clearError = useCallback(() => setError(null), []);
  const setWalletError = useCallback(
    (message: string | null) => setError(message),
    [],
  );

  const connectSolana = useCallback(async () => {
    setError(null);
    setConnecting("solana");
    try {
      const session = await connectSolanaNode();
      setSolana(session);
      setFocusedNamespace("solana");
    } catch (e) {
      setError(walletErrorMessage(e));
      throw e;
    } finally {
      setConnecting(null);
    }
  }, []);

  const connectTezos = useCallback(async () => {
    setError(null);
    setConnecting("tezos");
    try {
      const session = await connectTezosNode();
      setTezos(session);
      setFocusedNamespace("tezos");
    } catch (e) {
      setError(walletErrorMessage(e));
      throw e;
    } finally {
      setConnecting(null);
    }
  }, []);

  const disconnectSolana = useCallback(async () => {
    await disconnectSolanaNode();
    setSolana(null);
    setFocusedNamespace((prev) => (prev === "solana" ? "evm" : prev));
  }, []);

  const disconnectTezos = useCallback(async () => {
    await disconnectTezosNode();
    setTezos(null);
    setFocusedNamespace((prev) => (prev === "tezos" ? "evm" : prev));
  }, []);

  const value = useMemo<MultiChainContextValue>(
    () => ({
      solana,
      tezos,
      connecting,
      error,
      clearError,
      setWalletError,
      connectSolana,
      connectTezos,
      disconnectSolana,
      disconnectTezos,
      hasAnyAltChain: Boolean(solana || tezos),
      focusedNamespace,
      setFocusedNamespace,
    }),
    [
      solana,
      tezos,
      connecting,
      error,
      clearError,
      setWalletError,
      connectSolana,
      connectTezos,
      disconnectSolana,
      disconnectTezos,
      focusedNamespace,
    ],
  );

  return (
    <MultiChainContext.Provider value={value}>
      {children}
    </MultiChainContext.Provider>
  );
}

export function useMultiChain() {
  const ctx = useContext(MultiChainContext);
  if (!ctx) {
    throw new Error("useMultiChain must be used within MultiChainProvider");
  }
  return ctx;
}
