<!--
  * @Descripttion index.vue
  * @FileName index.vue
  * @Author zb
  * @module 
  * @LastEditTime 2023-04-21 14:48:49
  !-->
<template>
  <div class="Functions-container">
    <el-scrollbar :height="'calc(100vh - 300px)'">
      <el-checkbox-group v-model="functionIds">
        <template v-for="item1 in permissionData" :key="item1.id">
          <div class="container1 container">
            <el-checkbox
              :label="item1.id"
              :indeterminate="getSelected(item1)"
              @change="change(item1)"
            >
              {{ item1.name }}
            </el-checkbox>
          </div>
          <template v-for="item2 in item1.children" :key="item2.id">
            <div class="container2 container" v-if="item2.type !== 'point'">
              <div class="left">
                <svg
                  class="iconpark-icon"
                  v-if="
                    haveChildren(item2.children, 'menu') ||
                    haveChildren(item2.children, 'tab')
                  "
                  @click="putAway(item2.id, item2)"
                >
                  <use href="#down"></use>
                </svg>
                <el-checkbox
                  :label="item2.id"
                  :indeterminate="getSelected(item2)"
                  @change="change(item2)"
                >
                  {{ item2.name }}</el-checkbox
                >
              </div>
              <div class="right">
                <template v-for="(v, i) in item2.children" :key="i">
                  <div v-if="v.type === 'point'">
                    <template></template>
                    <el-checkbox :label="v.id" @change="change(v)">
                      {{ v.name }}
                    </el-checkbox>
                    &emsp;
                  </div>
                </template>
              </div>
            </div>
            <div class="model height-0" :class="[`${item2.id}-model`]">
              <template v-for="item3 in item2.children" :key="item3.id">
                <div class="container3 container" v-if="item3.type !== 'point'">
                  <div class="left">
                    <svg
                      class="iconpark-icon"
                      v-if="
                        haveChildren(item3.children, 'menu') ||
                        haveChildren(item3.children, 'tab')
                      "
                      @click="putAway(item3.id, item3)"
                    >
                      <use href="#down"></use>
                    </svg>
                    <el-checkbox
                      :label="item3.id"
                      :indeterminate="getSelected(item3)"
                      @change="change(item3)"
                    >
                      {{ item3.name }}</el-checkbox
                    >
                  </div>
                  <div class="right">
                    <template v-for="(v, i) in item3.children" :key="i">
                      <div v-if="v.type === 'point'">
                        <el-checkbox :label="v.id" @change="change(v)">
                          {{ v.name }}
                        </el-checkbox>
                        &emsp;
                      </div>
                    </template>
                  </div>
                </div>
                <div class="model height-0" :class="[`${item3.id}-model`]">
                  <template v-for="item4 in item3.children" :key="item4.id">
                    <div
                      class="container4 container"
                      v-if="item4.type !== 'point'"
                    >
                      <div class="left">
                        <svg
                          class="iconpark-icon"
                          v-if="
                            haveChildren(item4.children, 'menu') ||
                            haveChildren(item4.children, 'tab')
                          "
                          @click="putAway(item4.id, item4)"
                        >
                          <use href="#down"></use>
                        </svg>
                        <el-checkbox
                          :label="item4.id"
                          :indeterminate="getSelected(item4)"
                          @change="change(item4)"
                        >
                          {{ item4.name }}</el-checkbox
                        >
                      </div>
                      <div class="right">
                        <template v-for="(v, i) in item4.children" :key="i">
                          <div v-if="v.type === 'point'">
                            <el-checkbox :label="v.id" @change="change(v)">
                              {{ v.name }}
                            </el-checkbox>
                            &emsp;
                          </div>
                        </template>
                      </div>
                    </div>

                    <div class="model height-0" :class="[`${item4.id}-model`]">
                      <template v-for="item5 in item4.children" :key="item5.id">
                        <div
                          class="container5 container"
                          v-if="item5.type !== 'point'"
                        >
                          <div class="left">
                            <el-checkbox
                              :label="item5.id"
                              @change="change(item5)"
                            >
                              {{ item5.name }}</el-checkbox
                            >
                          </div>
                          <div class="right">
                            <template v-for="(v, i) in item5.children" :key="i">
                              <div v-if="v.type === 'point'">
                                <el-checkbox :label="v.id" @change="change(v)">
                                  {{ v.name }}
                                </el-checkbox>
                                &emsp;
                              </div>
                            </template>
                          </div>
                        </div>
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </template>
        </template>
      </el-checkbox-group>
    </el-scrollbar>

    <div class="bottom-btns">
      <el-button type="primary" @click="roleFunctionEdit">确认</el-button>
      <el-button>重置</el-button>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import api from '@/api/system/companyManagement/departmentStaff'
  import { messageError, messageSuccess } from '@/hooks/useMessage'
  import { getArrFromTree, getArrNodeFromTree } from '@/utils/tools'
  import { useRoute } from 'vue-router'

  const permissionData = ref([])
  const functionIds = ref([])
  const defaultExpandedKeys = ref([])
  const defaultCheckedKeys = ref([])

  const route = useRoute()

  const haveChildren = (arr, type) => {
    if (!arr || !arr.length) {
      return false
    }
    if (arr.find(v => v.type === type)) {
      return true
    }
    return false
  }

  const putAway = (index, row) => {
    if (!row.putAway) {
      document
        .getElementsByClassName(`${index}-model`)[0]
        .classList.remove('height-0')
      row.putAway = true
    } else {
      document
        .getElementsByClassName(`${index}-model`)[0]
        .classList.add('height-0')
      row.putAway = false
    }
  }

  // 节点选中发生变化触发
  const change = value => {
    const haveId = functionIds.value.includes(value.id)
    // 1. 被选中
    if (haveId) {
      // 1-1. 所有子节点都选中
      if (value.children) {
        const arr = getArrFromTree([value], 'children', 'id')
        functionIds.value = Array.from(new Set([...functionIds.value, ...arr]))
      }
      // 1-2. 所有父节点根据其子节点更新选中状态
      const fathers = findFathers(value)
      fathers.forEach(element => {
        // 2-1. 判断子节点是否都被选中
        const arr = getArrFromTree([element], 'children', 'id')
        const tempNodes = functionIds.value.filter(id => arr.includes(id))
        console.log('--->', element.name, tempNodes.length, arr.length - 1)
        if (tempNodes.length === arr.length - 1) {
          functionIds.value.push(element.id)
        }
      })
    }
    // 2. 未被选中
    if (!haveId) {
      // 2-1. 所有子节点都取消选中
      if (value.children) {
        const arr = getArrFromTree([value], 'children', 'id')
        functionIds.value = functionIds.value.filter(id => !arr.includes(id))
      }
      // 2-2. 所有父节点取消选中
      const fathers = findFathers(value)
      if (fathers.length) {
        functionIds.value = functionIds.value.filter(
          id => !fathers.map(v => v.id).includes(id)
        )
      }
    }
  }

  const findFathers = obj => {
    const tempArr = []
    while (obj.pid !== '-1') {
      obj = getArrNodeFromTree(
        permissionData.value,
        'children',
        'id',
        obj.pid
      )[0]
      tempArr.push(obj)
    }
    return tempArr
  }

  /**
   * 判断当前节点半选状态
   * @param {*} arr
   * @param {*} curId
   * return false/true
   */
  const getSelected = node => {
    // 1. 当前节点是否被选中
    if (functionIds.value.includes(node.id)) {
      return false
    }
    // 2. 判断子节点是否有被选中
    const arr = getArrFromTree([node], 'children', 'id')
    const tempNodes = functionIds.value.filter(id => arr.includes(id))
    if (tempNodes.length) {
      return true
    } else {
      return false
    }
  }

  const getAllPublic = async () => {
    try {
      const res = await api.getAllPublic()
      permissionData.value = res.data
      defaultExpandedKeys.value = permissionData.value.map(v => v.id)
      defaultCheckedKeys.value.push(defaultExpandedKeys.value[0])
    } catch (error) {
      messageError(error)
    }
  }

  const roleFunctionEdit = async () => {
    try {
      await api.roleFunctionEdit({
        roleId: route.query.roleId,
        functionIds: functionIds.value
      })
      messageSuccess('角色权限修改成功')
    } catch (error) {
      messageError(error)
    }
  }

  const getSelectedFunctionIds = async () => {
    try {
      const res = await api.getSelectedFunctionIds(route.query.roleId)
      functionIds.value = res.data
    } catch (error) {
      messageError(error)
    }
  }

  onMounted(() => {
    getAllPublic()
    getSelectedFunctionIds()
  })
