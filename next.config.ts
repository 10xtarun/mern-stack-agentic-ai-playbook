import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: "/mern-stack-agentic-ai-playbook",
  trailingSlash: true,
};

export default nextConfig;
