// next.config.mjs

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['replicate.com', 'replicate.delivery'], // Add 'replicate.delivery' to the list of allowed domains
    // Optionally, you can also configure other image properties here
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
