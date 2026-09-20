import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep turbopack.root for `next dev --turbopack`
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: "/cryogenic-room/lab",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.cyborgpunks.xyz https://cyborgpunks.xyz;",
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    // Quiet optional peer deps pulled by wallet stacks
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    contentDispositionType: "inline",
    unoptimized: true,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
