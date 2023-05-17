<!--
* @Descripttion index.vue
* @FileName index.vue
* @Author walterXsk
* @module 
 * @LastEditTime: 2023-05-11
!-->
<template>
  <div class="flow-detail">
    <JyLabel label="基本信息" />
    <div class="info-list">
      <div class="cont">
        <div class="cont-details">
          <div
            class="cont-list"
            v-for="item in infoList"
            :style="item.lineStyle"
            :key="item.label"
          >
            <div class="cont-list-label">{{ $t(item.label) }}： </div>
            <div class="cont-list-value" :style="item.valStyle">
              <img
                :src="icon[item.iconPath]"
                :style="item.iconStyle"
                v-if="item.iconPath"
              />
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onBeforeMount, computed } from 'vue'
  import yuanLv from '@/assets/svg/common/yuan-lv.svg'
  import yuanHui from '@/assets/svg/common/yuan-hui.svg'
  import warning from '@/assets/svg/common/detail-warning.svg'
  import danger from '@/assets/svg/common/detail-danger.svg'
  import API from '../api/index'

  const icon = ref({
    yuanLv,
    yuanHui,
    warning,
    danger
  })
  const props = defineProps({
    requestObj: {
      type: Object,
      defatult: () => {
        return {}
      }
    }
  })

  const infoList = computed({
    get() {
      return props.requestObj.info
    }
  })
  onBeforeMount(() => {
    API[props.requestObj.modulesName]
      [props.requestObj.urlName](props.requestObj.params)
      .then(result => {
        if (result.data) {
          infoList.value.forEach(item => {
            for (const k in result.data) {
              if (k === item.key) {
                // 将 数组处理成 字符串
                if (item.handleArrToStr) {
                  item.value = handleArrToStr(result.data[k])
                  continue
                }

                // 处理 特殊状态
                if (item.customStyle) {
                  item.valStyle = handleCustomStyle(item, result.data[k])
                  item.iconPath = handleIconPath(item, result.data[k])
                  item.value = handleValToText(item, result.data[k])
                  continue
                }

                item.value = result.data[k]
              }
            }
          })
        }
      })
  })

  const colors = [
    'var(--jy-success-6)', // 成功
    'var(--jy-color-text-4)', // 失败
    'var(--jy-warning-6)', // 警告
    'var(--jy-primary-6)', // 主色
    'var(--jy-danger-6)' // 危险
  ]

  // 处理数据
  const handleArrToStr = attr => {
    if (!attr || !Array.isArray(attr)) return '-'
    const arr = []
    attr.forEach(item => arr.push(item.name))

    return arr.join(',')
  }

  // 处理特殊样式
  const handleCustomStyle = (attr, flag) => {
    let sty = {}
    if (attr.type === 'status') {
      sty = flag === '1' ? { color: colors[0] } : { color: colors[1] }
    }
    return sty
  }

  const handleIconPath = (attr, flag) => {
    let iconPath = ''
    if (attr.type === 'status') {
      iconPath = flag === '1' ? 'yuanLv' : 'yuanHui'
    }
    return iconPath
  }

  const handleValToText = (attr, flag) => {
    let text = ''
    if (attr.type === 'status') {
      text = flag === '1' ? '启用' : '停用'
    }
    return text
  }
</script>

<script>
  export default { name: 'BaseInfo' }
</script>

<style lang="scss" scoped>
  .flow-detail {
    padding-top: 28px;
    .info-list {
      margin: 0%;

      .cont {
        .cont-details {
          display: flex;
          flex-flow: wrap;
          padding: 8px 0;
          box-sizing: border-box;

          .cont-list {
            display: flex;
            // align-items: center;
            width: 50%;
            padding: 8px 0;
            box-sizing: border-box;

            .cont-list-label {
              width: 100px;
              display: flex;
              justify-content: flex-end;
              color: var(--jy-color-text-3);
              flex-shrink: 0;
            }

            .cont-list-value {
              display: flex;
              align-items: center;
              img {
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
</style>
