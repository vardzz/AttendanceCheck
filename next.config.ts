import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @ts-ignore - allowedDevOrigins is valid in this version for ngrok dev
  allowedDevOrigins: ["tetchy-brigette-unplayfully.ngrok-free.dev"],
  async redirects() {
    return [
      {
        source: "/record",
        destination: "/",
        permanent: true,
      },
      {
        source: "/scan",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
