/**
 * axios 实例
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { API_BASE_PREFIX, TOKEN_HEADER_NAME } from './constants.js'
import { getToken } from './token-util'

const service = axios.create({
  baseURL: API_BASE_PREFIX,
  timeout: 5000
})

/**
 * 处理错误响应
 */
const processErrorResponse = function (response) {
  // 提示错误信息
  ElMessage.error(response.data.msg)
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
    const { status, data } = res
    if (status === 200) {
      if (data.code === 200) {
        return data
      } else {
        return processErrorResponse(res)
      }
    }
    return res
  },
  error => {
    // 处理响应错误
    return processErrorResponse(error.response)
  }
)

export default service
