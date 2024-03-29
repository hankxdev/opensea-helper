const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
  mode: 'production',
  optimization: {
    'minimize': true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          pure_funcs: [
            'console.log',
            'console.info',
            'console.debug',
            'console.warn'
          ]
        }
      }
    })],
  }
});