/**
 * 存放审批流程数据
 */
import { defineStore } from 'pinia'
import Request from '@/utils/request-util'
import html2canvas from 'html2canvas'
import { getStartNode, addCondition, addFreeNode } from '../data/load-node-data'
import {
  addFlowNode,
  updateFlowNode,
  delFlowNode,
  addFlowBranchNode,
  delFlowBranchNode,
  delTempNodes
} from '../hooks/useNodeHelper'
/**
 * 1. 定义容器、导出容器
 * 参数1：容器的ID，必须是唯一的，后面Pinia会把所有的容器挂载到根容器
 * 参数2：一些选项对象，也就是state、getter和action
 * 返回值：一个函数，调用即可得到容器实例
 */
export const useFlowStore = defineStore('flow', {
  // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
  // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
  // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
  state: () => ({
    //  节点数据
    node: getStartNode(),
    //  缩略图
    mapImg: '',
    // 缩略图参考内容
    mapMapping: '#flow-designer-wrap',
    // 临时添加节点
    tempNodes: [],
    // 缩放比例
    zoomValue: 100,
    // 动态流程
    dynamicFlowEnable: true,
    // 意见分支
    suggestBranchEnable: true,
    // 并行节点
    parallelBranchEnable: true,
    // 限时审批
    timeLimitEnable: false,
    // 模型ID
    modelId: null,
    // 定义ID
    definitionId: null,
    // 流程形式
    modelModality: 1,
    // 基础字段
    baseColumns: [],
    // 表单字段
    formColumns: [],
    // 职位(岗位)
    positions: [],
    // 角色
    roles: [],
    // 组织机构审批人类型列表
    approverTypes: [],
    // 拖拽源节点
    dragSourceNode: {},
    // 拖拽目标节点
    dragTargetNode: {}
  }),
  // 类似于组件的computed，用来封装计算属性，具有缓存的功能
  getters: {
    getNode: state => state.node,
    // 是否升级版本
    isUpgrade: state => state.tempNodes.length > 0,
    getSuggestBranchEnable: state => state.suggestBranchEnable,
    getParallelBranchEnable: state => state.parallelBranchEnable
  },
  actions: {
    /**
     * 初始节节点
     * @author luopeng
     * @date 2022/8/10 18:20
     */
    setNode(node) {
      if (node) {
        this.node = node
      } else {
        this.node = getStartNode()
      }
    },

    /**
     * 添加节点
     * @author luopeng
     * @param {*} data
     * @date 2022/8/10 18:20
     */
    addNode(data) {
      if (data.nodeType === 0) {
        //  开始
        if (Object.prototype.hasOwnProperty.call(this.node, 'nodeName')) {
          // 如果添加的是并行节点
          if (data.addNode.nodeType === 9) {
            data.addNode.childNode.childNode = this.node
            data.addNode.childNode.childNode.nodePid =
              data.addNode.childNode.nodeId
          } else {
            data.addNode.childNode = this.node
            data.addNode.childNode.nodePid = data.addNode.nodeId
          }
          data.addNode.nodePid = 0
        }
        this.node = data.addNode
      } else {
        if (data.nodeId) {
          data.currNode.conditionNodes.forEach(conditionNode => {
            if (conditionNode.nodeId === data.nodeId) {
              // 获取当前操作节点
              addFlowNode(this.node, conditionNode, data.addNode)
            }
          })
        } else {
          // 获取当前操作节点
          addFlowNode(this.node, data.currNode, data.addNode)
        }
      }
      // 临时缓存添加的节点
      this.tempNodes.push(data.addNode)
      // 更新地图
      this.updateMap()
      // console.log('node', state.node);
      // console.info(JSON.stringify(this.node));
    },

    /**
     * 添加分支
     * @author luopeng
     * @date 2022/8/10 18:20
     */
    addBranch(node) {
      const len = node.conditionNodes.length
      const conditionNode = node.conditionNodes[len - 1]
      conditionNode.attr.priorityLevel = len + 1 + ''
      let condition = null
      if (conditionNode.nodeType === 3) {
        // 分支
        condition = addCondition(node, len)
        node.conditionNodes.splice(len - 1, 0, condition)
      } else {
        // 并行
        condition = addCondition(node, len + 1)
        node.conditionNodes.push(condition)
      }
      addFlowBranchNode(this.node, node)
      // 临时缓存添加的节点
      this.tempNodes.push(condition)
      // 更新地图
      this.updateMap()
    },

    /**
     * 删除节点
     * @author luopeng
     * @date 2022/8/10 18:20
     */
    delNode(node) {
      if (node.nodeId === this.node.nodeId) {
        if (node.childNode) {
          this.node = node.childNode
        } else {
          this.node = {}
        }
      } else if (
        node.nodeType === 3 ||
        node.nodeType === 8 ||
        node.nodeType === 10
      ) {
        // 条件(意见)分支节点和并行节点
        delFlowBranchNode(this, this.node, node, this.tempNodes)
      } else {
        delFlowNode(this.node, node)
        // 如果当前审批节点的子节点是意见分支,需要级联删除意见分支
        if (
          node.childNode &&
          node.nodeType === 1 &&
          node.childNode.nodeType === 7
        ) {
          delFlowBranchNode(
            this,
            this.node,
            node.childNode.conditionNodes[0],
            this.tempNodes
          )
        }
      }
      // 删除对应临时缓存添加的节点
      delTempNodes(this.tempNodes, node)
      // 临时缓存添加的节点
      if (node.update) {
        this.tempNodes.push(node)
      }
      // 更新地图
      this.updateMap()
    },

    /**
     * 更新节点
     * @author luopeng
     * @date 2022/8/10 18:20
     */
    updateNode({ currNode, field, value }) {
      if (currNode.nodeId === this.node.nodeId) {
        this.node[field] = value
      } else {
        updateFlowNode(this.node, currNode, field, value)
      }
      // console.log('updateNode', JSON.stringify(this.node));
    },

    /**
     * 外部参数
     * @author luopeng
     * @date 2022/8/10 18:20
     */
    updateMap() {
      const content = document.querySelector(this.mapMapping)
      const _html2canvas = html2canvas
      setTimeout(() => {
        _html2canvas(content, {
          backgroundColor: '#aaa',
          scale: 1,
          width: content.clientWidth,
          height: content.scrollHeight,
          windowHeight: content.scrollHeight
        }).then(canvas => {
          this.mapImg = canvas.toDataURL('image/jpeg', 0.8)
        })
      }, 100)
    },
    /**
     * 更新缩放比例
     * @param {*} val
     */
    updateZoomValue(val) {
      this.zoomValue = val
    },
    /**
     * 初始化自由流程
     */
    async initFreeFlow(modelId, definitionId) {
      // 重置
      this.setNode()
      if (modelId && modelId !== this.modelId) {
        this.modelId = modelId
      }
      if (definitionId && definitionId !== this.definitionId) {
        this.definitionId = definitionId
      }
      this.modelModality = 1
      const model = await this.getModel()
      if (model.modelModality === 2) {
        // 进行缓存
        this.modelModality = 2
        addFlowNode(this.node, this.node, addFreeNode())
      }
    },
    /**
     * 获取模型
     * @returns
     */
    getModel() {
      return Request.getAndLoadData('/model/detail', {
        modelId: this.modelId,
        definitionId: this.definitionId,
        needMore: false
      })
    },
    // 获取模型(流程)设计节点配置信息
    getNodeSetting(nodeId) {
      return Request.getAndLoadData('/model/design/node', {
        modelId: this.modelId,
        definitionId: this.definitionId,
        nodeId
      })
    },
    /**
     * 获取当前实例的初始化字段
     * @returns
     */
    getPrivileges() {
      return Request.getAndLoadData('/model/design/node/privileges', {
        modelId: this.modelId,
        definitionId: this.definitionId
      })
    },
    /**
     * 获取当前实例的模型条件节点基础字段
     * @returns
     */
    setModelId(modelId, definitionId) {
      this.modelId = modelId
      this.definitionId = definitionId
      this.getBaseColumns()
      this.getFormColumns()
      // this.getPosition()
      // this.getRole()
      // this.getApproverTypeList()
    },

    /**
     * 获取当前实例的模型条件节点基础字段
     * @returns
     */
    getBaseColumns() {
      Request.getAndLoadData('/model/design/condition/baseColumns', {
        modelId: this.modelId,
        definitionId: this.definitionId
      }).then(datas => (this.baseColumns = datas))
    },
    /**
     * 获取当前实例的模型条件节点表单字段
     * @returns
     */
    getFormColumns() {
      Request.getAndLoadData('/model/design/condition/formColumns', {
        modelId: this.modelId,
        definitionId: this.definitionId
      }).then(datas => (this.formColumns = datas))
    },
    /**
     * 获取职位(岗位)
     *
     * @author luopeng
     * @date 2022/9/27 11:46
     */
    getPosition() {
      if (this.positions.length === 0) {
        Request.getAndLoadData('/hrPosition/list', {}).then(
          datas => (this.positions = datas)
        )
      }
    },

    /**
     * 获取角色
     *
     * @author luopeng
     * @date 2022/9/27 11:46
     */
    getRole() {
      if (this.roles.length === 0) {
        Request.getAndLoadData('/sysRole/getRoleSelectList', {}).then(
          datas => (this.roles = datas)
        )
      }
    },
    /**
     * 获取组织机构审批人类型列表
     *
     * @author luopeng
     * @date 2022/9/27 11:46
     */
    getApproverTypeList() {
      if (this.roles.length === 0) {
        Request.getAndLoadData('/hrOrgApprover/getApproverTypeList', {}).then(
          datas => (this.approverTypes = datas)
        )
      }
    }
  }
})
