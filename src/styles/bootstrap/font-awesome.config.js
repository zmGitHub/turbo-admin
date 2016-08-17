/**
 * Configuration file for font-awesome-webpack
 *
 * In order to keep the bundle size low in production,
 * disable components you don't use.
 *
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // styleLoader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
  styles: {
    mixins: true,
    core: true,
    icons: true,
    larger: true,
    path: true,
    animated: true
  }
};
