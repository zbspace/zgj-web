<template>
  <div class="editBusinessRule">
    <componentsLayout special>
      <div style="width: 100%; padding: 24px 16px 0 16px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.65)"
          >
            业务管理
          </el-breadcrumb-item>
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
          >
            业务规则管理
          </el-breadcrumb-item>
          <el-breadcrumb-item
            style="--el-text-color-regular: rgba(0, 0, 0, 0.25)"
          >
            新增
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">新增</div>
        <el-scrollbar
          height="calc(100vh - 280px)"
          style="overflow-x: hidden; padding-bottom: 20px"
        >
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="145px"
            class="demo-ruleForm"
            style="width: calc(100% - 5px)"
          >
            <el-row :gutter="5">
              <el-col :span="10">
                <el-form-item label="业务规则名称" prop="ruleBusinessName">
                  <el-input
                    v-model="ruleForm.ruleBusinessName"
                    clearable
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="业务规则编码" prop="ruleBusinessNo">
                  <el-input v-model="ruleForm.ruleBusinessNo" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="10">
                <el-form-item label="文件类型" prop="fileTypeIds">
                  <el-select
                    v-model="ruleForm.fileTypeIds"
                    multiple
                    tag-type="warning"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in fileTypeList"
                      :key="item.fileTypeId"
                      :label="item.fileTypeName"
                      :value="item.fileTypeId"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="用印类型" prop="sealUseTypeId">
                  <el-select
                    v-model="ruleForm.sealUseTypeId"
                    placeholder="请选择"
                    style="width: 100%"
                    disabled
                  >
                    <el-option label="物理用印" value="1" />
                    <el-option label="电子签章" value="2" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-tabs type="border-card">
              <el-tab-pane label="智能用印">
                <div style="margin-left: 30px; margin-bottom: 24px">
                  <div class="labelTitle">用印设置</div>
                  <div class="grayBg">
                    <el-row :gutter="5">
                      <el-col :span="10">
                        <el-form-item label="外借电子围栏" prop="railSwitch">
                          <el-switch
                            v-model="ruleForm.railSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="批量用印" prop="batchSwitch">
                          <el-switch
                            v-model="ruleForm.batchSwitch"
                            active-value="1"
                            inactive-value="0"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="grayBg">
                    <el-form-item label="防伪打印" prop="railSwitch">
                      <el-checkbox
                        v-model="ruleForm.qrCodeSwitch"
                        label="二维码水印"
                        true-label="1"
                        false-label="0"
                      />
                      <el-checkbox
                        v-model="ruleForm.wordWaterSwitch"
                        label="文字水印"
                        true-label="1"
                        false-label="0"
                      />
                      <el-checkbox
                        v-model="ruleForm.gridWaterSwitch"
                        label="网纹水印"
                        true-label="1"
                        false-label="0"
                      />
                      <el-checkbox
                        v-model="ruleForm.invisibleWaterMarkSwitch"
                        label="隐形水印"
                        true-label="1"
                        false-label="0"
                      />
                    </el-form-item>
                  </div>
                  <div class="labelTitle">远程监督用印</div>
                  <div class="grayBg">
                    <el-row :gutter="5">
                      <el-col :span="12">
                        <el-form-item label="远程盖章确认人" prop="remoteUsers">
                          <el-select
                            v-model="ruleForm.remoteUsers"
                            multiple
                            placeholder="请选择"
                            style="width: 100%"
                            disabled
                          >
                            <el-option label="物理用印" value="1" />
                            <el-option label="电子签章" value="2" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="视频盖章确认人" prop="videoUsers">
                          <el-select
                            v-model="ruleForm.videoUsers"
                            multiple
                            placeholder="请选择"
                            style="width: 100%"
                            disabled
                          >
                            <el-option label="物理用印" value="1" />
                            <el-option label="电子签章" value="2" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <el-timeline>
                  <el-timeline-item timestamp="盖前" placement="top">
                    <el-divider />
                    <div class="labelTitle">基础设置</div>
                    <div class="grayBg">
                      <el-row :gutter="5">
                        <el-col :span="3">
                          <el-form-item
                            label="盖前采集人脸"
                            prop="frontFaceSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.frontFaceSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col
                          :span="18"
                          v-if="ruleForm.frontFaceSwitch === '1'"
                        >
                          <el-form-item label="" prop="frontFaceSelectVal">
                            <el-radio-group
                              v-model="ruleForm.frontFaceSelectVal"
                            >
                              <el-radio label="1">首次进入采集</el-radio>
                              <el-radio label="2"
                                >每个印章首次进入采集</el-radio
                              >
                              <el-radio label="3">每次进入都采集</el-radio>
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="labelTitle">文件防篡改</div>
                    <div class="grayBg">
                      <el-row :gutter="5">
                        <el-col :span="8">
                          <el-form-item
                            label="盖前强制OCR核验"
                            prop="frontOcrSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.frontOcrSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="二维码水印核验"
                            prop="frontQrCodeSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.frontQrCodeSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item timestamp="盖中" placement="top">
                    <el-divider />
                    <div class="labelTitle">基础设置</div>
                    <div class="grayBg">
                      <el-row :gutter="5">
                        <el-col :span="16">
                          <el-row :gutter="0">
                            <el-col :span="3">
                              <el-form-item
                                label="盖中拍照"
                                prop="runPhotoSwitch"
                              >
                                <el-switch
                                  v-model="ruleForm.runPhotoSwitch"
                                  active-value="1"
                                  inactive-value="0"
                                />
                              </el-form-item>
                            </el-col>
                            <el-col
                              :span="21"
                              v-if="ruleForm.runPhotoSwitch === '1'"
                            >
                              <el-form-item label="" prop="runPhotoSelectVal">
                                <el-radio-group
                                  v-model="ruleForm.runPhotoSelectVal"
                                >
                                  <el-radio label="1">扫码时拍照</el-radio>
                                  <el-radio label="2">下盖时拍照</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="盖中录制视频"
                            prop="runVideoSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.runVideoSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="5">
                        <el-col :span="8">
                          <el-form-item label="强制定位" prop="runGpsSwitch">
                            <el-switch
                              v-model="ruleForm.runGpsSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="长盖章" prop="runDelaySwitch">
                            <el-switch
                              v-model="ruleForm.runDelaySwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="智感盖章" prop="runSensorSwitch">
                            <el-switch
                              v-model="ruleForm.runSensorSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="labelTitle">文件防篡改</div>
                    <div class="grayBg">
                      <el-form-item
                        label="二维码水印核验"
                        prop="runQrCodeSwitch"
                      >
                        <el-switch
                          v-model="ruleForm.runQrCodeSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </div>
                    <div class="labelTitle">智能防盗盖</div>
                    <div class="grayBg">
                      <el-row :gutter="5">
                        <el-col :span="8">
                          <el-form-item
                            label="一盖一码"
                            prop="runOneCodeSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.runOneCodeSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="移动侦测" prop="runMoveSwitch">
                            <el-switch
                              v-model="ruleForm.runMoveSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="怼章移动侦测"
                            prop="runViolenceMoveSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.runViolenceMoveSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="盖章距离检测"
                            prop="runDistanceSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.runDistanceSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="图片清晰度检测"
                            prop="runDefinitionSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.runDefinitionSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="5">
                        <el-col :span="3">
                          <el-form-item label="人脸检测" prop="runFaceSwitch">
                            <el-switch
                              v-model="ruleForm.runFaceSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col
                          :span="21"
                          v-if="ruleForm.runFaceSwitch === '1'"
                        >
                          <el-row :gutter="5">
                            <el-col :span="12">
                              <el-form-item label="比对时机" prop="runFaceDate">
                                <el-radio-group v-model="ruleForm.runFaceDate">
                                  <el-radio label="1">首次进入比对</el-radio>
                                  <el-radio label="2">每次进入都比对</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item
                                label="人脸比对人"
                                prop="runFaceUser"
                              >
                                <el-radio-group v-model="ruleForm.runFaceUser">
                                  <el-radio label="1">盖章人和代办人</el-radio>
                                  <el-radio label="2">盖章人和保管人</el-radio>
                                </el-radio-group>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </el-col>
                      </el-row>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item timestamp="盖后" placement="top">
                    <el-divider />
                    <div class="labelTitle">基础设置</div>
                    <div class="grayBg">
                      <el-form-item
                        label="盖后自动存档"
                        prop="laterAutoSaveSwitch"
                      >
                        <el-switch
                          v-model="ruleForm.laterAutoSaveSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </div>
                    <div class="labelTitle">文件防篡改</div>
                    <div class="grayBg">
                      <el-form-item
                        label="二维码水印核验"
                        prop="laterQrCodeSwitch"
                      >
                        <el-switch
                          v-model="ruleForm.laterQrCodeSwitch"
                          active-value="1"
                          inactive-value="0"
                        />
                      </el-form-item>
                    </div>
                  </el-timeline-item>
                  <el-timeline-item timestamp="归档" placement="top">
                    <el-divider />
                    <div class="labelTitle">基础设置</div>
                    <div class="grayBg">
                      <el-row :gutter="5">
                        <el-col :span="12">
                          <el-form-item label="归档" prop="archiveSwitch">
                            <el-switch
                              v-model="ruleForm.archiveSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item
                            label="强制归档"
                            prop="archiveRequiredSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.archiveRequiredSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <div class="labelTitle">文件防篡改</div>
                    <div class="grayBg">
                      <el-row :gutter="5">
                        <el-col :span="8">
                          <el-form-item
                            label="二维码水印核验"
                            prop="archiveQrCodeSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.archiveQrCodeSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="归档文件页数校验"
                            prop="archivePageSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.archivePageSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item
                            label="归档后自动OCR校验"
                            prop="archiveOcrSwitch"
                          >
                            <el-switch
                              v-model="ruleForm.archiveOcrSwitch"
                              active-value="1"
                              inactive-value="0"
                            />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </el-tab-pane>
              <el-tab-pane label="普通用印">User</el-tab-pane>
            </el-tabs>
          </el-form>
        </el-scrollbar>
      </div>
      <div class="businessFooter">
        <el-button type="primary" @click.stop="submitBusinessRule"
          >保存</el-button
        >
        <el-button @click.stop="resetForm">重置</el-button>
      </div>
    </componentsLayout>
  </div>
