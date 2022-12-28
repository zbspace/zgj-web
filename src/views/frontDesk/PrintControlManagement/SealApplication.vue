<!-- 用印申请 -->
<template>
    <div class="PrintControlManagement-SealApplication">
        <componentsLayout Layout="title,tabs,searchForm,table,pagination,batch">
            <template #title>
                <div class="title">
                    <div>用印申请</div>
                    <div>
                        <el-button>
                            <img class="button-icon" src="../../../assets/svg/gengduo-caozuo.svg" alt="" srcset="">
                            <span>更多操作</span>
                        </el-button>
                    </div>
                </div>
            </template>
            <template #tabs>
                <div>
                    <componentsTabs activeName="1" :data="state.componentsTabs.data">
                    </componentsTabs>
                </div>
            </template>
            <template #searchForm>
                <div>
                    <componentsSearchForm :data="state.componentsSearchForm.data"
                        :butData="state.componentsSearchForm.butData" :style="state.componentsSearchForm.style">
                    </componentsSearchForm>
                </div>
            </template>
            <template #batch>
                <div class="batch">
                    <el-button @click="(showDialog = true)">弹框Demo</el-button>
                    <el-button @click="(showDepPerDialog = true)">组织选择</el-button>
                    <el-button @click="goInnerTablePage">二级表格页面</el-button>
                    <el-button @click="goInnerPage('/frontDesk/PrintControlManagement/innerPage')">二级页面</el-button>
                    <el-button :plain="true" @click="open2">成功消息</el-button>
                    <el-button :plain="true" @click="open3">询问消息</el-button>
                    <el-button :plain="true" @click="open4">异常消息</el-button>
                    <el-button :plain="true" @click="openMess">信息弹窗</el-button>
                    <el-button @click="goInnerPage('/frontDesk/InnerPageApplication')">新增（用印申请）</el-button>
                    <!-- showFormDialog = true -->
                </div>
            </template>
            <template #table>
                <div>
                    <componentsTable :defaultAttribute="state.componentsTable.defaultAttribute"
                        :data="state.componentsTable.data" :header="state.componentsTable.header" :isSelection="true">
                    </componentsTable>
                </div>
            </template>
            <template #pagination>
                <componentsPagination :data="state.componentsPagination.data"
                    :defaultAttribute="state.componentsPagination.defaultAttribute">
                </componentsPagination>
            </template>
        </componentsLayout>

        <!-- test - dialog -->
        <KDialog @update:show="showDialog = $event" :show="showDialog" title="Demo Dialog" :oneBtn="true"
            :confirmText="$t('t-zgj-operation.submit')" :concelText="$t('t-zgj-operation.cancel')"></KDialog>

        <!-- 人员选择  -->
        <kDepartOrPersonVue :show="showDepPerDialog" @update:show="showDepPerDialog = $event" v-if="showDepPerDialog">
        </kDepartOrPersonVue>

        <!-- 动态表单 - 用印申请 -->
        <KDialog @update:show="showFormDialog = $event" :show="showFormDialog" title="新增（用印申请）" :centerBtn="true"
            :confirmText="$t('t-zgj-operation.submit')" :concelText="$t('t-zgj-operation.cancel')" :width="1000"
            :height="600" @close="submitForm">
            <v-form-render :form-json="formJson" :form-data="formData" :option-data="optionData" ref="vFormRef">
            </v-form-render>
        </KDialog>

    </div>
</template>
<script setup>
import { reactive, defineProps, defineEmits, onBeforeMount, onMounted, ref } from "vue"
import Layout from "../../../layouts/main.vue";
import componentsTable from "../../components/table"
import componentsSearchForm from "../../components/searchForm"
import componentsTree from "../../components/tree"
import componentsBreadcrumb from "../../components/breadcrumb"
import componentsPagination from "../../components/pagination.vue"
import componentsTabs from "../../components/tabs.vue"
import componentsLayout from "../../components/Layout.vue"
import kDepartOrPersonVue from "../../components/modules/kDepartOrPerson.vue";
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import KDialog from "@/views/components/modules/kdialog.vue"
import FormJson from '@/views/addDynamicFormJson/sealApplication.json'
const props = defineProps({
    // 处理类型
    type: {
        type: String,
        default: "0",
    },
})
const router = useRouter()
const showDialog = ref(false)
const showDepPerDialog = ref(false)

// 用印申请 弹框
const showFormDialog = ref(false)
const formJson = reactive(FormJson)
const formData = reactive({})
const optionData = reactive({})
const dialogVisible = ref(false)
const vFormRef = ref(null)
const submitForm = (type) => {
    if (!type) {
        vFormRef.value.resetForm()
        return
    }
    vFormRef.value.getFormData().then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData))
        showFormDialog.value = false
    }).catch(error => {
        // Form Validation failed

        ElMessage.error(error)
    })
}

const goInnerPage = (path) => {
  router.push({
    path: path
  })
}

