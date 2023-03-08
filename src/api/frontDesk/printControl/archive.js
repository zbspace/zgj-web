// api 全局配置
import request from '@/utils/request'
// 用印申请

const api = {}
// 文件归档列表
api.archivePage = params => {
  return request({
    method: 'GET',
    url: '/archive/page',
    params
  })
}
// 单个文件归档
api.archiveFileFinish = data => {
  return request({
    method: 'POST',
    url: '/archive/file/finish',
    params: data
  })
}
// 删除归档文件
api.archiveDelete = data => {
  return request({
    method: 'POST',
    url: '/archive/file/delete',
    params: data
  })
}
// 完成文件归档
api.archiveFinish = data => {
  return request({
    method: 'POST',
    url: '/archive/finish',
    params: data
  })
}
// 文件归档申请重置
api.archiveRestApply = data => {
  return request({
    method: 'POST',
    url: '/archive/reset/apply',
    params: data
  })
}
// 文件归档撤销重置
api.archiveRestCancel = data => {
  return request({
    method: 'POST',
    url: '/archive/reset/cancel',
    params: data
  })
}
// 文件归档文件打包下载
api.archiveDownloadPack = params => {
  return request({
    method: 'get',
    url: '/archive/download/pack',
    params
  })
}
// 文件归档下载记录分页
api.archiveDownloadPage = params => {
  return request({
    method: 'GET',
    url: '/archive/download/page',
    params
  })
}
// 文件归档打包文件删除
api.archiveDownloadDelete = params => {
  return request({
    method: 'GET',
    url: '/archive/download/delete',
    params
  })
}
export default api
