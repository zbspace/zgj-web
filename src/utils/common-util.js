/**
 * 删除空的children对象，为了显示树形菜单时不显示多余的 + 号
 *
 * @author fengshuonan
 * @date 2022/5/20 18:33
 */
export function deleteEmptyChild(nodes) {
  for (const thisNode of nodes) {
    if (!thisNode) {
      continue
    }
    if (thisNode.children && thisNode.children.length === 0) {
      delete thisNode.children
    } else if (thisNode.children && thisNode.children.length > 0) {
      thisNode.children = deleteEmptyChild(thisNode.children)
    }
  }
  return nodes
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
/**
 * 通过URL下载文件
 * @param fileName
 * @param content
 */
export function downloadFileFromUrl(url) {
  if (!url) {
    return
  }
  window.location.href = url
  // let e = document.createEvent('MouseEvents'),
  //   a = document.createElement('a')
  // a.href = url
  // e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  // a.dispatchEvent(e)
}
