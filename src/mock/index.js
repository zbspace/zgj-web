// 引入mockjs
import Mock from 'mockjs'

// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
})

let configArray = []

// 使用webpack的require.context()遍历所有mock文件
const files = import.meta.globEager('./*.js')
console.log(files)
for (const key in files) {
  if (key !== './index.js') {
    configArray = configArray.concat(files[key].default)
  }
}

// 注册所有的mock服务
configArray.forEach(item => {
  for (const [path, target] of Object.entries(item)) {
    const protocol = path.split('|')
    Mock.mock(new RegExp('^' + protocol[1]), protocol[0], target)
  }
})
