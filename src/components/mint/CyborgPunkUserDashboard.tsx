"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { ConnectNodeButton } from "@/components/web3/ConnectNodeButton";
import {
  loadCyborgPunkProfile,
  saveCyborgPunkProfile,
  type CyborgPunkLocalProfile,
} from "@/lib/allowlist/profile-storage";
import { truncateAddress } from "@/lib/web3/multi-chain";

const SPECIMENS = [
  { id: "VIREX", image: "/mint/specimens/specimen-01.png" },
  { id: "NULLA", image: "/mint/specimens/specimen-02.png" },
  { id: "LYNX", image: "/mint/specimens/specimen-03.png" },
  { id: "STRIPE", image: "/mint/specimens/specimen-04.png" },
  { id: "ARC", image: "/mint/specimens/specimen-05.png" },
  { id: "CYBORGPUNKY", image: "/mint/specimens/specimen-06.png" },
  { id: "UNKNOWN", image: "/mint/specimens/specimen-07.png" },
  { id: "NEON-BYTE BUNNY", image: "/mint/specimens/specimen-08.png" },
] as const;

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

export function CyborgPunkUserDashboard() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [profile, setProfile] = useState<CyborgPunkLocalProfile | null>(null);
  const [isAllowlistRegistered, setIsAllowlistRegistered] = useState(false);
  const [isCheckingAllowlist, setIsCheckingAllowlist] = useState(false);
  const [registrationState, setRegistrationState] = useState<
    "idle" | "signing" | "registering" | "registered" | "error"
  >("idle");
  const [registrationError, setRegistrationError] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;

    if (!address) {
      setProfile(null);
      setIsAllowlistRegistered(false);
      setIsCheckingAllowlist(false);
      return;
    }

    setProfile(loadCyborgPunkProfile(address));
    setIsCheckingAllowlist(true);

    fetch(`/api/mint/allowlist/status?address=${encodeURIComponent(address)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        const result = (await response.json()) as {
          registered?: boolean;
          profile?: CyborgPunkLocalProfile;
        };

        if (!response.ok) {
          throw new Error("Could not check the allowlist.");
        }

        if (cancelled) return;

        if (result.registered && result.profile) {
          setProfile(result.profile);
          saveCyborgPunkProfile(result.profile);
          setIsAllowlistRegistered(true);
          setRegistrationState("registered");
        } else {
          setIsAllowlistRegistered(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setIsAllowlistRegistered(false);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsCheckingAllowlist(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [address]);

  if (!address) {
    return (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unauthorized-sector-title"
      >
        <div className="circuit-frame w-full max-w-lg p-5 sm:p-6">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
            Sector // Access
          </p>
          <h1
            id="unauthorized-sector-title"
            className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]"
          >
            UNAUTHORIZED SECTOR
          </h1>
          <div className="circuit-crosshair my-3 h-0 border-t-2 border-[#0CF1FF]/50" />
          <p className="font-mono text-sm leading-6 text-slate-300 sm:text-base">
            WALLET IDENTITY REQUIRED
          </p>
          <p className="mt-2 font-mono text-xs leading-5 text-slate-500">
            Connect your wallet to access your CyborgPunk Profile dashboard.
          </p>
          <div className="mt-5">
            <ConnectNodeButton />
          </div>
        </div>
      </div>
    );
  }

  const registeredProfile =
    profile?.xUsername && profile?.xProfileUrl ? profile : null;
  const eligible = isAllowlistRegistered || Boolean(
    registeredProfile?.followCompleted && registeredProfile?.engagementCompleted,
  );

  const markFollowCompleted = () => {
    if (!profile || profile.followCompleted) return;

    const nextProfile = {
      ...profile,
      followCompleted: true,
    };

    setProfile(nextProfile);
    saveCyborgPunkProfile(nextProfile);
  };

  const markEngagementCompleted = () => {
    if (!profile || profile.engagementCompleted) return;

    const nextProfile = {
      ...profile,
      engagementCompleted: true,
    };

    setProfile(nextProfile);
    saveCyborgPunkProfile(nextProfile);
  };

  const registerForWhitelist = async () => {
    if (!address || !registeredProfile || !eligible || isAllowlistRegistered) {
      return;
    }

    setRegistrationError(null);
    setRegistrationState("signing");

    const timestamp = Date.now();
    const normalizedAddress = address.toLowerCase();
    const message = [
      "CyborgPunks Club Allowlist Registration",
      `Wallet: ${normalizedAddress}`,
      `X Username: ${registeredProfile.xUsername}`,
      `X Profile: ${registeredProfile.xProfileUrl}`,
      "Follow: true",
      "Engagement: true",
      `Timestamp: ${timestamp}`,
    ].join("\n");

    try {
      const signature = await signMessageAsync({ message });
      setRegistrationState("registering");

      const response = await fetch("/api/mint/allowlist/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          signature,
          xUsername: registeredProfile.xUsername,
          xProfileUrl: registeredProfile.xProfileUrl,
          timestamp,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        registered?: boolean;
      };

      if (!response.ok && response.status !== 409) {
        throw new Error(result.error ?? "Registration failed.");
      }

      setIsAllowlistRegistered(true);
      setRegistrationState("registered");

      const registeredProfileFromServer = profile
        ? {
            ...profile,
            followCompleted: true,
            engagementCompleted: true,
          }
        : null;

      if (registeredProfileFromServer) {
        setProfile(registeredProfileFromServer);
        saveCyborgPunkProfile(registeredProfileFromServer);
      }
    } catch (error) {
      setRegistrationState("error");
      setRegistrationError(
        error instanceof Error ? error.message : "Registration failed.",
      );
    }
  };

  return (
    <section className="grid gap-4">
      <article className="circuit-frame p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Dashboard // Web3
            </p>
            <h1 className="mt-2 font-sans text-[18px] tracking-wide text-[#FF2CF0] sm:text-[24px]">
              CYBORGPUNK PROFILE
            </h1>
          </div>
          <span className="hud-chip !px-2 !py-1">
            {isAllowlistRegistered
              ? "COMPLETED"
              : eligible
                ? "WL ELIGIBLE"
                : "IN PROGRESS"}
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

        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/profile" className="hud-chip uppercase">
            OPEN USER DASHBOARD
          </Link>
          <Link href="/mint" className="hud-chip uppercase">
            EDIT PROFILE
          </Link>
        </div>
      </article>

      {registeredProfile ? (
        <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
                Profile // Web
              </p>
              <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
                X PROFILE
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase text-[#0CF1FF]">
              ✓ REGISTERED
            </span>
          </div>

          <a
            href={registeredProfile.xProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block border border-[#0CF1FF]/50 bg-black/50 p-3"
          >
            <p className="font-mono text-[14px] leading-6 text-[#0CF1FF] underline decoration-[#FF2CF0]/70 underline-offset-4 hover:text-[#FF2CF0]">
              @{registeredProfile.xUsername} ↗
            </p>
          </a>
        </article>
      ) : (
        <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
          <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
            Profile // Web
          </p>
          <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
            X PROFILE REQUIRED
          </h2>
          <p className="mt-2 font-mono text-sm leading-6 text-slate-400">
            Register your X profile before the allowlist tasks become
            available.
          </p>
          <Link href="/mint" className="hud-chip mt-4 inline-flex uppercase">
            REGISTER X PROFILE
          </Link>
        </article>
      )}

      {registeredProfile ? (
        <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 shadow-[0_0_18px_rgba(12,241,255,0.08)] sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
                Registration // Tasks
              </p>
              <h2 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
                {isAllowlistRegistered ? "WL TASK COMPLETED" : "WL TASKS"}
              </h2>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {isAllowlistRegistered ? "ELIGIBLE" : eligible ? "COMPLETE" : "PENDING"}
            </span>
          </div>

          {isAllowlistRegistered ? (
            <div className="mt-4 border border-[#0CF1FF]/40 bg-black/30 p-4">
              <p className="font-sans text-[12px] uppercase tracking-wide text-[#0CF1FF]">
                YOUR WALLET IS ELIGIBLE
              </p>
              <p className="mt-2 font-mono text-sm leading-6 text-slate-400">
                This wallet is registered for the CyborgPunks Club allowlist.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-4 grid gap-3">
                {TASKS.map((task) => {
                  const complete =
                    task.id === "follow"
                      ? registeredProfile.followCompleted
                      : registeredProfile.engagementCompleted;

                  return (
                    <div
                      key={task.id}
                      className="border border-[#3003D9]/60 bg-black/30 p-3"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="hud-chip shrink-0 !px-2 !py-1"
                          aria-hidden="true"
                        >
                          {complete ? "✓" : "○"}
                        </span>
                        <div>
                          <p className="font-sans text-[10px] uppercase tracking-wide text-[#0CF1FF]">
                            {task.title}
                          </p>
                          {task.id === "follow" ? (
                            <a
                              href="https://x.com/cyborgpunky"
                              target="_blank"
                              rel="noreferrer"
                              onClick={markFollowCompleted}
                              className="mt-2 block font-mono text-sm leading-6 text-[#0CF1FF] underline decoration-[#0CF1FF]/40 underline-offset-4 hover:text-[#FF2CF0]"
                            >
                              {task.description}
                            </a>
                          ) : (
                            <a
                              href="https://x.com/cyborgpunky/status/2104023199336083865?s=20"
                              target="_blank"
                              rel="noreferrer"
                              onClick={markEngagementCompleted}
                              className="mt-2 block font-mono text-sm leading-6 text-[#0CF1FF] underline decoration-[#0CF1FF]/40 underline-offset-4 hover:text-[#FF2CF0]"
                            >
                              {task.description}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={
                  !eligible ||
                  registrationState === "signing" ||
                  registrationState === "registering" ||
                  registrationState === "registered"
                }
                onClick={registerForWhitelist}
                className="hud-chip mt-4 w-full uppercase disabled:cursor-not-allowed disabled:opacity-40"
              >
                {registrationState === "registered"
                  ? "REGISTERED"
                  : registrationState === "signing"
                    ? "SIGN REGISTRATION"
                    : registrationState === "registering"
                      ? "REGISTERING..."
                      : eligible
                        ? "REGISTER FOR WHITELIST"
                        : "COMPLETE TASKS TO REGISTER"}
              </button>
            </>
          )}

          {registrationError ? (
            <p className="mt-3 font-mono text-xs leading-5 text-[#FF2CF0]">
              {registrationError}
            </p>
          ) : null}

        </article>
      ) : null}

      <article className="border border-[#3003D9]/70 bg-[#05010d]/80 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-sans text-[8px] uppercase tracking-wide text-[#0CF1FF]/80 sm:text-[10px]">
              Specimen // Preview
            </p>
            <h3 className="mt-2 font-sans text-sm tracking-wide text-[#FF2CF0]">
              MINT SPECIMENS
            </h3>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.12em] text-[#0CF1FF]/70">
              Cryogenic Room Background
            </p>
          </div>
          <span className="font-mono text-[11px] text-slate-400">
            ARC CHAIN // MINT NETWORK
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SPECIMENS.map((specimen) => (
            <div
              key={specimen.id}
              className="group border border-[#3003D9]/60 bg-black/40 p-2"
            >
              <div className="aspect-square overflow-hidden border border-[#0CF1FF]/20 bg-black">
                <img
                  src={specimen.image}
                  alt={specimen.id}
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

      <div className="mt-4 flex flex-wrap justify-start gap-3">
        <a
          href="https://opensea.io/collection/arc-cyborgpunks"
          target="_blank"
          rel="noopener noreferrer"
          className="hud-chip inline-flex uppercase"
        >
          MINT
        </a>
        <Link href="/arcade" className="hud-chip inline-flex uppercase">
          ARCADE
        </Link>
      </div>
    </section>
  );
}
