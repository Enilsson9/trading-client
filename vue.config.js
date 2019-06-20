// vue.config.js
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    /*configureWebpack: {
        optimization: {
              minimizer: [
                  new TerserPlugin({
                      terserOptions: {
                          mangle: { reserved: ['$super'] },
                      },
                  }),
              ],
          }
*/
 }
