<template>
  <div id="flow-min-map" class="flow-min-map">
    <img :src="flowStore.mapImg" />
    <div
      id="flow-min-map-mask"
      class="flow-min-map-mask"
      :style="mapMask"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseUp"
    ></div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useFlowStore } from '../store/flow';
// 流程设计窗口
let flowDesign = ref(null);
// 地图窗口
let flowMap = ref(null);
// 地图窗口占比窗口(红色窗口)
let flowMapMsk = ref(null);
// 流程设计整体高度,包含滚动条隐藏高度
let wrapHeight = ref(0);
// 地图红色窗口top位置
let top = ref(0);
// 鼠标是否点击
let mouseDown = ref(false);
// 出现滚动条
let scroll = ref(false);
// 定时器
let timer = ref(null);

// Store
const flowStore = useFlowStore();

/**
 * 流程图视窗高度
 */
const containerHeight = computed(() => {
  if (flowDesign.value) {
    return flowDesign.value.clientHeight;
  }
  return 0;
});
/**
 * 流程图视窗高度与流程总高度的比
 */
const scaleHeight = computed(() => {
  const height = containerHeight.value / wrapHeight.value;
  return height;
});

// 小地图高度与流程总高度的比
const scaleOffsetHeight = computed(() => {
  if (!flowMap.value && wrapHeight.value) {
    return 1;
  }
  return flowMap.value.clientHeight / wrapHeight.value;
});

// 地图窗口占比窗口(红色窗口)样式
const mapMask = computed(() => {
  return {
    width: '100%',
    height: `${scaleHeight.value * 100}%`,
    left: '0px',
    top: `${top.value}px`
  };
});

// 页面挂载后执行
onMounted(async () => {
  // 流程设计窗口
  flowDesign.value = document.querySelector('#flow-designer-wrap');
  // 流程小地图窗口
  flowMap.value = document.querySelector('#flow-min-map');
  // 小地图红色窗口
  flowMapMsk.value = document.querySelector('#flow-min-map-mask');
  // 初始流程设计窗口高度
  initSize(flowDesign);
  // 更新地图
  flowStore.updateMap();

  // 监听鼠标移动
  window.addEventListener('mousemove', handleMouseMove);
  // 监听页面的mouseleave事件，当鼠标移出浏览器页面可用区域 并 松开按键时，停止拖动
  window.addEventListener('mouseleave', handleMouseDown);
  // 监听滚动条
  window.addEventListener('scroll', handleScroll, true);
  // 监听出现滚动条
  timer.value = setInterval(() => {
    if (flowDesign.value.scrollHeight > flowDesign.value.clientHeight) {
      scroll.value = true;
    } else {
      scroll.value = false;
    }
    initSize(flowDesign);
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});

// 初始流程设计整体高度
const initSize = flowDesign => {
  wrapHeight.value = flowDesign.value.scrollHeight;
};

// 滚动条滚动，top的位置
const handleScroll = () => {
  top.value = flowDesign.value.scrollTop * scaleOffsetHeight.value;
};

// 红色块鼠标按下
const handleMouseDown = () => {
  mouseDown.value = true;
};

// 红色块鼠标按下移动
const handleMouseMove = e => {
  if (mouseDown.value) {
    const directionY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
    if (directionY >= 0 && flowMapMsk.value.offsetHeight + top.value < flowMap.value.offsetHeight) {
      top.value++;
    } else if (top.value > 0) {
      top.value--;
    }
    flowDesign.value.scrollTop = top.value / scaleOffsetHeight.value;
  }
};

// 红色块鼠标放开
const handleMouseUp = () => {
  mouseDown.value = false;
  document.onmousemove = document.onmouseup = null;
};
</script>
