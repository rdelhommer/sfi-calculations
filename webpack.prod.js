const merge = require('webpack-merge')
const WebpackShellPlugin = require('webpack-shell-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.js')

module.exports = merge(common.config, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader?minimize", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader?minimize'] },
      common.htmlRule,
      common.tsRule,
      common.jsPre
    ]
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    }),
    new WebpackShellPlugin({
      onBuildExit: [
          'echo "Copy index file to dist..."',
          'mkdir -p ./dist',
          'cp ./index.html ./dist/index.html',
        ]
    })
  ]
})