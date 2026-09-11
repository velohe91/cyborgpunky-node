"use client";

import { useState } from "react";
import ArchiveModal, {
  type ArchiveModalData,
} from "@/components/game/ArchiveModal";

const nodesData = [
  {
    id: "VIREX",
    name: "VIREX",
    color:
      "text-purple-400 border-purple-500/50 bg-purple-950/20 hover:bg-purple-500/20",
    badgeBg:
      "bg-purple-950/80 border-purple-800/60 text-purple-300",
    video: "/nfts/nodes/virex.mp4",
    description:
      "Igniting his interpretation layer, optimizing the tactical network's data flow in milliseconds.",
    metrics:
      "STATUS: ACTIVE // LAYER: TACTICAL OPTIMIZATION // TEMP: -196°C",
  },
  {
    id: "NULLA",
    name: "NULLA",
    color:
      "text-green-400 border-green-500/50 bg-green-950/20 hover:bg-green-500/20",
    badgeBg:
      "bg-green-950/80 border-green-800/60 text-green-300",
    video: "/nfts/nodes/nulla.mp4",
    description:
      "Activating passive monitoring, observing the environment in absolute silence.",
    metrics:
      "STATUS: PASSIVE // MONITORING: OMNIDIRECTIONAL // TEMP: -196°C",
  },
  {
    id: "LYNX",
    name: "LYNX",
    color:
      "text-blue-400 border-blue-500/50 bg-blue-950/20 hover:bg-blue-500/20",
    badgeBg:
      "bg-blue-950/80 border-blue-800/60 text-blue-300",
    video: "/nfts/nodes/lynx.mp4",
    description:
      "Taking visual supervision from the upper shadows, securing optical control of the critical zone.",
    metrics:
      "STATUS: OPTICAL // SECTOR: UPPER SHADOWS // TEMP: -196°C",
  },
  {
    id: "STRIPE",
    name: "STRIPE",
    color:
      "text-yellow-400 border-yellow-500/50 bg-yellow-950/20 hover:bg-yellow-500/20",
    badgeBg:
      "bg-yellow-950/80 border-yellow-800/60 text-yellow-300",
    video: "/nfts/nodes/stripe.mp4",
    description:
      "Synchronizing traversal pathways, activating unstoppable mobility for the journey to the surface.",
    metrics:
      "STATUS: MOBILE // TRAVERSAL: SYNCHRONIZED // TEMP: -196°C",
  },
];

type CryogenicNode = (typeof nodesData)[number];

export default function CryogenicMonitor() {
  const [selectedNode, setSelectedNode] =
    useState<CryogenicNode | null>(null);

  const closeNode = () => {
    setSelectedNode(null);
  };

  const modalData: ArchiveModalData | null = selectedNode
    ? {
        id: selectedNode.id,
        name: selectedNode.name,
        description: selectedNode.description,
        video: selectedNode.video,
        classification: "CRYOGENIC NODE // VΣLOHE SYSTEM",
        status: selectedNode.metrics.split(" // ")[0].replace("STATUS: ", ""),
        metrics: selectedNode.metrics,
        accentClass: selectedNode.color.split(" ")[0],
      }
    : null;

  return (
    <>
      <div className="relative my-8 overflow-hidden border border-cyan-900/60 bg-[#060911]/80 p-4 shadow-[0_0_15px_rgba(0,255,255,0.05)] sm:p-5">
        {/* CRT scanlines */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />

        {/* Header */}
        <div className="relative z-10 mb-4 flex flex-col gap-2 border-b border-cyan-900/50 pb-3 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-mono text-[10px] tracking-[0.2em] text-cyan-400 sm:text-xs">
            [ CRYOGENIC SYSTEM // VΣLOHE SYSTEM NODES ]
          </h4>

          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-500/60 sm:text-[10px]">
            STATUS: ALL NODES AWAKENING
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-5">
          {/* Main cinematic sequence */}
          <div className="w-full">
            <div className="relative aspect-video w-full overflow-hidden border border-cyan-900/80 bg-black/60 shadow-[0_0_20px_rgba(0,255,255,0.1)]">
              <video
                src="/nfts/nodes/all-nodes.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px]" />
            </div>
          </div>

          {/* Narrative */}
          <p className="font-mono text-xs leading-relaxed text-cyan-300/90">
            The cryogenic fluids began to drain. In the darkness, four main
            nodes awakened simultaneously:
          </p>

          {/* Node directory */}
          <div className="space-y-2">
            <div className="mb-2 flex items-center justify-between border-b border-cyan-900/30 pb-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500/40">
                NODE DIRECTORY
              </span>

              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-cyan-500/40">
                04 ACTIVE RECORDS
              </span>
            </div>

            {nodesData.map((node) => (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedNode(node)}
                className="group flex w-full items-center gap-3 border border-cyan-900/50 bg-[#03050a]/80 px-3 py-3 text-left transition-all duration-300 hover:border-cyan-500/60 hover:bg-cyan-500/[0.04] hover:shadow-[0_0_18px_rgba(0,255,255,0.06)] sm:px-4"
              >
                {/* Node indicator */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center border ${node.badgeBg}`}
                >
                  <span className="font-mono text-[9px] font-bold">
                    {node.id.slice(0, 1)}
                  </span>
                </div>

                {/* Node information */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                    <span
                      className={`font-mono text-[10px] font-bold tracking-[0.14em] ${node.color.split(" ")[0]}`}
                    >
                      {node.id}
                    </span>

                    <span className="font-sans text-xs font-semibold tracking-wide text-cyan-100/90">
                      {node.name}
                    </span>
                  </div>

                  <p className="mt-1 truncate font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-500/35">
                    {node.metrics.split(" // ")[0]}
                  </p>
                </div>

                {/* Inspection action */}
                <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-cyan-500/40 transition group-hover:text-cyan-300">
                  INSPECT →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shared archive modal */}
      <ArchiveModal item={modalData} onClose={closeNode} />
    </>
  );
}