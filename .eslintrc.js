module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended', // vue3严格模式
    'standard'
  ],

  // 单独校验规则
  overrides: [
    {
      files: ['src/api/**/*.js'],
      rules: {
        camelcase: 'off' // 文件名驼峰限制
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  plugins: [
    'vue'
  ],
  rules: {
    'eol-last': 0,
    'vue/multi-word-component-names': 'off'
  },
  // vue的全局api，添加之后就不在校验
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  }
}
