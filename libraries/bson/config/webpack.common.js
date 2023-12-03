const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Base64 Demo'
        }),
    ]
}
