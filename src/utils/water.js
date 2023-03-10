let waterStr = ''
const id = '1.23452384164.123412415'
const setWatermark = str => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
  const can = document.createElement('canvas')
  can.width = 400
  can.height = 300
  const cans = can.getContext('2d')
  cans.rotate((-25 * Math.PI) / 180)
  cans.font = '14px Vedana'
  cans.fillStyle = '#666666'
  cans.textAlign = 'center'
  cans.textBaseline = 'Middle'
  cans.fillText(str, can.width / 2, can.height)
  const div = document.createElement('div')
  div.id = id
  div.style.pointerEvents = 'none'
  div.style.top = '20px'
  div.style.left = '0px'
  div.style.opacity = '0.15'
  div.style.position = 'fixed'
  div.style.width = document.documentElement.clientWidth + 'px'
  div.style.height = document.documentElement.clientHeight + 'px'
  div.style.background =
    'url(' + can.toDataURL('image/png') + ') left top repeat'
  document.body.appendChild(div)
  return id
}

window.onresize = () => {
  if (document.getElementById(id) !== null) {
    setWatermark(waterStr)}
  }
// 添加水印
export const setWaterMark = str => {
  waterStr = str
  let id = setWatermark(str)
  if (document.getElementById(id) === null) {
    id = setWatermark(str)
  }
}
// 移除水印
export const removeWatermark = () => {
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }
}
