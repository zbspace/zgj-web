<template>
  <div class="after-node-btn" @click="visible = true">
    <a-popover placement="right" v-model="visible">
      <template #content>
        <a-menu mode="vertical" class="flow-ant-menu-vertical">
          <a-menu-item key="1" @click="addType(1)">
            <img :src="approverIcon" class="anticon" />
            <span>审批节点</span>
          </a-menu-item>
          <a-menu-item key="4" @click="addType(4)">
            <img :src="branchIcon" class="anticon" />
            <span>条件分支</span>
          </a-menu-item>
          <a-menu-item v-if="props.nodeType == 1 && flowStore.suggestBranchEnable" key="7" @click="addType(7)">
            <img :src="suggestIcon" class="anticon" />
            <span>意见分支</span>
          </a-menu-item>
          <a-menu-item v-if="props.nodeType != 10 && flowStore.parallelBranchEnable" key="9" @click="addType(9)">
            <img :src="parallelIcon" class="anticon" />
            <span>并行分支</span>
          </a-menu-item>
          <a-menu-item key="2" @click="addType(2)">
            <img :src="ccIcon" class="anticon" />
            <span>抄送节点</span>
          </a-menu-item>
          <a-menu-item key="6" @click="addType(6)">
            <img :src="writeIcon" class="anticon" />
            <span>办理节点</span>
          </a-menu-item>
          <a-menu-item key="20" @click="addType(20)">
            <img :src="noticeIcon" class="anticon" />
            <span>通知节点</span>
          </a-menu-item>
          <!--  <a-menu-item key="5" @click="addType(5)">
            <img :src="webhookIcon" class="anticon" />
            <span>事件节点</span>
          </a-menu-item> -->
        </a-menu>
      </template>
      <!-- 当审批节点下添加意见分支,就不允许添加其他类型的节点了 -->
      <img :src="plusIcon" v-if="showAddImg()" />
    </a-popover>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useIcon from '../hooks/useIcon';
import { useFlowStore } from '../store/flow';
import {
  addApproverNode,
  addCcNode,
  addBranchNode,
  addEventNode,
  addSuggestNode,
  addParallelNode,
  addNoticeNode,
  addTimerNode
} from '../data/load-node-data';

