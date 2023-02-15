module.exports = {
  tabWidth: 2, // 缩进长度
  useTabs: false, // 使用空格代替tab缩进
  semi: false, // 句末使用分号
  vueIndentScriptAndStyle: true, // 不对vue中的script及style标签缩进
  quoteProps: 'as-needed', // 仅在必需时为对象的key添加引号
  bracketSpacing: true, // 在对象前后添加空格-eg: { foo: bar }
  jsxBracketSameLine: false, // 多属性html标签的‘>’折行放置
  jsxSingleQuote: false, // jsx中使用单引号
  insertPragma: false, // 在已被preitter格式化的文件顶部加上标注
  requirePragma: false, // 无需顶部注释即可格式化
  proseWrap: 'never', // 对HTML全局空白不敏感
  htmlWhitespaceSensitivity: 'strict', // 对HTML全局空白不敏感
  endOfLine: 'auto', // 结束行形式
  rangeStart: 0,
  singleQuote: true, // 使用单引号
  printWidth: 80, // 单行长度
  trailingComma: 'none', // 多行时尽可能打印尾随逗号
  arrowParens: 'avoid' // 单参数箭头函数参数周围使用圆括号-eg: (x) => x
}
