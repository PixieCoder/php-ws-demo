const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    const plugins = [
        new CleanWebpackPlugin(['dist/*']),
        new HtmlWebpackPlugin({template: 'src/templates/index.html',}),
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
        new webpack.optimize.CommonsChunkPlugin({name: 'runtime'})
    ];

    if (isProd) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin(
                {
                    compress: {
                        warnings    : !isProd,
                        drop_console: isProd,
                    }
                })
        );
    }
    return plugins;
}

const config = {
    devtool: isProd ? 'hidden-source-map' : 'source-map',

    entry: {
        entryPoint: './src/templates/entrypoint.js',
    },

    output: {
        path    : path.join(__dirname, 'dist'),
        filename: 'js/[name].js',
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.js', '.json', '.jsx'],
    },

    plugins: getPlugins(),

    module: {
        rules: [
            {
                test   : /\.js(x)?$/,
                exclude: /node_modules/,
                use    : {
                    loader : 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            require('@babel/plugin-proposal-object-rest-spread'),
                            require('@babel/plugin-proposal-optional-chaining'),
                            require('@babel/plugin-transform-react-jsx'),
                            require('@babel/plugin-proposal-class-properties')
                        ]
                    }
                }
            }
        ]
    }
};

module.exports = config;
