import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-df2be1f0ac924e4f81cce390b6cc6cee.r2.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
