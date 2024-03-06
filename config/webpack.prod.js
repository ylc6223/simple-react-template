const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {merge} = require('webpack-merge')
const base = require('./webpack.base.js')


module.exports = merge(base, {
    mode: 'production', // 生产模式
    // 生产环境开启 CSS 优化
    optimization: {
        // minimize: false,// 开发环境下启用 CSS 优化
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
            // `...`,
            new CssMinimizerPlugin(),
        ],
    },
})

