import { ElMessage } from 'element-plus'
export function messageError(error) {
  if (error.msg) {
    ElMessage.error(error)
  }
}

export function messageSuccess(msg) {
  ElMessage.success(msg)
}
