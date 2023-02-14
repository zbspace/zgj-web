<template>
  <a-timeline>
    <a-timeline-item color="green">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-badge-ribbon text="会签" color="magenta">
            <a-card>
              <a-row>
                <a-col :span="6">
                  <a-space direction="vertical" class="w-fill">
                    <a-tag color="#52c41a">发起</a-tag>
                    <a-avatar size="large">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <strong style="padding-left: 7px">罗朋</strong>
                  </a-space>
                </a-col>
                <a-col :span="18">
                  <a-space direction="vertical" class="w-fill">
                    <a-badge color="purple" text="【接收时间】2022-09-01 17:13:20" />
                    <a-badge color="geekblue" text="【审批时间】2022-09-01 17:13:20" />
                    <!-- <a-badge color="cyan" text="【审批时间】2022-09-01 17:13:20" /> -->
                    <a-badge color="blue" text="【意见】已阅 , 同意" />
                    <span></span>
                  </a-space>
                </a-col>
              </a-row>
            </a-card>
          </a-badge-ribbon>
        </a-col>
      </a-row>
    </a-timeline-item>
    <a-timeline-item color="red">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-badge-ribbon text="会签" color="magenta">
            <a-card>
              <a-row>
                <a-col :span="6">
                  <a-space direction="vertical" class="w-fill">
                    <a-tag color="#bfbfbf">未处理</a-tag>
                    <a-avatar size="large">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <strong style="padding-left: 7px">罗朋</strong>
                  </a-space>
                </a-col>
                <a-col :span="18">
                  <a-space direction="vertical" class="w-fill">
                    <span>意见:已阅 , 同意</span>
                  </a-space>
                </a-col>
              </a-row>
            </a-card>
          </a-badge-ribbon>
        </a-col>
        <a-col :span="8">
          <a-badge-ribbon text="会签" color="magenta">
            <a-card>
              <a-row>
                <a-col :span="6">
                  <a-space direction="vertical" class="w-fill">
                    <a-tag color="#bfbfbf">未处理</a-tag>
                    <a-avatar size="large">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <strong style="padding-left: 7px">罗朋</strong>
                  </a-space>
                </a-col>
                <a-col :span="18">
                  <a-space direction="vertical" class="w-fill">
                    <span>意见:已阅 , 同意</span>
                  </a-space>
                </a-col>
              </a-row>
            </a-card>
          </a-badge-ribbon>
        </a-col>
      </a-row>
    </a-timeline-item>
    <a-timeline-item color="red">
      <a-row :gutter="16">
        <a-col :span="8">
          <a-badge-ribbon text="会签" color="magenta">
            <a-card>
              <a-row>
                <a-col :span="6">
                  <a-space direction="vertical" class="w-fill">
                    <a-tag color="#bfbfbf">未处理</a-tag>
                    <a-avatar size="large">
                      <template #icon><UserOutlined /></template>
                    </a-avatar>
                    <strong style="padding-left: 7px">罗朋</strong>
                  </a-space>
                </a-col>
                <a-col :span="18">
                  <a-space direction="vertical" class="w-fill">
                    <span>意见:已阅 , 同意</span>
                    <span></span>
                  </a-space>
                </a-col>
              </a-row>
            </a-card>
          </a-badge-ribbon>
        </a-col>
      </a-row>
    </a-timeline-item>
  </a-timeline>
</template>
<script setup>
// 接收属性
const props = defineProps({
  url: {
    type: String,
    required: false,
    default: ''
  }
});

const emit = defineEmits(['click']);
const click = () => {
  emit('click');
};

defineExpose({});
</script>