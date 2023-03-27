<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 印章选择
* @LastEditTime 2023-03-09 10:46:01
!-->
<template>
  <div>
    <JyDialog
      v-model="isVisible"
      :width="1000"
      :title="$t('t-zgj-list.SelecSeal')"
      :mode="1"
      @on-opened="opened"
      @on-closed="closed"
      :appendToBody="true"
    >
      <div class="jy-select-seal">
        <el-row :gutter="12">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <!-- <div class="seal-type-list" v-loading="leftLoading">
              <div
                class="seal-type-item"
                v-for="(item, index) in sealTypeTreeData"
                :key="index"
                :class="[item.sealTypeId === actived && 'selected']"
                @click="sealTypeSelect(item.sealTypeId)"
              >
                <svg class="iconpark-icon"><use href="#file-line"></use></svg>
                {{ item.sealTypeName }}
              </div>
              <el-empty
                description="暂无数据"
                v-if="!sealTypeTreeData.length"
              />
            </div> -->
            <div class="components-tree">
              <el-tree
                :data="sealTypeTreeData"
                node-key="sealTypeId"
                check-on-click-node
                :show-checkbox="false"
                default-expand-all
                :expand-on-click-node="false"
                check-strictly
                highlight-current
                current-node-key=""
                :props="defaultProps"
                @current-change="sealTypeSelect"
              >
                <template #default="{ node, data }">
                  <span class="custom-tree-node">
                    <svg class="iconpark-icon" v-if="node.level !== 1">
                      <use href="#file-line"></use>
                    </svg>
                    <span>{{ data.sealTypeName }}</span>
                  </span>
                </template>
              </el-tree>
            </div>
          </el-col>
          <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
            <div class="select-block">
              <div>
                <el-input
                  v-model="searchSealInfo.searchKey"
                  prefix-icon="el-icon-search"
                  placeholder="印章名称/保管人"
                  style="width: 400px"
                >
                </el-input>
              </div>
              <div class="btns">
                <el-button @click="getLibraryOfSeal" type="primary"
                  >查询</el-button
                >
                <el-button @click="reset">重置</el-button>
              </div>
            </div>

            <JyTable
              :data="sealList"
              :loading="loading"
              ref="tableRef"
              rowKey="sealId"
              @select-all="selectAll"
              @selection-change="selectionChange"
              @select="select"
              :highlightCurrentRow="true"
            >
              <el-table-column
                width="60"
                label=""
                align="center"
                v-if="props.checkType === 'radio'"
              >
                <template #default="scope">
                  <el-radio v-model="radio" :label="scope.row.sealId"
                    >&emsp;</el-radio
                  >
                </template>
              </el-table-column>
              <el-table-column
                type="selection"
                width="55"
                v-if="props.checkType === 'checkbox'"
              />
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column label="ID" prop="sealId" v-if="false">
              </el-table-column>
              <el-table-column label="印章名称" prop="sealName">
              </el-table-column>
              <el-table-column label="保管人" prop="keepUserName">
              </el-table-column>
            </JyTable>

            <JyPagination
              v-model:page="paginationInfo.current"
              v-model:pageSize="paginationInfo.size"
              :total="paginationInfo.total"
              :pages="paginationInfo.pages"
              :loadList="getLibraryOfSeal"
            />
          </el-col>
        </el-row>
      </div>

      <template #footer>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="isVisible = false">取消</el-button>
      </template>
    </JyDialog>
  </div>
</template>

