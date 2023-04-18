<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author zb
* @module 
* @LastEditTime 2023-04-18 14:18:07
!-->
<template>
  <div class="permission-selected">
    <p class="label">
      <svg class="iconpark-icon"><use href="#bumen"></use></svg>
      选中部门
    </p>
    <div class="role-list">
      <div v-for="(item, index) in roleList.organs" :key="index">
        <div
          class="organ"
          :style="item.includeChild === '0' ? 'margin-bottom: 24px' : ''"
          style="display: flex; justify-content: space-between"
        >
          <p>
            {{ getOrgan(item.organInfo) }}
            <span v-if="item.includeChild === '0'">（不包含下级）</span>
            <span v-else>（包含下级）</span>
          </p>
          <a v-if="item.includeChild === '0'">查看员工 》</a>
        </div>
        <div class="child-organ" v-if="item.includeChild !== '0'">
          <div
            class="organ"
            style="
              margin-bottom: 24px;
              display: flex;
              justify-content: space-between;
            "
            v-for="(v, i) in item.subOrganInfoList"
            :key="i"
          >
            <p>{{ getOrgan(v) }}</p>
            <a>查看员工 》</a>
          </div>
        </div>
      </div>
    </div>

    <p class="label">
      <svg class="iconpark-icon"><use href="#yuangong"></use></svg>
      选中员工</p
    >
    <div class="role-list">
      <div v-for="(item, index) in roleList.users" :key="index">
        <div class="organ"> {{ getOrgan(item.organInfo) }} </div>

        <div class="role-container" ref="roleRef">
          <div class="role-container-a">
            <div
              v-for="(v, i) in item.userInfo.slice(0, 9)"
              :key="i"
              class="role"
            >
              <svg class="iconpark-icon"><use href="#yuangong"></use></svg>
              {{ v.name }}
            </div>
          </div>

          <div class="role sum" v-if="item.userInfo.length > 3">
            <svg class="iconpark-icon"><use href="#role-active"></use></svg>
            +{{ item.userInfo.length }}
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-if="!roleList.users.length && !roleList.organs.length">
      <div class="box">
        <div>
          <img src="@/assets/svg/common/data_null.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import permissionService from '@/api/common/organOrPerson'
  import { useRoute } from 'vue-router'
  import { messageError } from '@/hooks/useMessage'

  const route = useRoute()
  const roleList = ref({
    organs: [],
    users: []
  })

  const props = defineProps({})
  const emit = defineEmits([])

  const getOrgan = arr => {
    return arr.map(v => v.name).join(' > ')
  }

  // 获取 角色关联的数据权限信息
  const getRoleDataScopeEcho = async () => {
    try {
      const res =
        await permissionService.systemOrganOrPerson.getRoleDataScopeEcho(
          route.query.roleId
        )
      roleList.value = res.data
    } catch (error) {
      messageError(error)
    }
  }

  getRoleDataScopeEcho()
  onMounted(() => {})
</script>

<script>
  export default { name: 'Selected' }
</script>
<style lang="scss" scoped>
  .permission-selected {
    width: 100%;
    .label {
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.85);
    }

    .iconpark-icon {
      width: 16px;
      height: 16px;
      margin-right: 8px;
    }

    .empty {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 80%;
      height: 520px;
      border: 2px dashed rgba(0, 0, 0, 0.15);
      border-radius: 4px;

      .box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      }
    }

    .role-list {
      width: 80%;
      min-height: 100px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      margin: 8px 0;
      padding: 24px 24px 1px 24px;
      margin-bottom: 24px;
      .organ {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 8px;
        span {
          color: rgba(0, 0, 0, 0.65);
        }
      }
      .child-organ {
        width: 100%;
        min-height: 30px;
        left: 0px;
        top: 30px;
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 2px;
        margin-bottom: 24px;
        padding: 24px 24px 0;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
      }
      .role-container {
        position: relative;
        .role-container-a {
          height: 40px;
          overflow: hidden;
          margin-bottom: 24px;
          width: calc(100% - 102px);
        }
        .role {
          display: inline-flex;
          align-items: center;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 38px;
          color: rgba(0, 0, 0, 0.85);
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 2px;
          padding: 0 16px;
          margin-right: 12px;
        }
        .sum {
          color: #3e78d0;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
</style>
