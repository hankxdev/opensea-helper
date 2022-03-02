const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')


const srcDir = path.join(__dirname, "..", "src");
const rootDir = path.join(__dirname, "..");
const pageDir = path.join(srcDir, "pages");
const templateHtml = path.join(pageDir, 'template.html');
const ASSET_PATH = process.env.ASSET_PATH || '/';

// all these common static files
const fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];


module.exports = {
  entry: {
    options: path.join(pageDir, 'Options', 'index.tsx'),
    popup: path.join(pageDir, 'Popup', 'index.tsx'),
    background: path.join(pageDir, 'Background', 'background.ts'),
    contentScript: path.join(pageDir, 'Content', 'content.js'),
    inject: path.join(pageDir, 'Content', 'inject.js'),
  },
  output: {
    path: path.join(rootDir, "build"),
    filename: "[name].js",
    publicPath: ASSET_PATH,
  },
  optimization: {
    // splitChunks: {
    //   name: "vendor",
    //   chunks(chunk) {
    //     return chunk.name !== 'background';
    //   }
    // },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(pageDir,'Content/content.css'),
          to: path.join(rootDir, 'build'),
          force: true,
        },
        {
          from: path.join(rootDir,'src/assets/img/'),
          to: path.join(rootDir, 'build/img'),
          force: true,
        },
        {
          from: path.join(rootDir,'src/pages/analytics.js'),
          to: path.join(rootDir, 'build'),
          force: true,
        },
        {
          from: path.join(rootDir,'src/pages/initga.js'),
          to: path.join(rootDir, 'build'),
          force: true,
        },
        {
          from: path.join(rootDir, 'src/manifest.json'),
          to: path.join(rootDir, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            return Buffer.from(
              JSON.stringify({
                description: process.env.npm_package_description,
                version: process.env.npm_package_version,
                ...JSON.parse(content.toString()),
              })
            );
          },
        },
      ],
      options: {},
    }),
    new HtmlWebpackPlugin({
      template: templateHtml,
      filename: 'options.html',
      chunks: ['options'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: templateHtml,
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    })
  
  ],
};
