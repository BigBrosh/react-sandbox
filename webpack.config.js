const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

//declared chunk names through process.env to let the webpack serve only app we are working on so.
module.exports = {
  entry: {
    entry: ['@babel/polyfill', './src/index.js', './src/global.sass'],
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, './target'),
    filename: 'js/main-bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: './styles/main.css'
    }),
  ],
  module: {
    noParse: /Gatsby/,
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../styles'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: false
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'target'),
    compress: true,
    port: 3000,
    proxy: {
      '/': {
        target: 'http://localhost:3001',
        bypass: function (req) {
          if (req.headers.accept.indexOf('html') !== -1) {
            return './src/index.html';
          }
        }
      }
    }
  }
};