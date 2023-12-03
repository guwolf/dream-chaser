const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'production',
    devtool: false,
    entry: {
        index: './src/index.js',
    },
    output: {
        library: {
            name: 'Bson',
            type: 'umd',
        },
    },
})