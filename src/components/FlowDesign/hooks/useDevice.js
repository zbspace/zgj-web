export default function () {
  const w = document.documentElement.clientWidth;
  const h = document.documentElement.clientHeight;

  /**
   * 屏幕缩放
   * @returns
   */
  function sizeScale() {
    //固定宽高及比
    let fixed_wh = { w: 1280, h: 609, r: 1280 / 609 };
    let ratio = w / fixed_wh.w;
    return ratio;
  }

  /**
   * 是否是移动端
   * @returns
   */
  function isMobile() {
    if (
      window.navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
    ) {
      return true; // 移动端
    } else {
      return false; // PC端
    }
  }

  /**
   * 是否是横屏
   * @returns
   */
  function isOrientation() {
    let screen = false;
    if (w < h) {
      //竖屏
      screen = true;
    }
    return screen;
  }

  /**
   * 是否缩放
   * @returns
   */
  function isScale() {
    let ismobile = isMobile();
    let rscale = sizeScale();
    let isclass = false;
    if (ismobile === null) {
      isclass = false;
      return { r: 1, c: isclass };
    } else {
      isclass = true;
      return { r: rscale, c: isclass };
    }
  }

  return {
    sizeScale,
    isMobile,
    isOrientation,
    isScale
  };
}
