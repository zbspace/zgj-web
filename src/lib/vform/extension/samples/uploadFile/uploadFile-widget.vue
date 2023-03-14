<template>
    <static-content-wrapper :designer="designer" :field="field" :design-state="designState" :parent-widget="parentWidget"
        :parent-list="parentList" :index-of-parent-list="indexOfParentList" :sub-form-row-index="subFormRowIndex"
        :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="用印文件" class="limit-item" :class="[labelAlign, customClass]">
                    <div class="upload-wrap">
                        <a-upload :custom-request="uploadFile" :default-file-list="fileList" :custom-icon="getCustomIcon()"
                            multiple tip="支持扩展名：doc .docx .pdf 格式文件、单文件大小不能超过 199M" accept=".doc,.docx,.xls,.xlxs,.pdf">
                            <template #upload-button>
                                <a-space>
                                    <span></span>
                                    <a-button class="upload-btn">
                                        <span class="arco-btn-icon"><svg viewBox="0 0 48 48" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
                                                class="arco-icon arco-icon-upload" stroke-width="4" stroke-linecap="butt"
                                                stroke-linejoin="miter">
                                                <path d="M14.93 17.071 24.001 8l9.071 9.071m-9.07 16.071v-25M40 35v6H8v-6">
                                                </path>
                                            </svg></span>
                                        本机上传
                                    </a-button>
                                </a-space>
                            </template>
                        </a-upload>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20" v-if="isSupplementary">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-form-item label="补充附件" class="limit-item" :class="[labelAlign, customClass]">
                    <div class="upload-wrap">
                        <a-upload :custom-request="uploadFile" :default-file-list="fileList" :custom-icon="getCustomIcon()"
                            multiple tip="可上传图片以及doc、pdf、xls、xlsx类型文件、单个文件大小不能超过199M" accept=".doc,.docx,.xls,.xlxs,.pdf">
                            <template #upload-button>
                                <a-space>
                                    <span></span>
                                    <a-button class="upload-btn">
                                        <span class="arco-btn-icon"><svg viewBox="0 0 48 48" fill="none"
                                                xmlns="http://www.w3.org/2000/svg" stroke="currentColor"
                                                class="arco-icon arco-icon-upload" stroke-width="4" stroke-linecap="butt"
                                                stroke-linejoin="miter">
                                                <path d="M14.93 17.071 24.001 8l9.071 9.071m-9.07 16.071v-25M40 35v6H8v-6">
                                                </path>
                                            </svg></span>
                                        本机上传
                                    </a-button>
                                    <div class="tip"><svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none"
                                            viewBox="0 0 14 14">
                                            <path fill-opacity=".25" fill="#000"
                                                d="M7 13.667A6.667 6.667 0 1 1 7 .333a6.667 6.667 0 0 1 0 13.334ZM6.333 9v1.333h1.334V9H6.334Zm1.334-1.097A2.335 2.335 0 0 0 7 3.333 2.334 2.334 0 0 0 4.712 5.21l1.308.262A1 1 0 1 1 7 6.667a.667.667 0 0 0-.667.666v1h1.334v-.43Z"
                                                data-follow-fill="#000" />
                                        </svg>补充附件仅作为参考，不参与用印前后文件核验</div>
                                </a-space>
                            </template>
                        </a-upload>
                    </div>
                </el-form-item>
            </el-col>
        </el-row>
    </static-content-wrapper>
</template>

<script>
import FormItemWrapper from '@/lib/vform/components/form-designer/form-widget/field-widget/form-item-wrapper'
import StaticContentWrapper from "@/lib/vform/components/form-designer/form-widget/field-widget/static-content-wrapper";
import emitter from "@/lib/vform/utils/emitter";
import i18n from "@/lib/vform/utils/i18n";
import fieldMixin from "@/lib/vform/components/form-designer/form-widget/field-widget/fieldMixin";

