/**
 * axios 实例
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { API_BASE_PREFIX, TOKEN_HEADER_NAME } from './constants.js'
import { useAccountInfoStore } from '@/store/accountInfo'

const service = axios.create({
  baseURL: API_BASE_PREFIX,
  timeout: 5000
})

/**
 * 处理错误响应
 */
const processErrorResponse = function (response) {
  // 提示错误信息
  ElMessage.error(response ? response.data.msg : '请求错误')
  return Promise.reject(response.data)
}

/**
 * 添加请求拦截器
 */
service.interceptors.request.use(
  config => {
    const accountInfo = useAccountInfoStore()
    // 添加 token 到 header
    if (accountInfo.token && config.headers) {
      config.headers[TOKEN_HEADER_NAME] = accountInfo.token
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
