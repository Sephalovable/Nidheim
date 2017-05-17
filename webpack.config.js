const webpack = require('webpack');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const htmlEntry = new HtmlPlugin({
    hash: true,
    title: "Nidheim",
    template: path.resolve(__dirname, 'src/index.ejs')
});
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('app.css');

const optimizeChunks = new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
});

module.exports = {
    entry: {
        'vendor': [
            'angular',
            'lodash'
        ],
        'app': path.join(__dirname, 'src')
    },
    output: {
        publicPath: '/Nidheim/',
        path: __dirname,
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'ng-annotate-loader',
                    'babel-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'ngtemplate-loader',
                    'html-loader'
                ]
            },
            {
                test: /\.s?css$/,
                loader: extractCSS.extract([
                    'css-loader',
                    'sass-loader'
                ])
            },
            {
                test: /\.(jpg|png|ico|svg|eot|ttf|otf|woff2?)$/,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name]_[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        extractCSS,
        optimizeChunks,
        htmlEntry
    ],
    devtool: 'source-map',
    devServer: {
        inline: false,
        contentBase: __dirname,
        historyApiFallback: true
    }
};
