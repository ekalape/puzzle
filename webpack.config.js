const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ghpages = require('gh-pages');

const fs = require('fs');

const devServer = (isDev) =>
  !isDev
    ? {}
    : {
        devServer: {
          open: true,
          hot: true,
          port: 5501,
          static: 'src',
        },
      };

ghpages.publish(
  'dist',
  {
    branch: 'puzzle',
    dest: 'puzzle-game',
  },
  function (err) {}
);

module.exports = ({ develop }) => ({
  mode: develop ? 'development' : 'production',
  devtool: develop ? 'inline-source-map' : 'eval',
  entry: './src/src.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'src.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ca]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {},
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Puzzle Game',
      favicon: './src/assets/question_icon.png',
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: './assets' }],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  ...devServer(develop),
});