</template>

<script setup>
  import { reactive, ref, onMounted } from 'vue'
  import componentsLayout from '@/views/components/Layout'
  import { fileManageService } from '@/api/frontDesk/fileManage/index'
  const ruleFormRef = ref(null)
  const ruleForm = ref({
    ruleBusinessName: '',
    ruleBusinessNo: '',
    fileTypeIds: [],
    sealUseTypeId: '1',
    railSwitch: '0',
    batchSwitch: '0',
    qrCodeSwitch: '0',
    wordWaterSwitch: '0',
    gridWaterSwitch: '0',
    invisibleWaterMarkSwitch: '0',
    remoteUsers: [],
    videoUsers: [],
    frontFaceSwitch: '0',
    frontFaceSelectVal: '1',
    frontOcrSwitch: '0',
    frontQrCodeSwitch: '0',
    runPhotoSwitch: '0',
    runPhotoSelectVal: '',
    runVideoSwitch: '0',
    runGpsSwitch: '0',
    runDelaySwitch: '0',
    runSensorSwitch: '0',
    runQrCodeSwitch: '0',
    runOneCodeSwitch: '0',
    runMoveSwitch: '0',
    runViolenceMoveSwitch: '0',
    runDistanceSwitch: '0',
    runDefinitionSwitch: '0',
    runFaceSwitch: '0',
    runFaceDate: '1',
    runFaceUser: '1',
    laterAutoSaveSwitch: '0',
    laterQrCodeSwitch: '0',
    archiveSwitch: '0',
    archiveRequiredSwitch: '0',
    archiveQrCodeSwitch: '0',
    archivePageSwitch: '0',
    archiveOcrSwitch: '0'
  })

  const rules = ref({
    ruleBusinessName: [
      {
        required: true,
        message: '请输入业务规则名称',
        trigger: 'change'
      }
    ],
    fileTypeIds: [
      {
        required: true,
        message: '请选择文件类型',
        trigger: 'change'
      }
    ],
    remoteUsers: [
      {
        required: true,
        message: '请选择远程盖章确认人',
        trigger: 'change'
      }
    ],
    videoUsers: [
      {
        required: true,
        message: '请选择视频盖章确认人',
        trigger: 'change'
      }
    ]
  })

  const fileTypeList = ref([])
  const submitBusinessRule = () => {
    ruleFormRef.value.validate(valid => {
      if (valid) {
        console.log(ruleForm.value)
      }
    })
  }

  const resetForm = () => {
    ruleFormRef.value.resetFields()
  }

  const getFileTypeList = () => {
    fileManageService.getFileTypeList().then(res => {
      console.log(res)
      fileTypeList.value = res.data
    })
  }

  onMounted(() => {
    getFileTypeList()
  })
</script>
<style lang="scss" scoped>
  .title {
    font-size: 22px;
    margin: 16px 0;
  }

  .businessFooter {
    width: 100%;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 1px solid rgba($color: #000000, $alpha: 0.06);
  }
  .labelTitle {
    font-size: 14px;
    color: rgba($color: #000000, $alpha: 0.45);
    margin-bottom: 8px;
    margin-top: 18px;
  }

  .grayBg {
    background-color: rgba($color: #000000, $alpha: 0.04);
    padding: 24px 12px 6px;
    margin-top: 8px;
  }
</style>

<style lang="scss">
  .editBusinessRule .ap-deliberate {
    padding: 0 !important;
  }

  .editBusinessRule .el-tabs__content {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 18px;
  }

  .editBusinessRule .el-timeline {
    padding-left: 0;
  }
</style>
