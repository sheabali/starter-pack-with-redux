import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.ibb.co",
      "via.placeholder.com",
      "images.unsplash.com",
      "nyc3.digitaloceanspaces.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
      {
        protocol: "https",
        hostname: "nyc3.digitaloceanspaces.com",
        pathname: "/smtech-space/**",
      },
    ],
  },
};

export default nextConfig;
