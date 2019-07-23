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
  faLoaders: [{ 
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
    loader: "url-loader?limit=10000&mimetype=application/font-woff" 
  },
  { 
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
    loader: "file-loader" 
  }],

  // NOTE: What does this do?
  jsPre: { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },


  shellPluginOnBuildExitClean: [
    'echo "Delete current server public"',
    'rm -rf ../server/dist',
  ],
  shellPluginOnBuildExitCommon: [
    'echo "Copy dist to server public..."',
    'mkdir -p ../server/dist/public/react',
    'cp -r dist/. ../server/dist/public',
    'echo "DONE"'
  ]
}