<script setup>
  import { computed, nextTick, ref } from 'vue'
  import typeOfSealService from '@/api/frontDesk/sealManage/typeOfSeal'
  import libraryOfSealsService from '@/api/frontDesk/sealManage/libraryOfSeals'
  import { FeatchSealInfo, FeatchSealTypeInfo } from '@/utils/domain/sealManage'
  import { PaginationInfo } from '@/utils/domain/paginationInfo'
  import JyDialog from '@/components/common/JyDialog/index2.vue'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    },
    checkType: {
      type: String,
      default: 'radio'
    },
    haveSelectList: {
      type: [Array, String]
    }
  })

  const emit = defineEmits(['update:modelValue', 'on-submit'])

  const sealTypeTreeData = ref([])
  const searchSealTypeInfo = ref(new FeatchSealTypeInfo())
  const searchSealInfo = ref(new FeatchSealInfo())
  const paginationInfo = ref(new PaginationInfo())
  const defaultProps = ref({
    label: 'sealTypeName'
  })
  const sealList = ref([])
  const selectList = ref([])
  const actived = ref('')
  const loading = ref(false)
  const leftLoading = ref(true)
  const radio = ref('')
  const tableRef = ref(null)

  const isVisible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    }
  })

  const getTypeOfSeal = async () => {
    try {
      leftLoading.value = true
      const res = await typeOfSealService.list({ searchKey: '' })
      sealTypeTreeData.value = [
        {
          sealTypeId: '',
          sealTypeName: '印章类型',
          children: res.data
        }
      ]
    } catch (error) {}
    leftLoading.value = false
  }

  const getLibraryOfSeal = async () => {
    try {
      loading.value = true
      const res = await libraryOfSealsService.page(searchSealInfo.value)
      sealList.value = res.data.records
      paginationInfo.value.total = res.data && res.data.total
      paginationInfo.value.pages = res.data && res.data.pages
      nextTick(() => {
        toggleRowSelection()
      })
    } catch (error) {}
    loading.value = false
  }

  const toggleRowSelection = () => {
    console.log(props.haveSelectList)
    if (props.checkType === 'radio') {
      const index = sealList.value.findIndex(
        i => i.sealId === props.haveSelectList
      )
      if (index > -1) {
        tableRef.value.toggleRowSelection(sealList.value[index], true)
        radio.value = sealList.value[index].sealId
      }
    } else {
      sealList.value.forEach(item => {
        console.log(props.haveSelectList.indexOf(item.sealId))
        if (
          props.haveSelectList.findIndex(i => i.sealId === item.sealId) > -1
        ) {
          tableRef.value.toggleRowSelection(item, true)
        }
      })
    }
  }

  const sealTypeSelect = sealType => {
    console.log(sealType.sealTypeId)
    actived.value = sealType.sealTypeId
    searchSealInfo.value.sealTypeIds = sealType.sealTypeId
    getLibraryOfSeal(sealType.sealTypeId)
  }

  const reset = () => {
    searchSealTypeInfo.value = new FeatchSealTypeInfo()
    searchSealInfo.value = new FeatchSealInfo()
    paginationInfo.value = new PaginationInfo()
    getLibraryOfSeal()
  }

  const submit = () => {
    emit('on-submit', selectList.value)
  }

  const selectionChange = selectArr => {
    console.log(selectArr)
    if (props.checkType === 'radio' && selectArr) {
      radio.value = selectArr.sealId
      selectList.value = selectArr
    }
  }

  const selectAll = selection => {
    if (selection.length) {
      selection.forEach(i => {
        if (selectList.value.findIndex(o => o.sealId === i.sealId) === -1) {
          selectList.value.push(i)
        }
      })
    } else {
      sealList.value.forEach(i => {
        const index = selectList.value.findIndex(o => o.sealId === i.sealId)
        if (index > -1) {
          selectList.value.splice(index, 1)
        }
      })
    }
  }

  const select = (selection, row) => {
    const bool = selection.filter(v => v.sealId === row.sealId)
    if (bool.length) {
      selectList.value.push(row)
    } else {
      selectList.value = selectList.value.filter(v => v.sealId !== row.sealId)
    }
    console.log(selectList.value)
  }

  const closed = () => {
    radio.value = ''
    selectList.value = []
  }

  const opened = () => {
    if (props.checkType === 'radio') {
      radio.value = props.haveSelectList
      selectList.value = props.haveSelectList ? [props.haveSelectList] : []
    } else {
      selectList.value = selectList.value.concat(props.haveSelectList)
      console.log(selectList.value)
    }
    getTypeOfSeal()
    getLibraryOfSeal()
  }
</script>

<script>
  export default {
    name: 'SelectSeal'
  }
</script>

<style lang="scss" scoped>
  .jy-select-seal {
    .select-block {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .btns {
        display: flex;
      }
    }
  }
</style>
<style lang="scss">
  .components-tree {
    margin: 0;

    .el-tree-node__content {
      min-height: 32px;
    }
    .custom-tree-node {
      display: flex;
      align-items: center;

      .iconpark-icon {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
    .is-leaf {
      display: none;
    }
  }
</style>
