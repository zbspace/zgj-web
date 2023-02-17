/**
 *  添加节点
 * @param {*} node
 * @param {*} currNode
 * @param {*} addNodeData
 */
export function addFlowNode(node, currNode, addNodeData) {
  if (node && node.nodeId == currNode.nodeId) {
    // 当前节点的子节点暂存
    const childNode = currNode.childNode;
    if (childNode) {
      childNode.nodePid = addNodeData.nodeId;
    }
    // 如果添加的是并行节点
    if (addNodeData.nodeType == 9) {
      if (childNode) {
        // 聚合节点作为其父节点
        childNode.nodePid = addNodeData.childNode.nodeId;
      }
      //  将需要添加的节点后面挂载当前聚合节点子节点
      addNodeData.childNode.childNode = childNode;
    } else {
      //  将需要添加的节点后面挂载当前子节点
      addNodeData.childNode = childNode;
    }
    //  当前添加节点父节点
    addNodeData.nodePid = currNode.nodeId;
    //  当前子节点上添加需要添加的节点
    node.childNode = addNodeData;
  } else if (node) {
    addFlowNode(node.childNode, currNode, addNodeData);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        addFlowNode(conditionNode, currNode, addNodeData);
      });
    }
  }
}

/**
 * 删除节点
 * @param {*} node
 * @param {*} currNode
 */
export function delFlowNode(node, currNode) {
  if (node && currNode && node.nodeId == currNode.nodePid) {
    // 当前节点的子节点暂存
    let childNode = currNode.childNode;
    // 如果删除的是并行节点
    if (currNode.nodeType == 9) {
      childNode = currNode.childNode.childNode;
    }
    if (childNode && Object.prototype.hasOwnProperty.call(childNode, 'nodeName')) {
      childNode.nodePid = currNode.nodePid;
    }
    //  将当前节点的子节点挂载到父节点
    node.childNode = childNode;
  } else if (node && currNode) {
    delFlowNode(node.childNode, currNode);
    if (node.conditionNodes) {
      node.conditionNodes.forEach(conditionNode => {
        delFlowNode(conditionNode, currNode);
      });
    }
  }
}

/**
 * 更新节点
 * @param {*} node
 * @param {*} currNode
 * @param {*} field
 * @param {*} value
 */
export function updateFlowNode(node, currNode, field, value) {
  if (node && currNode && node.nodeId == currNode.nodeId) {
    node[field] = value;
  } else if (node && currNode) {
    updateFlowNode(node.childNode, currNode, field, value);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        updateFlowNode(conditionNode, currNode, field, value);
      });
    }
  }
}

/**
 * 添加分支
 * @param {*} node
 * @param {*} currNode
 */
export function addFlowBranchNode(node, currNode) {
  if (node && node.nodeId == currNode.nodeId) {
    node.conditionNodes = currNode.conditionNodes;
  } else if (node) {
    addFlowBranchNode(node.childNode, currNode);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode, i) => {
        addFlowBranchNode(conditionNode, currNode);
      });
    }
  }
}

/**
 * 删除分支节点
 * @param {*} state
 * @param {*} node
 * @param {*} currNode
 */
export function delFlowBranchNode(state, node, currNode, tempNodes) {
  if (node && currNode && node.nodeId == currNode.nodePid) {
    // 只有两个分支
    if (node.conditionNodes.length == 2) {
      if (node.nodeId == state.node.nodeId) {
        state.node = {};
      } else {
        // 需要讲路由节点删除
        delFlowNode(state.node, node);
      }
      delTempNodes(tempNodes, node);
    } else {
      // 执行删除当前分支
      node.conditionNodes.forEach((conditionNode, index) => {
        if (conditionNode.nodeId == currNode.nodeId) {
          node.conditionNodes.splice(index, 1);
          delTempNodes(tempNodes, currNode);
        }
      });
    }
  } else if (node && currNode) {
    delFlowBranchNode(state, node.childNode, currNode, tempNodes);
    if (node.conditionNodes) {
      node.conditionNodes.forEach((conditionNode) => {
        delFlowBranchNode(state, conditionNode, currNode, tempNodes);
      });
    }
  }
}

/**
 * 删除临时节点
 * @param {*} tempNodes 
 * @param {*} currNode 
 */
export function delTempNodes(tempNodes, currNode) {
   // 删除对应临时缓存添加的节点
   tempNodes.forEach((tempNode, index) => {
    if (tempNode.nodeId == currNode.nodeId) {
      tempNodes.splice(index, 1);
    }
  });
}
 

/**
 * 校验节点
 * @param {*} node
 */
export function validate(node, count) {
  if (!count) {
    count = { value: 0 };
  }
  if (!node.content) {
    // 分支,并行, 同意
    if ([4, 7, 8, 9, 11].includes(Number(node.nodeType)) == false) {
      node.error = true;
      count.value++;
    }
  }
  // 如果有孩子节点
  const childNode = node.childNode;
  if (childNode) {
    validate(childNode, count);
  }
  const conditionNodes = node.conditionNodes;
  if (conditionNodes) {
    conditionNodes.forEach(conditionNode => {
      validate(conditionNode, count);
    });
  }
  return count.value == 0;
}
