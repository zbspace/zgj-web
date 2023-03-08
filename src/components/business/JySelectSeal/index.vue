<template>
  <div class="jy-select-seal">
    <JyDialog v-model="isVisible" :width="800" :title="props.title">
      <el-row :gutter="12">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
          <div
            class="seal-type-item"
            v-for="(item, index) in sealTypeTreeData"
            :key="index"
            :class="[item.sealTypeId === actived && 'selected']"
            @click="sealTypeSelect(item.sealTypeId)"
          >
            {{ item.sealTypeName }}
          </div>
        </el-col>
        <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
              <el-input
                v-model="searchSealInfo.searchKey"
                prefix-icon="el-icon-search"
                placeholder="印章名称/保管人"
                clearable
              >
                <template #append>
                  <el-button @click="getLibraryOfSeal">查询</el-button>
                </template>
              </el-input>
            </el-col>
          </el-row>

          <el-table
            :data="sealList"
            v-loading="loading"
            style="width: 100%; padding-top: 5px"
            class="panes-setting"
            :cell-style="{ padding: '1px 0' }"
            default-expand-all
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            height="400"
            :border="true"
            row-key="queryField"
            ref="xzyzTable"
            @row-dblclick="sealSelect"
            stripe
          >
            <el-table-column type="index" label="序号" width="80" fixed="left">
            </el-table-column>
            <el-table-column label="ID" width="300" prop="sealId" v-if="false">
            </el-table-column>
            <el-table-column label="印章名称" width="300" prop="sealName">
            </el-table-column>
            <el-table-column label="保管人" width="200" prop="keepUserName">
            </el-table-column>
          </el-table>

          <JyPagination
            v-model:page="paginationInfo.current"
            v-model:pageSize="paginationInfo.size"
            :total="paginationInfo.total"
            :pages="paginationInfo.pages"
            :loadList="getLibraryOfSeal"
          />
        </el-col>
      </el-row>
    </JyDialog>
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import typeOfSealService from '@/api/frontDesk/sealManage/typeOfSeal'
  import libraryOfSealsService from '@/api/frontDesk/sealManage/libraryOfSeals'
  import { FeatchSealInfo, FeatchSealTypeInfo } from '@/utils/domain/SealManage'
  import { PaginationInfo } from '@/utils/domain/PaginationInfo'

  const props = defineProps({
    title: {
      type: String,
      defult: '选择印章'
    },
    modelValue: {
      type: Boolean,
      defult: false
    }
  })

  const emit = defineEmits(['update:modelValue'])

  const sealTypeTreeData = ref([])
  const searchSealTypeInfo = ref(new FeatchSealTypeInfo())
  const searchSealInfo = ref(new FeatchSealInfo())
  const paginationInfo = ref(new PaginationInfo())
  const sealList = ref([])
  const actived = ref('')
  const loading = ref(false)
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
      const res = await typeOfSealService.page(searchSealTypeInfo.value)
      sealTypeTreeData.value = res.data.records
      if (sealTypeTreeData.value.length) {
        sealTypeSelect(sealTypeTreeData.value[0].sealTypeId)
      }
    } catch (error) {}
  }

  const getLibraryOfSeal = async () => {
    try {
      loading.value = true
      const res = await libraryOfSealsService.page({
        ...searchSealInfo.value,
        ...paginationInfo.value
      })
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

  const sealSelect = seal => {}

  onMounted(() => {
    getTypeOfSeal()
  })
</script>

<script>
  export default {
    name: 'SelectSeal'
  }
</script>

<style lang="scss" scoped>
  .jy-select-seal {
    .seal-type-item {
      cursor: pointer;
      &.selected {
        background-color: red;
      }
    }
  }
</style>
