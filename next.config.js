/** @type {import('next').NextConfig} */
const path = require("path");

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
});

const nextConfig = withPWA({
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
});

module.exports = nextConfig;