</script>

<script>
  export default { name: '' }
</script>
<style lang="scss" scoped>
  .Functions-container {
    .container {
      display: flex;
      align-items: center;
      border: 1px solid rgba(0, 0, 0, 0.06);
      .left {
        display: flex;
        align-items: center;
        height: 100%;
        width: 240px;
        flex-shrink: 0;
        min-height: 42px;
        position: relative;
        :deep(.el-checkbox) {
          .el-checkbox__label {
            padding-left: 12px;
          }
        }
      }
      .right {
        font-size: 14px;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        border-left: 1px solid rgba(0, 0, 0, 0.06);
        padding-left: 56px;
        min-height: 42px;
      }
      .iconpark-icon {
        position: absolute;
        width: 16px;
        height: 16px;
        margin-right: 16px;
        cursor: pointer;
        transform: translateX(-33px);
      }
    }
    .container1 {
      padding-left: 16px;
      width: 100%;
      background: rgba(0, 0, 0, 0.02);
    }
    .container2 {
      .left {
        padding-left: 48px;
      }
    }
    .container3 {
      .left {
        padding-left: 76px;
      }
    }
    .container4 {
      .left {
        padding-left: 106px;
      }
    }
    .container5 {
      .left {
        padding-left: 137px;
      }
    }
    .model {
      // transition: all 0.3s;
    }
    .height-0 {
      height: 0;
      overflow: hidden;
    }
    .bottom-btns {
      height: 62px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
