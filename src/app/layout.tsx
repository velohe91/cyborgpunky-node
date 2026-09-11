import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ImmersiveShell } from "@/components/layout/ImmersiveShell";
import { Web3Providers } from "@/components/web3/Web3Providers";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import "./globals.css";

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} · ${SITE_TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "CyborgPunks Club — cryogenic identity archive for compressed genesis nodes and activated CyborgPunk states.",
  keywords: ["CyborgPunks", "NFT", "cryogenic", "cyberpunk", "archive"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pressStart.variable} ${vt323.variable} font-mono antialiased`}
      >
        <Web3Providers>
          <ImmersiveShell>{children}</ImmersiveShell>
        </Web3Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
