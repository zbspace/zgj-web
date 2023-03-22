import { ElMessage } from 'element-plus'
export function messageError(error) {
  if (error.msg || typeof error === 'string') {
    ElMessage.error(error)
  }
}

export function messageSuccess(msg) {
  ElMessage.success(msg)
}

export function messageWarning(msg) {
  ElMessage.warning(msg)
}
