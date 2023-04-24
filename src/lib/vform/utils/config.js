// export const VARIANT_FORM_VERSION = '3.1.7'

// export const ACE_BASE_PATH = 'public/lib/ace/src-min-noconflict'
export const ACE_BASE_PATH =
  'https://ks3-cn-beijing.ksyun.com/vform2021/ace-mini'

export const BEAUTIFIER_PATH =
  'https://ks3-cn-beijing.ksyun.com/vform2021/js-beautify/1.14.0/beautifier.min.js'

// 不同业务必填字段集合
export const mustKeys = [
  'applyNo',
  'applyName',
  'sealName',
  'fileCount',
  'fileTypeId'
]

// 生产需要隐藏的设置属性
export const NeedHidOptions = [
  // 'labelHidden',
  'customClass',
  // 'readonly',
  // 'clearable',
  'hidden',
  // 'validation',
  'validationHint',
  // 数据源
  'dsEnabled',
  'labelKey',
  'valueKey',
  'valueFormat',
  'withCredentials',
  'uploadURL',
  'automaticDropdown',
  'allowCreate',
  'remote',
  'uniqueName' // 禁用唯一名称
]

// DEV需要隐藏的设置属性
export const NeedHidOptionsDEV = [
  // 'labelHidden',
  // 'customClass',
  // 'readonly',
  // 'hidden',
  // // 基础控件
  // 'clearable',
  // 'dsEnabled',
  // 'labelKey',
  // 'valueKey',
  // 'automaticDropdown',
  // 'allowCreate',
  // 'remote',
  // 'withCredentials'
]
