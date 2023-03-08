/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'pid') {
  // 数组去重
  const cloneData = JSON.parse(JSON.stringify(data)) // 对源数据深度克隆
  return cloneData.filter(father => {
    // 循环所有项，并添加children属性
    const branchArr = cloneData.filter(child => father[id] === child[pid]) // 返回每一项的子级数组
    branchArr.length > 0 ? (father.children = branchArr) : '' // 给父级添加一个children属性，并赋值
    return father[pid] === '0' || father[pid] === 0 // 返回第一层
  })
}

// 解构
export function deconstructedArray(tree) {
  let res = []
  for (const item of tree) {
    const { children, ...i } = item
    if (children && children.length) {
      res = res.concat(deconstructedArray(children))
    }
    res.push(i)
  }
  return res
}
