import dayjs from 'dayjs'
/**
 * 防抖
 * 当初发时间时，设定时间内未再次触发时间，事件执行一次，如果设定时间内又触发一次，重新开始延时设定时间
 * @param handle 事件名
 * @param time 延迟时间，单位ms
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

/**
 * 删除空的children对象
 */
export function deleteEmptyChild(treeNodes) {
  for (const thisNode of treeNodes) {
    if (!thisNode) {
      continue
    }
    if (thisNode.children && thisNode.children.length === 0) {
      delete thisNode.children
    } else if (thisNode.children && thisNode.children.length > 0) {
      thisNode.children = deleteEmptyChild(thisNode.children)
    }
  }
  return treeNodes
}

/**
 * 下载文件
 * @param fileName
 * @param content
 */
export function downloadFile(fileName, content) {
  if (!content) {
    return
  }
  if (!fileName) {
    fileName = 'noname.json'
  }
  if (typeof content === 'object') {
    // content = JSON.stringify(content, undefined, 4)
    content = JSON.stringify(content)
  }
  const blob = new Blob([content], { type: 'text/json' })
  const e = document.createEvent('MouseEvents')
  const a = document.createElement('a')
  a.download = fileName
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent(
    'click',
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  )
  a.dispatchEvent(e)
}

// 深度克隆
export function deepCopy(o) {
  if (o instanceof Array) {
    const n = []
    for (let i = 0; i < o.length; ++i) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else if (o instanceof Object) {
    const n = {}
    for (const i in o) {
      n[i] = deepCopy(o[i])
    }
    return n
  } else {
    return o
  }
}

/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export function filterObj(obj) {
  if (!(typeof obj === 'object')) {
    return
  }

  for (const key in obj) {
    if (
      // eslint-disable-next-line no-prototype-builtins
      obj.hasOwnProperty(key) &&
      (obj[key] == null || obj[key] === undefined || obj[key] === '')
    ) {
      delete obj[key]
    }
  }
  return obj
}
// import JSEncrypt from 'jsencrypt'

// // 定义公钥
// const publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCochIaKWEh6IIK1pJQcJPsYhZ2AJmGNc12XeC2lsj3dHkMO9vGrXN4ZJiN3qNLlO3hERtY0UZdN8Uz18zoiL60XoOclMuuwf1TwiMA3/4Vy2NOaQdX/RgLQ8XiRobVPLMe/JTteZ6eoPrWVC5jf4kdWD7LWwgdWrnzGs/4UiWnsQIDAQAB`
// /**
//  * rsa加密
//  */
// export function RsaEncry(data) {
//   // 使用 RSA 公钥加密 请求响应解密的key
//   const myEncrypt = new JSEncrypt()
//   myEncrypt.setPublicKey(publicKey)
//   const cryptRespKeyStr = myEncrypt.encrypt(data)
//   return cryptRespKeyStr
// }

/**
 * 数组变树
 * @param list 原数组
 * @param pid 从某以节点pid往下找
 */
export function arr2tree(list, pid = 0) {
  const parentObj = {}
  list.forEach(o => {
    parentObj[o.id] = o
  })
  if (!pid) {
    return list
      .filter(o => !parentObj[o.pid])
      .map(o => ((o.children = this.arr2tree(list, o.id)), o))
  } else {
    return list
      .filter(o => o.pid === pid)
      .map(o => ((o.children = this.arr2tree(list, o.id)), o))
  }
}

/**
 * 树变数组
 * @param tree 树结构
 */
export function tree2Array(tree, children = 'children') {
  const treeObj = JSON.parse(JSON.stringify(tree))
  const arr = []
  for (const i of treeObj) {
    if (i[children]) {
      const item = this.tree2Array(i[children])
      delete i[children]
      arr.push(i)
      for (const o of item) {
        arr.push(o)
      }
    } else {
      arr.push(i)
    }
  }
  return arr
}

/**
 * 获取树节点
 * @param {*} arr
 * @param {*} child
 * @param {*} key
 */
export function getArrFromTree(arr, child, key) {
  const tempArr = []
  const fn = arr => {
    arr.forEach(v => {
      tempArr.push(v[key])
      if (v[child] && v[child].length) {
        fn(v[child])
      }
    })
  }
  fn(arr)
  return tempArr
}

/**
 * 生成单据编号
 */
export function generatingNumber() {
  return dayjs().format('YYYYMMDD') + Math.random().toString().slice(2, 11)
}
