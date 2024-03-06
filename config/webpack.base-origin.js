const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 定义nodejs环境变量：决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production';
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
                                    useBuiltIns: 'usage', // 按需加载 会根据配置的目标环境找出需要的polyfill进行部分引入
                                    corejs: 3, // 使用 core-js@3 版本 需要支持IE浏览器，需要额外配置：core-js
                                },
                            ],
                            ['@babel/preset-react'],
                        ],
                        // 开启babel缓存
                        cacheDirectory: true
                    }
                }
            },
            {
                test: /.module.(sass|scss|css)$/,
                exclude: /node_modules/,
                // oneOf当规则匹配时，只使用第一个匹配规则
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            // 开启 css modules,动态定义样式名称
                            modules: {
                                localIdentName: "[path][name]__[local]--[hash:base64:4]",
                            },
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；pnpm
                            postcssOptions: {
                                plugins: [
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
                // 匹配不包含 .module. 且以 .css 结尾的字符串
                test: /^(?!.*\.module\.).*\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: ["style-loader", "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；pnpm
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    }],
            },
            {
                test: /^(?!.*\.module\.).*\.s[ac]ss$/,
                // test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；pnpm
                            postcssOptions: {
                                plugins: [
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
                        // 小于 maxSize 的会被打包成 base64，否则会被打包到目录，以url的形式引入
                        maxSize: 10 * 1024, // 小于10kb转base64位
                    }
                },
                generator: {
                    filename: 'assets/fonts/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: "asset",//文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI 形式
                parser: {
                    dataUrlCondition: {
                        maxSize: 25 * 1024, // 小于10kb的图片会被base64处理
                    },
                },
                generator: {
                    // 将图片文件输出到 assets/imgs 目录中
                    // 将图片文件命名 [hash:8][ext][query]
                    // [hash:8]: hash值取8位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "assets/imgs/[hash:8][ext][query]",
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
                    filename: 'assets/media/[name].[contenthash:6][ext]', // 文件输出目录和命名
                },
            },
        ]
    },
    // 打包过程中添加额外的功能。比如打包优化，资源管理，注入环境变量等。
    plugins: [
        new HtmlWebpackPlugin({
            // title 配置
            title: "Webpack V5 + React",
            template: path.resolve(__dirname, "../public/index.html"),
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