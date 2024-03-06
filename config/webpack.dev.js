const path = require("path")
const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(base, {
    mode: 'development', // 开发模式
    devtool: "source-map",
    //热更新，更改代码无需手动重新构建
    devServer: {
        open: true, // 编译完自动打开浏览器
        port: 8080,
        compress: false, //|压缩
        hot: true, //|热更新
        historyApiFallback: true, //| 解决404的问题
        // 添加一个处理.ico文件的规则
        // static: {
        //     directory: path.join(__dirname, '../public'),
        //     serveIndex: true,
        //     watch: true,
        // },
    },
})