const goInnerTablePage = () => {
    router.push({
        path: '/frontDesk/PrintControlManagement/innerTablePage'
    })
}

const open2 = () => {
    ElMessage({
        message: '这是一条成功消息，会自动消失。',
        type: 'success',
    })
}
const open3 = () => {
    ElMessage({
        message: '这是一条询问消息，会自动消失。',
        type: 'warning'
    })
}
const open4 = () => {
    ElMessage.error('这是一条异常消息，会自动消失。')
}
const openMess = () => {
    ElMessageBox.confirm(
        '一系列的信息描述，可能会很长。也可以是很短同样也可以带标点。',
        '提示？',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            ElMessage({
                type: 'success',
                message: '操作成功！',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消操作！',
            })
        })
}
const emit = defineEmits([]);
const state = reactive({
    componentsTabs: {
        data: [{
            label: '智能用印',
            name: "1",
        }, {
            label: '领用印章',
            name: "2",
        }, {
            label: '流程规范',
            name: "3",
        },]
    },
    componentsSearchForm: {
        style: {
            lineStyle: {
                width: "calc(100% / 3)",
            },
            labelStyle: {
                width: "100px"
            },
        },
        data: [
            {
                id: 'name',
                label: "关键词",
                type: "input",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'picker',
                label: "选择时间",
                type: "picker",
                inCommonUse: true,
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    type: "daterange",
                    "start-placeholder": "开始时间",
                    "end-placeholder": "结束时间"
                },
                style: {

                }
            },
            {
                id: 'select',
                label: "风险项",
                type: "select",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
            {
                id: 'shenqingr',
                label: "风险项描述",
                type: "input",
                // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
                defaultAttribute: {
                    placeholder: "请输入",
                },
            },
        ],
        butData: [{
            id: "more",
            name: "展开",
            type: "unfold",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "primary"
            },
            style: {

            }
        }, {
            id: "inquire",
            name: "查询",
            type: "click",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
                type: "primary"
            },
            style: {

            }
        }, {
            id: "reset",
            name: "重置",
            type: "click",
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {

            },
            style: {

            }
        },],
    },
    componentsTable: {
        header: [
            {
                prop: '0',
                label: "序号",
                width: 100,
            }, {
                prop: '1',
                label: "风险分类",
                sortable: true,
                "min-width":150,
            }, {
                prop: '2',
                label: "风险项",
                sortable: true,
                "min-width":150,
            }, {
                prop: '3',
                label: "风险项描述",
                sortable: true,
                "min-width":150,
            }, {
                prop: '4',
                label: "开启状态",
                customDisplayType: "switch"
            }, {
                prop: '5',
                label: "提醒时间",
                sortable: true,
                "min-width":150,
            },
            {
                prop: '6',
                label: "提醒人",
                sortable: true,
                "min-width":150,
            },
            {
                prop: 'caozuo',
                label: "操作",
                fixed:"right",
                "min-width":150,
                rankDisplayData: [
                    {
                        name: "设置提醒人"
                    },
                ],
            }],
        data: [
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
            {
                1: '文件防篡改',
                2: '盖前文件OCR核验异常',
                3: '',
                4: '',
                5: '即时提醒',
                6: '',
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            stripe: true,
            "header-cell-style": {
                background: "var(--color-fill--3)",
            }
        }
    },
    componentsTree: {
        data: [
            {
                label: 'Level one 1',
                children: [
                    {
                        label: 'Level two 1-1',
                        children: [
                            {
                                label: 'Level three 1-1-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 2',
                children: [
                    {
                        label: 'Level two 2-1',
                        children: [
                            {
                                label: 'Level three 2-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 2-2',
                        children: [
                            {
                                label: 'Level three 2-2-1',
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Level one 3',
                children: [
                    {
                        label: 'Level two 3-1',
                        children: [
                            {
                                label: 'Level three 3-1-1',
                            },
                        ],
                    },
                    {
                        label: 'Level two 3-2',
                        children: [
                            {
                                label: 'Level three 3-2-1',
                            },
                        ],
                    },
                ],
            },
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            "check-on-click-node": true,
            "show-checkbox": true,
            "default-expand-all": true,
            "expand-on-click-node": false,
            "check-strictly": true,
        }
    },
    componentsPagination: {
        data: {
            amount: 400,
            index: 1,
            pageNumber: 80,
        },
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            layout: "sizes, prev, pager, next, jumper",
            total: 500,
            'page-sizes': [10, 100, 200, 300, 400],
            background: true,
        }
    },
    componentsBreadcrumb: {
        data: [
            {
                name: "ceshi",
            },
            {
                name: "ceshi",
            }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
            separator: "/",
        }
    }
});

onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)

})
onMounted(() => {
    // console.log(`the component is now mounted.`)
})
</script>
<style lang='scss' scoped>
.PrintControlManagement-SealApplication {
    margin: 0%;

    .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .batch {
        display: flex;
        align-items: center;

        .batch-desc {
            @include mixin-margin-right(12)
        }
    }
}
</style>