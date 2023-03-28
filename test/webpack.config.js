const { getTypescriptLoaders } = require('./loaders/TypescriptLoaders');
const { getImageLoaders } = require('./loaders/ImageLoaders');
const { getFontLoader } = require('./loaders/FontLoaders');
const { getSvgLoaders } = require('./loaders/SvgLoaders');
const { getStyleLoaders } = require('./loaders/StyleLoaders');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = (env, params) => {
  const mode = params ? params.mode : 'development';
  const isDev = mode === 'development';

  const entry = path.resolve(__dirname, 'index.tsx');

  const output = {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
  };

  const plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ].filter((p) => !!p);

  const config = {
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    resolve: {
      extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    entry,
    target: 'web',
    mode,
    output,
    plugins,
    module: {
      rules: [
        getTypescriptLoaders(),
        getImageLoaders(),
        getSvgLoaders(),
        getStyleLoaders(),
        getFontLoader(),
      ],
    },
    optimization: {
      chunkIds: 'named',
      moduleIds: 'named',
      minimizer: [
        new TerserPlugin({
          parallel: true,
        }),
      ],
    },
  };

  config.devServer = {
    hot: true,
    compress: true,
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    host: '0.0.0.0',
    port: 9000,
    allowedHosts: 'all',
    devMiddleware: {
      writeToDisk: true,
      stats: 'minimal',
      publicPath: '/',
    },
  };

  return config;
};

module.exports = config;
