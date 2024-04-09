// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'], // Existing allowed domains
  },
};

const webpackConfig = (config, { isServer }) => {
  // Exclude the 'pages/OLD' folder from being processed by webpack
  if (!isServer) {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /pages\/OLD/,
    });
  }
  return config;
};

export { nextConfig as default, webpackConfig };
