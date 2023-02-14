/**
 * axios 实例
 */
import axios from 'axios'
import { message } from 'ant-design-vue'
import { API_BASE_PREFIX, TOKEN_HEADER_NAME } from '@/config/setting'
import { getToken, setToken } from './token-util'

const service = axios.create({
  baseURL: API_BASE_PREFIX
})

/**
 * 处理错误响应
 */
const processErrorResponse = function (response) {
  // 如果是非B0301，则提示错误信息
  if (response.data.code !== 'B0301') {
    message.error(response.data.message)
  }
  return Promise.reject(response.data)
}

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  config => {
    // 添加 token 到 header
    const token = getToken()
    if (token && config.headers) {
      config.headers.common[TOKEN_HEADER_NAME] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 添加响应拦截器
 */
service.interceptors.response.use(
  res => {
    // 请求成功，token自动续期
    if (res.data?.code === '00000') {
      const token = res.headers[TOKEN_HEADER_NAME.toLowerCase()]
      if (token) {
        setToken(token)
      }
      return res
    }

    return processErrorResponse(res)
  },
  error => {
    // 处理响应错误
    return processErrorResponse(error.response)
  }
)

export default service
