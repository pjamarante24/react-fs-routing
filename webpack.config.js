const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')

const env = process.env.NODE_ENV || 'development'
const isDevelopment = env !== 'production'

const PORT = process.env.PORT || 3000
const OUTPUT_PATH = 'public'
const PUBLIC_PATH = '/'

/**
 * @type {import("webpack").Configuration}
 */
const base = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(OUTPUT_PATH),
    publicPath: PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      VERSION: process.env.npm_package_version,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      scriptLoading: 'defer',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
}

const envBase = {
  development: {
    ...base,
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [...base.plugins, new ReactRefreshWebpackPlugin()],
  },
  production: {
    ...base,
    mode: 'production',
  },
}

const devServer = {
  contentBase: path.resolve(OUTPUT_PATH),
  contentBasePublicPath: '/',
  port: PORT,
  hot: true,
  overlay: true,
  open: true,
  historyApiFallback: true,
}

const config = {
  ...envBase[env],
  target: 'web',
  devServer: isDevelopment ? devServer : undefined,
}

module.exports = config
