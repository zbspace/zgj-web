import { isValidateMobile } from '@/utils/tools'
export default class Validator {
  static validateMobile(rule, value, callback) {
    if (value) {
      if (isValidateMobile(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的联系方式'))
      }
    } else {
      callback(new Error('请输入'))
    }
  }
}
