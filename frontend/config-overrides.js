const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { alias, configPaths } = require('react-app-rewire-alias');
const aliasMap = configPaths('./tsconfig.paths.json');

function updateBaseConfig(config) {
  return alias(aliasMap)(config);
}

function updateProdConfig(config) {
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
      return updateProdConfig(updateBaseConfig(config));
    }

    return updateBaseConfig(config);
  },
};
