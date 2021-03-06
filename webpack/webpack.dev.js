const path = require('path')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const baseDir = path.resolve(__dirname, '..')

module.exports = require('./webpack.config')({
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    app: [path.resolve(baseDir, 'src', 'app.ts')]
  },
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
  plugins: [
    new BrowserSyncPlugin({
      host: process.env.IP || 'localhost',
      port: process.env.PORT || 3000,
      server: {
        baseDir: ['./', './dist']
      }
    })
  ]
})
