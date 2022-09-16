const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function updateConfig(config) {
  return {
    ...config,
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [...config.plugins, new BundleAnalyzerPlugin()],
  };
}

module.exports = {
  webpack: function (config, env) {
    if (env === 'production') {
      return updateConfig(config);
    }

    return config;
  },
};
