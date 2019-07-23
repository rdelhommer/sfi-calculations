const merge = require('webpack-merge')
const WebpackShellPlugin = require('webpack-shell-plugin')
const CompressionPlugin = require('compression-webpack-plugin');
const common = require('./webpack.common.js')

module.exports = merge(common.config, {
  mode: 'production',
  module: {
    rules: [
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
      onBuildExit: common.shellPluginOnBuildExitClean
        .concat([
          'echo "Copy index file to dist..."',
          'mkdir -p ./dist',
          'cp ./index.html ./dist/index.html',
        ])
        .concat(common.shellPluginOnBuildExitCommon)
    })
  ]
})