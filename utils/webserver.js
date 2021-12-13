// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('../webpack.config'),
  env = require('./env'),
  path = require('path');

var options = config.chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      'webpack-dev-server/client?http://127.0.0.1:9090/',
      'webpack/hot/dev-server',
    ].concat(config.entry[entryName]);
  }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
  config.plugins || []
);

delete config.chromeExtensionBoilerplate;

var compiler = webpack(config);

var server = new WebpackDevServer({
  https: false,
  host: '127.0.0.1',
  port: 3000,
  devMiddleware: {
    publicPath: `http://127.0.0.1:${env.PORT}`,
    writeToDisk: true,
  },
  static: {
    directory: path.join(__dirname, '../build'),
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
}, compiler);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept();
}

server.start(env.PORT);