// 图标
const plusIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1QUQxNDBGODYyMEYxMUVCODg5NkUxMUU4RjlCMzM3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1QUQxNDBGOTYyMEYxMUVCODg5NkUxMUU4RjlCMzM3MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjVBRDE0MEY2NjIwRjExRUI4ODk2RTExRThGOUIzMzczIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjVBRDE0MEY3NjIwRjExRUI4ODk2RTExRThGOUIzMzczIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NTYx9wAAAqtJREFUeNqsVs9rE0EU/mZ3MFHTiNAS60kjHkUv9mA99KoUFXPzICIoIhRRxF4kxapVPFSk4MWDRQIeNRTiSfBg/wAVkYDUetAYtbVi86vd3XFnt0lmZye7SZqBRzabed8337yX9x5hl9HuIiG/s3ZAaJsk4idRELGN9yyMnIaQiaaFEFrCc0tSGqBKaxCNjEVxfOIEIn2j0OkQiLYLjK3bmN9gGu9R+zeH3K05vJmpCsSWiphIMRTJuOm4/+MUYgOTNkkyOILWAkrLaYwPvLS/mRuEPlJN4eqS7R+J4OHqXfQlMqFkzlHtPbH+jOPDfZuHRiuFRNhEbcc72LL9CrpZa6VHuBq7aT8ZglImKhSTQ8fU91TXZHxxX47BsbzYHsmuwsNntiKemAoEnDmqORa04ol7DlYz+aBSqCE1fdqOx+5AsC/zxLHgmA7aWCn576T5MjMaH0WvloslJg/xK6SRQz0jpJGDskLqTxqSUMZMdYXXiN543jvMMPbWkq41EZQ0deK1rtQw1lbRp4qKUQTRY5538snryqaZGXgIy/ypqireQmzUPvUshkbtnVxLNaniM6z+zvWMsLSU82ArCC1kzmftqygEAvEE2XOEhRTzAp5fysptiwrN0615+dcVLH9Noz/5pCWYHFPVWlpM42OuLHcNTdFETUzse4Hyn8ddXyX35RjNNuW7UngIuT0Yuo3KytOOySors45vHUfoFOqkcTcZ+PW5ius7x1HMX4C5vhhKxPcU8xdtnxuOr9uaTDlpVB2/2RNd05Ec3oazsyexY/AYaPSAU5jriWFUP+Bv4RWenctiYb7cOLCiF7Y3YnhNHqSYLxTeq/SNGFQxgRFpYx1MCyG0JEXKIYoGDLSWMGtaHY6JrJMxUSYWVQcRYrODsIqUbXbU/y/AAAVBHlwtF3I9AAAAAElFTkSuQmCC'
);
const approverIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RkRGREEyRjg4ODMxMUVCQjM3QThEQkQ4QTk5NzVGRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RkRGREEzMDg4ODMxMUVCQjM3QThEQkQ4QTk5NzVGRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhGREZEQTJEODg4MzExRUJCMzdBOERCRDhBOTk3NUZFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhGREZEQTJFODg4MzExRUJCMzdBOERCRDhBOTk3NUZFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6yeCIgAAANdJREFUeNpi/J/FgA6YgDgViDOAWBcqdhmIpwPxHCD+h6yYEc0AFiBeC8R+DNjBRiAOBuK/yLYhgzQ8mkHAH4hT0J2LDMIYCIMwfAbwEmEAHz4DjhFhwFF8BrQD8Qs8mp8BcQc+A0AKrIF4LxbNu4DYBt0CRizpAAY+AzEPlP0NGj7/0BWxQGk9IFZCEudB0gwCXECcDMSvkcQeAvF5kAG+QLyJiMCbhUUsFhQGAQzkg2CQARoUGKAI8kIoEKuRacBNkAF2QCxBpgFiIAMmALE4mQa8AAgwAP8aIlYmu/RqAAAAAElFTkSuQmCC'
);
const branchIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5M0QzM0Y4Qzg4ODMxMUVCQjY2NUM1RkRGMDAwQUM5OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5M0QzM0Y4RDg4ODMxMUVCQjY2NUM1RkRGMDAwQUM5OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjkzRDMzRjhBODg4MzExRUJCNjY1QzVGREYwMDBBQzk4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjkzRDMzRjhCODg4MzExRUJCNjY1QzVGREYwMDBBQzk4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+t1RyzAAAATVJREFUeNqk0zFLw0AUwPFcFKEFLWinYjfdMohg1XYtXbqIg1JHcRAFKSjYxclZEFSk3foB2qlgQRwcFETED+AiCAqCg+JWavw/eIUQmtDQg9+Qy917d+/ujHs2ZUVoyyjiCK502Fa09oBN1DAiHaMDTBrDHNIYxyu2MIlSWIA4KthDos//VbSDAsyiCSckwZ+Msftk3ceTTu7iAktIwqCFjiwf57KCU93bDBYQ02DvWMOdJ0HCcxLX0mE4Rte3Cvmu4xCfvn+OJnjsddghlQ9qxvshAU5QxQ1+dcAGnpHzTX7DFQreAAfYRl4LVcYPUriVQmFRz/0b91rI9V4NhjnGclANXjTrMb4CxsjcFTPAY5I7P49pTGAHGTSkVibia5RgH7q9XbloUV9jFpdadLml1r8AAwD7njvXH9ptygAAAABJRU5ErkJggg=='
);
const suggestIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAQZJREFUOE+9kyFPw1AUhb/TqRnCFIqhUPwDLBsYHNkkCgu0I/hOb9A1wSFRGwkBMwEWt5+AIeCXTJBM9RJeAinQ0TVLePbd8717zz1PLHi0oJ7/B9gJayQMFbHx0X2hDsznAHFJQlMx14UAFtAHmmnx3AALGAMVjH31uEob/zWCtdjC2KFEW13ePoss4AVYBWJF+D+35gAW4jFhAOwBQzxCnTGyFvcYdcQjS9QVMs0EOEhAGRxkF3gGRkDDCRK2FfOQlZlvWzCfZeTcraWKLxRxOCtwv9Zox6zgcQNsOpGo6pzXuQFunCOqlLjDuFWP9l9xnxkkO2VdHZ7y/kqhJOaamPda1v078fo/ER9V1gcAAAAASUVORK5CYII='
);
const parallelIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5NUQxQTlGNDg4ODMxMUVCQkQ3MEEzRTQ0NTQ3RDBGQiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5NUQxQTlGNTg4ODMxMUVCQkQ3MEEzRTQ0NTQ3RDBGQiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjk1RDFBOUYyODg4MzExRUJCRDcwQTNFNDQ1NDdEMEZCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjk1RDFBOUYzODg4MzExRUJCRDcwQTNFNDQ1NDdEMEZCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+XUYwEgAAASVJREFUeNpi/D9ZmIFE0ATE5UD8EYiTGEk0QBeILyHxXzORaLsQGp8f3QBRIF4GxKeBuAyLAUeB+DwSv5sFTUE/EEdC2SZAfAWItyHJ/wFidpDTgdgNiC+gu0ATjW+IJQy0gHgdSDNIAN2ATWh8fSBmRuLDXLcMJoDuBV4o3Qm1LRSIfwNxHBD/BeJwIH4OxEewGcAEVfAYiCuBmBWI1wBxFJR9D4iVgLgPiP9hM8AaiGWgtv8H4l9AHALEO6EugYHPDGi2wkA0lF6JJAYyZBeaN32wGQAKrGAgvokWzyBwFY1/Bd2AFmiUiEBtZMESM6C0fxKIFwJxKbIkKC/8BNJsSGLOQLyP2LQNcsEbNLGXpGQOkAEZQPwMiL8BcTMWP+MFAAEGALiPOuhEFZuiAAAAAElFTkSuQmCC'
);
const ccIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5QjdDREQyRTg4ODMxMUVCQjI1Q0E0RkQ2NTBDRTJCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5QjdDREQyRjg4ODMxMUVCQjI1Q0E0RkQ2NTBDRTJCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlCN0NERDJDODg4MzExRUJCMjVDQTRGRDY1MENFMkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlCN0NERDJEODg4MzExRUJCMjVDQTRGRDY1MENFMkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TpWGgwAAAP1JREFUeNpi/J/FQApgAmIDIHYBYlcg1mchQpMCVIMbEDsBsTCS3B5sBggCsSPUBhBWxmP4bpABbEBsjeQsY6hTiQFgA+4BsTSRGv4DMSOU/QaIL4JsCgbiTwQ0fgfZhqQZBPYC8T+QASehAYTLkIdAnA/EdujOZ0DyKy5D9gGxFxDXATE7mtweBrTAQjekD4i9gXg6EMugab4NdRkDejSehMaGHBCvBeLJWJwOdz42A0DgNBRHAHEOjnDZg5w0cQELHOL/oGFD0AAY+I3GPwXEH4kx4C8QdwCxLVrs7EZWhC8zlUENYYDGzi4g5kP2PzEuQI9iUNSdQFYEEGAA4xAze00Zfk4AAAAASUVORK5CYII='
);
const writeIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAA1klEQVQokY3RsS7FYBQH8F+li4SB2BALT9Aayb2bmCRWiQfwBn2AvonFYjASEXO7mpjEJhYSiYjPoFfqc9ves50v3y//c3KSEIJZKq/LTVziGfvJLDCvy0XcYa15quZmimMey61+pTcxr8t17OIMO7jAC8adsNnpBqsNOMQS3quseJ0KIzSpoyorTifNvx070BNu2//+wB40qrLicSocQPfxZEkIoRf5Ofgoch/pUFJelwc4jxNTXA2Md41x5D5TbHQknWArTvodFW9YwAP2WknH2O6AX98ZS1tiBAI/jgAAAABJRU5ErkJggg=='
);
const noticeIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAQCAYAAAAmlE46AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMTFBMzcyRDg4ODMxMUVCQkIyNjgxNDEyRDYxNzU5RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMTFBMzcyRTg4ODMxMUVCQkIyNjgxNDEyRDYxNzU5RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkExMUEzNzJCODg4MzExRUJCQjI2ODE0MTJENjE3NTlEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkExMUEzNzJDODg4MzExRUJCQjI2ODE0MTJENjE3NTlEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+KsivwgAAANBJREFUeNpi/P//PwM6CJj6xR1ILYNyozZk8+xEV8OIrhGoiRNIHQBiM6jQaSC2B2r+jqyOCU1TLpB6jqQJBExBYkC5LKw2AiXygdQEBvwgC2jzdLhGoCYuqE18BDR+BGIpoOZvMKcaE6EJBPiB2ADZj8IMxAM2jMAhBVCsUYAEPaLgUPWf8lkHSJ8CYk4iNX4DxS3IxnYSNIEAKOo6WYCECTR+SAFGjNgSOTEAWyIHRfIGkBxUCKQgAJhaPuKNDqgCkEY9INYF4rXomkAAIMAAMIhB7BfalXEAAAAASUVORK5CYII='
);
const webhookIcon = ref(
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBMjk2MzY0Mjg4ODMxMUVCOTAwM0VFNUQyOTk4ODY4RSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBMjk2MzY0Mzg4ODMxMUVCOTAwM0VFNUQyOTk4ODY4RSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkEyOTYzNjQwODg4MzExRUI5MDAzRUU1RDI5OTg4NjhFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkEyOTYzNjQxODg4MzExRUI5MDAzRUU1RDI5OTg4NjhFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+cm+0OQAAAXtJREFUeNqM008oRFEUx/F5Q4OiFCXFRlYWEpFIMSU21iI7SVIWFv7EAsmfEoqS/2WhsGDDhpqFBYqIQhRKKMXCv1LG+N76TT2vybj16U0zd86555x3rcBYgivEikArGpCMQ7TA59zodoVew+jCGhrxgk0U/ydAiv5k7CMXTdjAoHNzZIgAhfjCLo71XaathDi8/nWCgE1wReNZn2PClbCDKGSjDuf4UOYTPIYLcItxTOIKVchTgJxwTYzV8059MNmPsKypBGx7fgWowDUmkIQO9OFev/foFG9qoAlaGpxCieZtsgyhF08YsSU6xajKMz2oxTq8Fm/itl6UbilDJVYc5VkqIw2dmIXHnCAf1cpYoM0XmEG6oz/BJn6ryYtuRTbPd9tmP8rxqXqNS8eJzKj9pgSfIpqZN2NPGxaQoUnU60J5kYp+LJnS3ep4EeaVxZQxh2mcaXSm41tIxA1WkYU2S9fZ3LIB1fiAKWXx6zQeNa4G8bpk7Tj4EWAAMKNjsS2KH3wAAAAASUVORK5CYII='
);

