const merge = require('webpack-merge')
const WebpackShellPlugin = require('webpack-shell-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common.config, {
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
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
    ].concat(common.faLoaders)
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildExit: common.shellPluginOnBuildExitClean
        .concat([
          'echo "Copy index file to dist..."',
          'mkdir -p ./dist',
          'cp ./index-dev.html ./dist/index.html',
        ])
        .concat(common.shellPluginOnBuildExitCommon)
    })
  ]
})