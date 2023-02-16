// 通用的  共享的  方法 函数 属性
class Common {
  // 跳转页面
  routerPage(router, path) {
    if (typeof path === 'number') {
      router.go(path)
    } else {
      router.push(path)
    }
  }
}
const commonFun = new Common()
export default commonFun
