const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'app');
const dirAssets = path.join(__dirname, 'assets');

const WEBSITE = 'http://sovacapital.com/';
const DESCRIPTION = `SOVA Capital Limited is a leading independent Russian broker, offering institutional and 
corporate clients a full range of investment banking services.`;
const TITLE = 'SOVA Capital Limited';
/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    bundle: path.join(dirApp, 'index')
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirAssets
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.ejs'),
      title: TITLE,
      description: DESCRIPTION,
      website_url: WEBSITE,
      minify: {
        collapseWhitespace: true
      }
    }),
    new ExtractTextPlugin('styles.[hash].css')
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        loader: 'file-loader?limit=1024&name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV
              }
            },
            {loader: 'postcss-loader'},
            {loader: 'sass-loader'}
          ]
        })
      },
    ]
  }
};
