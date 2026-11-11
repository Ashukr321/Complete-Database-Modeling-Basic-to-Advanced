import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone server bundle only for the Docker image (set in Dockerfile).
  // Vercel packages the app itself and its build adapter fails with standalone.
  output: process.env.NEXT_OUTPUT_STANDALONE === "true" ? "standalone" : undefined,

  // ✏️ Add your image domains here
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: "your-cdn.com",
      // },
      // {
      //   protocol: "https",
      //   hostname: "api.example.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
    ];
  },

  // ✏️ Add redirects as needed
  // async redirects() {
  //   return [
  //     {
  //       source: "/old-page",
  //       destination: "/new-page",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
