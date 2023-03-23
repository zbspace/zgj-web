<!-- 用印申请 选中表单 -->
<template>
  <div class="accomplish-container">
    <componentsLayout Layout="breadcrumb,title,custom,fixed">
      <template #breadcrumb>
        <div class="breadcrumb">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
            >
              角色权限管理
            </el-breadcrumb-item>
            <el-breadcrumb-item
              style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
            >
              权限配置
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <template #title>
        <div class="title">
          <div class="title-desc">
            <img
              class="title-desc-img"
              src="@/assets/svg/jiantou-zuo.svg"
              alt=""
              @click="clickBackPage"
            />
            权限配置
            <span class="role">（管理员）</span>
          </div>
          <div></div>
        </div>
      </template>

      <template #noScroll>
        <!-- tab -->
        <div class="custom-tabs">
          <VTabs
            :active="active"
            :label="tabsLabel"
            @update:active="active = $event"
          ></VTabs>
        </div>

        <!-- 功能数据权限 -->
        <div class="function" v-show="active === 'first'">
          <div class="tab-container">
            <ul class="tab-name">
              <li>菜单名称</li>
              <li>操作项</li>
            </ul>
            <div v-for="(item, index) in permissionData" :key="index">
              <ul class="tab-grant" v-if="item.maxLevel == 2">
                <li>
                  <el-checkbox
                    :indeterminate="item.indeterminate"
                    v-model="item.checked"
                    @change="handleCheckAll(item.checked, item)"
                  >
                    {{ item.name }}
                  </el-checkbox>
                </li>
                <li>
                  <el-checkbox-group
                    v-model="item.checkedArr"
                    @change="handleCheckedItem(item.checkedArr, item)"
                  >
                    <el-checkbox
                      v-for="(receive, ri) in item.children"
                      :label="receive.id"
                      :key="ri"
                    >
                      {{ receive.name }}
                    </el-checkbox>
                  </el-checkbox-group>
                </li>
              </ul>
              <div v-if="item.maxLevel == 3">
                <ul class="tab-grant">
                  <li>
                    <el-checkbox
                      :indeterminate="item.indeterminate"
                      v-model="item.checked"
                      @change="handleCheckTop(item.checked, item)"
                      >{{ item.name }}
                    </el-checkbox>
                  </li>
                  <li></li>
                </ul>
                <ul
                  class="tab-system"
                  v-for="(itemB, Bi) in item.children"
                  :key="Bi"
                >
                  <li style="padding-left: 45px">
                    <el-checkbox
                      :indeterminate="itemB.indeterminate"
                      v-model="itemB.checked"
                      @change="handleCheckAll(itemB.checked, itemB, item)"
                    >
                      {{ itemB.name }}
                    </el-checkbox>
                  </li>
                  <li>
                    <el-checkbox-group
                      v-model="itemB.checkedArr"
                      @change="handleCheckedItem(itemB.checkedArr, itemB, item)"
                    >
                      <el-checkbox
                        v-for="(receive, ri) in itemB.children"
                        :label="receive.id"
                        :key="ri"
                      >
                        {{ receive.name }}
                      </el-checkbox>
                    </el-checkbox-group>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 数据权限 -->
        <div class="custom-data" v-if="active === 'second'">
          <div class="item">
            <div class="item-label">默认数据权限</div>
            <div>
              向上继承
              <span class="i"> （可以查看下级部门员工创建数据） </span></div
            >
          </div>

          <div class="item">
            <div class="item-label">自定义数据权限</div>
            <el-button type="primary" @click="openDialog">编辑</el-button>
          </div>
          <div class="item">
            <div class="item-label"></div>
            <div class="empty">
              <div class="box">
                <div class="inner"></div>
                <div class="empty-msg">空状态</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </componentsLayout>

    <!-- 人员选择  -->
    <KDepartOrPersonDialog
      :show="showDepPerDialog"
      @update:show="showDepPerDialog = $event"
      v-if="showDepPerDialog"
      :tabsShow="tabsShow"
      @update:searchSelected="callBack"
      :searchSelected="searchSelected"
    >
    </KDepartOrPersonDialog>
  </div>
