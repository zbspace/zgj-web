<template>
  <div class="components-documentsDetails">
    <div class="ap-box">
      <el-drawer
        v-model="state.drawer.show"
        :with-header="false"
        direction="rtl"
        :size="state.drawer.size"
        @close="clickClose"
      >
        <div class="ap-cont">
          <div class="ap-cont-box ap-title">
            <div class="title-name">
              <span class="title-name-span">详情</span>
            </div>
            <div class="title-cion">
              <img
                class="title-cion-img quanping"
                src="../../assets/svg/quanping.svg"
                alt=""
                @click="ClickOnFullScreen"
                v-if="state.drawer.FullScreenStatus == 0"
              />
              <img
                class="title-cion-img quanping"
                src="../../assets/svg/quanping-close.svg"
                alt=""
                @click="ClickCloseFullScreen"
                v-if="state.drawer.FullScreenStatus == 1"
              />
              <img
                class="title-cion-img shanchu"
                src="../../assets/svg/cha-kong.svg"
                alt=""
                srcset=""
                @click="clickClose"
              />
            </div>
          </div>
          <div class="ap-cont-box ap-Tabs">
            <div class="ap-Tabs-cont">
              <componentsTabs
                :activeName="state.componentsTabs.activeName"
                :data="state.componentsTabs.data"
                @tab-change="tabChange"
              >
              </componentsTabs>
            </div>
            <div class="ap-Tabs-sub">
              <img
                class="ap-Tabs-sub-icon"
                src="../../assets/svg/dayin.svg"
                alt=""
              />
              <span class="ap-Tabs-sub-text">打印</span>
            </div>
          </div>
          <div class="ap-cont-tabsCont">
            <el-scrollbar style="height: 100%; overflow: auto">
              <div class="scrollbar-div">
                <!-- 用印详情 -->
                <div
                  class="Details-of-Printing"
                  v-if="
                    state.componentsTabs.activeName == 'Details-of-Printing'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.DetailsaOfPrinting.basicInformation
                                .data
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box sealDetails-accessory">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">附件</div>
                      </template>
                      <template #subTitle>
                        <div class="ap-cont-box-title-xiazai">
                          <img
                            class="ap-cont-box-title-xiazai-icon"
                            src="../../assets/svg/xiazai.svg"
                            alt=""
                          />
                          <span class="ap-cont-box-title-xiazai-text"
                            >打包下载</span
                          >
                        </div>
                      </template>
                      <template #content>
                        <div class="sealDetails-accessory-list">
                          <documentsDetailsAccessory
                            :printedData="
                              state.cache.DetailsaOfPrinting.accessory
                                .printedData
                            "
                            :additionalData="
                              state.cache.DetailsaOfPrinting.accessory
                                .additionalData
                            "
                          >
                          </documentsDetailsAccessory>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div
                    class="ap-cont-box sealDetails-Document-verification-before-closing"
                  >
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">盖前文件核验</div>
                      </template>
                      <template #subTitle>
                        <div class="ap-cont-box-title-xiazai">
                          <img
                            class="ap-cont-box-title-xiazai-icon"
                            src="../../assets/svg/xiazai.svg"
                            alt=""
                          />
                          <span class="ap-cont-box-title-xiazai-text"
                            >打包下载</span
                          >
                        </div>
                      </template>
                      <template #content>
                        <div class="sealDetails-accessory-list">
                          <componentsFileverification
                            :data="
                              state.cache.DetailsaOfPrinting.fileocrInformation
                                .data
                            "
                          />
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box sealDetails-Intelligent-printing">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">智能用印</div>
                      </template>
                      <template #subTitle>
                        <div class="ap-cont-box-title-xiazai">
                          <img
                            class="ap-cont-box-title-xiazai-icon"
                            src="../../assets/svg/xiazai.svg"
                            alt=""
                          />
                          <span class="ap-cont-box-title-xiazai-text"
                            >打包下载</span
                          >
                        </div>
                      </template>
                      <template #content>
                        <div class="sealDetails-accessory-list">
                          <documentsDetailsIntelligentPrinting
                            :more="
                              state.cache.DetailsaOfPrinting.IntelligentPrinting
                                .more
                            "
                            :data="
                              state.cache.DetailsaOfPrinting.IntelligentPrinting
                                .data
                            "
                          >
                          </documentsDetailsIntelligentPrinting>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box sealDetails-file-document">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">文件归档</div>
                      </template>
                      <template #subTitle>
                        <div class="ap-cont-box-title-xiazai">
                          <img
                            class="ap-cont-box-title-xiazai-icon"
                            src="../../assets/svg/xiazai.svg"
                            alt=""
                          />
                          <span class="ap-cont-box-title-xiazai-text"
                            >打包下载</span
                          >
                        </div>
                      </template>
                      <template #content>
                        <div class="sealDetails-accessory-list">
                          <componentsArchive
                            :data="
                              state.cache.DetailsaOfPrinting.archiveInformation
                                .data
                            "
                          />
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box sealDetails-electronic-seal">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">电子签章</div>
                      </template>
                      <template #subTitle>
                        <div class="ap-cont-box-title-xiazai">
                          <img
                            class="ap-cont-box-title-xiazai-icon"
                            src="../../assets/svg/xiazai.svg"
                            alt=""
                          />
                          <span class="ap-cont-box-title-xiazai-text"
                            >打包下载</span
                          >
                        </div>
                      </template>
                      <template #content>
                        <div class="sealDetails-accessory-list">
                          <documentsDetailSdigitalSeal
                            :signatoryData="
                              state.cache.DetailsaOfPrinting.sdigitalSeal
                                .signatoryData
                            "
                            :signatoryFileData="
                              state.cache.DetailsaOfPrinting.sdigitalSeal
                                .signatoryFileData
                            "
                            :alreadySignatoryFileData="
                              state.cache.DetailsaOfPrinting.sdigitalSeal
                                .alreadySignatoryFileData
                            "
                          >
                          </documentsDetailSdigitalSeal>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 审批流程 -->
                <div
                  class="approval-process"
                  v-else-if="
                    state.componentsTabs.activeName == 'approval-process'
                  "
                >
                  <componentsApprovalSteps
                    :data="state.cache.approvalProcess.data"
                  >
                  </componentsApprovalSteps>
                </div>
                <!-- 领用记录 -->
                <div
                  class="Record-of-requisition"
                  v-else-if="
                    state.componentsTabs.activeName == 'Record-of-requisition'
                  "
                >
                  <div class="ap-cont-ma">
                    <span class="ap-cont-ma-text">授权码：</span>
                    <span class="ap-cont-ma-value">228977</span>
                  </div>
                  <div class="ap-cont-box">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">印章信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsSealInformation
                            :data="
                              state.cache.RecordOfRequisition.SealInformation
                                .data
                            "
                            :imageData="
                              state.cache.RecordOfRequisition.SealInformation
                                .imageData
                            "
                          >
                          </documentsDetailsSealInformation>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 操作记录 -->
                <div
                  class="operating-record"
                  v-else-if="
                    state.componentsTabs.activeName == 'operating-record'
                  "
                >
                  <componentsTable
                    :data="state.cache.operatingRecord.data"
                    :header="state.cache.operatingRecord.header"
                    :defaultAttribute="
                      state.cache.operatingRecord.defaultAttribute
                    "
                  >
                  </componentsTable>
                </div>
                <!-- 保管记录 -->
                <div
                  class="Record-of-custody"
                  v-else-if="
                    state.componentsTabs.activeName == 'Record-of-custody'
                  "
                >
                  <componentsTable
                    :data="state.cache.RecordOfCustody.data"
                    :header="state.cache.RecordOfCustody.header"
                    :defaultAttribute="
                      state.cache.RecordOfCustody.defaultAttribute
                    "
                  >
                  </componentsTable>
                </div>
                <!-- 印章详情 -->
                <div
                  class="Particulars-of-Seal"
                  v-else-if="
                    state.componentsTabs.activeName == 'Particulars-of-Seal'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.ParticularsOfSeal.basicInformation
                                .data
                            "
                            :labelStyle="
                              state.cache.ParticularsOfSeal.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box accessory">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">附件</div>
                      </template>
                      <template #subTitle>
                        <div class="ap-cont-box-title-xiazai">
                          <img
                            class="ap-cont-box-title-xiazai-icon"
                            src="../../assets/svg/xiazai.svg"
                            alt=""
                          />
                          <span class="ap-cont-box-title-xiazai-text"
                            >打包下载</span
                          >
                        </div>
                      </template>
                      <template #content>
                        <div class="sealDetails-accessory-list">
                          <documentsDetailsAccessory
                            :printedData="
                              state.cache.DetailsaOfPrinting.accessory
                                .printedData
                            "
                            :additionalData="
                              state.cache.DetailsaOfPrinting.accessory
                                .additionalData
                            "
                          >
                          </documentsDetailsAccessory>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 印章申请详情 -->
                <div
                  class="Seal-Application-Details"
                  v-if="
                    state.componentsTabs.activeName ==
                    'Seal-Application-Details'
                  "
                >
                  <div class="ap-cont-box">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.SealApplicationDetails
                                .basicInformation.data
                            "
                            :labelStyle="
                              state.cache.SealApplicationDetails
                                .basicInformation.labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">印章信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.SealApplicationDetails.SealInformation
                                .data
                            "
                            :labelStyle="
                              state.cache.SealApplicationDetails.SealInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">办理信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.SealApplicationDetails
                                .ManagementInformation.data
                            "
                            :labelStyle="
                              state.cache.SealApplicationDetails
                                .ManagementInformation.labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 文件详情 -->
                <div
                  class="Details-of-Document"
                  v-else-if="
                    state.componentsTabs.activeName == 'Details-of-Document'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <div class="ap-cont-box-title">
                      <span class="ap-cont-box-title-label">基本信息</span>
                      <div class="ap-cont-box-title-but">
                        <el-button type="primary" size="small">
                          <div class="ap-cont-box-title-but-box">
                            <img
                              class="ap-cont-box-title-but-icon"
                              src="../../assets/svg/yanjing.svg"
                              alt=""
                            />
                            <span>文件预览</span>
                          </div>
                        </el-button>
                      </div>
                    </div>
                    <div
                      class="ap-cont-box-details sealDetails-basic-information-details"
                    >
                      <div
                        class="sealDetails-basic-information-list"
                        v-for="(item, num) in state.cache.DetailsOfDocument
                          .basicInformation.data"
                        :key="num"
                      >
                        <div class="sealDetails-basic-information-list-label"
                          >{{ item.label }}：
                        </div>
                        <div
                          class="sealDetails-basic-information-list-value"
                          :style="item.style"
                        >
                          <img
                            class="sealDetails-basic-information-list-value-icon"
                            :src="item.iconPath"
                            :style="item.iconStyle"
                            alt=""
                            v-if="item.iconPath"
                          />
                          {{ item.value }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 工作台详情 -->
                <div
                  class="Workbench-Details"
                  v-else-if="
                    state.componentsTabs.activeName == 'Workbench-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.WorkbenchDetails.basicInformation.data
                            "
                            :labelStyle="
                              state.cache.WorkbenchDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">配置</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.WorkbenchDetails.configuration.data
                            "
                            :labelStyle="
                              state.cache.WorkbenchDetails.configuration
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 智能印章盒详情 -->
                <div
                  class="SmartSeal-Box-Detail"
                  v-else-if="
                    state.componentsTabs.activeName == 'SmartSeal-Box-Detail'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.SmartSealBoxDetails.basicInformation
                                .data
                            "
                            :labelStyle="
                              state.cache.SmartSealBoxDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">配置</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.SmartSealBoxDetails.configuration.data
                            "
                            :labelStyle="
                              state.cache.SmartSealBoxDetails.configuration
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 智能印章柜详情 -->
                <div
                  class="SmartSeal-Cabinet-Details"
                  v-else-if="
                    state.componentsTabs.activeName ==
                    'SmartSeal-Cabinet-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.SmartSealCabinetDetails
                                .basicInformation.data
                            "
                            :labelStyle="
                              state.cache.SmartSealCabinetDetails
                                .basicInformation.labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 转办申请详情 -->
                <div
                  class="transfer-Application-Details"
                  v-else-if="
                    state.componentsTabs.activeName ==
                    'transfer-Application-Details'
                  "
                >
                </div>
                <!-- 重置申请详情 -->
                <div
                  class="Reset-Application-Details"
                  v-else-if="
                    state.componentsTabs.activeName ==
                    'Reset-Application-Details'
                  "
                >
                </div>
                <!-- 流程详情 -->
                <div
                  class="Process-Details"
                  v-else-if="
                    state.componentsTabs.activeName == 'Process-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.ProcessDetails.basicInformation.data
                            "
                            :labelStyle="
                              state.cache.ProcessDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 流程版本 -->
                <div
                  class="Process-Version"
                  v-else-if="
                    state.componentsTabs.activeName == 'Process-Version'
                  "
                >
                  <componentsTable
                    :defaultAttribute="
                      state.cache.ProcessVersion.defaultAttribute
                    "
                    :data="state.cache.ProcessVersion.data"
                    :header="state.cache.ProcessVersion.header"
                  >
                  </componentsTable>
                </div>
                <!-- 表单详情 -->
                <div
                  class="Form-Details"
                  v-else-if="state.componentsTabs.activeName == 'Form-Details'"
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.FormDetails.basicInformation.data
                            "
                            :labelStyle="
                              state.cache.FormDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>

                <!-- 业务规则详情 -->
                <div
                  class="Business-Rule-Details"
                  v-else-if="
                    state.componentsTabs.activeName == 'Business-Rule-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.BusinessRuleDetails.basicInformation
                                .data
                            "
                            :labelStyle="
                              state.cache.BusinessRuleDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 通知事件详情 -->
                <div
                  class="Notification-Event-Details"
                  v-else-if="
                    state.componentsTabs.activeName ==
                    'Notification-Event-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.NotificationEventDetails
                                .basicInformation.data
                            "
                            :labelStyle="
                              state.cache.NotificationEventDetails
                                .basicInformation.labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 模板详情 -->
                <div
                  class="Template-Details"
                  v-else-if="
                    state.componentsTabs.activeName == 'Template-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.TemplateDetails.basicInformation.data
                            "
                            :labelStyle="
                              state.cache.TemplateDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 往来企业详情 -->
                <div
                  class="Current-Business-Details"
                  v-else-if="
                    state.componentsTabs.activeName ==
                    'Current-Business-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.CurrentBusinessDetails
                                .basicInformation.data
                            "
                            :labelStyle="
                              state.cache.CurrentBusinessDetails
                                .basicInformation.labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 单位与部门详情 -->
                <div
                  class="Unit-Department-Details"
                  v-else-if="
                    state.componentsTabs.activeName == 'Unit-Department-Details'
                  "
                >
                  <div class="ap-cont-box sealDetails-basic-information">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsInformationList
                            :data="
                              state.cache.UnitDepartmentDetails.basicInformation
                                .data
                            "
                            :labelStyle="
                              state.cache.UnitDepartmentDetails.basicInformation
                                .labelStyle
                            "
                          >
                          </documentsDetailsInformationList>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
                <!-- 组织人员 -->
                <div
                  class="organization-Person"
                  v-else-if="
                    state.componentsTabs.activeName == 'organization-Person'
                  "
                >
                  <componentsTable
                    :defaultAttribute="
                      state.cache.organizationPerson.defaultAttribute
                    "
                    :data="state.cache.organizationPerson.data"
                    :header="state.cache.organizationPerson.header"
                  >
                  </componentsTable>
                </div>
                <!-- 员工详情 -->
                <div
                  class="Staff-Details"
                  v-else-if="state.componentsTabs.activeName == 'Staff-Details'"
                >
                  <div class="ap-cont-box">
                    <documentsDetailsPortion>
                      <template #title>
                        <div class="ap-cont-box-title-label">基本信息</div>
                      </template>
                      <template #content>
                        <div>
                          <documentsDetailsStaffDetails
                            :data="
                              state.cache.StaffDetails.basicInformation.data
                            "
                          >
                          </documentsDetailsStaffDetails>
                        </div>
                      </template>
                    </documentsDetailsPortion>
                  </div>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onBeforeMount, onMounted, watch } from 'vue'
  import componentsTabs from './tabs.vue'
  import componentsTable from './table'
  import componentsApprovalSteps from './approvalSteps'
  import documentsDetailsPortion from './documentsDetails/portion.vue'
  import documentsDetailsInformationList from './documentsDetails/informationList.vue'
  import documentsDetailsAccessory from './documentsDetails/accessory.vue'
  import documentsDetailsIntelligentPrinting from './documentsDetails/IntelligentPrinting.vue'
  import documentsDetailsStaffDetails from './documentsDetails/Staff-Details.vue'
  import documentsDetailSdigitalSeal from './documentsDetails/digital-seal.vue'
  import componentsArchive from './documentsDetails/Archive.vue'
  import componentsFileverification from './documentsDetails/Fileverification.vue'
  import documentsDetailsSealInformation from './documentsDetails/Record-of-requisition/Seal-Information.vue'

  import riliXingzhuangSvg from '@/assets/svg/rili-xingzhuang.svg'
  import liuchengChaosongSvg from '@/assets/svg/liucheng-chaosong.svg'
  import yuanLvSvg from '@/assets/svg/yuan-lv.svg'
  import renlianIconSvg from '@/assets/svg/renlian-icon.svg'
  import liuchengDengdaiSvg from '@/assets/svg/liucheng-dengdai.svg'
  import liuchengFaqishenqingSvg from '@/assets/svg/liucheng-faqishenqing.svg'
  import liuchengBohuiSvg from '@/assets/svg/liucheng-bohui.svg'
  import liuchengShenpiSvg from '@/assets/svg/liucheng-shenpi.svg'
  import liuchengTongyiSvg from '@/assets/svg/liucheng-tongyi.svg'
  import liuchengJujueSvg from '@/assets/svg/liucheng-jujue.svg'
  import liuchengWanchengSvg from '@/assets/svg/liucheng-wancheng.svg'
  import yuanHuiSvg from '@/assets/svg/yuan-hui.svg'
  import UploadBackgroundSvg from '@/assets/svg/Upload__background.svg'
  import gaizhangIcon from '@/assets/svg/gaizhang-icon.svg'
  import renlianTupian from '@/assets/svg/renlian-tupian.svg'
  import jinggao from '@/assets/svg/jinggao.svg'

  const props = defineProps({
    // 标识
    refs: {
      type: String,
      default: ''
    },
    // 处理类型
    type: {
      type: String,
      default: '0'
    },
    // v-model
    modelValue: {
      type: Boolean,
      default: false
    },
    // 展示权限
    visible: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 默认显示
    activeName: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    // 数据
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  })
  // console.log('--->', props)
  const emit = defineEmits(['clickClose', 'update:modelValue'])
  const state = reactive({
    cache: {
      // 用印详情
      DetailsaOfPrinting: {
        basicInformation: {
          title: '基本信息',
          show: true,
          data: [
            {
              label: '文件名称',
              value: '上海建筑材料清单合同明细'
            },
            {
              label: '单据编码',
              value: '229987657667888'
            },
            {
              label: '文件类型',
              value: '合同清单'
            },
            {
              label: '文件份数',
              value: '1份'
            },
            {
              label: '金额',
              value: '11088.00'
            },
            {
              label: '申请事由',
              value: '20次'
            },
            {
              label: '印章名称',
              value: '销售合同'
            },
            {
              label: '常规盖章',
              value: '20次'
            },
            {
              label: '盖章码',
              value: '554778'
            },
            {
              label: '申请人员',
              value: '20次'
            },
            {
              label: '申请时间',
              value: '2022-2-12 12:44:58'
            },
            {
              label: '所属部门',
              value: '技术部'
            },
            {
              label: '单据状态',
              value: '智能用印中',
              iconPath: yuanLvSvg,
              iconStyle: {},
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            }
          ]
        },
        accessory: {
          title: '附件',
          show: true,
          // 用印文件
          printedData: [
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            },
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            }
          ],
          // 补充文件
          additionalData: [
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            },
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            }
          ]
        },
        IntelligentPrinting: {
          title: '基本信息',
          show: true,
          more: true,
          data: [
            {
              sealName: '详情内容详情内容详情内容详情内容',
              personName: '详情内容详情内容详情内容详情内容',
              time: '2022-11-30  16:00:00',
              adress: '详情内容详情内容详情内容详情内容',
              imageNum: 8,
              imageData: [
                {
                  personName: '马丽丽',
                  time: '14:09',
                  imgPath: UploadBackgroundSvg,
                  iconPath: gaizhangIcon
                },
                {
                  personName: '马丽丽',
                  time: '14:09',
                  imgPath: UploadBackgroundSvg,
                  iconPath: gaizhangIcon
                },
                {
                  personName: '马丽丽',
                  time: '14:09',
                  imgPath: UploadBackgroundSvg,
                  iconPath: gaizhangIcon
                },
                {
                  personName: '马丽丽',
                  time: '14:09',
                  imgPath: UploadBackgroundSvg,
                  iconPath: gaizhangIcon
                },
                {
                  personName: '马丽丽',
                  time: '14:09',
                  imgPath: UploadBackgroundSvg,
                  iconPath: gaizhangIcon
                },
                {
                  personName: '马丽丽',
                  time: '14:09',
                  imgPath: UploadBackgroundSvg,
                  iconPath: gaizhangIcon
                }
              ]
            }
          ]
        },
        archiveInformation: {
          title: '文件归档',
          show: true,
          data: {
            currentResult: [
              // 重置后列表
              {
                1: '马丽丽',
                2: '2022-12-13 11:40:50',
                3: '15',
                4: '上海市静安区江场路1228号',
                5: '高架招投标合同20220014.pdf',
                6: '5',
                7: true,
                8: '2',
                9: '3',
                10: '2'
              },
              {
                1: '马丽丽',
                2: '2022-12-13 11:40:50',
                3: '15',
                4: '上海市静安区',
                5: '高架招投标合同20220014.pdf'
              }
            ],
            historyResult: [
              {
                1: '马丽丽',
                2: '2022-12-13 11:40:50',
                3: '15',
                4: '上海市静安区',
                5: '高架招投标合同20220014.pdf'
              },
              {
                1: '马丽丽',
                2: '2022-12-13 11:40:50',
                3: '15',
                4: '上海市静安区',
                5: '高架招投标合同20220014.pdf'
              }
            ] // 重置前列表
          }
        },
        fileocrInformation: {
          title: '文件核验',
          show: true,
          data: {
            successResult: [
              // 核验通过
              {
                1: '高架招投标合同20220014',
                2: '无差异点',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              },
              {
                1: '高架招投标合同20220014',
                2: '无差异点',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              }
            ],
            errorResult: [
              // 核验异常
              {
                1: '高架招投标合同20220014',
                2: '有异常',
                3: '15',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              },
              {
                1: '高架招投标合同20220014',
                2: '无核验结果',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              }
            ],
            normalResult: [
              // 未核验
              {
                1: '高架招投标合同20220014',
                2: '未核验',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              },
              {
                1: '高架招投标合同20220014',
                2: '无核验结果',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              }
            ],
            historyResult: [
              // 历史文件核验列表
              {
                1: '高架招投标合同20220014',
                2: '无差异点',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              },
              {
                1: '高架招投标合同20220014',
                2: '有异常',
                3: '15',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              },
              {
                1: '高架招投标合同20220014',
                2: '无核验结果',
                3: '0',
                4: '马丽丽',
                5: '2022-02-12 12:44:58'
              }
            ]
          }
        },
        sdigitalSeal: {
          signatoryData: {
            header: [
              {
                prop: '0',
                label: '签署顺序'
              },
              {
                prop: '1',
                label: '签署方代表'
              },
              {
                prop: '2',
                label: '签署人'
              },
              {
                prop: '3',
                label: '签署人账号'
              },
              {
                prop: '4',
                label: '签署人主体信息'
              },
              {
                prop: '5',
                label: '使用印章'
              },
              {
                prop: '6',
                label: '签署时间'
              }
            ],
            data: [
              {
                0: 1,
                1: '个人',
                2: '吴彦琛',
                3: '137 8651 5262',
                4: '内容',
                5: '吴彦琛',
                6: '待签署'
              },
              {
                0: 2,
                1: '企业',
                2: '冯启彬',
                3: '132 9399 2217',
                4: '内容',
                5: '冯启彬',
                6: '待签署'
              },
              {
                0: 3,
                1: '个人',
                2: '钱若霖',
                3: '189 2860 9388',
                4: '内容',
                5: '钱若霖',
                6: '待签署'
              },
              {
                0: 4,
                1: '个人',
                2: '郑盈盈',
                3: '155 5866 1691',
                4: '内容',
                5: '郑盈盈',
                6: '待签署'
              },
              {
                0: 5,
                1: '企业',
                2: '李琳颖',
                3: '158 5666 9874',
                4: '内容',
                5: '李琳颖',
                6: '待签署'
              }
            ],
            // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
            defaultAttribute: {
              border: false,
              'header-cell-style': ({ row, column, rowIndex, columnIndex }) => {
                // console.log({ row, column, rowIndex, columnIndex });
                return {
                  background: 'var(--jy-color-fill--1)'
                }
              }
            }
          },
          signatoryFileData: [
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            },
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            }
          ],
          alreadySignatoryFileData: [
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            },
            {
              name: '文件名称文件名称文件名称文件名称文件名称文件名称.pdf',
              size: '1.4M'
            }
          ]
        }
      },
      // 审批流程
      approvalProcess: {
        data: [
          {
            iconPath: liuchengFaqishenqingSvg,
            title: '发起申请',
            time: '2022-10-11 02:23:00',
            statusIconPath: liuchengBohuiSvg,
            personList: [
              {
                name: '青青'
              }
            ]
          },
          {
            iconPath: liuchengChaosongSvg,
            title: '抄送',
            subTitle: '（已抄送）',
            time: '2022-10-11 02:23:00',
            personList: [
              {
                name: '王丹'
              },
              {
                name: '王丹'
              },
              {
                name: '王丹'
              },
              {
                name: '王丹'
              },
              {
                name: '王丹'
              }
            ]
          },
          {
            iconPath: liuchengShenpiSvg,
            title: '审批',
            subTitle: '（已驳回）',
            type: 'flowing',
            personList: [
              {
                name: '马丽丽',
                time: '2022-10-11 02:23:00',
                iconPath: liuchengTongyiSvg
              },
              {
                name: '王青青',
                time: '2022-10-11 02:23:00',
                iconPath: liuchengJujueSvg,
                desc: '拒绝理由说明'
              },
              {
                name: '陈暮时',
                iconPath: liuchengDengdaiSvg,
                status: '1'
              }
            ]
          },
          {
            iconPath: liuchengWanchengSvg,
            title: '完成'
          }
        ]
      },
      // 操作记录
      operatingRecord: {
        header: [
          {
            prop: '0',
            label: '序号'
          },
          {
            prop: '1',
            label: '操作人',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '2',
            label: '操作时间',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '3',
            label: '操作记录',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '4',
            label: '操作说明',
            sortable: true,
            'min-width': 150
          }
        ],
        data: [
          {
            0: 1,
            1: '周俊毅',
            2: '2022-11-12 19:00:12',
            3: '新增用印申请',
            4: '新增用印申请：用印申请-客户问题验证'
          },
          {
            0: 2,
            1: '王凡玄',
            2: '2022-11-12 19:00:12',
            3: '用印申请',
            4: '发起申请'
          },
          {
            0: 3,
            1: '李豫卓',
            2: '2022-11-12 19:00:12',
            3: '审批',
            4: '授权码自动失效，相关印章：[智]Kevin_预发测试2【简称_9290_2.3.1】'
          },
          {
            0: 4,
            1: '孙思达',
            2: '2022-11-12 19:00:12',
            3: '文件归档',
            4: '同意'
          },
          {
            0: 5,
            1: '李梓发',
            2: '2022-11-12 19:00:12',
            3: '文件归档',
            4: '同意'
          }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          border: true,
          'header-cell-style': ({ row, column, rowIndex, columnIndex }) => {
            // console.log({ row, column, rowIndex, columnIndex });
            return {
              background: 'var(--jy-color-fill--1)'
            }
          }
        }
      },
      // 领用记录
      RecordOfRequisition: {
        SealInformation: {
          data: [
            {
              iconPath: riliXingzhuangSvg,
              label: '印章名称',
              value: 'Kevin_预发_57420F【简称_9290_2.3.1】',
              subStyle: {
                color: 'var(--jy-info-6)'
              },
              subText: '查看在柜状态'
            },
            {
              iconPath: riliXingzhuangSvg,
              label: '绑定设备',
              value: '9290_2.3.1'
            },
            {
              iconPath: riliXingzhuangSvg,
              label: '绑定格口',
              value: '印章柜_2L_SY/A-1-1'
            },
            {
              iconPath: riliXingzhuangSvg,
              label: '领用状态',
              value: '已失效',
              iconPathValue: yuanHuiSvg,
              style: {
                color: 'var(--jy-color-text-3)'
              }
            }
          ],
          imageData: {
            label: '领用影像',
            iconPath: riliXingzhuangSvg,
            data: [
              {
                imgPath: UploadBackgroundSvg,
                iconPath: renlianIconSvg,
                time: '12-11 14:09',
                list: [
                  {
                    label: '开锁类型',
                    value: '领取印章'
                  },
                  {
                    label: '开锁时间',
                    value: '2022-12-01 20:17:54  '
                  },
                  {
                    label: '关门类型',
                    value: '2022-12-02 20:17:54  '
                  },
                  {
                    label: '取出',
                    value: '【智】测试章'
                  },
                  {
                    label: '放入',
                    value: '无'
                  }
                ]
              },
              {
                imgPath: UploadBackgroundSvg,
                iconPath: renlianIconSvg,
                time: '12-11 14:09',
                list: [
                  {
                    label: '开锁类型',
                    value: '领取印章'
                  },
                  {
                    label: '开锁时间',
                    value: '2022-12-01 20:17:54  '
                  },
                  {
                    label: '关门类型',
                    value: '2022-12-02 20:17:54  '
                  },
                  {
                    label: '取出',
                    value: '【智】测试章'
                  },
                  {
                    label: '放入',
                    value: '无'
                  }
                ]
              },
              {
                imgPath: UploadBackgroundSvg,
                iconPath: renlianIconSvg,
                time: '12-11 14:09',
                list: [
                  {
                    label: '开锁类型',
                    value: '领取印章',
                    subValue: '疑似异常',
                    subValueIconPath: jinggao
                  },
                  {
                    label: '开锁时间',
                    value: '2022-12-01 20:17:54  '
                  },
                  {
                    label: '关门类型',
                    value: '2022-12-02 20:17:54  '
                  },
                  {
                    label: '取出',
                    value: '【智】测试章'
                  },
                  {
                    label: '放入',
                    value: '无'
                  }
                ]
              },
              {
                imgPath: UploadBackgroundSvg,
                iconPath: renlianIconSvg,
                time: '12-11 14:09',
                list: [
                  {
                    label: '开锁类型',
                    value: '领取印章'
                  },
                  {
                    label: '开锁时间',
                    value: '2022-12-01 20:17:54  '
                  },
                  {
                    label: '关门类型',
                    value: '2022-12-02 20:17:54  '
                  },
                  {
                    label: '取出',
                    value: '【智】测试章'
                  },
                  {
                    label: '放入',
                    value: '无'
                  }
                ]
              }
            ]
          }
        }
      },
      // 保管记录
      RecordOfCustody: {
        header: [
          {
            prop: '0',
            label: '序号'
          },
          {
            prop: '1',
            label: '保管人',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '3',
            label: '保管部门',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '2',
            label: '保管时间',
            sortable: true,
            'min-width': 150
          }
        ],
        data: [
          {
            0: 1,
            1: '周俊毅',
            2: '2022-12-04 11:55:12 - 2022-12-04 11:55:12',
            3: '研发部'
          },
          {
            0: 2,
            1: '王凡玄',
            2: '2022-12-04 11:55:12 - 2022-12-04 11:55:12',
            3: '开发部'
          },
          {
            0: 3,
            1: '李豫卓',
            2: '2022-12-04 11:55:12 - 2022-12-04 11:55:12',
            3: '销售部'
          },
          {
            0: 4,
            1: '孙思达',
            2: '2022-12-04 11:55:12 - 2022-12-04 11:55:12',
            3: '财务部'
          },
          {
            0: 5,
            1: '李梓发',
            2: '2022-12-04 11:55:12 - 2022-12-04 11:55:12',
            3: '财务部'
          }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          border: true,
          'header-cell-style': ({ row, column, rowIndex, columnIndex }) => {
            // console.log({ row, column, rowIndex, columnIndex });
            return {
              background: 'var(--jy-color-fill--1)'
            }
          }
        }
      },
      // 印章详情
      ParticularsOfSeal: {
        basicInformation: {
          title: '基本信息',
          show: true,
          data: [
            {
              label: '印章全称',
              value: '上海合同销售印章全称'
            },
            {
              label: '印章简称',
              value: '合同销售'
            },
            {
              label: '印章编码',
              value: '229987657667888'
            },
            {
              label: '印章类型',
              value: '合同章'
            },
            {
              label: '印章状态',
              value: '状态',
              iconPath: yuanLvSvg,
              iconStyle: {},
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '印模',
              value: '查看',
              valStyle: {
                color: 'var(--jy-info-7)'
              }
            },
            {
              label: '保管人',
              value: '楚基'
            },
            {
              label: '保管部门',
              value: '建业科技'
            },
            {
              label: '创建时间',
              value: '2022-11-12 19:00:12'
            },
            {
              label: '更新时间',
              value: '2022-11-12 19:00:12'
            },
            {
              label: '制度链接：',
              value: '-',

              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '备注',
              value: '-',

              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '印章维护范围',
              value: '-',

              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '印章使用范围',
              value: '-',

              lineStyle: {
                width: '100%'
              }
            }
          ],
          labelStyle: {
            width: '8rem'
          }
        }
      },
      // 文件详情
      DetailsOfDocument: {
        basicInformation: {
          title: '基本信息',
          show: true,
          data: [
            {
              label: '文件名称',
              value: '字段名称'
            },
            {
              label: '文件字号',
              value: '字段名称'
            },
            {
              label: '文件类型',
              value: '字段名称'
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '创建部门',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '来源类型',
              value: '字段名称'
            },
            {
              label: '关联单据名称',
              value: '字段名称'
            }
          ]
        }
      },
      // 印章申请详情
      SealApplicationDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '单据类型',
              value: '上海建筑材料清单合同明细'
            },
            {
              label: '单据编码',
              value: '229987657667888'
            },
            {
              label: '申请人',
              value: '马丽丽'
            },
            {
              label: '原保管人',
              value: '研发部'
            },
            {
              label: '申请时间',
              value: '2022-11-12  12:22:12'
            },
            {
              label: '原保管部门',
              value: '研发部'
            },
            {
              label: '申请保管人',
              value: '王丹丹'
            },
            {
              label: '申请保管部门',
              value: '-'
            },
            {
              label: '申请事由',
              value: '-',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '备注',
              value: '销售合同',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        },
        SealInformation: {
          title: '印章信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '印章全称',
              value: '上海建筑材料清单合同章'
            },
            {
              label: '印章编码',
              value: '229987657667888'
            },
            {
              label: '印章简称',
              value: '合同章'
            },
            {
              label: '印章状态',
              value: '状态',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '印章类型',
              value: '公章'
            }
          ]
        },
        ManagementInformation: {
          title: '办理信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '办理人',
              value: '成效'
            },
            {
              label: '办理时间',
              value: '2022-11-12  12:22:12'
            },
            {
              label: '办理备注',
              value: '-'
            }
          ]
        }
      },
      // 工作台详情
      WorkbenchDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '工作台名称',
              value: '字段名称'
            },
            {
              label: '工作台编码',
              value: '229987657667888'
            },
            {
              label: '设备串号',
              value: '字段名称'
            },
            {
              label: '设备状态',
              value: '启用',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '保管人',
              value: '字段名称'
            },
            {
              label: '保管部门',
              value: '字段名称'
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '软件版本号',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '固件版本号',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '备注',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        },
        configuration: {
          title: '配置',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '盖章码盖章',
              value: '开'
            },
            {
              label: '人脸快捷盖章',
              value: '开'
            },
            {
              label: '语音交互',
              value: '开'
            },
            {
              label: '红外电子围栏',
              value: '开'
            },
            {
              label: '人脸识别登录',
              value: '开'
            },
            {
              label: '自动锁屏',
              value: '开'
            }
          ]
        }
      },
      // 智能印章盒详情
      SmartSealBoxDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '智能印章盒名称',
              value: '字段名称'
            },
            {
              label: '智能印章盒编码',
              value: '229987657667888'
            },
            {
              label: '设备串号',
              value: '字段名称'
            },
            {
              label: '设备状态',
              value: '启用',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '保管人',
              value: '字段名称'
            },
            {
              label: '保管部门',
              value: '字段名称'
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '软件版本号',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '备注',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        },
        configuration: {
          title: '配置',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '盖章码盖章',
              value: '开'
            },
            {
              label: '人脸快捷盖章',
              value: '开'
            },
            {
              label: '语音交互',
              value: '开'
            },
            {
              label: '红外电子围栏',
              value: '开'
            },
            {
              label: '人脸识别登录',
              value: '开'
            },
            {
              label: '自动锁屏',
              value: '开'
            },
            {
              label: '休眠',
              value: '开',
              subValue: '静默3分钟后休眠',
              subValueStyle: {
                color: 'var(--jy-color-text-3)',
                fontSize: 'var(--jy-font-size-caption)'
              }
            }
          ]
        }
      },
      // 智能印章柜详情
      SmartSealCabinetDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '智能印章柜名称',
              value: '字段名称'
            },
            {
              label: '智能印章柜编码',
              value: '229987657667888'
            },
            {
              label: '设备串号',
              value: '字段名称'
            },
            {
              label: '设备状态',
              value: '启用',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '保管人',
              value: '字段名称'
            },
            {
              label: '保管部门',
              value: '字段名称'
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '软件版本号',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '备注',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 转办申请详情
      transferApplicationDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            // width: "8rem",
          },
          data: [
            {
              label: '发起人',
              value: '字段名称'
            },
            {
              label: '所在部门',
              value: '字段名称'
            },
            {
              label: '代办人',
              value: '字段名称'
            },
            {
              label: '所在部门',
              value: '字段名称'
            },
            {
              label: '发起时间',
              value: '字段名称'
            },
            {
              label: '转办说明',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 重置申请详情
      ResetApplicationDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            // width: "8rem",
          },
          data: [
            {
              label: '发起人',
              value: '字段名称'
            },
            {
              label: '所在部门',
              value: '字段名称'
            },
            {
              label: '发起时间',
              value: '字段名称'
            },
            {
              label: '重置理由',
              value: '字段名称'
            },
            {
              label: '重置状态',
              value: '状态字段',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '重置抄送人',
              value: '字段名称'
            },
            {
              label: '重置印章名称',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '重置前剩余盖章次数',
              value: '字段名称'
            },
            {
              label: '重置后剩余盖章次数',
              value: '字段名称'
            },
            {
              label: '重置印章名称',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '重置前剩余盖章次数',
              value: '字段名称'
            },
            {
              label: '重置后剩余盖章次数',
              value: '字段名称'
            }
          ]
        }
      },
      // 流程详情
      ProcessDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '7rem'
          },
          data: [
            {
              label: '流程名称',
              value: '字段名称'
            },
            {
              label: '流程编码',
              value: '字段名称'
            },
            {
              label: '业务类型',
              value: '字段名称'
            },
            {
              label: '文件类型',
              value: '字段名称'
            },
            {
              label: '流程状态',
              value: '状态字段',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '流程适用范围',
              value: '字段名称'
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '流程类型',
              value: '字段名称'
            },
            {
              label: '关联表单',
              value: '字段名称'
            },
            {
              label: '流程说明',
              value: '字段名称'
            },
            {
              label: '超时提醒',
              value: '字段名称'
            },
            {
              label: '审批人自动去重',
              value: '字段名称'
            }
          ]
        }
      },
      // 流程版本
      ProcessVersion: {
        header: [
          {
            prop: '0',
            label: '序号'
          },
          {
            prop: '1',
            label: '版本号',
            sortable: true,
            'min-width': 150
          },
          {
            prop: '2',
            label: '版本时间',
            sortable: true,
            'min-width': 150
          }
        ],
        data: [
          {
            0: 1,
            1: 'V20221110-01',
            2: '2022-12-04 11:55:12'
          },
          {
            0: 2,
            1: 'V20221110-01',
            2: '2022-11-11 05:09:12'
          },
          {
            0: 3,
            1: 'V20221110-01',
            2: '2022-11-17 22:29:12'
          },
          {
            0: 4,
            1: 'V20221110-01',
            2: '2022-11-27 12:33:12'
          },
          {
            0: 5,
            1: 'V20221110-01',
            2: '2022-12-04 06:47:12'
          }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          border: true,
          'header-cell-style': ({ row, column, rowIndex, columnIndex }) => {
            // console.log({ row, column, rowIndex, columnIndex });
            return {
              background: 'var(--jy-color-fill--1)'
            }
          }
        }
      },
      // 表单详情
      FormDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '7rem'
          },
          data: [
            {
              label: '表单名称',
              value: '字段名称'
            },
            {
              label: '表单编码',
              value: '字段名称'
            },
            {
              label: '业务类型',
              value: '字段名称'
            },
            {
              label: '关联文件类型',
              value: '字段名称'
            },
            {
              label: '表单状态',
              value: '状态字段',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '用印类型',
              value: '字段名称'
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '表单说明',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 业务规则详情
      BusinessRuleDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '8rem'
          },
          data: [
            {
              label: '业务规则名称',
              value: '业务规则名称'
            },
            {
              label: '业务规则编码',
              value: '字段名称'
            },
            {
              label: '业务类型',
              value: '字段名称'
            },
            {
              label: '关联文件类型',
              value: '字段名称'
            },
            {
              label: '业务规则状态',
              value: '状态字段',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '创建人',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '创建时间',
              value: '字段名称'
            },
            {
              label: '业务规则说明',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 通知事件详情
      NotificationEventDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '5rem'
          },
          data: [
            {
              label: '事件名称',
              value: '名称'
            },
            {
              label: '事件编码',
              value: '字段名称'
            },
            {
              label: '事件类别',
              value: '字段名称'
            },
            {
              label: '触发渠道',
              value: '字段名称'
            },
            {
              label: '事件状态',
              value: '状态字段',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '事件描述',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '通知人',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 模板详情
      TemplateDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '6rem'
          },
          data: [
            {
              label: '模板名称',
              value: '名称'
            },
            {
              label: '模板编码',
              value: '字段名称'
            },
            {
              label: '关联风险项',
              value: '字段名称'
            },
            {
              label: '风险分类',
              value: '字段名称'
            },
            {
              label: '事件状态',
              value: '状态字段',
              iconPath: yuanLvSvg,
              valStyle: {
                color: 'var(--jy-success-6)'
              }
            },
            {
              label: '触发渠道',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '模板标题',
              value: '字段名称'
            },
            {
              label: '模板内容',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '备注',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 往来企业详情
      CurrentBusinessDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '7rem'
          },
          data: [
            {
              label: '企业名称',
              value: '名称'
            },
            {
              label: '企业编码',
              value: '字段名称'
            },
            {
              label: '企业所属部门',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称'
            },
            {
              label: '联系人',
              value: '字段名称'
            },
            {
              label: '联系方式',
              value: '字段名称'
            },
            {
              label: '备注：',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 单位与部门详情
      UnitDepartmentDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          labelStyle: {
            width: '80px'
          },
          data: [
            {
              label: '组织名称',
              value: '名称'
            },
            {
              label: '组织编码',
              value: '字段名称'
            },
            {
              label: '组织类型',
              value: '字段名称'
            },
            {
              label: '组织人数',
              value: '字段名称'
            },
            {
              label: '组织主管',
              value: '字段名称'
            },
            {
              label: '上级组织',
              value: '字段名称'
            },
            {
              label: '更新时间',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            },
            {
              label: '备注',
              value: '字段名称',
              lineStyle: {
                width: '100%'
              }
            }
          ]
        }
      },
      // 组织人员
      organizationPerson: {
        header: [
          {
            prop: '1',
            label: '人员列表'
          },
          {
            prop: '2',
            label: '账号'
          }
        ],
        data: [
          {
            0: 1,
            1: '周俊毅',
            2: '181 0834 1643'
          },
          {
            0: 2,
            1: '王凡玄',
            2: '184 5857 8572'
          },
          {
            0: 3,
            1: '李豫卓',
            2: '158 5666 9874'
          },
          {
            0: 4,
            1: '孙思达',
            2: '137 8216 9138'
          },
          {
            0: 5,
            1: '李梓发',
            2: '136 3348 4128'
          }
        ],
        // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
        defaultAttribute: {
          border: true,
          'header-cell-style': ({ row, column, rowIndex, columnIndex }) => {
            // console.log({ row, column, rowIndex, columnIndex });
            return {
              background: 'var(--jy-color-fill--1)'
            }
          }
        }
      },
      // 员工详情
      StaffDetails: {
        basicInformation: {
          title: '基本信息',
          show: true,
          data: {
            name: '邓家佳',
            cellPhone: '13789995478',
            account: 'Zhangsan',
            departmentList: [
              {
                name: '德国威能 - 威能（无锡）供热设备有限公司'
              },
              {
                name: '德国威能 - 威能（中国）供热制冷环境技术有限公司'
              },
              {
                name: '德国威能 - 威能（中国）供热制冷环境技术有限公司北京分公司'
              },
              {
                name: '德国威能 - 威能（中国）供热制冷环境技术有限公司杭州分公司'
              }
            ],
            role: '系统管理员、印章管理员、模板管理员、流程管理员、审计员',
            jobTitle: '开发',
            mailbox: 'test@qq.com',
            EnterpriseWechatID: 'NFHUF744665212',
            NailID: '11548798778',
            remark: '-',
            FacePicturePath: renlianTupian
          }
        }
      }
    },
    drawer: {
      show: false,
      size: '50%',
      FullScreenStatus: 0
    },
    componentsTabs: {
      data: [
        {
          label: '用印详情',
          name: 'Details-of-Printing'
        },
        {
          label: '印章申请详情',
          name: 'Seal-Application-Details'
        },
        {
          label: '文件详情',
          name: 'Details-of-Document'
        },
        {
          label: '印章详情',
          name: 'Particulars-of-Seal'
        },
        {
          label: '审批流程',
          name: 'approval-process'
        },
        {
          label: '保管记录',
          name: 'Record-of-custody'
        },
        {
          label: '领用记录',
          name: 'Record-of-requisition'
        },
        {
          label: '操作记录',
          name: 'operating-record'
        },
        {
          label: '工作台详情',
          name: 'Workbench-Details'
        },
        {
          label: '智能印章盒详情',
          name: 'SmartSeal-Box-Detail'
        },
        {
          label: '智能印章柜详情',
          name: 'SmartSeal-Cabinet-Details'
        },
        {
          label: '转办申请详情',
          name: 'transfer-Application-Details'
        },
        {
          label: '重置申请详情',
          name: 'Reset-Application-Details'
        },
        {
          label: '流程详情',
          name: 'Process-Details'
        },
        {
          label: '流程版本',
          name: 'Process-Version'
        },
        {
          label: '表单详情',
          name: 'Form-Details'
        },

        {
          label: '业务规则详情',
          name: 'Business-Rule-Details'
        },
        {
          label: '通知事件详情',
          name: 'Notification-Event-Details'
        },
        {
          label: '模板详情',
          name: 'Template-Details'
        },
        {
          label: '往来企业详情',
          name: 'Current-Business-Details'
        },
        {
          label: '单位与部门详情',
          name: 'Unit-Department-Details'
        },
        {
          label: '组织人员',
          name: 'organization-Person'
        },
        {
          label: '员工详情',
          name: 'Staff-Details'
        }
      ],
      activeName: 'Details-of-Printing'
    },
    componentsTable: {
      header: [
        {
          prop: 'name',
          label: 'name'
        },
        {
          prop: 'date',
          label: 'date'
        },
        {
          prop: 'address',
          label: 'address'
        }
      ],
      data: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ],
      // 默认属性  可以直接通过默认属性  来绑定组件自带的属性
      defaultAttribute: {
        border: true,
        'show-header': false,
        'span-method': ({ row, column, rowIndex, columnIndex }) => {
          // console.log({ row, column, rowIndex, columnIndex });
          if (rowIndex === 0 && columnIndex === 1) {
            // 用于设置要合并的列
            return {
              rowspan: 1, // 合并的行数
              colspan: 2 // 合并的列数，设为０则直接不显示
            }
          }
          if (rowIndex === 0 && columnIndex === 2) {
            // 用于设置要合并的列
            return {
              rowspan: 1, // 合并的行数
              colspan: 0 // 合并的列数，设为０则直接不显示
            }
          }
        },
        'cell-style': ({ row, column, rowIndex, columnIndex }) => {
          console.log({ row, column, rowIndex, columnIndex })
          if (columnIndex === 0) {
            return {
              background: '#f1f1f1'
            }
          }
        }
      }
    },
    componentsApprovalSteps: {
      title: '审批流程',
      show: true,
      data: [
        {
          // 1 发起申请
          type: '1',
          person: [
            {
              name: '春青'
            }
          ]
        }
      ]
    }
  })
  // 初始化数据
  const initData = () => {
    state.drawer.show = false
    if (props.show) {
      state.drawer.show = props.show
    }
    if (props.modelValue) {
      state.drawer.show = props.modelValue
    }
    // state.drawer.show = true
    state.componentsTabs.data = props.visible
    if (props.activeName) {
      state.componentsTabs.activeName = props.activeName
    } else if (props.visible && props.visible.length > 0) {
      state.componentsTabs.activeName = props.visible[0].name
    } else {
      state.componentsTabs.activeName = ''
    }
    // console.log(props.show, props.modelValue, state.drawer.show)
    // visible: [
    //         {
    //             label: '用印详情',
    //             name: "Details-of-Printing",
    //             // 内容权限
    //             layout: [],
    //         },
    //     ]

    props.visible.forEach(element => {
      if (element.name === 'Details-of-Printing') {
        // 处理 用印详情 Details-of-Printing
        disDetailsaOfPrinting(element)
      } else if (element.name === 'approval-process') {
        // 处理 审批流程 approval-process
        disApprovalProcess(element)
      } else if (element.name === 'operating-record') {
        // 处理 操作记录 operating-record
        disOperatingRecord(element)
      } else if (element.name === 'Record-of-requisition') {
        // 处理 领用记录 Record-of-requisition
        disRecordOfRequisition(element)
      } else if (element.name === 'Record-of-custody') {
        // 处理 保管记录 Record-of-custody
        disRecordOfCustody(element)
      } else if (element.name === 'Particulars-of-Seal') {
        // 处理 印章详情 Particulars-of-Seal
        disParticularsOfSeal(element)
      } else if (element.name === 'Details-of-Document') {
        // 处理 文件详情 Details-of-Document
        disDetailsOfDocument(element)
      } else if (element.name === 'Seal-Application-Details') {
        // 处理 印章申请详情 Seal-Application-Details
        disSealApplicationDetails(element)
      } else if (element.name === 'Workbench-Details') {
        // 处理 工作台详情 Workbench-Details
        disWorkbenchDetails(element)
      } else if (element.name === 'SmartSeal-Box-Detail') {
        // 处理 智能印章盒详情 SmartSeal-Box-Detail
        disSmartSealBoxDetails(element)
      } else if (element.name === 'SmartSeal-Cabinet-Details') {
        // 处理 智能印章柜详情 SmartSeal-Cabinet-Details
        disSmartSealCabinetDetails(element)
      } else if (element.name === 'transfer-Application-Details') {
        // 处理 转办申请详情 transfer-Application-Details
        disTransferApplicationDetails(element)
      } else if (element.name === 'Reset-Application-Details') {
        // 处理 重置申请详情 Reset-Application-Details
        disResetApplicationDetails(element)
      } else if (element.name === 'Process-Details') {
        // 处理 流程详情 Process-Details
        disProcessDetails(element)
      } else if (element.name === 'Process-Version') {
        // 处理 流程版本 Process-Version
        disProcessVersion(element)
      } else if (element.name === 'Form-Details') {
        // 处理 表单详情 Form-Details
        disFormDetails(element)
      } else if (element.name === 'Business-Rule-Details') {
        // 处理 业务规则详情 Business-Rule-Details
        disBusinessRuleDetails(element)
      } else if (element.name === 'Notification-Event-Details') {
        // 处理 通知事件详情 Notification-Event-Details
        disNotificationEventDetails(element)
      } else if (element.name === 'Template-Details') {
        // 处理 模板详情 Template-Details
        disTemplateDetails(element)
      } else if (element.name === 'Current-Business-Details') {
        // 处理 往来企业详情 Current-Business-Details
        disCurrentBusinessDetails(element)
      } else if (element.name === 'Unit-Department-Details') {
        // 处理 单位与部门详情 Unit-Department-Details
        disUnitDepartmentDetails(element)
      } else if (element.name === 'organization-Person') {
        // 处理 组织人员 organization-Person
        disOrganizationPerson(element)
      } else if (element.name === 'Staff-Details') {
        // 处理 员工详情 Staff-Details
        disStaffDetails(element)
      }
    })
  }
  // 点击全屏
  const ClickOnFullScreen = () => {
    state.drawer.size = '100%'
    state.drawer.FullScreenStatus = 1
  }
  // 点击关闭全屏
  const ClickCloseFullScreen = () => {
    state.drawer.size = '50%'
    state.drawer.FullScreenStatus = 0
  }
  // 点击关闭
  const clickClose = () => {
    state.drawer.show = false
    emit('update:modelValue', state.drawer.show)
    emit('clickClose', state.drawer.show)
  }
  // 切换选项
  const tabChange = activeName => {
    state.componentsTabs.activeName = activeName
  }
  // 处理 用印详情 Details-of-Printing
  const disDetailsaOfPrinting = element => {
    const DetailsaOfPrinting = state.cache.DetailsaOfPrinting
    // console.log('--->', DetailsaOfPrinting)

    // 基本信息
    if (element.basicInformation && element.basicInformation.show === true) {
      DetailsaOfPrinting.basicInformation.show = true
    } else {
      DetailsaOfPrinting.basicInformation.show = false
    }
    if (element.basicInformation && element.basicInformation.data) {
      DetailsaOfPrinting.basicInformation.data = element.basicInformation.data
    }

    // 附件 用印文件
    if (element.accessory && element.accessory.show === true) {
      DetailsaOfPrinting.accessory.show = true
    } else {
      DetailsaOfPrinting.accessory.show = false
    }
    if (element.accessory && element.accessory.printedData) {
      DetailsaOfPrinting.accessory.printedData = element.accessory.printedData
    }

    // 附件 补充文件
    if (element.accessory && element.accessory.additionalData) {
      DetailsaOfPrinting.accessory.additionalData =
        element.accessory.additionalData
    }

    // 智能用印
    if (
      element.IntelligentPrinting &&
      element.IntelligentPrinting.show === true
    ) {
      DetailsaOfPrinting.IntelligentPrinting.show = true
    } else {
      DetailsaOfPrinting.IntelligentPrinting.show = false
    }
    if (element.IntelligentPrinting && element.IntelligentPrinting.data) {
      DetailsaOfPrinting.IntelligentPrinting.data =
        element.IntelligentPrinting.data
    }

    // 文件归档
    if (
      element.archiveInformation &&
      element.archiveInformation.show === true
    ) {
      DetailsaOfPrinting.archiveInformation.show = true
    } else {
      DetailsaOfPrinting.archiveInformation.show = false
    }
    if (element.archiveInformation && element.archiveInformation.data) {
      DetailsaOfPrinting.archiveInformation.data =
        element.archiveInformation.data
    }

    // 文件核验
    if (
      element.fileocrInformation &&
      element.fileocrInformation.show === true
    ) {
      DetailsaOfPrinting.fileocrInformation.show = true
    } else {
      DetailsaOfPrinting.fileocrInformation.show = false
    }
    if (element.fileocrInformation && element.fileocrInformation.data) {
      DetailsaOfPrinting.fileocrInformation.data =
        element.fileocrInformation.data
    }

    // 电子签章
    if (element.sdigitalSeal && element.sdigitalSeal.show === true) {
      DetailsaOfPrinting.sdigitalSeal.show = true
    } else {
      DetailsaOfPrinting.sdigitalSeal.show = false
    }
    if (element.sdigitalSeal && element.sdigitalSeal.signatoryData) {
      DetailsaOfPrinting.sdigitalSeal.signatoryData =
        element.sdigitalSeal.signatoryData
    }
    if (element.sdigitalSeal && element.sdigitalSeal.signatoryFileData) {
      DetailsaOfPrinting.sdigitalSeal.signatoryFileData =
        element.sdigitalSeal.signatoryFileData
    }
    if (element.sdigitalSeal && element.sdigitalSeal.alreadySignatoryFileData) {
      DetailsaOfPrinting.sdigitalSeal.alreadySignatoryFileData =
        element.sdigitalSeal.alreadySignatoryFileData
    }
  }
  // 处理 审批流程 approval-process
  const disApprovalProcess = element => {
    if (element.data) {
      state.cache.approvalProcess.data = element.data
    }
  }
  // 处理 操作记录 operating-record
  const disOperatingRecord = element => {
    if (element.data) {
      state.cache.operatingRecord.header = element.header
      state.cache.operatingRecord.data = element.data
    }
  }
  // 处理 领用记录 Record-of-requisition
  const disRecordOfRequisition = element => {
    if (element['SealInformation-data']) {
      state.cache.RecordOfRequisition.SealInformation.data =
        element['SealInformation-data']
    }
    if (element['SealInformation-imageData']) {
      state.cache.RecordOfRequisition.SealInformation.imageData =
        element['SealInformation-imageData']
    }
  }
  // 处理 保管记录 Record-of-custody
  const disRecordOfCustody = element => {
    if (element.data) {
      state.cache.RecordOfCustody.header = element.header
      state.cache.RecordOfCustody.data = element.data
    }
  }
  // 处理 印章详情 Particulars-of-Seal
  const disParticularsOfSeal = element => {
    if (element.data) {
      state.cache.basicInformation.data = element.data
    }
  }
  // 处理 文件详情 Details-of-Document
  const disDetailsOfDocument = element => {
    if (element['basicInformation-data']) {
      state.cache.DetailsOfDocument.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 印章申请详情 Seal-Application-Details
  const disSealApplicationDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.SealApplicationDetails.basicInformation.data =
        element['basicInformation-data']
    }
    if (element['SealInformation-data']) {
      state.cache.SealApplicationDetails.SealInformation.data =
        element['SealInformation-data']
    }
    if (element['ManagementInformation-data']) {
      state.cache.SealApplicationDetails.ManagementInformation.data =
        element['ManagementInformation-data']
    }
  }
  // 处理 工作台详情 Workbench-Details
  const disWorkbenchDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.WorkbenchDetails.basicInformation.data =
        element['basicInformation-data']
    }
    if (element['configuration-data']) {
      state.cache.WorkbenchDetails.configuration.data =
        element['configuration-data']
    }
  }

  // 处理 智能印章盒详情 SmartSeal-Box-Detail
  const disSmartSealBoxDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.SmartSealBoxDetails.basicInformation.data =
        element['basicInformation-data']
    }
    if (element['configuration-data']) {
      state.cache.SmartSealBoxDetails.configuration.data =
        element['configuration-data']
    }
  }
  // 处理 智能印章柜详情 SmartSeal-Cabinet-Details
  const disSmartSealCabinetDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.SmartSealCabinetDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 转办申请详情 transfer-Application-Details
  const disTransferApplicationDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.transferApplicationDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 重置申请详情 Reset-Application-Details
  const disResetApplicationDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.ResetApplicationDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 流程详情 Process-Details
  const disProcessDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.ProcessDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 流程版本 Process-Version
  const disProcessVersion = element => {
    if (element.data) {
      state.cache.ProcessVersion.header = element.header
      state.cache.ProcessVersion.data = element.data
    }
  }
  // 处理 表单详情 Form-Details
  const disFormDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.FormDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 业务规则详情 Business-Rule-Details
  const disBusinessRuleDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.BusinessRuleDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 通知事件详情 Notification-Event-Details
  const disNotificationEventDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.NotificationEventDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 模板详情 Template-Details
  const disTemplateDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.TemplateDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 往来企业详情 Current-Business-Details
  const disCurrentBusinessDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.CurrentBusinessDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 单位与部门详情 Unit-Department-Details
  const disUnitDepartmentDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.UnitDepartmentDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  // 处理 组织人员 organization-Person
  const disOrganizationPerson = element => {
    if (element.data) {
      state.cache.organizationPerson.header = element.header
      state.cache.organizationPerson.data = element.data
    }
  }
  // 处理 员工详情 Staff-Details
  const disStaffDetails = element => {
    if (element['basicInformation-data']) {
      state.cache.StaffDetails.basicInformation.data =
        element['basicInformation-data']
    }
  }
  //

  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化数据
    initData()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
  watch(props, (newValue, oldValue) => {
    // console.log(newValue, oldValue);
    initData()
  })
