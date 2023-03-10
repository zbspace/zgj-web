<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 印章选择
* @LastEditTime 2023-03-09 10:46:01
!-->
<template>
  <div class="jy-select-seal">
    <JyDialog
      v-model="isVisible"
      :width="1080"
      title="选择印章"
      :mode="1"
      @on-opened="opened"
      @on-closed="closed"
    >
      <div class="">
        <el-row :gutter="12">
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
            <div class="seal-type-list" v-loading="leftLoading">
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
              @selection-change="selectionChange"
              :highlightCurrentRow="true"
            >
              <el-table-column width="60" label="">
                <template #default="scope">
                  <el-radio v-model="radio" :label="scope.row.sealId"
                    >&emsp;</el-radio
                  >
                </template>
              </el-table-column>
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
  import { computed, ref } from 'vue'
  import typeOfSealService from '@/api/frontDesk/sealManage/typeOfSeal'
  import libraryOfSealsService from '@/api/frontDesk/sealManage/libraryOfSeals'
  import { FeatchSealInfo, FeatchSealTypeInfo } from '@/utils/domain/sealManage'
  import { PaginationInfo } from '@/utils/domain/paginationInfo'

  const props = defineProps({
    modelValue: {
      type: Boolean,
      defult: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'on-submit'])

  const sealTypeTreeData = ref([])
  const searchSealTypeInfo = ref(new FeatchSealTypeInfo())
  const searchSealInfo = ref(new FeatchSealInfo())
  const paginationInfo = ref(new PaginationInfo())
  const sealList = ref([])
  const selectList = ref([])
  const actived = ref('')
  const loading = ref(false)
  const leftLoading = ref(true)
  const radio = ref('')

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
      sealTypeTreeData.value = res.data
      // if (sealTypeTreeData.value.length) {
      //   sealTypeSelect(sealTypeTreeData.value[0].sealTypeId)
      // }
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
    } catch (error) {}
    loading.value = false
  }

  const sealTypeSelect = sealTypeId => {
    actived.value = sealTypeId
    searchSealInfo.value.sealTypeIds = sealTypeId
    getLibraryOfSeal(sealTypeId)
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
    selectList.value = selectArr
    radio.value = selectArr.sealId
  }

  const closed = () => {
    radio.value = ''
  }

  const opened = () => {
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
    .seal-type-list {
      border-right: 1px solid rgba(0, 0, 0, 0.06);
      min-height: 294px;
    }
    .seal-type-item {
      display: flex;
      align-items: center;
      cursor: pointer;
      &:hover {
        color: #d0963e;
      }
      &.selected {
        color: #d0963e;
      }
      .iconpark-icon {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
    .select-block {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      input {
      }
      .btns {
        display: flex;
      }
    }
  }
</style>
