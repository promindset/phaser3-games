const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseDir = path.resolve(__dirname, '..')

module.exports = (options) => ({
  mode: options.mode,
  entry: options.entry,
  devtool: 'eval-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(baseDir, 'dist'),
    publicPath: '../dist/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        include: path.resolve(baseDir, 'src'),
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|xml)$}/i,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new CleanWebpackPlugin({
      root: path.resolve(__dirname)
    }),
    new webpack.DefinePlugin({
      CANVAS_RENDERER: JSON.stringify(true),
      WEBGL_RENDERER: JSON.stringify(true)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(baseDir, 'src', 'index.html'),
      filename: 'index.html',
      chunks: ['app'],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: false,
        collapseWhitespace: false,
        html5: false,
        minifyCSS: false,
        minifyJS: false,
        minifyURLs: false,
        removeComments: false,
        removeEmptyAttributes: false
      },
      hash: false
    }),
    ...options.plugins
  ]
})