// const { plusIcon, approverIcon, branchIcon, suggestIcon, parallelIcon, ccIcon, writeIcon, noticeIcon, webhookIcon } = useIcon();

// Store
const flowStore = useFlowStore();
// 解构数据，但是得到的数据是不具有响应式的，只是一次性的
// 相当于仅仅只是...mainStore而已，只是做了reactive处理，并没有做toRefs
// const { count, info } = useMainStore();
// 解决方法：
// 1. 通过使用toRefs函数，因为前面所说相当于是通过reactive处理，因此可以
// const { count, info } = toRefs(mainStore);
// 2. 通过pinia中提供的storeToRefs方法来解决，推荐使用
// const { count, info } = storeToRefs(mainStore);
// const { suggestBranchEnable, parallelBranchEnable } = useFlowStore();
// console.log('suggestBranchEnable', suggestBranchEnable, 'parallelBranchEnable', parallelBranchEnable);

// 弹出
const visible = ref(false);

// 接收属性
const props = defineProps({
  node: {
    type: Object,
    default: function () {
      return {
        addable: true
      };
    }
  },
  nodeType: {
    type: [Number, String],
    default: 1
  },
  id: {
    type: [Number, String],
    default: ''
  },
  readable: {
    type: Boolean,
    default: false
  }
});

