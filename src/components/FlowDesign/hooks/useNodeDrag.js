import { useFlowStore } from '../store/flow';
// Store
const flowStore = useFlowStore();

export default function () {
  /**
   * ondragstart 事件：
   * 当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上
   * @param {*} e
   */
  const ondragstart = (e, node) => {
    flowStore.dragSourceNode = node;
  };

  /**
   * ondragover 事件：
   * 拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上
   * @param {*} e
   */
  const ondragover = (e, node) => {
    e.preventDefault();
    node.dragClass = true;
  };

  /**
   * ondragenter 事件：
   * 当拖曳元素进入目标元素的时候触发的事件，此事件作用在目标元素
   * @param {*} e
   */
  const ondragenter = (e, node) => {
    //if (flowStore.dragSourceNode.nodeId != node.nodeId) {
    flowStore.dragTargetNode = node;
    //}
  };

  /**
   * ondragenter 事件：
   * 当拖曳元素离开目标元素的时候触发的事件，此事件作用在目标元素
   * @param {*} e
   */
  const ondragleave = (e, node) => {
    node.dragClass = false;
    node.dragTool = false;
  };

  /**
   * ondragend 事件：
   * 当拖拽完成后触发的事件，此事件作用在被拖曳元素上
   * @param {*} e
   */
  const ondragend = (e, node) => {
    node.dragClass = false;
    flowStore.dragTargetNode.dragTool = true;
  };

  return {
    ondragstart,
    ondragover,
    ondragenter,
    ondragleave,
    ondragend
  };
}
