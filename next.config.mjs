/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can be hosted on GitHub Pages / any static host.
  // (basePath for project Pages is injected at build time by actions/configure-pages.)
  output: "export",
  reactStrictMode: true,
  images: {
    // Required for `output: export` — Next.js server image optimization is disabled.
    unoptimized: true,
  },
  // Emit /about/index.html etc. so clean routes work on static hosts.
  trailingSlash: false,
};

export default nextConfig;
