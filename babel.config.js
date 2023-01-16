export default {
  // root: path.resolve(__dirname, '../../../node_modules'),
  // rootMode: "upward",
  // assumptions: {
  //     privateFieldsAsProperties: true,
  // },
  // browserslistConfigFile: path.resolve(__dirname, './.browserslistrc'),
  "presets": [
    [
      // "@babel/preset-env", // 在link时不能正确找到才用相对路经去寻找
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage", // 代替 "@babel/plugin-transform-runtime"配置
        "corejs": 3,
        "targets": {
          "node": "18"
        }
      }
    ],
    [
      "@babel/preset-typescript"
    ],
    // [
    //     "@babel/preset-react"
    // ],

  ],
  "plugins": [
    // [
    //     "@babel/plugin-transform-runtime",
    //     {
    //         "corejs": 3
    //     }
    // ],
    [
      // '@babel/plugin-proposal-decorators',
      '@babel/plugin-proposal-decorators',
      { legacy: true } // 装饰器语法处理
    ],
    [
      '@babel/plugin-proposal-class-properties',
      // '@babel/plugin-proposal-class-properties',
      // { loose: true },
    ],
    [
      // '@babel/plugin-proposal-object-rest-spread' // 对象rest、spread语法处理
      '@babel/plugin-proposal-object-rest-spread',
    ],
    // "@babel/plugin-syntax-dynamic-import"
    // "dynamic-import-webpack"
    // ["dynamic-import-node", { "noInterop": true }]
    // "@babel/plugin-syntax-dynamic-import",
  ]
}

/***
 *
 * 注释：@babel/preset-env 的useBuiltIns：entrey 和 @babel/plugin-transform-runtime不能同时开启，同时开启，两个polyfill都会打包进去
 * @babel/preset-env是在文件开头引用适合开发application，runtime是按需加载适合开发库，但是有node运行时的项目适合应runtime
 *
 */
