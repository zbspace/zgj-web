module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended", // vue3严格模式
    // 'standard'
  ],
  parserOptions: {
    ecmaVersion: 12,
    // parser: '@typescript-eslint/parser',
    sourceType: "module",
  },
  plugins: [
    "vue",
    // '@typescript-eslint'
  ],
  // 单独校验规则
  overrides: [
    {
      files: ["src/api/**/*.ts"],
      rules: {
        camelcase: "off", // 文件名驼峰限制
      },
    },
  ],
  // 全局验证规则
  rules: {
    // '@typescript-eslint/triple-slash-reference': 'off',
    // 'vue/multi-word-component-names': 'off', // 关闭名称校验
    // '@typescript-eslint/strict-boolean-expressions': 'off',
    // 'dot-notation': 'off'
  },
  // vue的全局api，添加之后就不在校验
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
  },
};
