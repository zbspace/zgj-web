class common {
  //跳转页面
  routerPage(path) {
    if (typeof path === "number") {
      router.go(path);
    } else {
      router.push(path);
    }
  }
}
const commonFun = new common();
export default commonFun;
