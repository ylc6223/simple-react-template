const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = merge(base, {
    mode: 'development', // 开发模式
    devtool: "source-map",
    //热更新，更改代码无需手动重新构建
    devServer: {
        open: true, // 编译完自动打开浏览器
        port: 8080,
        hot: true,
    },
})
