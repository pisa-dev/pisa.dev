/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "data.pisa.dev" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/me",
        destination: "/me/dashboard",
        permanent: true,
      }
    ];
  },
};

module.exports = withPlausibleProxy({
  customDomain: "https://plausible.anto.pt",
})(nextConfig);
