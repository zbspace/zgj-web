import { ref, nextTick } from 'vue'
export const fackClick = {
  mounted(element) {
    let lock = ref(true)
    let el = ref(null)
    // 自定义事件，鼠标按下、抬起，并允许冒泡
    const MousedownEvent = new Event("mousedown", { bubbles: true })
    const MouseupEvent = new Event("mouseup", { bubbles: true })
    const fakeClickOutSide = () => {
      // 触发事件
      document.dispatchEvent(MousedownEvent)
      document.dispatchEvent(MouseupEvent)
      lock.value = true // console.log('dispatchEvent');
    }
    const mousedownHandle = (e) => {
      const classList = e.target.classList
      // 该判断条件是用来判断点击的是否为下拉框
      // el-select__caret代表是点击小三角出现下拉框,el-input__inner代表点击的整个input框
      // 如果公司组件的类名不同，对应修改即可
      if (
        (classList && classList.contains("el-select__caret")) ||
        (classList && classList.contains("el-input__inner"))
      ) {
        lock.value = false
        return
      }
      if (lock.value) return
      fakeClickOutSide()
    }
    const mousewheelHandle = (e) => {
      // 如果当前select本身有滚动条，则直接返回
      // 原文对于classList没有判空，会报错
      if (
        lock.value ||
        (e.target.classList.length !== 0 &&
          e.target.classList.contains("el-select-dropdown__item")) ||
        (e.target.parentNode.classList !== undefined &&
          e.target.parentNode.classList.contains("el-select-dropdown__item"))
      )
        return
      fakeClickOutSide()
    }
    const eventListener = (type) => {
      el.value[type + "EventListener"]("mousedown", mousedownHandle)
      window[type + "EventListener"]("mousewheel", mousewheelHandle)
      window[type + "EventListener"]("DOMMouseScroll", mousewheelHandle) // fireFox 3.5+
    }

    el.value = element
    el.value.addFakeClickOutSideEventCount =
      el.value.addFakeClickOutSideEventCount || 0
    !el.value.addFakeClickOutSideEventCount &&
      nextTick(() => {
        eventListener("add")
      })
    el.value.addFakeClickOutSideEventCount += 1
  },

  unmounted() {
    eventListener("remove")
    el.value.addFakeClickOutSideEventCount -= 1
  }
}
