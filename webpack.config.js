const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const resolve = p => path.resolve(__dirname, p)
module.exports = {
  mode: 'development',
  entry: {
    app: './examples/main.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve('dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 10001,
    hot: true,
    host: '0.0.0.0',
    useLocalIp: true,
    contentBase: resolve('./plubic'),
    overlay: {warnings: true, errors: true},
    // 服务器压缩
    compress: true
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('./src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|json)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      // {
      //   test:  /\.json$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'json-loader'
      //   }
      // },
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/',
        enforce: 'pre'
      },
      {
        test: /\.scss/,
        use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'sass-loader'}]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('public', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('public', 'media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.posix.join('public', 'fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'layout',
      template: './plubic/index.html',
      minify: {
        removeAttributeQuotes: true, // 移除双引号
        collapseWhitespace: true // false | true
      },
      hash: true
    })
  ],
  optimization: {
    minimize: false
  }
}
