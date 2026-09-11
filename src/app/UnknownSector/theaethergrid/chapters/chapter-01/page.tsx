"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import EncryptedFolder from "./EncryptedFolder";
import CryogenicMonitor from "@/components/CryogenicMonitor";

export default function Chapter1Page() {
  const [isHacking, setIsHacking] = useState(true);
  const [progress, setProgress] = useState(10);
  const [statusLog, setStatusLog] = useState(
    "INITIALIZING HANDSHAKE PROTOCOL...",
  );

  useEffect(() => {
    if (!isHacking) return;

    const runLoadingSequence = async () => {
      await simulateProgress(10, 80, 40);
      await simulateProgress(80, 90, 120);
      await simulateProgress(90, 95, 300);

      setStatusLog("BYPASSING FINAL FIREWALL & ANOMALY FILTER...");
      setProgress(99);

      await new Promise((resolve) => setTimeout(resolve, 2500));
      setIsHacking(false);
    };

    runLoadingSequence();
  }, [isHacking]);

  const simulateProgress = (
    start: number,
    end: number,
    speed: number,
  ) => {
    return new Promise<void>((resolve) => {
      let current = start;

      const interval = setInterval(() => {
        current++;
        setProgress(current);

        if (current === 50) {
          setStatusLog("ESTABLISHING SECURE OBSERVER CHANNEL...");
        }

        if (current === 85) {
          setStatusLog("DECRYPTING RESTRICTED SECTOR CORES...");
        }

        if (current >= end) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#03050a] p-6 font-mono text-cyan-500 md:p-12">
      {/* Scanlines inmersivas */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[url('/scanlines.png')] opacity-10 mix-blend-overlay" />

      {isHacking ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-3xl space-y-4 text-sm md:text-base"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="font-bold tracking-widest text-red-500"
          >
            &gt; SYSTEM ALERT: DECRYPTING CHAPTER 01...
          </motion.p>

          <p className="text-cyan-400">&gt; {statusLog}</p>

          <div className="w-full rounded border border-cyan-500/30 bg-cyan-950/40 p-1">
            <div
              className="h-3 bg-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.8)] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between font-mono text-xs text-cyan-600">
            <span>DECRYPTION STATUS: [ {progress}% ]</span>

            <span className="animate-pulse text-cyan-400">
              THE AETHERGRID HAS DECRYPTED CHAPTER 01.
            </span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-full max-w-3xl font-sans text-lg leading-relaxed text-gray-300"
        >
          {/* Barra de navegación superior */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/UnknownSector/theaethergrid/prologue/fragment-02"
              className="inline-flex items-center gap-2 rounded border border-cyan-500/30 bg-cyan-950/20 px-4 py-2 font-mono text-xs text-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.1)] transition-all hover:border-cyan-400 hover:bg-cyan-500/10 md:text-sm"
            >
              <span>&larr;</span> PREVIOUS FRAGMENT
            </Link>

            <span className="font-mono text-xs text-cyan-600">
              FILE: CHAPTER 01 // THE PULSE INITIALIZATION
            </span>
          </div>

          <div className="mb-10 border-b border-cyan-500/30 pb-6">
            <h1 className="font-mono text-3xl tracking-widest text-white md:text-4xl">
              CHAPTER 01
            </h1>

            <h2 className="mt-2 font-mono text-sm uppercase tracking-wider text-cyan-400 md:text-base">
              THE PULSE INITIALIZATION
            </h2>
          </div>

          <p className="mb-6">
            The buzz of government drones drowned out any other sound in the
            streets of San Salvador. Through the armored monitors of her
            clandestine lab, Lunarya watched the &quot;pacification&quot;
            forces deploy. They were beasts of metal and soulless algorithms,
            funded by a paranoid State looking to suffocate the imminent civil
            war. They wanted to hijack the V&Sigma;LOHE SYSTEM&apos;s core. They
            wanted to turn her surveillance network into an omniscient
            executioner.
          </p>

          <p className="mb-6 italic text-cyan-200">
            But Lunarya was always one step ahead. Her fingers flew across the
            holographic keyboard, isolating her private network from the
            government&apos;s mainframe. On the main screen, an encrypted folder
            opened, harmlessly classified under the name: CyborgPunks Club. To
            the State&apos;s auditors, these files were nothing more than a
            bizarre collection of digital art—pixelated avatars, urban
            aesthetics, and vibrant colors. Digital trash.
          </p>

          {/* Carpeta interactiva de los CyborgPunks */}
          <EncryptedFolder />

          <p className="mb-6">
            What the censors didn&apos;t know was that every pixel, color
            palette, and geometric stroke concealed terabytes of genetic code
            and biomechanical assembly schematics. The CyborgPunks weren&apos;t
            just art; they were a dormant army.
          </p>

          <p className="mb-6">
            A red alert flashed on the screen. The government forces had begun
            their assault on the east sector. It was now or never. Lunarya knew
            that conventional channels would be intercepted in seconds by
            government algorithms. She needed an immutable path. A network that
            belonged to no one, and therefore, no one could shut down.
          </p>

          <p className="mb-6">
            She invoked the protocols of the old decentralized web, hiding the
            ignition sequences within smart contracts on the{" "}
            <strong className="font-mono text-cyan-300">Ethereum</strong> and{" "}
            <strong className="font-mono text-cyan-300">Tezos</strong>{" "}
            blockchains. <em>&quot;Approve smart contract,&quot;</em> she
            whispered into the void of the lab, breaking the final security
            seal. <em>&quot;CyborgPunk States Protocol. Sign and execute.&quot;</em>
          </p>

          <p className="mb-6">
            The entire lab plunged into a deep, electric blue gloom. The nodes
            validated the initial pulse in fractions of a second, decrypting
            the biomechanical genomes and injecting them directly into the
            lower-level incubation pods. First pulse. System online. Block
            confirmed.
          </p>

          {/* Terminal interactiva de Nodos Criogénicos */}
          <CryogenicMonitor />

          <p className="mb-6">
            The government thought they had control of the city. But the
            network now belongs to the Punks. The awakening has begun.
          </p>

          {/* Navegación final */}
          <div className="mt-12 flex items-center justify-between border-t border-cyan-500/30 pt-6">
            <div className="my-6 text-center font-mono text-xs tracking-widest text-cyan-400/70">
              [ CHAPTER 01 ENDED ]
            </div>

            <Link
              href="/UnknownSector/theaethergrid/chapters"
              className="inline-flex items-center gap-2 rounded border border-cyan-400 bg-cyan-600/20 px-6 py-3 font-mono text-sm text-white transition-all hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
            >
              ← RETURN TO CHAPTER ARCHIVE
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}