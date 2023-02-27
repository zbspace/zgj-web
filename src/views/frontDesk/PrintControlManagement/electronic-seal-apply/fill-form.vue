<!-- 用印申请 选中表单 -->
<template>
  <div class="electronic-seal-apply-fill-form">
    <componentsLayout Layout="breadcrumb,title,custom,fixed">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>电子签章申请 </el-breadcrumb-item>
            <el-breadcrumb-item>新建用印申请</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="../../../../assets/svg/jiantou-zuo.svg"
              alt=""
              @click="clickBackPage"
            />
            新建用印申请
          </div>
          <div> </div>
        </div>
      </template>
      <template #custom>
        <div class="custom">
          <div class="custom-buzhou">
            <SealApplicationStep
              :data="state.cache.flowList"
            ></SealApplicationStep>
          </div>
          <div style="height: 200px"> </div>
          <div>
            <documentsDetailsPortion>
              <template #title>
                <div>签署信息</div>
              </template>
              <template #content>
                <div class="Signature-content">
                  <div class="Signature-content-box">
                    <div class="Signature-content-box-title">
                      <div class="Signature-content-box-title-left">
                        <span class="Signature-content-box-title-left-bs"
                          >*</span
                        >
                        <span class="Signature-content-box-title-left-text"
                          >签署文件</span
                        >
                      </div>
                    </div>
                    <div class="Signature-content-box-cont">
                      <div class="Signature-content-box-cont-up">
                        <el-button type="primary" class="button">
                          <img
                            class="button-icon"
                            src="@/assets/svg/shangchuan-bai.svg"
                            alt=""
                          />
                          <span class="button-text">本机上传</span>
                        </el-button>
                        <el-button>
                          <img
                            class="button-icon"
                            src="@/assets/svg/shangchuan-hui.svg"
                            alt=""
                          />
                          <span class="button-text">选择在线编辑模板</span>
                        </el-button>
                      </div>
                      <div class="Signature-content-box-desc">
                        支持扩展名：doc .docx .pdf 格式文件、单文件大小不能超过
                        20M
                      </div>
                      <div class="fengexian">
                        <div class="fengexian-zw"></div>
                      </div>
                      <div class="Signature-content-box-list">
                        <div class="Signature-content-box-list-file">
                          <img
                            class="Signature-content-box-list-file-icon"
                            src="@/assets/svg/wenjian-pdf.svg"
                            alt=""
                          />
                          <span class="Signature-content-box-list-file-text"
                            >employeelist.doc</span
                          >
                        </div>
                        <div class="Signature-content-box-list-remove">
                          <img
                            class="Signature-content-box-list-remove-icon"
                            src="@/assets/svg/shanchu-lajitong-hei.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="Signature-content-box">
                    <div class="Signature-content-box-title">
                      <div class="Signature-content-box-title-left">
                        <span class="Signature-content-box-title-left-bs"
                          >*</span
                        >
                        <span class="Signature-content-box-title-left-text"
                          >签署文件</span
                        >
                        <el-button type="primary" class="button">
                          <span class="button-text">+ 新增</span>
                        </el-button>
                      </div>
                      <div class="Signature-content-box-title-right">
                        <el-checkbox v-model="checked3" label="需要我签署" />
                        <el-checkbox v-model="checked3" label="顺序签署" />
                        <el-checkbox v-model="checked3" label="指定位置签署" />
                      </div>
                    </div>
                    <div class="Signature-content-box-table">
                      <el-table
                        :data="state.componentsTable.data"
                        style="width: 100%"
                      >
                        <el-table-column
                          prop="0"
                          label=""
                          min-width="50"
                        ></el-table-column>
                        <el-table-column
                          prop="1"
                          label="签署方类型"
                          min-width="200"
                        >
                          <template #default="scope">
                            <div>
                              <el-select
                                class="width-100"
                                v-model="scope.row.typeValue"
                              >
                                <el-option
                                  v-for="data in scope.row.typeOptions"
                                  :key="data.value"
                                  :label="data.label"
                                  :value="data.value"
                                />
                              </el-select>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="2"
                          label="签署方代表"
                          min-width="200"
                        >
                          <template #default="scope">
                            <div>
                              <el-select
                                class="width-100"
                                v-model="scope.row.representValue"
                              >
                                <el-option
                                  v-for="data in scope.row.representOptions"
                                  :key="data.value"
                                  :label="data.label"
                                  :value="data.value"
                                />
                              </el-select>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="3"
                          label="签署人信息"
                          min-width="300"
                        >
                          <template #default="scope">
                            <div class="derivable">
                              <div class="ap-box-contBox derivable-left">
                                <el-input
                                  class="ap-box-contBox-input width-100"
                                  readonly
                                  v-model="scope.row.infoValue"
                                  placeholder="请选择"
                                />
                                <div class="ap-box-contBox-icon">
                                  <img
                                    class="ap-box-contBox-icon-img"
                                    src="@/assets/svg/ketanchude.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <div class="derivable-right">
                                <el-input
                                  class="ap-box-contBox-input width-100"
                                  readonly
                                  :disabled="scope.row.infoCellDisabled"
                                  v-model="scope.row.infoCellValue"
                                  placeholder="手机号"
                                />
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="4"
                          label="其他信息"
                          min-width="300"
                        >
                          <template #default="scope">
                            <div v-if="scope.row.otherShowType == 'input'">
                              <div v-if="scope.row.otherDisable == true">
                                <el-input
                                  class="ap-box-contBox-input width-100"
                                  readonly
                                  disabled
                                  v-model="scope.row[3]"
                                />
                              </div>
                              <div v-else>
                                <el-input
                                  class="ap-box-contBox-input width-100"
                                />
                              </div>
                            </div>
                            <div
                              v-else-if="scope.row.otherShowType == 'select'"
                            >
                              <div>
                                <el-select
                                  class="width-100"
                                  v-model="scope.row.value"
                                >
                                  <el-option
                                    v-for="data in scope.row.options"
                                    :key="data.value"
                                    :label="data.label"
                                    :value="data.value"
                                  />
                                </el-select>
                              </div>
                            </div>
                            <div
                              class="derivable"
                              v-else-if="scope.row.otherShowType == 'derivable'"
                            >
                              <div class="derivable-left">
                                <el-input
                                  class="ap-box-contBox-input width-100"
                                  readonly
                                  v-model="scope.row.otherValue"
                                />
                              </div>
                              <div class="ap-box-contBox derivable-right">
                                <el-input
                                  class="ap-box-contBox-input width-100"
                                  readonly
                                  placeholder="请选择内部印章"
                                />
                                <div class="ap-box-contBox-icon">
                                  <img
                                    class="ap-box-contBox-icon-img"
                                    src="@/assets/svg/ketanchude.svg"
                                    alt=""
                                  />
                                </div>
                              </div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column prop="5" label="" min-width="80">
                          <template #default="scope">
                            <div>
                              <img
                                src="@/assets/svg/shanchu-lajitong.svg"
                                alt=""
                              />
                            </div>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </template>
            </documentsDetailsPortion>
          </div>
        </div>
      </template>
      <template #fixed>
        <div class="fixed">
          <div class="ap-fixed">
            <el-button type="primary" @click="clickNextStep">下一步</el-button>
          </div>
        </div>
      </template>
    </componentsLayout>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import componentsLayout from '../../../components/Layout.vue'
  import documentsDetailsPortion from '../../../components/documentsDetails/portion.vue'
  import SealApplicationStep from '@/views/components/Seal-application/step.vue'
  import FillFormInformation from '@/views/addDynamicFormJson/Fill-form-information.json'
  import FillFormInformationSeal from '@/views/addDynamicFormJson/Fill-form-information-seal.json'
  const props = defineProps({
    // 处理类型
    type: {
      type: String,
      default: '0'
    }
  })
  const router = useRouter()
  const emit = defineEmits([])
  const state = reactive({
    cache: {
      flowList: [
        {
          name: '填写表单信息',
          active: true
        },
        {
          name: '确认审批流程'
        },
        {
          name: '完成'
        }
      ]
    },
    componentsTable: {
      header: [
        {
          prop: '0',
          label: '签署顺序',
          width: 100
        },
        {
          prop: '1',
          label: '签署方类型',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '2',
          label: '签署方代表',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '3',
          label: '签署人',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '4',
          label: '签署人账号',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '5',
          label: '签署人主体信息',
          sortable: true,
          'min-width': 150
        },
        {
          prop: '6',
          label: '使用印章',
          sortable: true,
          'min-width': 150
        }
      ],
      data: [
        {
          0: 1,
          otherShowType: 'input',
          typeOptions: [
            {
              label: '内部联系人',
              value: '1'
            },
            {
              label: '外部联系人',
              value: '2'
            }
          ],
          representOptions: [
            {
              label: '个人',
              value: '1'
            },
            {
              label: '公司',
              value: '2'
            }
          ],
          typeValue: '1',
          representValue: '1',
          infoValue: '',
          infoCellValue: '',
          infoCellDisabled: true
        },
        {
          0: 2,
          otherShowType: 'input',
          typeOptions: [
            {
              label: '内部联系人',
              value: '1'
            },
            {
              label: '外部联系人',
              value: '2'
            }
          ],
          representOptions: [
            {
              label: '个人',
              value: '1'
            },
            {
              label: '公司',
              value: '2'
            }
          ],
          typeValue: '1',
          representValue: '1',
          infoValue: '冯艺莲',
          infoCellValue: '151 0853 5283',
          infoCellDisabled: true
        },
        {
          0: 3,
          1: '内部联系人',
          2: '公司',
          3: '冯启彬',
          4: '132 9399 2217',
          5: '上海建业科技股份有限公司',
          6: '法人章',
          otherShowType: 'select',
          typeOptions: [
            {
              label: '内部联系人',
              value: '1'
            },
            {
              label: '外部联系人',
              value: '2'
            }
          ],
          representOptions: [
            {
              label: '个人',
              value: '1'
            },
            {
              label: '公司',
              value: '2'
            }
          ],
          typeValue: '1',
          representValue: '2',
          infoValue: '周海迪',
          infoCellValue: '137 8216 9138',
          infoCellDisabled: true
        },
        {
          0: 4,
          1: '内部联系人',
          2: '个人',
          3: '钱若霖',
          4: '189 2860 9388',
          5: '-',
          6: '-',
          otherShowType: 'derivable',
          typeOptions: [
            {
              label: '内部联系人',
              value: '1'
            },
            {
              label: '外部联系人',
              value: '2'
            }
          ],
          representOptions: [
            {
              label: '个人',
              value: '1'
            },
            {
              label: '公司',
              value: '2'
            }
          ],
          typeValue: '2',
          representValue: '1',
          infoValue: '吴宣萱',
          infoCellValue: '151 0853 5283',

          otherValue: '上海建业信息科技股份...'
        },
        {
          0: 5,
          1: '内部联系人',
          2: '公司',
          3: '郑盈盈',
          4: '155 5866 1691',
          5: '杭州么康医药有限公司',
          6: '-',
          otherShowType: 'input',
          otherDisable: true,
          typeOptions: [
            {
              label: '内部联系人',
              value: '1'
            },
            {
              label: '外部联系人',
              value: '2'
            }
          ],
          representOptions: [
            {
              label: '个人',
              value: '1'
            },
            {
              label: '公司',
              value: '2'
            }
          ],
          typeValue: '2',
          representValue: '2',
          infoValue: '郑盈盈',
          infoCellValue: '157 3143 582'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        stripe: true,
        'header-cell-style': {
          background: 'var(--jy-color-fill--3)'
        }
      }
    }
  })
  const refFillFormInformation = ref(null)

  // 点击返回上一页
  function clickBackPage() {
    router.go(-1)
  }

  // 点击下一步
  function clickNextStep() {
    router.push({ name: 'ConfirmApprovalProcess' })
  }

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // vFormLibraryRef.value.resetForm()
    // vFormLibraryRef.value.getFormData().then()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .electronic-seal-apply-fill-form {
    margin: 0%;
    position: relative;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desc {
        display: flex;
        align-items: center;

        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }
      }
    }

    .custom {
      // padding-right: 1.25rem;
      box-sizing: border-box;
      text-align: center;
      padding-bottom: 4rem;

      .custom-buzhou {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem 0;
        box-sizing: border-box;

        .custom-buzhou-list {
          display: flex;
          justify-content: center;
          align-items: center;

          .custom-buzhou-list-desc {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 10rem;

            .custom-buzhou-list-desc-index {
              width: 1.5rem;
              height: 1.5rem;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: var(--jy-color-fill--3);
              color: var(--jy-color-text-3);
              border-radius: var(--jy-border-radius-2);
              margin-right: 0.5rem;
            }

            .custom-buzhou-list-desc-text {
              font-size: var(--jy-font-size-title-1);
              color: var(--jy-color-text-3);
            }
          }

          .custom-buzhou-list-jiantou {
            width: 7rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .indexActive {
          background-color: var(--jy-primary-6) !important;
          color: var(--jy-in-common-use-1) !important;
        }

        .textActive {
          color: var(--jy-color-text-1) !important;
        }

        .font-color-45 {
          color: var(--jy-color-text-3) !important;
        }
      }

      .Signature-content {
        .Signature-content-box {
          .Signature-content-box-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;
            box-sizing: border-box;

            .Signature-content-box-title-left {
              text-align: left;

              .Signature-content-box-title-left-bs {
                color: red;
                margin-right: 0.2rem;
              }

              .Signature-content-box-title-left-text {
                margin-right: 0.5rem;
              }
            }
          }

          .Signature-content-box-cont {
            padding: 1.5rem;
            box-sizing: border-box;
            border: 1px solid var(--jy-color-border-1);
            border-radius: var(--jy-border-radius-4);
            margin-bottom: 1rem;
            text-align: left;

            .Signature-content-box-cont-up {
              margin-bottom: 0.5rem;
            }

            .Signature-content-box-desc {
              margin-bottom: 0.5rem;
              color: var(--jy-color-text-3);
            }
          }

          .Signature-content-box-list {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;

            .Signature-content-box-list-file {
              min-width: 50%;
              padding: 1rem;
              box-sizing: border-box;
              background-color: var(--jy-color-fill--2);
              color: var(--jy-info-6);
              margin-right: 1rem;

              .Signature-content-box-list-file-icon {
                margin-right: 0.5rem;
              }
            }
          }
        }

        .fengexian {
          width: 100%;
          padding-top: 0.5rem;
          padding-bottom: 0.5rem;
          box-sizing: border-box;

          .fengexian-zw {
            width: 100%;
            height: 1px;
            background-color: var(--jy-color-border-2);
          }
        }

        .derivable {
          display: flex;

          .derivable-left {
            width: 50%;
            padding-right: 0.5rem;
            box-sizing: border-box;
          }

          .derivable-right {
            width: 50%;
            padding-left: 0.5rem;
            box-sizing: border-box;
          }

          .ap-box-contBox {
            position: relative;
            display: flex;
            align-items: center;

            .ap-box-contBox-icon {
              position: absolute;
              right: 0.8rem;
              cursor: pointer;
              height: 50%;
              display: flex;
              align-items: center;

              .ap-box-contBox-icon-img {
                height: 100%;
              }
            }

            :deep {
              .el-input__inner {
                padding-right: 1.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }
    }

    .ap-fixed {
      width: calc(100%);
      position: absolute;
      bottom: 0%;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-top: 1px solid var(--jy-color-border-2);
      background-color: var(--jy-in-common-use-1);
      z-index: 999;
    }

    .width-100 {
      width: 100%;
    }
  }
</style>
