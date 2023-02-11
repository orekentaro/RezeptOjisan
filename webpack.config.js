const path = require("path");
const GasPlugin = require("gas-webpack-plugin");
const Es3ifyPlugin = require("es3ify-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  context: __dirname,
  entry: "./src/main.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [new GasPlugin(), new Es3ifyPlugin()],
};
const loaders = { swc: "swc-loader" };
const loaderOptions = {
  swc: {
    sync: true,
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
    },
  },
};
