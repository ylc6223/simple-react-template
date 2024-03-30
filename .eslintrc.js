const path = require('path');
module.exports = {
  root: true,
  extends: ['react-app', 'prettier'],
  plugins: ['react', 'prettier'],
  env: {
    node: true, // 启用node中全局变量
    browser: true // 启用浏览器中全局变量
  },
  // 解析选项
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: 'module', // ES 模块化
    ecmaFeatures: {
      // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
    }
  },
  // 具体检查规则
  rules: {
    // 我们的规则会覆盖掉react-app的规则
    // 所以想要修改规则直接改就是了
    quotes: ['error', 'single'],
    'prettier/prettier': 'error',
    'no-console': 'error',
    // 'simple-import-sort/imports': 'error',
    'no-duplicate-imports': 'error',
    'no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_'
      }
    ],
    'no-duplicate-case': 'error',
    'no-empty': 'error',
    'no-use-before-define': 'error',
    'class-methods-use-this': 'error',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'no-dupe-keys': 'error',
    'no-dupe-args': 'error',
    'no-case-declarations': 'error',
    semi: 'error', // 禁止使用分号
    'no-var': 2, // 不能使用 var 定义变量
    'array-callback-return': 'warn', // 强制数组方法的回调函数中有 return 语句，否则警告
    'default-case': [
      'warn', // 要求 switch 语句中有 default 分支，否则警告
      { commentPattern: '^no default$' } // 允许在最后注释 no default, 就不会有警告了
    ],
    eqeqeq: [
      'warn', // 强制使用 === 和 !==，否则警告
      'smart' // https://eslint.bootcss.com/docs/rules/eqeqeq#smart 除了少数情况下不会有警告
    ]
  }
  // ...
  // 其他规则详见：https://eslint.bootcss.com/docs/user-guide/configuring
};
