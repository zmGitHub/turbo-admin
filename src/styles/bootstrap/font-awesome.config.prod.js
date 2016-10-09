const fontAwesomeConfig = require('./font-awesome.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
module.exports = fontAwesomeConfig;

