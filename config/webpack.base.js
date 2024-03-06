const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction)
module.exports = {
    mode: "development", // 开发模式
    // 构建的起始入口
    entry: path.resolve(__dirname, "../src/index.jsx"),
    // 构建产物输出配置
    output: {
        // 文件输出目录，必须是绝对路径
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/",//指定捆绑包应进入的目录
        // filename: 输出文件名
        filename: '[name].[hash:8].js', // 打包的文件名
        // 只打包用到的文件
        clean: true,
    },
    resolve: {
        // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
    },
    // 配置loader
    module: {
        rules: [
            {
                test: /\.(?:js|mjs|cjs|jsx)$/,
                exclude: /node_modules/,// 排除node_modules代码不编译
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                                    useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                                    corejs: 3, // 使用 core-js@3 版本
                                },
                            ],
                            ['@babel/preset-react'],
                        ],
                    }
                }
            },
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: [
                    isProduction ?MiniCssExtractPlugin.loader:"style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    }
                ],
            },
            {
                test: cssModuleRegex,
                use: [
                    isProduction ?MiniCssExtractPlugin.loader:"style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[local]-[hash:base64:4]",
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    }
                ],
            },
            {
                test: sassRegex,
                exclude: sassModuleRegex,
                use: [
                    isProduction ?MiniCssExtractPlugin.loader:"style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
            },
            {
                test: sassModuleRegex,
                use: [
                    isProduction ?MiniCssExtractPlugin.loader:"style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            modules: {
                                localIdentName: "[local]-[hash:base64:4]",
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    "autoprefixer",
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader"
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/fonts/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                exclude: /node_modules/,
                type: "asset",//文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                    },
                },
                generator: {
                    // 将图片文件输出到 static/imgs 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "static/imgs/[hash:8][ext][query]",
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|avi)$/, // 匹配媒体文件
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'static/media/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            },
        ]
    },
    // 打包过程中添加额外的功能。比如打包优化，资源管理，注入环境变量等。
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack V5 + React",
            inject: true,
            minify: {
                minifyCSS: false, // 是否压缩css
                collapseWhitespace: false, // 是否折叠空格
                removeComments: true, // 是否移除注释
            },
            favicon: path.resolve(__dirname,"../public/favicon.ico"),
            template: path.resolve(__dirname, "../public/index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[hash:8].css', // 将css单独提测出来放在assets/css 下
        }),
        new ESLintWebpackPlugin({
            fix: true, // 启用 ESLint 自动修复特性
            exclude: '/node_modules/', // 排除 node_module 的检查
            extensions: ['js', "jsx", 'json', 'coffee'], // 需要排查的文件
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "../src"),
        }),
    ],
};