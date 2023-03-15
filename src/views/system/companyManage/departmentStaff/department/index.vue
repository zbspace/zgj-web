<template>
  <div>
    <JyTable
      url="/organ/page"
      :componentsSearchForm="state.componentsSearchForm"
      :componentsTableHeader="state.componentsTable.header"
      :componentsBatch="state.componentsBatch"
      tableClick="organName"
      @cellClick="cellClick"
    >
      <template #titles>
        <div class="title">
          <div>部门管理</div>
          <div class="title-more">
            <div class="title-more-add">
              <el-button type="primary" @click="add">+ 新增部门</el-button>
            </div>
            <div class="title-more-down">
              <el-dropdown popper-class="more-operation-dropdown">
                <el-button>
                  <img
                    class="button-icon"
                    src="@/assets/svg/gengduo-caozuo.svg"
                    alt=""
                    srcset=""
                  />
                  <span>更多操作</span>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>导入</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </template>
      <template #trees>
        <div>
          <componentsTree
            :data="state.componentsTree.data"
            :defaultAttribute="state.componentsTree.defaultAttribute"
          >
          </componentsTree>
        </div>
      </template>
    </JyTable>
    <!-- </componentsLayout> -->
    <!-- 部门与单位详情 -->
    <div class="ap-box">
      <componentsDocumentsDetails
        :show="state.componentsDocumentsDetails.show"
        :visible="state.componentsDocumentsDetails.visible"
        @clickClose="clickClose"
      >
      </componentsDocumentsDetails>
    </div>
    <!-- 新增部门 -->
    <JyDialog
      @update:show="showFormDialog = $event"
      :show="showFormDialog"
      title="新增"
      :centerBtn="true"
      :confirmText="$t('t-zgj-operation.submit')"
      :concelText="$t('t-zgj-operation.cancel')"
      :width="800"
      :height="450"
      @confirm="submitLibraryForm"
    >
      <el-form
        :model="form"
        :rules="rules"
        ref="vFormLibraryRef"
        label-width="80px"
      >
        <el-form-item label="部门名称" prop="organName">
          <el-input v-model="form.organName" clearable />
        </el-form-item>
        <el-form-item label="组织类型" prop="organTypeNo">
          <el-radio-group v-model="form.organTypeNo">
            <el-radio :label="1" size="large">部门</el-radio>
            <el-radio :label="2" size="large">单位</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="部门编码" prop="organNo">
          <el-input v-model="form.organNo" clearable />
        </el-form-item>
        <el-form-item label="上级部门" prop="organPid">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="form.organPName"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="form.organPid"
                style="margin-right: 5px"
                color="#aaaaaa"
                @click="clear('organP')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('organP')"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="部门领导" prop="leaderUserId">
          <div class="select-box-contBox">
            <el-input
              class="ap-box-contBox-input width-100"
              readonly
              v-model="form.leaderUserName"
              placeholder="请选择"
            />
            <div class="ap-box-contBox-icon">
              <el-icon
                v-if="form.leaderUserId"
                style="margin-right: 5px"
                color="#aaaaaa"
                @click="clear('leaderUser')"
                ><CircleClose
              /></el-icon>
              <img
                @click="chooseOrgan('leaderUser')"
                class="ap-box-contBox-icon-img"
                src="@/assets/svg/ketanchude.svg"
                alt=""
              />
            </div>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="readme">
          <el-input v-model="form.readme" type="textarea" clearable />
        </el-form-item>
      </el-form>
    </JyDialog>
    <!-- 人员选择  -->
    <kDepartOrPersonVue
      v-if="showDeptDialog"
      :show="showDepPerDialog"
      @update:show="closeShow"
      :searchSelected="searchSelected"
      @update:searchSelected="submit"
      :tabsShow="tabsShow"
    />
  </div>
</template>