</script>
<style lang="scss" scoped>
  .components-documentsDetails {
    margin: 0%;

    .ap-cont {
      height: 100%;
    }

    .ap-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title-name-span {
        font-size: var(--jy-font-size-title-2);
      }

      .title-cion-img {
        width: 1rem;
        margin-right: 1rem;
        cursor: pointer;
      }

      .quanping {
        width: 1.2rem;
      }
    }

    .ap-Tabs {
      display: flex;

      .ap-Tabs-cont {
        flex-grow: 1;
      }

      .ap-Tabs-sub {
        width: 5rem;
        margin-bottom: 14px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-bottom: 1px solid var(--jy-color-border-2);

        .ap-Tabs-sub-icon {
          margin-right: 0.5rem;
        }

        .ap-Tabs-sub-text {
          cursor: pointer;
          color: var(-color-text-2);
        }
      }
    }

    .ap-cont-tabsCont {
      width: calc(100% + 18px);
      height: calc(100% - 80px);

      .arco-scrollbar {
        height: 100%;
      }

      .scrollbar-div {
        padding-right: 18px;
        box-sizing: border-box;
      }

      .ap-cont-box-title {
        border-bottom: 1px solid var(--jy-color-border-2);
        padding: 0rem 0 0rem 0.8rem;
        box-sizing: border-box;
        background: url(../../assets/svg/shuxian-after.svg) no-repeat left
          center;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 2.3rem;

        .ap-cont-box-title-label {
          font-size: var(--jy-font-size-title-1);
          font-weight: var(--jy-font-weight-400);
        }

        .ap-cont-box-title-xiazai {
          display: flex;
          align-items: center;

          .ap-cont-box-title-xiazai-icon {
            margin-right: 0.5rem;
          }

          .ap-cont-box-title-xiazai-text {
            color: var(--jy-color-text-2);
          }
        }

        .ap-cont-box-title-but {
          .ap-cont-box-title-but-box {
            display: flex;
            align-items: center;
          }

          .ap-cont-box-title-but-icon {
            width: 0.8rem;
            margin-right: 0.2rem;
          }
        }
      }

      .ap-cont-box-details {
        padding: 0.5rem 0;
        box-sizing: border-box;
      }

      .Details-of-Printing {
        .sealDetails-basic-information {
          .sealDetails-basic-information-details {
            display: flex;
            flex-flow: wrap;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .sealDetails-basic-information-list {
              display: flex;
              align-items: center;
              width: 50%;
              padding: 0.5rem 0;
              box-sizing: border-box;

              .sealDetails-basic-information-list-label {
                width: 4.5rem;
                display: flex;
                justify-content: flex-end;
                color: var(--jy-color-text-3);
              }

              .sealDetails-basic-information-list-value {
                padding: 0rem 0 0rem 0.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }

      .Particulars-of-Seal {
        .sealDetails-basic-information {
          .sealDetails-basic-information-details {
            display: flex;
            flex-flow: wrap;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .sealDetails-basic-information-list {
              display: flex;
              align-items: center;
              width: 50%;
              padding: 0.5rem 0;
              box-sizing: border-box;

              .sealDetails-basic-information-list-label {
                width: 7rem;
                display: flex;
                justify-content: flex-end;
                color: var(--jy-color-text-3);
              }

              .sealDetails-basic-information-list-value {
                padding: 0rem 0 0rem 0.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }

      .Details-of-Document {
        .sealDetails-basic-information {
          .sealDetails-basic-information-details {
            display: flex;
            flex-flow: wrap;
            padding: 0.5rem 0;
            box-sizing: border-box;

            .sealDetails-basic-information-list {
              display: flex;
              align-items: center;
              width: 50%;
              padding: 0.5rem 0;
              box-sizing: border-box;

              .sealDetails-basic-information-list-label {
                width: 7rem;
                display: flex;
                justify-content: flex-end;
                color: var(--jy-color-text-3);
              }

              .sealDetails-basic-information-list-value {
                padding: 0rem 0 0rem 0.5rem;
                box-sizing: border-box;
              }
            }
          }
        }
      }

      .Record-of-requisition {
        .ap-cont-ma {
          height: 3rem;
          display: flex;
          align-items: center;

          .ap-cont-ma-text {
            color: var(--jy-color-text-3);
          }

          .ap-cont-ma-value {
            color: var(--jy-primary-6);
            font-size: var(--jy-font-size-title-2);
          }
        }

        .SealInformation {
          .SealInformation-details-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 2.5rem;

            .SealInformation-details-list-cont {
              display: flex;
              align-items: center;

              .SealInformation-details-list-cont-icon {
                display: flex;
                align-items: center;
                margin-right: 0.5rem;
              }

              .SealInformation-details-list-cont-val {
                display: flex;
                align-items: center;

                .iconPathValue {
                  margin-right: 0.5rem;
                }
              }
            }
          }

          .SealInformation-details-image {
            .SealInformation-details-image-title {
              display: flex;
              align-items: center;
              height: 2.5rem;

              .SealInformation-details-image-title-icon {
                display: flex;
                align-items: center;
                margin-right: 0.5rem;
              }
            }

            .SealInformation-details-image-cont {
              display: flex;
              flex-flow: wrap;

              .SealInformation-details-image-cont-list {
                width: 50%;
                display: flex;
                min-width: 25rem;
                padding: 0.5rem 0;
                box-sizing: border-box;

                .SealInformation-details-image-cont-list-img {
                  position: relative;
                  width: auto;

                  .SealInformation-details-image-cont-list-img-icon {
                    position: absolute;
                    right: 0%;
                    top: 0%;
                    width: 40%;
                  }

                  .SealInformation-details-image-cont-list-img-time {
                    position: absolute;
                    bottom: 0%;
                    text-align: center;
                    width: 100%;
                    background-color: var(--jy-color-fill-65);
                    color: var(--jy-in-common-use-1);
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                }

                .SealInformation-details-image-cont-list-cont {
                  flex-grow: 1;
                  padding: 0 0.5rem;
                  box-sizing: border-box;
                  display: flex;
                  align-content: space-between;
                  flex-flow: wrap;

                  .SealInformation-details-image-cont-list-cont-list {
                    width: 100%;
                    display: flex;

                    .SealInformation-details-image-cont-list-cont-list-label {
                      width: 4.5rem;
                      display: flex;
                      justify-content: flex-end;
                      color: var(--jy-color-text-3);
                    }

                    .SealInformation-details-image-cont-list-cont-list-subValue {
                      display: flex;
                      align-items: center;
                      padding-left: 0.5rem;
                      box-sizing: border-box;

                      .SealInformation-details-image-cont-list-cont-list-subValue-icon {
                        margin-right: 0.2rem;
                      }

                      .SealInformation-details-image-cont-list-cont-list-subValue-text {
                        color: var(--jy-danger-6);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
