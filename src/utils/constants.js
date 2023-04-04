// 常量
export const USER = 'USER'

// 国际化
export const LANGUAGE = 'language'

// 接口地址前缀
export const API_BASE_PREFIX = import.meta.env.VITE_API_PREFIX

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'zgj-token'

// 不需要登录的路由
export const WHITE_LIST = ['/login']

// token 存储的名称
export const TOKEN_STORE_NAME = 'zgj-token'

// 登录接口-是否需要rsa加密
export const IS_NEED_RSA = true

/**
 * 正则规则
 */
export const PATTERN_REG = {
  mobile: /^[1][3,4,5,6,7,8,9][0-9]{9}$/
}
