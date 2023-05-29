<!--
* @Descripttion VueQuill RichEdit
* @FileName JyRichEdit.vue
* @Author Guanpf
* @LastEditTime 2023-03-16 14:08:16
!-->
<template>
  <div>
    <QuillEditor
      class="quill-editor"
      ref="myQuillEditor"
      theme="snow"
      v-model:content="content"
      :options="data.editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      contentType="html"
      @update:content="setValue()"
    />
    <!-- 使用自定义图片上传 -->
    <input
      type="file"
      hidden
      accept=".jpg,.png"
      ref="fileBtn"
      @change="handleUpload"
    />
  </div>
</template>

<script setup>
  // import { QuillEditor } from '@vueup/vue-quill'
  // import '@vueup/vue-quill/dist/vue-quill.snow.css'
  import { reactive, onMounted, ref, toRaw, watch, nextTick } from 'vue'

  const props = defineProps(['value'])
  const emit = defineEmits(['updateValue', 'onEditorBlur', 'onEditorFocus'])
  const content = ref(props.value)
  const myQuillEditor = ref()
  console.log('props.value', props.value)
  watch(
    () => props.value,
    val => {
      // console.log(toRaw(myQuillEditor.value))
      // 处理光标问题
      nextTick(() => {
        console.log(1)
        // toRaw(myQuillEditor.value).setHTML(val)
        // const quill = toRaw(myQuillEditor.value).getQuill()
        // const length = quill.getLength()
        // quill.insertEmbed(length, 'text', '')
        // quill.setSelection(quill.getLength(), quill.getLength() + 1)
      })
    },
    { deep: true }
  )
  const fileBtn = ref()
  const data = reactive({
    content: '',
    editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [
            {
              size: ['small', 'large', 'huge']
            }
          ],
          [{ font: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ header: 1 }, { header: 2 }],
          ['image', 'link'],
          [{ direction: 'rtl' }],
          [{ color: [] }, { background: [] }]
        ]
      },
      placeholder: '请输入内容...'
    },
    // editorOption: {
    //   modules: {
    //     toolbar: [
    //       ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
    //       ['blockquote', 'code-block'], // 引用  代码块
    //       [{ header: 1 }, { header: 2 }], // 1、2 级标题
    //       [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
    //       [{ script: 'sub' }, { script: 'super' }], // 上标/下标
    //       [{ indent: '-1' }, { indent: '+1' }], // 缩进
    //       [{ direction: 'rtl' }], // 文本方向
    //       [
    //         {
    //           size: ['12', '14', '16', '18', '20', '22', '24', '28', '32', '36']
    //         }
    //       ], // 字体大小
    //       [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
    //       [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
    //       // [{ font: ['songti'] }], // 字体种类
    //       [{ align: [] }], // 对齐方式
    //       ['clean'], // 清除文本格式
    //       ['image', 'video'] // 链接、图片、视频
    //     ]
    //   },
    //   placeholder: '请输入正文'
    // },
    titleConfig: [
      { Choice: '.ql-insertMetric', title: '跳转配置' },
      { Choice: '.ql-bold', title: '加粗' },
      { Choice: '.ql-italic', title: '斜体' },
      { Choice: '.ql-underline', title: '下划线' },
      { Choice: '.ql-header', title: '段落格式' },
      { Choice: '.ql-strike', title: '删除线' },
      { Choice: '.ql-blockquote', title: '块引用' },
      { Choice: '.ql-code', title: '插入代码' },
      { Choice: '.ql-code-block', title: '插入代码段' },
      { Choice: '.ql-font', title: '字体' },
      { Choice: '.ql-size', title: '字体大小' },
      { Choice: '.ql-list[value="ordered"]', title: '编号列表' },
      { Choice: '.ql-list[value="bullet"]', title: '项目列表' },
      { Choice: '.ql-direction', title: '文本方向' },
      { Choice: '.ql-header[value="1"]', title: 'h1' },
      { Choice: '.ql-header[value="2"]', title: 'h2' },
      { Choice: '.ql-align', title: '对齐方式' },
      { Choice: '.ql-color', title: '字体颜色' },
      { Choice: '.ql-background', title: '背景颜色' },
      { Choice: '.ql-image', title: '图像' },
      { Choice: '.ql-video', title: '视频' },
      { Choice: '.ql-link', title: '添加链接' },
      { Choice: '.ql-formula', title: '插入公式' },
      { Choice: '.ql-clean', title: '清除字体格式' },
      { Choice: '.ql-script[value="sub"]', title: '下标' },
      { Choice: '.ql-script[value="super"]', title: '上标' },
      { Choice: '.ql-indent[value="-1"]', title: '向左缩进' },
      { Choice: '.ql-indent[value="+1"]', title: '向右缩进' },
      { Choice: '.ql-header .ql-picker-label', title: '标题大小' },
      { Choice: '.ql-header .ql-picker-item[data-value="1"]', title: '标题一' },
      { Choice: '.ql-header .ql-picker-item[data-value="2"]', title: '标题二' },
      { Choice: '.ql-header .ql-picker-item[data-value="3"]', title: '标题三' },
      { Choice: '.ql-header .ql-picker-item[data-value="4"]', title: '标题四' },
      { Choice: '.ql-header .ql-picker-item[data-value="5"]', title: '标题五' },
      { Choice: '.ql-header .ql-picker-item[data-value="6"]', title: '标题六' },
      { Choice: '.ql-header .ql-picker-item:last-child', title: '标准' },
      { Choice: '.ql-size .ql-picker-item[data-value="small"]', title: '小号' },
      { Choice: '.ql-size .ql-picker-item[data-value="large"]', title: '大号' },
      {
        Choice: '.ql-size .ql-picker-item[data-value="huge"]',
        title: '超大号'
      },
      { Choice: '.ql-size .ql-picker-item:nth-child(2)', title: '标准' },
      { Choice: '.ql-align .ql-picker-item:first-child', title: '居左对齐' },
      {
        Choice: '.ql-align .ql-picker-item[data-value="center"]',
        title: '居中对齐'
      },
      {
        Choice: '.ql-align .ql-picker-item[data-value="right"]',
        title: '居右对齐'
      },
      {
        Choice: '.ql-align .ql-picker-item[data-value="justify"]',
        title: '两端对齐'
      }
    ]
  })
  const imgHandler = state => {
    if (state) {
      fileBtn.value.click()
    }
  }
  const setValue = () => {
    const text = toRaw(myQuillEditor.value).getHTML()
    emit('updateValue', text)
  }
  // 失去焦点
  const onEditorBlur = quill => {
    // console.log('editor blur!', quill)
    emit('onEditorBlur', quill)
  }
  // 获取焦点
  const onEditorFocus = quill => {
    // console.log('editor focus!', quill)
    emit('onEditorFocus', quill)
  }
  // 准备就绪
  const onEditorReady = quill => {
    console.log('editor ready!', quill)
    // 设置操作提示
    for (const item of data.titleConfig) {
      const tip = document.querySelector('.ql-toolbar ' + item.Choice)
      if (!tip) continue
      tip.setAttribute('title', item.title)
    }
  }

  // const onEditorChange = ({ quill, html, text }) => {
  //   console.log('editor change!', quill, html, text)
  // }
  // 上传图片
  const handleUpload = e => {
    const files = Array.prototype.slice.call(e.target.files)
    // console.log(files, "files")
    if (!files) {
      return
    }
    const formdata = new FormData()
    formdata.append('file', files[0])
    // backsite.uploadFile(formdata).then(res => {
    //   if (res.data.url) {
    //     const quill = toRaw(myQuillEditor.value).getQuill()
    //     const length = quill.getSelection().index
    //     // 插入图片，res为服务器返回的图片链接地址
    //     quill.insertEmbed(length, 'image', res.data.url)
    //     // 调整光标到最后
    //     quill.setSelection(length + 1)
    //   }
    // })
  }
  onMounted(() => {
    const quill = toRaw(myQuillEditor.value).getQuill()
    console.log(quill)
    if (myQuillEditor.value) {
      quill.getModule('toolbar').addHandler('image', imgHandler)
    }
    toRaw(myQuillEditor.value).setHTML(props.value)
  })
</script>
<style scoped lang="scss">
  :deep(.ql-editor) {
    min-height: 180px;
  }
  :deep(.ql-formats) {
    height: 21px;
    line-height: 21px;
  }
  .ql-clipboard {
    position: fixed;
    display: none;
    left: 50%;
    top: 50%;
  }
</style>
