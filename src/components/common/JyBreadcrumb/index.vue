<template>
  <div>
    <el-breadcrumb :separator="props.separator">
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item, i) in props.routes"
        :key="i"
        >{{ item.label }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script setup>
  const props = defineProps({
    routes: {
      type: Array,
      default: () => [{ path: '', label: '' }]
    },
    separator: {
      type: String,
      default: '/'
    }
  })
</script>

<style lang="scss" scoped></style>
