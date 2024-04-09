// next.config.mjs
import { NextConfig } from 'next';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'], // Existing allowed domains
  },
  // If you have middleware you'd like to configure, include it here.
  // For example, this could be adding security headers, or other global settings
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: [
          { key: 'X-Custom-Header', value: 'value' }
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    // Exclude the 'pages/OLD' folder from being processed by webpack
    if (!isServer) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /pages\/OLD/,
      });
    }
    return config;
  },
};

export default nextConfig;
