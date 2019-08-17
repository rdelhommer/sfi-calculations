const merge = require('webpack-merge')
const WebpackShellPlugin = require('webpack-shell-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common.config, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/i,
        loader: 'css-loader',
        issuer: /\.html?$/i
      },
      {
        test: /\.css$/i,
        loader: ['style-loader', 'css-loader'],
        issuer: /\.[tj]s$/i
      },
      common.htmlRule,
      common.tsRule,
      common.jsPre
    ]
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: [
          'echo "Copy index file to dist..."',
          'mkdir -p ./dist',
          'cp ./index-dev.html ./dist/index.html',
        ]
    })
  ]
})