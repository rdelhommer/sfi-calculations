let { AureliaPlugin } = require('aurelia-webpack-plugin')
let path = require('path')

module.exports = {
  config: {
    entry: {
      main: 'aurelia-bootstrapper'
    },
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
  
    resolve: {
      extensions: ['.ts', '.js', '.json'],
      symlinks: false,
      modules: ['src', path.resolve('node_modules')]
    },
  
    plugins: [
      new AureliaPlugin()
    ]
  },

  tsRule: { test: /\.ts?$/, loader: "awesome-typescript-loader" },
  htmlRule: { test: /\.html$/, use: 'html-loader' },

  // NOTE: What does this do?
  jsPre: { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
}