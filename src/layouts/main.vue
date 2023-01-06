<template>
  <div>
    <Vertical
      v-if="layoutStore.layoutType === 'vertical'"
      :layout="layoutStore.layoutType"
    >
      <slot />
    </Vertical>

    <Horizontal
      v-if="layoutStore.layoutType === 'horizontal'"
      :layout="layoutStore.layoutType"
    >
      <slot />
    </Horizontal>

    <TwoColumns
      v-if="layoutStore.layoutType === 'twocolumn'"
      :layout="layoutStore.layoutType"
    >
      <slot />
    </TwoColumns>
  </div>
</template>

<script setup>
  // import { layoutComputed } from "@/state/helpers";

  import Vertical from './vertical'
  import Horizontal from './horizontal'
  import TwoColumns from './twocolumn'
  import { useLayoutStore } from '@/store/layout'
  const layoutStore = useLayoutStore()
</script>
