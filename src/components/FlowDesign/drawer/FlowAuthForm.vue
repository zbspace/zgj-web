<template>
  <div class="flow-drawer-privilege">
    <div class="flow-drawer-privilege-header">
      <div
        :class="{
          'flow-drawer-privilege-name-column-30': !props.readable,
          'flow-drawer-privilege-name-column-25': props.readable
        }"
      >
        <span>表单</span>
      </div>
      <div class="flow-drawer-privilege-option-column">
        <div :class="columnItemClass" v-if="props.readable">
          <a-checkbox :checked="writableChecked" @change="onAllWritableChange">
            编辑
          </a-checkbox>
        </div>
        <div :class="columnItemClass">
          <a-checkbox :checked="readableChecked" @change="onAllReadableChange">
            只读
          </a-checkbox>
        </div>
        <div :class="columnItemClass">
          <a-checkbox
            :checked="displayableChecked"
            @change="onAllDisplayableChange"
          >
            隐藏
          </a-checkbox>
        </div>
        <!-- <div :class="columnItemClass" v-if="props.readable"> -->
        <div :class="columnItemClass" v-if="false">
          <a-checkbox :checked="requiredChecked" @change="onAllRequiredChange">
            必填
          </a-checkbox>
        </div>
      </div>
    </div>
    <div class="flow-drawer-privilege-body">
      <div
        class="flow-drawer-privilege-name-column-row"
        v-for="(item, i) in privileges"
        :key="i"
      >
        <div
          :class="{
            'flow-drawer-privilege-name-column-30': !props.readable,
            'flow-drawer-privilege-name-column-25': props.readable
          }"
        >
          <span>{{ item.name }}</span>
        </div>
        <div class="flow-drawer-privilege-option-column">
          <div :class="columnItemClass" v-if="props.readable">
            <a-checkbox
              :checked="item.writable"
              :v-model="item.writable"
              @change="writableChange($event, item)"
            >
              编辑
            </a-checkbox>
          </div>
          <div :class="columnItemClass">
            <a-checkbox
              :checked="item.readable"
              :v-model="item.readable"
              @change="readableChange($event, item)"
            >
              只读
            </a-checkbox>
          </div>
          <div :class="columnItemClass">
            <a-checkbox
              :checked="item.displayable"
              :v-model="item.displayable"
              @change="displayableChange($event, item)"
            >
              隐藏
            </a-checkbox>
          </div>
          <!-- <div :class="columnItemClass" v-if="props.readable"> -->
          <div :class="columnItemClass" v-if="false">
            <a-checkbox
              :checked="item.required"
              :v-model="item.required"
              @change="displayableRequired($event, item)"
            >
              必填
            </a-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, toRaw, computed, onMounted } from 'vue'
  // import { formFields } from '../data/load-field-data';
  import { useFlowStore } from '../store/flow'

  // Store
  const flowStore = useFlowStore()

  // 表单字段权限
  // const privileges = ref(formFields());
  const privileges = ref([])

  // 接收属性
  const props = defineProps({
    readable: {
      type: Boolean,
      default: false
    },
    node: {
      type: Object,
      default: function () {
        return {}
      }
    },
    modelValue: {
      type: Array,
      default: function () {
        return []
      }
    }
  })

  // 样式
  const columnItemClass = computed(() => {
    return {
      'flow-drawer-privilege-option-column-item-50': !props.readable,
      'flow-drawer-privilege-option-column-item-25': props.readable
    }
  })

  const writableChecked = computed(() => {
    return privileges.value.filter(item => item.writable == false).length == 0
  })

  const readableChecked = computed(() => {
    return privileges.value.filter(item => item.readable == false).length == 0
  })

  const displayableChecked = computed(() => {
    return (
      privileges.value.filter(item => item.displayable == false).length == 0
    )
  })

  const requiredChecked = computed(() => {
    return privileges.value.filter(item => item.required == false).length == 0
  })

  // 页面挂载后执行
  onMounted(async () => {
    // 初始化
    if (props.node.privileges && props.node.privileges.length == 0) {
      privileges.value = await flowStore.getPrivileges()
      console.log(privileges.value, 'privileges.valueb表单权限')
      // TODO：①发起人表单权限假数据
      // privileges.value = [
      //   {
      //     createTime: '2022-11-27 12: 31: 00',
      //     createUser: '1339550467939639299',
      //     updateTime: null,
      //     updateUser: null,
      //     nodePrivilegesId: '1596723235200790529',
      //     modelId: '1596550552731209730',
      //     definitionId: '1596550552739598338',
      //     nodeId: '1596723224647921666',
      //     formId: '1589976128312606721',
      //     fieldId: '1589976917521235970',
      //     fieldName: null,
      //     fieldKey: null,
      //     fieldModel: null,
      //     name: '合同名称',
      //     writable: true,
      //     readable: false,
      //     displayable: false,
      //     required: false,
      //     tenantId: null
      //   },
      //   {
      //     createTime: '2022-11-27 12: 31: 00',
      //     createUser: '1339550467939639299',
      //     updateTime: null,
      //     updateUser: null,
      //     nodePrivilegesId: '1596723235200790530',
      //     modelId: '1596550552731209730',
      //     definitionId: '1596550552739598338',
      //     nodeId: '1596723224647921666',
      //     formId: '1589976128312606721',
      //     fieldId: '1589976917521235972',
      //     fieldName: null,
      //     fieldKey: null,
      //     fieldModel: null,
      //     name: '公司主体',
      //     writable: true,
      //     readable: false,
      //     displayable: false,
      //     required: false,
      //     tenantId: null
      //   },
      //   {
      //     createTime: '2022-11-27 12: 31: 00',
      //     createUser: '1339550467939639299',
      //     updateTime: null,
      //     updateUser: null,
      //     nodePrivilegesId: '1596723235200790531',
      //     modelId: '1596550552731209730',
      //     definitionId: '1596550552739598338',
      //     nodeId: '1596723224647921666',
      //     formId: '1589976128312606721',
      //     fieldId: '1589976917521235974',
      //     fieldName: null,
      //     fieldKey: null,
      //     fieldModel: null,
      //     name: '项目名称',
      //     writable: true,
      //     readable: false,
      //     displayable: false,
      //     required: false,
      //     tenantId: null
      //   }
      // ]
      privileges.value.forEach(item => {
        if (props.readable) {
          setWritable(true, item)
        } else {
          setReadable(true, item)
        }
      })
      props.node.privileges = privileges
    } else {
      privileges.value = props.node.privileges ? props.node.privileges : []
    }
  })

  /**
   *  全选编辑
   * @param {*} e
   */
  const onAllWritableChange = e => {
    privileges.value.forEach(item => {
      writableChange(e, item)
    })
  }

  /**
   * 全选只读
   * @param {*} e
   */
  const onAllReadableChange = e => {
    privileges.value.forEach(item => {
      readableChange(e, item)
    })
  }

  /**
   * 全选隐藏
   * @param {*} e
   */
  const onAllDisplayableChange = e => {
    privileges.value.forEach(item => {
      displayableChange(e, item)
    })
  }

  /**
   * 全选必填
   * @param {*} e
   */
  const onAllRequiredChange = e => {
    privileges.value.forEach(item => {
      displayableRequired(e, item)
    })
  }

  /**
   * 编辑
   * @param {*} e
   * @param {*} item
   */
  const writableChange = (e, item) => {
    setWritable(e.target.checked, item)
    changePrivilege()
  }

  /**
   * 编辑
   * @param {*} e
   * @param {*} item
   */
  const setWritable = (checked, item) => {
    item.writable = checked
    if (checked) {
      item.readable = !checked
      item.displayable = !checked
    } else {
      item.required = checked
    }
  }

  /**
   * 只读
   * @param {*} e
   * @param {*} item
   */
  const readableChange = (e, item) => {
    setReadable(e.target.checked, item)
    changePrivilege()
  }

  /**
   * 只读
   * @param {*} e
   * @param {*} item
   */
  const setReadable = (checked, item) => {
    item.readable = checked
    if (checked) {
      item.writable = !checked
      item.displayable = !checked
      item.required = !checked
    }
  }

  /**
   * 隐藏
   * @param {*} e
   * @param {*} item
   */
  const displayableChange = (e, item) => {
    item.displayable = e.target.checked
    if (e.target.checked) {
      item.writable = !e.target.checked
      item.readable = !e.target.checked
      item.required = !e.target.checked
    }
    changePrivilege()
  }

  /**
   * 必填
   * @param {*} e
   * @param {*} item
   */
  const displayableRequired = (e, item) => {
    item.required = e.target.checked
    if (e.target.checked) {
      item.readable = !e.target.checked
      item.displayable = !e.target.checked
      item.writable = e.target.checked
    }
    changePrivilege()
  }

  // const emit = defineEmits(['update:modelValue']);

  const changePrivilege = () => {
    props.node.privileges = privileges.value
    // emit('update:modelValue', privileges);
  }

  const getPrivilege = () => {
    return toRaw(privileges)
    // emit('update:modelValue', privileges);
  }

  defineExpose({
    privileges,
    getPrivilege
  })
</script>
