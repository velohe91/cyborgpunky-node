"use client";

import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { cyborgPunksNfts } from "@/data/nfts";
import { truncateAddress } from "@/lib/web3/multi-chain";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";

const TASKS = [
  {
    id: "follow",
    title: "FOLLOW THE SIGNAL",
    description: "Follow @cyborgpunky on X.",
  },
  {
    id: "engagement",
    title: "ENGAGE THE TRANSMISSION",
    description: "Like and repost the pinned CyborgPunks Club post.",
  },
] as const;

export function CyborgPunkProfile() {
  const { address, isConnected } = useAccount();
  const [xUsername, setXUsername] = useState("");
  const [savedXUsername, setSavedXUsername] = useState("");
  const [xProfileUrl, setXProfileUrl] = useState("");
  const [showXConfirmation, setShowXConfirmation] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [engaged, setEngaged] = useState(false);

  const xProfileRegistered = Boolean(savedXUsername && xProfileUrl);
  const eligible = Boolean(
    address && xProfileRegistered && followed && engaged,
  );
  const specimens = useMemo(() => cyborgPunksNfts.slice(0, 4), []);

  const normalizedUsername = xUsername.trim().replace(/^@+/, "");

  const confirmXProfile = () => {
    if (!normalizedUsername) return;

    setSavedXUsername(normalizedUsername);
    setXUsername(normalizedUsername);
    setXProfileUrl(`https://x.com/${normalizedUsername}`);
    setShowXConfirmation(false);
  };

  const editXProfile = () => {
    setXUsername(savedXUsername);
    setShowXConfirmation(false);
  };

  if (!isConnected || !address) {
    return (
      <article className="circuit-frame mt-8 p-4 sm:p-5">
        <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
          Profile // Web3
        </p>
        <h2 className="mt-2 font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[20px]">
          CYBORGPUNK PROFILE
        </h2>
        <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
        <p className="font-mono text-sm leading-6 text-slate-300">
          Connect your EVM wallet to initialize your CyborgPunk Profile and
          access the allowlist tasks.
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-[#0CF1FF]/70">
          Wallet identity required
        </p>
        <div className="mt-4">
          <ConnectNodeButton />
        </div>
      </article>
    );
  }

  return (
    <section className="mt-8 grid gap-4">
      <article className="circuit-frame p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Profile // Web3
            </p>
            <h2 className="mt-2 font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[20px]">
              CYBORGPUNK PROFILE
            </h2>
          </div>
          <span className="hud-chip !px-2 !py-1">
            {eligible ? "WL ELIGIBLE" : "IN PROGRESS"}
          </span>
        </div>

        <div className="mt-4 border border-[#3003D9]/70 bg-[#05010d]/70 p-3">
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
            Connected wallet
          </p>
          <p className="mt-2 break-all font-mono text-[14px] text-foreground">
            {truncateAddress(address, 6, 6)}
          </p>
          <p className="mt-1 font-mono text-[10px] text-slate-500">
            This wallet is the identity associated with this profile.
          </p>
        </div>

        <div className="mt-4">
          <label
            htmlFor="cyborgpunk-x-username"
            className="font-mono text-[14px] uppercase tracking-[0.16em] text-[#0CF1FF]"
          >
            X Username
          </label>

          {xProfileRegistered ? (
            <div className="mt-2 border border-[#0CF1FF]/50 bg-black/50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <a
                    href={xProfileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block"
                  >
                    <p className="font-mono text-[14px] leading-6 text-[#0CF1FF] underline decoration-[#FF2CF0]/70 underline-offset-4 hover:text-[#FF2CF0]">
                      @{savedXUsername} ↗
                    </p>
                  </a>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#0CF1FF]/70">
                    ✓ X profile registered
                  </p>
                </div>
                <button
                  type="button"
                  onClick={editXProfile}
                  className="hud-chip !px-3 !py-2"
                >
                  EDIT X PROFILE
                </button>
              </div>
            </div>
          ) : (
            <>
              <input
                id="cyborgpunk-x-username"
                value={xUsername}
                onChange={(event) => setXUsername(event.target.value)}
                placeholder="@yourusername"
                autoComplete="off"
                className="mt-2 w-full border border-[#3003D9]/80 bg-black/60 px-3 py-3 font-mono text-base leading-6 text-foreground outline-none placeholder:text-slate-500 focus:border-[#0CF1FF]"
              />
              <button
                type="button"
                disabled={!normalizedUsername}
                onClick={() => setShowXConfirmation(true)}
                className="hud-chip mt-3 w-full uppercase disabled:cursor-not-allowed disabled:opacity-40"
              >
                SAVE X PROFILE
              </button>
              <p className="mt-2 font-mono text-[10px] leading-5 text-slate-500">
                Confirm the X account you want associated with this connected
                wallet.
              </p>
            </>
          )}
        </div>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 shadow-[0_0_18px_rgba(12,241,255,0.08)] sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Registration // Tasks
            </p>
            <h3 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              WL TASKS
            </h3>
          </div>
          <span className="font-mono text-[10px] text-slate-500">
            {eligible ? "COMPLETE" : "PENDING"}
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {TASKS.map((task) => {
            const complete = task.id === "follow" ? followed : engaged;

            return (
              <div
                key={task.id}
                className="border border-[#3003D9]/60 bg-black/30 p-3"
              >
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      task.id === "follow"
                        ? setFollowed((value) => !value)
                        : setEngaged((value) => !value)
                    }
                    className="hud-chip shrink-0 !px-2 !py-1"
                    aria-pressed={complete}
                  >
                    {complete ? "✓" : "○"}
                  </button>
                  <div>
                    <p className="font-sans text-[10px] uppercase tracking-wide text-[#0CF1FF]">
                      {task.title}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-5 text-slate-400">
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          disabled={!eligible}
          className="hud-chip mt-4 w-full uppercase disabled:cursor-not-allowed disabled:opacity-40"
        >
          {eligible ? "REGISTER FOR WHITELIST" : "COMPLETE TASKS TO REGISTER"}
        </button>

        <p className="mt-3 font-mono text-[10px] leading-5 text-slate-500">
          Task verification is manual in this first version. X API verification
          can be connected later without changing the wallet identity model.
        </p>
      </article>

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Specimen // Preview
            </p>
            <h3 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              EXPECTED SPECIMENS
            </h3>
          </div>
          <span className="font-mono text-[9px] text-slate-500">
            SAMPLE // NOT FINAL
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {specimens.map((specimen) => (
            <div
              key={specimen.id}
              className="group border border-[#3003D9]/60 bg-black/40 p-2"
            >
              <div className="aspect-square overflow-hidden border border-[#0CF1FF]/20 bg-black">
                <img
                  src={specimen.image}
                  alt={specimen.title}
                  className="h-full w-full object-cover transition duration-200 group-hover:scale-[1.03]"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <p className="mt-2 truncate font-mono text-[9px] text-[#0CF1FF]">
                {specimen.id}
              </p>
            </div>
          ))}
        </div>
      </article>

      {showXConfirmation ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 px-4 py-16 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="x-profile-confirmation-title"
        >
          <div className="circuit-frame mx-auto w-full max-w-lg p-4 sm:p-5">
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Profile // Registration
            </p>
            <h3
              id="x-profile-confirmation-title"
              className="mt-2 font-sans text-[16px] tracking-wide text-[#FF2CF0] sm:text-[20px]"
            >
              REGISTER X PROFILE
            </h3>
            <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />

            <p className="font-mono text-sm leading-6 text-slate-300">
              Your X username will be registered and associated with your
              connected CyborgPunk wallet.
            </p>

            <div className="mt-4 grid gap-3 border border-[#3003D9]/70 bg-[#05010d]/80 p-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
                  X Profile
                </p>
                <p className="mt-1 font-mono text-sm text-foreground">
                  @{normalizedUsername}
                </p>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#0CF1FF]/70">
                  Connected Wallet
                </p>
                <p className="mt-1 break-all font-mono text-sm text-foreground">
                  {truncateAddress(address, 6, 6)}
                </p>
              </div>
            </div>

            <p className="mt-4 font-mono text-[10px] leading-5 text-slate-500">
              Make sure this is the correct X account before continuing. The
              profile link will be generated from this username.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setShowXConfirmation(false)}
                className="hud-chip w-full uppercase"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={confirmXProfile}
                className="hud-chip w-full uppercase"
              >
                CONFIRM &amp; REGISTER
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
