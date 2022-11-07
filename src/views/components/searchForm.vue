<template>
    <div class="components-searchForm">
        <componentsTable type="1" :data="state.data" :header="state.header" :isSelection="true" />
    </div>
</template>
<script setup>
import { defineProps, onBeforeMount, onMounted } from "vue"
import componentsTable from "./table"
const props = defineProps({
    type: String,
})
const state = {
    header: [{
        prop: 'name',
        label: "name",
    }, {
        prop: 'date',
        label: "date",
    }, {
        prop: 'address',
        label: "address",
    }],
    data: [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ]
};
console.log(props.type);
onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.components-searchForm {
    margin: 0%;
}
</style>