// Node.js的核心模块，专门用来处理文件路径
const path = require("path");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    mode: "development", // 开发模式
    // 构建的起始入口
    entry: path.join(__dirname, "./src/index.jsx"),
    // 构建产物输出配置
    output: {
        // 文件输出目录，必须是绝对路径
        path: path.resolve(__dirname, "./dist"),
        publicPath: "/",//指定捆绑包应进入的目录
        // filename: 输出文件名
        filename: "main.js",
        // 只打包用到的文件
        clean: true,
    },
    devtool: "source-map",
    resolve: {
        // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
        extensions: ['.js', '.json', '.jsx', '.ts', '.tsx'],
        alias: {
            '@': path.resolve(__dirname, './src')
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
                // 用来匹配 .css 结尾的文件
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
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
            // title 配置
            title: "Webpack V5 + React",
            template: path.resolve(__dirname, "./public/index.html"),
        }),
        //分离和缩小 CSS 文件，并将它们作为链接嵌入到 HTML 文件中，避免FOUC(flash of unstyled content)
        new MiniCssExtractPlugin(),
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录
            context: path.resolve(__dirname, "src"),
        }),
    ],
    //热更新，更改代码无需手动重新构建
    devServer: {
        // static: path.join(__dirname, 'public/'),//允许配置从目录（默认为“public”目录）提供静态文件的选项
        port: 3000,
        hot: "only",
        static: {
            directory: path.join(__dirname, "./public"),
        },
    },
};