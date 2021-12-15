

const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NODE_ENV = process.env.NODE_ENV !== 'production' ? 'development' : 'production'
const isDevelopment = NODE_ENV !== 'production';

const DefinePlugin = webpack.DefinePlugin
const ModuleFederationPlugin = webpack.container.ModuleFederationPlugin


function getCssLoader(loaders = [], cssLoaderOptions = {}, isExtract = !isDevelopment) {
    let defaultLoader = [
        // 将css插入到dom中 
        !isExtract ? 'style-loader' : {
            loader:MiniCssExtractPlugin.loader
        },
        {
            // 将css打包成commonjs模块
            loader: 'css-loader',
            options: {
                // 0 => no loaders (default);
                // 1 => postcss-loader;
                // 2 => postcss-loader, sass-loader
                importLoaders:loaders.length>0?2:1,
                modules: false,
                ...cssLoaderOptions
            }
        },
        {
            // 为css处理css最新语法
            loader: 'postcss-loader',
            options: {

            }
        }
    ].concat(loaders).filter(Boolean)
    return defaultLoader

}
function getLessLoader() {
    return getCssLoader([{
        loader: "less-loader"
    }], {
        modules: {
            auto: /\.module\.less$/i
        }
    })
}
function getSassLoader() {
    return getCssLoader([{
        loader: "sass-loader"
    }], {
        modules: {
            auto: /\.module\.s(a|c)ss$/i
        }
    })
}

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const webpackConfig = {
    name: "main",
    mode: NODE_ENV,
    devtool:isDevelopment?'cheap-module-source-map':false,//eval-cheap-module-source-map
    entry: {
        main:'./src/index'
    },
    output: {
        chunkLoadingGlobal: 'webpackJsonp_main',
        globalObject: 'window',
        publicPath:"/",
        filename: '[name].js',// 入口文件 initail
        chunkFilename: '[name].[contenthash].js', // non initail 可能会出现在使用 动态导入(dynamic imports) 或者 SplitChunksPlugin 时。
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'images/[hash][ext][query]', // rules typo assert/resource
        clean: true
    },
    module: {
        
        rules: [
            {
                oneOf:[{
                    test: /\.(png|jpg|jpge)$/,
                    type: "asset/resource",
                    include: path.resolve(__dirname, 'src')
                },
                {
                    test: /\.svg$/,
                    type: "asset/inline",
                    include: path.resolve(__dirname, 'src')
                },
                {
                    resourceQuery: /raw/,
                    type: "asset/source",
                    include: path.resolve(__dirname, 'src')
                },
                {
                    test: /\.tsx?$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                getCustomTransformers: () => ({
                                    before: [isDevelopment && ReactRefreshTypeScript()].filter(Boolean),
                                }),
                                transpileOnly: isDevelopment,
                            },
                        },
                    ]
                },
                {
                    test: /\.css$/,
                    use: getCssLoader()
                },
                {
                    test: /\.less$/,
                    use: getLessLoader()
                },
                {
                    test: /\.s(c|a)ss$/,
                    use: getSassLoader()
                }]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
        }),
        isDevelopment && new ReactRefreshPlugin(),
        !isDevelopment && new MiniCssExtractPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'main',
            template: path.resolve(__dirname, 'public/index.html')
        }),
        // new ModuleFederationPlugin({
        //     name: "main",
        //     remotes: {
        //         app1: "app1@http://localhost:8461/remoteEntry.js",
        //     },
        //    // shared: { react: { eager:true,singleton: true ,requiredVersion:"17.0.2"}, "react-dom": { eager:true, singleton: true,requiredVersion:"17.0.2" } },
        // })
    ].filter(Boolean),
    optimization:{
        runtimeChunk:"single",
        minimize:false,// 不压缩
        concatenateModules:true, // 类似rollup打包方式，联连模块
        // splitChunks:{
        //     cacheGroups:{
        //         // 公共的
        //         common:{
        //             name:'common',
        //             priority:-30,
        //             minChunks:2 // 引用2次以上
        //         },
        //         // 第三方
        //         vendors:{
        //             chunks:"initial",
        //             priority: -20,
        //             test: /[\\/]node_modules[\\/]/,
        //             name:'vendors'
        //         },
        //         // react
        //         reactVendors:{
        //            chunks:"initial",
        //            priority: -10,
        //            test:/[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        //            name:'react-vendors'
        //         }
        //     }
        // }
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
          },
        port: 8460,
        hot: true,
        historyApiFallback:true
    }
}

module.exports = webpackConfig