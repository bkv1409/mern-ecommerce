const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

require('dotenv').config()

const common = require('./webpack.common');

const CURRENT_WORKING_DIR = process.cwd();
const PORT = process.env.PORT || 4000;
const FRONT_PORT = process.env.FRONT_PORT || 8080;

const config = {
  mode: 'development',
  output: {
    path: path.join(CURRENT_WORKING_DIR, '/dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(CURRENT_WORKING_DIR, 'client/public/index.html'),
      inject: true
    }),
    // new webpack.EnvironmentPlugin(['NODE_ENV', 'DEBUG']),

],
  devServer: {
    // port: 8080,
    port: FRONT_PORT,
    open: true,
    inline: true,
    compress: true,
    hot: true,
    disableHostCheck: false,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:'+PORT
    }
  },
  devtool: 'eval-source-map'
};

module.exports = webpackMerge(common, config);
