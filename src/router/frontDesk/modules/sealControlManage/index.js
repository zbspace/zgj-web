const routes = {
  path: 'printControlManage',
  meta: {
    title: '印控管理',
    authRequired: true
  },
  component: () => import('@/views/frontDesk/PrintControlManagement/index.vue'),
  children: [
    {
      path: 'useSealManage',
      meta: {
        title: '用印管理',
        authRequired: true
      },
      children: [
        // {
        //   path: 'sealApplication',
        //   name: 'SealApplication',
        //   meta: { title: '用印申请', authRequired: true },
        //   component: () =>
        //     import(
        //       '@/views/frontDesk/PrintControlManagement/SealApplication.vue'
        //     )
        // },
        {
          path: 'selectionForm',
          name: 'SelectionForm',
          meta: { title: '用印申请', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/SealApplication/SelectionForm.vue'
            )
        },
        {
          path: 'selectionForm/:id',
          name: 'selectionForms',
          meta: { title: '用印申请', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/SealApplication/FillForm.vue'
            )
        },
        // todo
        {
          path: 'sealApplication/accomplish',
          name: 'Accomplish',
          meta: { title: '用印申请成功', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/Seal-SealApplication/Accomplish.vue'
            )
        },
        {
          path: 'intelligentPrinting',
          name: 'IntelligentPrinting',
          meta: {
            title: '智能用印',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/IntelligentPrinting.vue'
            )
        },
        {
          path: 'intelligentPrinting/transferApplication',
          name: 'TransferApplication',
          meta: { title: '转办申请', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/transferApplication.vue'
            )
        },
        {
          path: 'archive',
          name: 'Archive',
          meta: {
            title: '文件归档',
            authRequired: true
          },
          component: () =>
            import('@/views/frontDesk/PrintControlManagement/Archive.vue')
        },
        {
          path: 'archive/ArchiveReset',
          name: 'ArchiveReset',
          meta: { title: '申请重置', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/File-Archive/ArchiveReset.vue'
            )
        },
        {
          path: 'archive/filesDownLoad',
          name: 'FilesDownLoad',
          meta: { title: '文件下载', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/File-Archive/FilesDownLoad.vue'
            )
        },
        {
          path: 'recordWithSeal',
          name: 'RecordWithSeal',
          meta: {
            title: '用印记录',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/recordWithSeal.vue'
            )
        },
        {
          path: 'recordWithInvalid',
          name: 'RecordWithInvalid',
          meta: {
            title: '已作废用印单据',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/recordWithInvalid.vue'
            )
        },
        {
          path: 'recordWithSeal/innerPageApplication',
          name: 'InnerPageApplication',
          meta: { title: '用印申请', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/InnerPageApplication.vue'
            )
        },
        {
          path: 'printedTrack',
          name: 'PrintedTrack',
          meta: {
            title: '用印轨迹',
            authRequired: true
          },
          component: () =>
            import('@/views/frontDesk/PrintControlManagement/Printed-track.vue')
        }
      ]
    },
    {
      path: 'sealManage',
      meta: {
        title: '印章管理',
        authRequired: true
      },
      children: [
        {
          path: 'libraryOfSeals',
          name: 'LibraryOfSeals',
          meta: {
            title: '印章库',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/LibraryOfSeals.vue'
            )
        },
        {
          path: 'applicationForSeal',
          name: 'ApplicationForSeal',
          meta: {
            title: '印章申请',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/ApplicationForSeal.vue'
            )
        },
        {
          path: 'typeOfSeal',
          name: 'TypeOfSeal',
          meta: {
            title: '印章类型',
            authRequired: true
          },
          component: () =>
            import('@/views/frontDesk/PrintControlManagement/TypeOfSeal.vue')
        },
        {
          path: 'sealloanInformation',
          name: 'SealloanInformation',
          meta: {
            title: '印章外借信息',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/SealloanInformation.vue'
            )
        },
        {
          path: 'sealloanInformation/sealloanInnerPage',
          name: 'SealloanInnerPage',
          meta: { title: '历史记录', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/SealloanInnerPage.vue'
            )
        }
      ]
    },
    {
      path: 'fileTamperProof',
      meta: {
        title: '文件防篡改',
        authRequired: true
      },
      children: [
        {
          path: 'securityWatermark',
          name: 'SecurityWatermark',
          meta: {
            title: '防伪水印验证',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/SecurityWatermark.vue'
            )
        },
        {
          path: 'securityWatermark/waterCheckRecord',
          name: 'WaterCheckRecord',
          meta: { title: '验证记录', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/File-checkRecord/WaterCheckRecord.vue'
            )
        },
        {
          path: 'fileContentVerification',
          name: 'FileContentVerification',
          meta: {
            title: '文件内容核验',
            authRequired: true
          },
          children: [
            {
              path: 'usePrepressVerification',
              name: 'UsePrepressVerification',
              meta: {
                title: '用印前核验',
                authRequired: true
              },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/UsePrepressVerification.vue'
                )
            },
            {
              path: 'usePostPressVerification',
              name: 'UsePostPressVerification',
              meta: {
                title: '用印后核验',
                authRequired: true
              },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/UsePostPressVerification.vue'
                )
            },
            {
              path: 'ocrCheckRecord',
              name: 'OcrCheckRecord',
              meta: { title: '核验记录', authRequired: true },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/File-checkRecord/OcrCheckRecord.vue'
                )
            }
          ]
        }
      ]
    },
    {
      path: 'electronicSeal',
      meta: {
        title: '电子签章',
        authRequired: true
      },
      children: [
        {
          path: 'eSelectionForm',
          name: 'ESelectionForm',
          meta: { title: '电子签章申请', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/electronic-seal-apply/Selection-form.vue'
            )
        },
        {
          path: 'eSelectionForm/fillForm',
          name: 'ESelectionFillForm',
          meta: { title: '', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/electronic-seal-apply/fill-form.vue'
            )
        },
        // todo
        {
          path: 'eSelectionForm/accomplish',
          name: 'ESelectionAccomplish',
          meta: { title: '', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/electronic-seal-apply/accomplish.vue'
            )
        },
        {
          path: 'electronicSignatureRequired',
          name: 'ElectronicSignatureRequired',
          meta: {
            title: '待电子签章',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/ElectronicSignatureRequired.vue'
            )
        },
        {
          path: 'electronicSignatureRecord',
          name: 'ElectronicSignatureRecord',
          meta: {
            title: '电子签章记录',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/electronicSignatureRecord.vue'
            )
        },
        {
          path: 'electronicSealLibrary',
          name: 'ElectronicSealLibrary',
          meta: {
            title: '电子签章库',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/ElectronicSealLibrary.vue'
            )
        },
        {
          path: 'userAuthentication',
          name: 'UserAuthentication',
          meta: {
            title: '用户认证',
            authRequired: true
          },
          component: () => import('@/views/frontDesk/home/index.vue')
        },
        {
          path: 'innerPage',
          name: 'InnerPage',
          meta: { title: '二级页面', authRequired: true },
          component: () =>
            import('@/views/frontDesk/PrintControlManagement/InnerPage.vue')
        },
        {
          path: 'innerTablePage',
          name: 'InnerTablePage',
          meta: { title: '二级页面', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/InnerTablePage.vue'
            )
        }
      ]
    },
    {
      path: 'equipmentManage',
      name: 'EquipmentManage',
      meta: {
        title: '设备管理',
        authRequired: true
      },
      children: [
        {
          path: 'workbenchManagement',
          name: 'WorkbenchManagement',
          meta: {
            title: '工作台管理',
            authRequired: true
          },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/WorkbenchManagement.vue'
            )
        },
        {
          path: 'intelligentSealBoxManagement',
          meta: {
            title: '智能印章盒管理',
            authRequired: true
          },
          children: [
            {
              path: '',
              name: 'IntelligentSealBoxManagement',
              meta: {
                title: '智能印章盒管理',
                authRequired: true
              },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/IntelligentSealBoxManagement.vue'
                )
            },
            {
              path: 'sealBoxGrid',
              name: 'SealBoxGrid',
              meta: { title: '格口管理', authRequired: true },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/Grid-management/SealBoxGrid.vue'
                )
            },
            {
              path: 'sealBoxGridInfo',
              name: 'SealBoxGridInfo',
              meta: { title: '格口详情', authRequired: true },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/Grid-management/SealBoxGridInfo.vue'
                )
            },
            {
              path: 'viewCheckInfo',
              name: 'ViewCheckInfo',
              meta: { title: '盘点结果', authRequired: true },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/Grid-management/ViewCheckInfo.vue'
                )
            }
          ]
        },
        {
          path: 'intelligentSealCabinetManagement',
          meta: {
            title: '智能印章柜管理',
            authRequired: true
          },
          children: [
            {
              path: '',
              name: 'IntelligentSealCabinetManagement',
              meta: {
                title: '智能印章柜管理',
                authRequired: true
              },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/IntelligentSealCabinetManagement.vue'
                )
            },
            {
              path: 'cabinetGrid',
              name: 'CabinetGrid',
              meta: { title: '格口管理', authRequired: true },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/Grid-management/CabinetGrid.vue'
                )
            },
            {
              path: 'cabinetGridInfo',
              name: 'CabinetGridInfo',
              meta: { title: '格口详情', authRequired: true },
              component: () =>
                import(
                  '@/views/frontDesk/PrintControlManagement/Grid-management/CabinetGridInfo.vue'
                )
            }
          ]
        },
        // todo
        {
          path: 'viewOutSeal',
          name: 'ViewOutSeal',
          meta: { title: '???', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/Grid-management/ViewOutSeal.vue'
            )
        },
        // todo
        {
          path: 'gridType',
          name: 'GridType',
          meta: { title: '???', authRequired: true },
          component: () =>
            import(
              '@/views/frontDesk/PrintControlManagement/Grid-management/GridType.vue'
            )
        }
      ]
    }
  ]
}

export default routes
