/**
 * Responsive video for decrypt panels.
 * Mount only when expanded so media is not fetched while collapsed.
 * Optional `poster` shows the first-frame still until the user hits play.
 * No autoplay — user controls playback.
 */
export function LoreDecryptVideo({
  src,
  title,
  poster,
}: {
  src: string;
  title: string;
  /** First-frame still (e.g. /about/velohe-system-poster.jpg) */
  poster?: string;
}) {
  return (
    <div className="mt-2 overflow-hidden rounded border border-neon-cyan/20 bg-void">
      <div className="relative aspect-video w-full">
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-contain bg-void"
          aria-label={title}
        />
      </div>
      <p className="border-t border-neon-cyan/10 px-2 py-1.5 font-mono text-[9px] uppercase tracking-widest text-muted/70">
        Media // {title}
      </p>
    </div>
  );
}
