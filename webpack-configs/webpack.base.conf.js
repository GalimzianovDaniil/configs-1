const path = require("path"),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin");


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/'
};


module.exports = {
    performance: {
        hints: false
    },
    externals: {
        paths: PATHS
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].css`
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/img/`, to: `${PATHS.assets}img`
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/fonts/`, to: `${PATHS.assets}fonts`
            }
        ]),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            ymaps: "ymaps"
        })
    ],
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
    },
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use:    {
                    loader: 'html-loader',
                    options: {
                        interpolate: true,
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            // optipng.enabled: false will disable optipng
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            // the webp option will enable WEBP
                            webp: {
                                quality: 75
                            }
                        }
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/env", {
                                targets: {
                                    edge: "17",
                                    firefox: "60",
                                    chrome: "67",
                                    safari: "11.1",
                                    ie: "10"
                                },
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },
            
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { config: { path: './postcss.config.js' } }
                    },
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                         {
                             loader: 'file-loader?name=./assets/fonts/[name].[ext]'
                         },
                         {
                             loader: 'file-loader?name=./assets/fonts/[name].[ext]'
                         }
                     ]
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: { config: { path: 'src/js/postcss.config.js' } }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourseMap: true }
                    }
                ]
            }
        ]
    }
};