/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const WebpackUserscript = require("webpack-userscript");
const dev = process.env.NODE_ENV === "development";
const PnpWebpackPlugin = require("pnp-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "source", "index.ts"),
  mode: dev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: require.resolve("ts-loader"),
        options: PnpWebpackPlugin.tsLoaderOptions(),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "kitten-scientists.user.js",
  },
  plugins: [
    new WebpackUserscript({
      headers: {
        match: [
          "*bloodrizer.ru/games/kittens/*",
          "*kittensgame.com/alpha/*",
          "*kittensgame.com/beta/*",
          "*kittensgame.com/web/*",
          "file:///*kitten-game*",
        ],
        name: "Kitten Scientists",
      },
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [PnpWebpackPlugin],
  },
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
};
