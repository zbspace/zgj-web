/**
 * 防抖
 * 当初发时间时，设定时间内未再次触发时间，事件执行一次，如果设定时间内又触发一次，重新开始延时设定时间
 * @param handle 事件名
 *  @param time 延迟时间，单位ms
 * @param immediate 是否默认执行一次(第一次不延迟)
 */
export function debounce(handle, time = 1000, immediate = false) {
  let timer = null
  return (...args) => {
    if (immediate) {
      handle.apply(this, args)
      immediate = false
      return
    }
    clearTimeout(timer)
    timer = setTimeout(() => {
      handle.apply(this, args)
    }, time)
  }
}

/**
 * 节流
 * 设定时间内 规定事件只能触发一次
 * @param handle 事件名
 * @param delay 设定时间(ms)
 */
export function throttle(handle, delay = 1000, immediate = true) {
  let last = 0
  let timer = null
  return (...args) => {
    const now = +new Date()
    if (immediate) {
      handle.apply(this, args)
      immediate = false
      return
    }
    if (now - last < delay) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        handle.apply(this, args)
      }, delay)
    } else {
      last = now
      handle.apply(this, args)
    }
  }
}
