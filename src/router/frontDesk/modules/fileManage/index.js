const routes = {
  path: 'fileManagement',
  meta: {
    title: '文件管理',
    authRequired: true
  },
  children: [
    {
      path: 'documentLibrary',
      name: 'DocumentLibrary',
      meta: {
        title: '文件库',
        authRequired: true
      },
      component: () =>
        import('@/views/frontDesk/fileManagement/documentLibrary.vue')
    },
    {
      path: 'downloadRecord',
      name: 'DownloadRecord',
      meta: {
        title: '下载记录',
        authRequired: true
      },
      component: () =>
        import(
          '@/views/frontDesk/fileManagement/documentLibrary/Download-record.vue'
        )
    },
    {
      path: 'documentType',
      name: 'DocumentType',
      meta: {
        title: '文件类型',
        authRequired: true
      },
      component: () =>
        import('@/views/frontDesk/fileManagement/documentType.vue')
    }
  ]
}

export default routes