onMounted(() => {
  // console.log('props', props);
  // console.log('flowStore', flowStore);
});

/**
 * 显示添加图标
 */
const showAddImg = () => {
  // 如果是自由流程,不显示
  if(flowStore.modelModality == 2) {
    return false;
  }
  return !props.readable && (props.nodeType != 1 || (props.nodeType == 1 && props.node.addable))
}

// 添加节点类型
const addType = type => {
  let addNode = null;
  if (type == 1 || type == 6) {
    addNode = addApproverNode(type);
  } else if (type == 2) {
    addNode = addCcNode(type);
  } else if (type == 4) {
    addNode = addBranchNode(type);
  } else if (type == 5) {
    addNode = addEventNode(type);
  } else if (type == 7) {
    addNode = addSuggestNode(type);
  } else if (type == 9) {
    addNode = addParallelNode(type);
  } else if (type == 20) {
    addNode = addNoticeNode(type);
  } else if (type == 12) {
    addNode = addTimerNode(type);
  }
  const nodeType = props.nodeType;
  const currNode = props.node;
  const id = props.id;

  // 方式一：最简单的方法，如下
  // 解构后更改方式
  // count.value += 10
  // 结构前更改方式
  // mainStore.count += 10
  // 方式二：若要同时修改多个数据，建议使用$patch来实现批量更新，在内部做了优化
  // mainStore.$patch({
  //   count: mainStore.count + 1,
  //   info: "hello"
  // })
  // 方式三：更好的批量更新方法，通过$patch传递一个函数来实现，这里的state就是useMainStore容器中的state
  // mainStore.$patch(state => {
  //   state.count += 10
  //   state.info = "pinia批量更新"
  // })
  // 方式四：通过 actions 来修改数据
  // mainStore.changeState()
  // mainStore.changeStates(10)
  flowStore.addNode({ addNode, currNode, nodeType, nodeId: id });
  if (nodeType == 1 && type == 7) {
    // 当审批节点下添加意见分支,就不允许添加其他类型的节点了
    flowStore.updateNode({ currNode, field: 'addable', value: false });
  }
};
</script>