<script setup>
  import { reactive, onBeforeMount, ref } from 'vue'
  import JyTable from '@/views/components/JyTable.vue'
  import componentsTree from '@/views/components/tree'
  import JyDialog from '@/views/components/modules/JyDialog.vue'
  import componentsDocumentsDetails from '@/views/components/documentsDetails'
  import kDepartOrPersonVue from '@/views/components/modules/KDepartOrPersonDialog'
  import department from '@/api/system/companyManagement/department'
  import { CircleClose } from '@element-plus/icons-vue'

  const showFormDialog = ref(false)
  const showDepPerDialog = ref(false)
  const showDeptDialog = ref(false)
  const vFormLibraryRef = ref(null)
  const searchSelected = ref([])
  const tabsShow = ref(['organ'])
  const kDepartOrPerson = ref(null)

  const form = reactive({
    organNo: '',
    organName: '',
    organTypeNo: 1,
    organPid: '',
    organPName: '',
    leaderUserId: '',
    leaderUserName: '',
    readme: ''
  })
  const rules = reactive({
    organName: [
      {
        required: true,
        message: '请输入部门名称',
        trigger: 'change'
      }
    ],
    organPid: [
      {
        required: true,
        message: '请选择上级部门',
        trigger: 'change'
      }
    ]
  })

  const state = reactive({
    componentsSearchForm: {
      data: [
        {
          id: 'keyWord',
          label: '关键词',
          type: 'input',
          inCommonUse: true,
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '部门名称/部门编码'
          }
        },
        {
          id: 'status',
          label: '状态',
          type: 'select',
          inCommonUse: true,
          options: [
            {
              label: '启用',
              value: 1
            },
            {
              label: '停用',
              value: 2
            }
          ],
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            placeholder: '请选择'
          }
        }
      ],
      butData: [
        {
          id: 'more',
          name: '展开',
          type: 'unfold',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'inquire',
          name: '查询',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {
            type: 'primary'
          },
          style: {}
        },
        {
          id: 'reset',
          name: '重置',
          type: 'click',
          // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
          defaultAttribute: {},
          style: {}
        }
      ]
    },

    componentsTable: {
      header: [
        {
          prop: 'organName',
          label: '部门名称',
          'min-width': 150,
          fixed: true
        },
        {
          prop: 'organNo',
          label: '部门编码',
          'min-width': 150
        },
        {
          prop: 'organType',
          label: '组织类型',
          'min-width': 150
        },
        {
          prop: 'number',
          label: '部门人数',
          sortable: 'custom',
          align: 'center',
          width: 150
        },
        {
          prop: 'leaderUserName',
          label: '部门主管',
          'min-width': 150
        },
        {
          prop: 'organPName',
          label: '上级组织',
          'min-width': 150
        },
        {
          prop: '7',
          label: '操作',
          width: 170,
          fixed: 'right',
          rankDisplayData: [
            {
              name: '修改'
            },
            {
              name: '上移'
            },
            {
              name: '下移'
            },
            {
              name: '停用'
            }
          ]
        }
      ]
    },

    componentsTree: {
      data: [
        {
          label: '企业名称',
          children: [
            {
              label: '单位名称',
              children: [
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                },
                {
                  label: '部门名称'
                }
              ]
            }
          ]
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        'check-on-click-node': true,
        'show-checkbox': false,
        'default-expand-all': true,
        'expand-on-click-node': false,
        'check-strictly': true,
        'highlight-current': true,
        'node-key': 'sealTypeId',
        'current-node-key': 'all'
      }
    },
    componentsDocumentsDetails: {
      show: false,
      visible: [
        {
          label: '单位与部门详情',
          name: 'Unit-Department-Details'
        },
        {
          label: '组织人员',
          name: 'organization-Person'
        },
        {
          label: '流程记录',
          name: 'operating-record'
        }
      ]
    },
    componentsBatch: {
      data: [
        {
          name: '批量停用'
        },
        {
          name: '批量启用'
        },
        {
          name: '批量删除'
        }
      ]
    }
  })
  // 点击表格单元格
  function cellClick(row, column, cell, event) {
    state.componentsDocumentsDetails.show = true
  }

  // 点击关闭
  function clickClose() {
    state.componentsDocumentsDetails.show = false
  }

  const chooseOrgan = type => {
    showDeptDialog.value = true
    kDepartOrPerson.value = type
    if (type === 'organP') {
      tabsShow.value = ['organ']
      searchSelected.value = form.organPid
        ? [
            {
              id: form.organPid,
              name: form.organPName
            }
          ]
        : []
    } else {
      tabsShow.value = ['user']
      searchSelected.value = form.leaderUserId
        ? [
            {
              id: form.leaderUserId,
              name: form.leaderUserName
            }
          ]
        : []
    }
    setTimeout(() => {
      showDepPerDialog.value = true
    }, 200)
  }

  const closeShow = () => {
    showDepPerDialog.value = false
    setTimeout(() => {
      showDeptDialog.value = false
    }, 200)
  }

  const clear = type => {
    if (type === 'organP') {
      form.organPid = ''
      form.organPName = ''
    } else {
      form.leaderUserId = ''
      form.leaderUserName = ''
    }
  }
  const add = () => {
    // vFormLibraryRef.value.resetFields()
    showFormDialog.value = true
  }
  const submitLibraryForm = () => {
    vFormLibraryRef.value.validate(valid => {
      if (valid) {
        console.log(form)
        department.add(form).then(() => {
          showFormDialog.value = false
          // reloadData()
        })
      }
    })
  }
  const submit = value => {
    if (kDepartOrPerson.value === 'organP') {
      form.organPid = value.length ? value[0].id : ''
      form.organPName = value.length ? value[0].name : ''
    } else {
      form.leaderUserId = value.length ? value[0].id : ''
      form.leaderUserName = value.length ? value[0].name : ''
    }
  }
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // departPage()
  })
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title-more {
      height: 100%;
      display: flex;
      align-items: center;

      .title-more-add {
        margin-right: 0.5rem;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .title-more-down {
        height: 100%;
        display: flex;
        align-items: center;
      }
    }
  }
</style>