import { h } from 'vue';
export default {
    name: "uploadFile-widget",
    componentName: "FieldWidget", //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
        field: Object,
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: Number,
        designer: Object,
        isSupplementary:{
            type: Boolean,
            default: true,
        },
        designState: {
            type: Boolean,
            default: false,
        },

        subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */ type: Number,
            default: -1,
        },
        subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */ type: Number,
            default: -1,
        },
        subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */ type: String,
            default: "",
        },
    },
    components: {
        StaticContentWrapper,
        FormItemWrapper,
    },
    computed:{
        labelAlign() {
            if (!!this.field.options.labelAlign) {
            return this.field.options.labelAlign;
            }

            if (!!this.designer) {
            return this.designer.formConfig.labelAlign || "label-left-align";
            } else {
            return this.formConfig.labelAlign || "label-left-align";
            }
        },
    },
    data() {
        return {
            fieldModel: null,
            rules: [],
            fileList: [],
        };
    },
    created() {
        this.registerToRefList();
        this.initEventHandler();
    },
    beforeUnmount() {
        this.unregisterFromRefList();
    },
    methods: {
        handleCloseCustomEvent() {
            if (!!this.field.options.onClose) {
                let changeFn = new Function(this.field.options.onClose);
                changeFn.call(this);
            }
        },
        uploadFile(option) {
            // console.log(option);
        },
        getCustomIcon() {
            let fileIconImg = {
                'doc': 'icon-doc.svg',
                'docx': 'icon-doc.svg',
                'pdf': 'icon-pdf.svg',
                'xls': 'icon-xls.svg',
                'xlsx': 'icon-xls.svg'
            }
            return {
                // retryIcon: () => h(IconUpload),
                // cancelIcon: () => h(IconClose),
                fileIcon: (file) => {
                    let fileName = file.name;
                    let lastIndex = fileName.lastIndexOf('.') + 1;
                    let item = fileName.substr(lastIndex);
                    let svgURL = new URL(`../../../icons/svg/upload/${fileIconImg[item]}`, import.meta.url).href;
                    return h('img', {
                        style: {
                            width: '14px',
                            height: '14px',
                            display: 'inline-block'
                        },
                        src: svgURL
                    });
                },
                // fileIcon: () => h(IconFileAudio1),
                // removeIcon: () => h(IconClose),
                // errorIcon: () => h(IconFaceFrownFill),
                fileName: (file) => {
                    console.log(file.name)
                    return `${file.name}`
                },
            };
        },
    },
};
</script>

<style lang="scss" scoped>
.upload-wrap {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    padding: 24px;
    box-sizing: border-box;
    .tip{
        display:flex;
        align-items:center;
        color: rgba(0, 0, 0, 0.45);
        font-size:12px;
        margin-left:10px;
        >svg{
            width:15px;
            height:15px;
            margin-right:5px;
        }
    }
}

.upload-btn {
    background: #D0963E;
    border-radius: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 14px;
    color: #FFFFFF;
}

.arco-btn-secondary:hover,
.arco-btn-secondary[type='button']:hover,
.arco-btn-secondary[type='submit']:hover {
    color: #FFFFFF;
    background: #D0963E;
}

:global(.arco-upload-tip) {
    margin-top: 16px;
    padding-bottom: 16px;
    line-height: 1;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    color: rgba(0, 0, 0, 0.45);
}

:global(.el-form-item--default .el-form-item__content) {
    line-height: 1 !important;
}

:global(.arco-space-item) {
    margin-right: 0 !important;
}

:global(.arco-upload-list-item-content) {
    background: rgba(0, 0, 0, 0.04);
    padding: 12px;

}

:global(.arco-upload-list-item-name-text) {
    color: #3E78D0;
    font-size: 14px;
}

:global(.arco-upload-list) {
    width: 50% !important;
}

:global(.arco-progress-size-mini .arco-progress-circle-bg) {
    stroke: #F6E8C1;
}
:deep(.label-left-align) .el-form-item__label {
  text-align: left;
  justify-content: flex-start !important;
}

:deep(.label-center-align) .el-form-item__label {
  text-align: center;
  justify-content: center !important;
}

:deep(.label-right-align) .el-form-item__label {
  text-align: right;
  justify-content: flex-end !important;
}
</style>
