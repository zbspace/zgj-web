import { ref, reactive, computed } from 'vue'
import { useFlowStore } from '../store/flow'
import useDevice from '../hooks/useDevice'
import SnowflakeId from 'snowflake-id'

export default function () {
  const flowStore = useFlowStore()
  const { isMobile } = useDevice()

  // nodeName
  // 当前实例
  // const instance = getCurrentInstance();
  // 节点名称属性
  const nodeName = ref('nodeName')

  const loading = ref(false)

  const isActive = ref(false)
  // 大小，可选值为 small large
  const size = ref('large')
  // 侧边显示隐藏
  const visible = ref(false)
  // 侧边样式
  const drawerBodyStyle = reactive({
    height: 'calc(100vh - 114px)',
    'overflow-y': 'auto'
  })

  /**
   * 节点头部样式
   */
  const nameClass = computed(() => {
    return (node, defaultStyle) => {
      if (node.nodeStatus == -1) {
        return defaultStyle
      }
      return {
        'node-status-not': node.nodeStatus == 0,
        'node-status-current': node.nodeStatus == 1,
        'node-status-complete': node.nodeStatus == 2,
        'node-status-skip': node.nodeStatus == 3,
        'node-status-reject': node.nodeStatus == 4,
        'node-status-back': node.nodeStatus == 5 // TODO: 1
      }
    }
  })

  /**
   * 侧边宽度
   * @returns
   */
  const drawerWidth = computed(() => {
    return width => {
      if (!width) {
        width = '40%'
      }
      return isMobile() ? '100%' : width
    }
  })

  /**
   * Radio组件样式,改为垂直
   * @returns
   */
  const radioStyle = computed(() => {
    return value => {
      if (isMobile()) {
        return {
          display: 'block',
          height: '20px',
          lineHeight: '20px',
          marginBottom: '14px'
        }
      } else if (value) {
        return {
          width: value,
          height: '20px',
          lineHeight: '20px',
          marginBottom: '14px'
        }
      } else {
        return {
          display: 'block',
          height: '20px',
          lineHeight: '20px',
          marginBottom: '14px'
        }
      }
    }
  })

  /**
   * 审批配置审批人Radio组件样式
   * @returns
   */
  const approvalRadioStyle = computed(() => {
    return value => {
      if (!value) {
        value = '31%'
      }
      const width = isMobile() ? '45%' : value
      return {
        width,
        lineHeight: '20px',
        marginBottom: '14px'
      }
    }
  })

  // 通知类型
  const noticeTypeComputed = computed(() => noticeType => {
    if (noticeType) {
      return toUgroup(noticeType)
    } else {
      return []
    }
  })

  /**
   *   获取ID
   */
  const getId = num => {
    const snowflake = new SnowflakeId()
    const arr = []
    for (let i = 0; i <= num; i++) {
      arr.push(snowflake.generate())
    }
    return num ? arr[num] : snowflake.generate()
  }

  /**
   * 删除节点
   * @param {*} node
   * @param {*} callback
   */
  const delNode = (node, callback) => {
    flowStore.delNode(node)
    // 回调
    if (callback) {
      callback(node)
    }
  }

  /**
   * 添加分支节点
   * @param {*} node
   */
  const addBranch = node => {
    flowStore.addBranch(node)
  }

  /**
   * 打开侧边配置
   * @param {*} drawer
   * @param {*} node
   * @param {*} routeNode
   */
  const open = (drawer, node, routeNode) => {
    // 高亮
    isActive.value = true
    //  打开配置
    drawer.show(node, routeNode)
  }

  // 获取assets/icon静态资源
  const getflowIcon = () => {
    const picture = import.meta.globEager('../../../assets/icon/*.png')
    const modules = Object.keys(picture).map(item => {
      const url = picture[item]?.default
      const name_suffix = item.substring(item.lastIndexOf('/') + 1, item.length)
      const name = name_suffix.substring(0, name_suffix.indexOf('.'))
      return {
        url,
        name_suffix,
        name
      }
    })

    return modules
  }

  const getAssetsFile = url => {
    return new URL(`../../../assets/icon/${url}`, import.meta.url).href
  }

  /**
   * 实现的效果是我们传入一个2的倍数相加的两个数
   * <p>
   * 比如12(是4+8),我们把它自动计算出[4,8]
   * <p>
   * 再比如18,我们把它计算出[2,16]
   * <p>
   * 再比如22,我们把它计算出[2,4,16]
   * <p>
   *
   * @param sum
   * @return
   */
  const toUgroup = sum => {
    const binaryCode = sum.toString(2)
    console.log('binaryCode', binaryCode)
    let index = binaryCode.length - 1
    const indexs = []
    for (let i = 0; i < binaryCode.length; i++) {
      if (binaryCode.charAt(i) == '1') {
        indexs.push(index)
      }
      index--
    }
    return indexs.map(value => 1 << value).sort()
  }

  /**
   * 防抖
   * @param {*} fn
   * @param {*} delay
   */
  const debounce = (fn, delay = 2000) => {
    let timer = null
    return (...args) => {
      // 判断定时器是否存在，清除定时器
      if (timer) {
        clearTimeout(timer)
      }
      // 重新调用setTimeout
      timer = setTimeout(() => {
        fn.call(this, ...args)
      }, delay)
    }
  }

  return {
    loading,
    nodeName,
    isActive,
    size,
    visible,
    nameClass,
    drawerWidth,
    drawerBodyStyle,
    radioStyle,
    approvalRadioStyle,
    noticeTypeComputed,
    getId,
    delNode,
    addBranch,
    open,
    isMobile,
    getflowIcon,
    getAssetsFile,
    toUgroup,
    debounce
  }
}
