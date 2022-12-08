<template>
    <Layout>
        <div class="frontDesk-home">
            <div class="top-bg"></div>
            <div class="content">
                <Top />
                <Center />
                <Bottom />
            </div>
        </div>
    </Layout>
</template>
<script setup>
import { onMounted } from 'vue'
import Layout from "@/layouts/main.vue";
import Top from './top'
import Center from './center'
import Bottom from './bottom'

onMounted(() => {
    sessionStorage.setItem("CurrentSystemType", "business")
})
</script>
<style lang='scss' scoped>
.frontDesk-home {
    height: calc(100vh - 100px);
    overflow-y: auto;
    margin-top: 24px;
    border-radius: 5px;
    position: relative;
    z-index: 0;

    .top-bg {
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 335px;
        filter: blur(100px);
        background: url('../../../assets/svg/home/top-bg.svg') no-repeat;
        background-size: 100% 335px;
    }

    .content {
        position: relative;
        z-index: 1;
    }
}
</style>