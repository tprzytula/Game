const merge = require('webpack-merge');
const path = require('path');

const common = require('./webpack.config.common');

module.exports = merge(common, {
  mode: 'production'
});