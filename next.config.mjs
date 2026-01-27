/** @type {import('next').NextConfig} */

// Ustaw Google DNS dla MongoDB Atlas
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('dns');
    }
    return config;
  },
};

export default nextConfig;
