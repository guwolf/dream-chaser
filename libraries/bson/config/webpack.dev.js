const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: '../dist'
    },
    entry: {
        index: {
            import: './src/index.js'
        },
        demo: {
            import: './demo.js',
            dependOn: 'index'
        },
    },
});