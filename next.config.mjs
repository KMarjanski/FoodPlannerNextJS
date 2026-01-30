/** @type {import('next').NextConfig} */

// Ustaw Google DNS dla MongoDB Atlas

import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

import nextI18NextConfig from './next-i18next.config.js';

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
  ...nextI18NextConfig,
};

export default nextConfig;
