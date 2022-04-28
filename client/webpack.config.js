const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => {
    return {
        plugins: [
            new webpack.DefinePlugin({
                process: { env: {} }
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[id].css'
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.js'
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'public'),
            },
            compress: true,
            port: 9000,
            open: true,
            hot: true
        },
        resolve: {
            fallback: {
                "assert": require.resolve("assert/"),
                "crypto": require.resolve("crypto-browserify"),
                "http": require.resolve("stream-http"),
                "https": require.resolve("https-browserify"),
                "os": require.resolve("os-browserify/browser"),
                "url": require.resolve("url/"),
                "buffer": require.resolve("buffer")
            }
        },
        module: {
            rules: [
                {
                    test: /\.(jsx|js)$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults"
                                }],
                                '@babel/preset-react'
                            ]
                        }
                    }]
                },
                {
                    test: /\.css$/i,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: env.NODE_ENV === 'development',
                            }
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 0
                            }
                        }
                    ]
                }
            ]
        }
    }
}