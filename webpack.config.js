'use strict';

const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = require('./package');

module.exports = (env, argv) => {

    const devMode = argv.mode !== 'production';

    let webpackConfig = {

        entry: {
            'index': './src/index.js'
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            publicPath: '',
            library: 'TomatoSmash',
            libraryTarget: 'umd'
        },

        module: {
            rules: [
                {
                    test: /\.(png|mp3)$/,
                    use: [{ loader: 'url-loader'}]
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                ...config,
                template: './src/index.html',
                inject: false
            }),
        ],

        devServer: {
            contentBase: "./public",
            host: "0.0.0.0",
            port: 3000
        }
    }

    if (!devMode) {

        webpackConfig.optimization = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        output: {
                            comments: false
                        }
                    }
                })
            ]
        }

    }

    return webpackConfig;
};
