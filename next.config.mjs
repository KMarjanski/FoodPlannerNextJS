/** @type {import('next').NextConfig} */

// Ustaw Google DNS dla MongoDB Atlas
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
};

export default nextConfig;
