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
  // allowedDevOrigins: configure CORS for dev
  allowedDevOrigins: ["http://192.168.0.44:3000"],
};

export default nextConfig;