</template>
<script setup>
  import { ref } from 'vue'
  import componentsLayout from '../../../components/Layout.vue'
  import VTabs from '@/components/common/JyTabs.vue'
  import KDepartOrPersonDialog from '@/views/components/modules/KDepartOrPersonDialog.vue'
  import { useRouter } from 'vue-router'
  import { test } from './test'
  const router = useRouter()
  // 消息 tabs
  const active = ref('first')

  const tabsLabel = ref([
    {
      name: 't-zgj-person.FunctionalPermissions',
      value: 'first'
    },
    {
      name: 't-zgj-person.DataPermissions',
      value: 'second'
    }
  ])

  const permissionData = ref([])

  const handlePermission = data => {
    let count = 0

    data.length &&
      data.forEach(v => {
        if (v.children && v.children.length) {
          count++
          v.checked = false
          v.checkedArr = []
          v.indeterminate = false
          handlePermission(v.children)
        } else {
          if (count) {
            // level = v.level
          }
          count = 0
        }
      })
    return data
  }

  permissionData.value = JSON.parse(JSON.stringify(handlePermission(test)))

  const handleCheckAll = (val, Item, fatherItem) => {
    Item.indeterminate = false
    Item.checkedArr = []
    Item.checked = false
    if (val) {
      Item.checked = true
      if (Item.children && Item.children.length) {
        Item.children.forEach(v => {
          Item.checkedArr.push(v.id)
        })
      }
    }
    if (fatherItem) {
      const checkedArr = fatherItem.children.filter(v => v.checked)
      fatherItem.checked = checkedArr.length === fatherItem.children.length
      fatherItem.indeterminate =
        checkedArr.length > 0 && checkedArr.length < fatherItem.children.length
    }
  }
  const handleCheckedItem = (val, Item, fatherItem) => {
    const checkedCount = val.length
    Item.checked = checkedCount === (Item.children && Item.children.length)
    Item.indeterminate =
      checkedCount > 0 && checkedCount < (Item.children && Item.children.length)
    if (fatherItem) {
      const checkedArr = fatherItem.children.filter(v => v.checked)
      fatherItem.checked = checkedArr.length === fatherItem.children.length
      fatherItem.indeterminate =
        checkedArr.length > 0 && checkedArr.length < fatherItem.children.length
    }
  }

  const handleCheckTop = (val, Item) => {
    Item.checked = val
    Item.checkedArr = []
    Item.children.forEach(v => {
      v.checked = val
      v.checkedArr = []
      val &&
        v.children.forEach(c => {
          v.checkedArr.push(c.id)
        })
    })
  }

  const clickBackPage = () => {
    router.go(-1)
  }
  const tabsShow = ref(['user', 'organ'])
  const showDepPerDialog = ref(false)
  const searchSelected = ref([])
  const openDialog = () => {
    showDepPerDialog.value = true
  }

  const callBack = attr => {
    console.log(attr, '===')
  }
</script>
<style lang="scss" scoped>
  .accomplish-container {
    margin: 0%;
    position: relative;

    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-desc {
        display: flex;
        align-items: center;
        font-size: 22px;
        color: rgba(0, 0, 0, 0.85);
        .title-desc-img {
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .role {
          font-size: 16px;
          color: rgba(0, 0, 0, 0.65);
        }
      }
    }

    .custom-tabs {
      margin-top: 12px;
    }

    .function {
      .tab-container {
        margin-top: 10px;
        ul {
          border-left: 1px solid rgba(0, 0, 0, 0.06);
          border-right: 1px solid rgba(0, 0, 0, 0.06);
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
        }

        .el-checkbox {
          height: 44px;
        }
        .tab-name {
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(0, 0, 0, 0.02);
          height: 46px;
          line-height: 46px;
          list-style: none;
          li:first-child {
            flex: 20%;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            border-right: 1px solid rgba(0, 0, 0, 0.06);
            padding-left: 12px;
          }
          li:last-child {
            flex: 80%;
            padding-left: 12px;
          }
        }
        .tab-grant {
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 25px;
          line-height: 25px;
          list-style: none;
          li:first-child {
            flex: 20%;
            text-align: left;
            height: 44px;
            line-height: 44px;
            padding-left: 20px;
          }
          li:last-child {
            flex: 80%;
            border-left: 1px solid rgba(0, 0, 0, 0.06);
            padding-left: 2%;
            line-height: 25px;
          }
        }
        .tab-system {
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 25px;
          line-height: 25px;
          list-style: none;
          li:first-child {
            flex: 20%;
            line-height: 44px;
          }
          li:last-child {
            flex: 80%;
            border-left: 1px solid rgba(0, 0, 0, 0.06);
            padding-left: 2%;
            line-height: 44px;
            min-height: 22px;
          }
        }
      }
    }

    .custom-data {
      .item {
        display: flex;
        margin: 20px 0;
        line-height: 32px;
        .item-label {
          width: 100px;
          margin-right: 18px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.85);
        }
        .i {
          color: rgba(0, 0, 0, 0.45);
        }

        .empty {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 80%;
          height: 414px;
          border: 2px dashed rgba(0, 0, 0, 0.15);
          border-radius: 4px;

          .box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateY(-50%) translateX(-50%);

            .inner {
              width: 154px;
              height: 132px;
              background: #d9d9d9;
            }

            .empty-msg {
              margin-top: 24px;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
