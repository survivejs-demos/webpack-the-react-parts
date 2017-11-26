const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

const pkg = require("./package.json");

const PATHS = {
  app: path.join(__dirname, "app"),
  build: path.join(__dirname, "build"),
};

const commonConfig = {
  entry: PATHS.app,
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: PATHS.build,
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        include: PATHS.app,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require("html-webpack-template"),
      title: "Kanban app",
      appMountId: "app",
      inject: false,
    }),
  ],
};

const developmentConfig = {
  devtool: "eval-source-map",
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,

    // display only errors to reduce the amount of output
    stats: "errors-only",

    // parse host and port from env so this is easy
    // to customize
    host: process.env.HOST,
    port: process.env.PORT,
  },
  module: {
    rules: [
      // Define development specific CSS setup
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};

const isVendor = ({ resource }) => /node_modules/.test(resource);

const productionConfig = {
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[chunkhash].js",
  },
  module: {
    rules: [
      // Extract CSS during build
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
        include: PATHS.app,
      },
    ],
  },
  plugins: [
    // Output extracted CSS to a file
    new ExtractTextPlugin("styles.[contenthash].css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": `"production"`,
    }),
    new UglifyWebpackPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: isVendor,
    }),
  ],
};

module.exports = env => {
  process.env.BABEL_ENV = env;

  if (env === "development") {
    return merge(commonConfig, developmentConfig);
  }

  return merge(commonConfig, productionConfig);
};
