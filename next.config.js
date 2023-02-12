/** @type {import('next').NextConfig} */
const { withPlausibleProxy } = require("next-plausible");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ui-avatars.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

module.exports = withPlausibleProxy({
  customDomain: "https://plausible.anto.pt",
})(nextConfig);
