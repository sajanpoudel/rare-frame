import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    // This disables ESLint during production builds
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // This is to handle polyfills and browser compatibility for web3 libraries
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      zlib: require.resolve('browserify-zlib'),
      path: require.resolve('path-browserify')
    };
    return config;
  },
};

export default nextConfig;
