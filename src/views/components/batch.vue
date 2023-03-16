<template>
  <div class="components-batch">
    <div class="ap-box">
      <slot>
        <div class="ap-box-left" v-if="state.props.data.length > 0">
          <el-button
            v-bind="state.props.defaultAttribute"
            v-for="(item, index) in state.props.data"
            :key="index"
            @click="clickBatchButton(item, index)"
          >
            {{ item.name }}
          </el-button>
        </div>
      </slot>
      <div class="ap-box-right">
        <div
          class="ap-box-right-fill shuaxin"
          @click="clickBatchButton({ name: 'refresh' })"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M2.0778 1.4598C3.16654 0.516402 4.55939 -0.00200392 6 5.82159e-06C9.3138 5.82159e-06 12 2.6862 12 6C12 7.2816 11.598 8.4696 10.914 9.444L9 6H10.8C10.8001 5.05898 10.5235 4.13868 10.0048 3.35356C9.48605 2.56843 8.74796 1.9531 7.88231 1.58408C7.01666 1.21506 6.06163 1.10863 5.13597 1.27802C4.21032 1.4474 3.35487 1.88514 2.676 2.5368L2.0778 1.4598ZM9.9222 10.5402C8.83347 11.4836 7.44061 12.002 6 12C2.6862 12 0 9.3138 0 6C0 4.7184 0.402 3.5304 1.086 2.556L3 6H1.2C1.19992 6.94102 1.47645 7.86132 1.9952 8.64644C2.51395 9.43157 3.25204 10.0469 4.11769 10.4159C4.98334 10.7849 5.93837 10.8914 6.86403 10.722C7.78968 10.5526 8.64513 10.1149 9.324 9.4632L9.9222 10.5402Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M2.0778 1.4598C3.16654 0.516402 4.55939 -0.00200392 6 5.82159e-06C9.3138 5.82159e-06 12 2.6862 12 6C12 7.2816 11.598 8.4696 10.914 9.444L9 6H10.8C10.8001 5.05898 10.5235 4.13868 10.0048 3.35356C9.48605 2.56843 8.74796 1.9531 7.88231 1.58408C7.01666 1.21506 6.06163 1.10863 5.13597 1.27802C4.21032 1.4474 3.35487 1.88514 2.676 2.5368L2.0778 1.4598ZM9.9222 10.5402C8.83347 11.4836 7.44061 12.002 6 12C2.6862 12 0 9.3138 0 6C0 4.7184 0.402 3.5304 1.086 2.556L3 6H1.2C1.19992 6.94102 1.47645 7.86132 1.9952 8.64644C2.51395 9.43157 3.25204 10.0469 4.11769 10.4159C4.98334 10.7849 5.93837 10.8914 6.86403 10.722C7.78968 10.5526 8.64513 10.1149 9.324 9.4632L9.9222 10.5402Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <!-- <div class="ap-box-right-fill daochu">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.59998 8.3996V4.1996H9.59998L5.99998 0.599609L2.39999 4.1996H5.39998V8.3996H6.59998ZM10.8 10.1996H1.2V5.9996H0V10.7996C0 11.131 0.268629 11.3996 0.599999 11.3996H11.4C11.7314 11.3996 12 11.131 12 10.7996V5.9996H10.8V10.1996Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.59998 8.3996V4.1996H9.59998L5.99998 0.599609L2.39999 4.1996H5.39998V8.3996H6.59998ZM10.8 10.1996H1.2V5.9996H0V10.7996C0 11.131 0.268629 11.3996 0.599999 11.3996H11.4C11.7314 11.3996 12 11.131 12 10.7996V5.9996H10.8V10.1996Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <div class="ap-box-right-fill dayin">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M2.4 10.2H0.6C0.44087 10.2 0.288258 10.1368 0.175736 10.0243C0.0632141 9.91174 0 9.75913 0 9.6V3.6C0 3.44087 0.0632141 3.28826 0.175736 3.17574C0.288258 3.06321 0.44087 3 0.6 3H2.4V0.6C2.4 0.44087 2.46321 0.288258 2.57574 0.175736C2.68826 0.0632141 2.84087 0 3 0H9C9.15913 0 9.31174 0.0632141 9.42426 0.175736C9.53679 0.288258 9.6 0.44087 9.6 0.6V3H11.4C11.5591 3 11.7117 3.06321 11.8243 3.17574C11.9368 3.28826 12 3.44087 12 3.6V9.6C12 9.75913 11.9368 9.91174 11.8243 10.0243C11.7117 10.1368 11.5591 10.2 11.4 10.2H9.6V11.4C9.6 11.5591 9.53679 11.7117 9.42426 11.8243C9.31174 11.9368 9.15913 12 9 12H3C2.84087 12 2.68826 11.9368 2.57574 11.8243C2.46321 11.7117 2.4 11.5591 2.4 11.4V10.2ZM2.4 9V8.4C2.4 8.24087 2.46321 8.08826 2.57574 7.97574C2.68826 7.86321 2.84087 7.8 3 7.8H9C9.15913 7.8 9.31174 7.86321 9.42426 7.97574C9.53679 8.08826 9.6 8.24087 9.6 8.4V9H10.8V4.2H1.2V9H2.4ZM3.6 1.2V3H8.4V1.2H3.6ZM3.6 9V10.8H8.4V9H3.6ZM1.8 4.8H3.6V6H1.8V4.8Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M2.4 10.2H0.6C0.44087 10.2 0.288258 10.1368 0.175736 10.0243C0.0632141 9.91174 0 9.75913 0 9.6V3.6C0 3.44087 0.0632141 3.28826 0.175736 3.17574C0.288258 3.06321 0.44087 3 0.6 3H2.4V0.6C2.4 0.44087 2.46321 0.288258 2.57574 0.175736C2.68826 0.0632141 2.84087 0 3 0H9C9.15913 0 9.31174 0.0632141 9.42426 0.175736C9.53679 0.288258 9.6 0.44087 9.6 0.6V3H11.4C11.5591 3 11.7117 3.06321 11.8243 3.17574C11.9368 3.28826 12 3.44087 12 3.6V9.6C12 9.75913 11.9368 9.91174 11.8243 10.0243C11.7117 10.1368 11.5591 10.2 11.4 10.2H9.6V11.4C9.6 11.5591 9.53679 11.7117 9.42426 11.8243C9.31174 11.9368 9.15913 12 9 12H3C2.84087 12 2.68826 11.9368 2.57574 11.8243C2.46321 11.7117 2.4 11.5591 2.4 11.4V10.2ZM2.4 9V8.4C2.4 8.24087 2.46321 8.08826 2.57574 7.97574C2.68826 7.86321 2.84087 7.8 3 7.8H9C9.15913 7.8 9.31174 7.86321 9.42426 7.97574C9.53679 8.08826 9.6 8.24087 9.6 8.4V9H10.8V4.2H1.2V9H2.4ZM3.6 1.2V3H8.4V1.2H3.6ZM3.6 9V10.8H8.4V9H3.6ZM1.8 4.8H3.6V6H1.8V4.8Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div> -->
        <div
          class="ap-box-right-fill quanping"
          @click="clickBatchButton({ name: 'fullscreen' })"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon"
          >
            <path
              d="M10.5714 0L12 0V4H10.5714V1.5H8.57143V0L10.5714 0ZM1.42858 0L3.42857 0V1.5H1.42858L1.42858 4H0V0L1.42858 0ZM10.5714 10.5V8H12V12H8.57143V10.5H10.5714ZM1.42858 10.5H3.42857V12H0V8H1.42858V10.5Z"
              fill="black"
              fill-opacity="0.45"
            />
          </svg>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="ap-box-right-icon checked"
          >
            <path
              d="M10.5714 0L12 0V4H10.5714V1.5H8.57143V0L10.5714 0ZM1.42858 0L3.42857 0V1.5H1.42858L1.42858 4H0V0L1.42858 0ZM10.5714 10.5V8H12V12H8.57143V10.5H10.5714ZM1.42858 10.5H3.42857V12H0V8H1.42858V10.5Z"
              fill="#d0963e"
              fill-opacity="1"
            />
          </svg>
        </div>
        <el-popover
          placement="bottom-end"
          :width="220"
          :offset="5"
          popper-style="padding: 0"
        >
          <template #reference>
            <div class="ap-box-right-fill shezhi">
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ap-box-right-icon"
              >
                <path
                  d="M0 8.08556H4.03265V9.24064H0V8.08556ZM0 4.04278H5.18483V5.19786H0V4.04278ZM0 0H11.5218V1.15508H0V0ZM10.7579 5.2123L11.4239 4.98648L12 5.98678L11.4723 6.4517C11.5387 6.76741 11.5387 7.09355 11.4723 7.40926L12 7.87418L11.4239 8.87448L10.7579 8.64866C10.5217 8.86235 10.2406 9.02695 9.93125 9.12802L9.79357 9.81818H8.64138L8.50312 9.12744C8.19737 9.02727 7.91595 8.86398 7.677 8.64809L7.01104 8.87448L6.43495 7.87418L6.96265 7.40926C6.89623 7.09355 6.89623 6.76741 6.96265 6.4517L6.43495 5.98678L7.01104 4.98648L7.677 5.2123C7.9132 4.99861 8.19433 4.83401 8.5037 4.73294L8.64138 4.04278H9.79357L9.93183 4.73352C10.2406 4.83401 10.5217 4.99919 10.7579 5.21288V5.2123ZM9.21747 8.08556C9.52305 8.08556 9.81612 7.96387 10.0322 7.74725C10.2483 7.53063 10.3697 7.23683 10.3697 6.93048C10.3697 6.62414 10.2483 6.33034 10.0322 6.11372C9.81612 5.8971 9.52305 5.7754 9.21747 5.7754C8.9119 5.7754 8.61883 5.8971 8.40276 6.11372C8.18668 6.33034 8.06529 6.62414 8.06529 6.93048C8.06529 7.23683 8.18668 7.53063 8.40276 7.74725C8.61883 7.96387 8.9119 8.08556 9.21747 8.08556Z"
                  fill="black"
                  fill-opacity="0.45"
                />
              </svg>
              <svg
                width="12"
                height="10"
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="ap-box-right-icon checked"
              >
                <path
                  d="M0 8.08556H4.03265V9.24064H0V8.08556ZM0 4.04278H5.18483V5.19786H0V4.04278ZM0 0H11.5218V1.15508H0V0ZM10.7579 5.2123L11.4239 4.98648L12 5.98678L11.4723 6.4517C11.5387 6.76741 11.5387 7.09355 11.4723 7.40926L12 7.87418L11.4239 8.87448L10.7579 8.64866C10.5217 8.86235 10.2406 9.02695 9.93125 9.12802L9.79357 9.81818H8.64138L8.50312 9.12744C8.19737 9.02727 7.91595 8.86398 7.677 8.64809L7.01104 8.87448L6.43495 7.87418L6.96265 7.40926C6.89623 7.09355 6.89623 6.76741 6.96265 6.4517L6.43495 5.98678L7.01104 4.98648L7.677 5.2123C7.9132 4.99861 8.19433 4.83401 8.5037 4.73294L8.64138 4.04278H9.79357L9.93183 4.73352C10.2406 4.83401 10.5217 4.99919 10.7579 5.21288V5.2123ZM9.21747 8.08556C9.52305 8.08556 9.81612 7.96387 10.0322 7.74725C10.2483 7.53063 10.3697 7.23683 10.3697 6.93048C10.3697 6.62414 10.2483 6.33034 10.0322 6.11372C9.81612 5.8971 9.52305 5.7754 9.21747 5.7754C8.9119 5.7754 8.61883 5.8971 8.40276 6.11372C8.18668 6.33034 8.06529 6.62414 8.06529 6.93048C8.06529 7.23683 8.18668 7.53063 8.40276 7.74725C8.61883 7.96387 8.9119 8.08556 9.21747 8.08556Z"
                  fill="#d0963e"
                  fill-opacity="1"
                />
              </svg>
            </div>
          </template>
          <div class="popoverTitle">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              label="列展示"
              size="large"
              class="customCheckbox"
              @change="changeAllCheckBox"
            />
            <div class="reset" @click.stop="reset">重置</div>
          </div>
          <div class="popoverBottom">
            <div v-if="state.leftFixList.length">
              <div class="dragTitle">固定在列首</div>
              <draggable
                v-model="state.leftFixList"
                group="fixLeft"
                chosenClass="chosenClass"
                dragClass="dragClass"
                animation="300"
                item-key="id"
                handle=".draggable"
              >
                <template #item="{ element }">
                  <div class="oneDraggable">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="holder"
                      width="15"
                      height="15"
                      fill="#c1c1c1"
                      aria-hidden="true"
                      style="cursor: all-scroll"
                      class="draggable"
                    >
                      <path
                        d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"
                      ></path>
                    </svg>
                    <el-checkbox
                      v-model="element.show"
                      :label="element.label"
                      size="large"
                      class="customCheckbox"
                      @change="changeCheckBox"
                    />
                    <!-- 不固定 -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="不固定"
                      placement="top-end"
                      :show-after="1000"
                      :offset="20"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="vertical-align-middle"
                        width="15"
                        height="12"
                        fill="currentColor"
                        aria-hidden="true"
                        class="yidongIcon"
                        @click.stop="cancelFix(element)"
                      >
                        <path
                          d="M859.9 474H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zm-353.6-74.7c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H550V104c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v156h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.6zm11.4 225.4a7.14 7.14 0 00-11.3 0L405.6 752.3a7.23 7.23 0 005.7 11.7H474v156c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V764h62.8c6 0 9.4-7 5.7-11.7L517.7 624.7z"
                        ></path>
                      </svg>
                    </el-tooltip>
                    <!-- 固定列尾 -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="固定在列尾"
                      placement="top-end"
                      :show-after="1000"
                      :offset="20"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="vertical-align-bottom"
                        width="15"
                        height="12"
                        fill="currentColor"
                        class="yidongIcon"
                        aria-hidden="true"
                        @click="clickFixRight(element)"
                      >
                        <path
                          d="M859.9 780H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM505.7 669a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V176c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8z"
                        ></path>
                      </svg>
                    </el-tooltip>
                  </div>
                </template>
              </draggable>
            </div>
            <div v-if="state.noFixList.length">
              <div class="dragTitle">不固定</div>
              <draggable
                v-model="state.noFixList"
                group="notFix"
                chosenClass="chosenClass"
                dragClass="dragClass"
                animation="300"
                item-key="id"
                handle=".draggable"
              >
                <template #item="{ element }">
                  <div class="oneDraggable">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="holder"
                      width="15"
                      height="15"
                      fill="#c1c1c1"
                      aria-hidden="true"
                      style="cursor: all-scroll"
                      class="draggable"
                    >
                      <path
                        d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"
                      ></path>
                    </svg>
                    <el-checkbox
                      v-model="element.show"
                      :label="element.label"
                      size="large"
                      class="customCheckbox"
                      @change="changeCheckBox"
                    />
                    <!-- 固定列首 -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="固定在列首"
                      placement="top-end"
                      :show-after="1000"
                      :offset="20"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="vertical-align-top"
                        width="15"
                        height="12"
                        fill="currentColor"
                        aria-hidden="true"
                        class="yidongIcon"
                        @click="clickFixLeft(element)"
                      >
                        <path
                          d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"
                        ></path>
                      </svg>
                    </el-tooltip>
                    <!-- 固定列尾 -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="固定在列尾"
                      placement="top-end"
                      :show-after="1000"
                      :offset="20"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="vertical-align-bottom"
                        width="15"
                        height="12"
                        fill="currentColor"
                        class="yidongIcon"
                        aria-hidden="true"
                        @click="clickFixRight(element)"
                      >
                        <path
                          d="M859.9 780H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM505.7 669a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V176c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8z"
                        ></path>
                      </svg>
                    </el-tooltip>
                  </div>
                </template>
              </draggable>
            </div>
            <div v-if="state.rightFixList.length">
              <div class="dragTitle">固定到列尾</div>
              <draggable
                v-model="state.rightFixList"
                group="rightFix"
                chosenClass="chosenClass"
                dragClass="dragClass"
                animation="300"
                item-key="id"
                handle=".draggable"
              >
                <template #item="{ element }">
                  <div class="oneDraggable">
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="holder"
                      width="15"
                      height="15"
                      fill="#c1c1c1"
                      aria-hidden="true"
                      style="cursor: all-scroll"
                      class="draggable"
                    >
                      <path
                        d="M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"
                      ></path>
                    </svg>
                    <el-checkbox
                      v-model="element.show"
                      :label="element.label"
                      size="large"
                      class="customCheckbox"
                      @change="changeCheckBox"
                    />
                    <!-- 不固定 -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="不固定"
                      placement="top-end"
                      :show-after="1000"
                      :offset="20"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="vertical-align-middle"
                        width="15"
                        height="12"
                        fill="currentColor"
                        aria-hidden="true"
                        class="yidongIcon"
                        @click.stop="cancelFix(element)"
                      >
                        <path
                          d="M859.9 474H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zm-353.6-74.7c2.9 3.7 8.5 3.7 11.3 0l100.8-127.5c3.7-4.7.4-11.7-5.7-11.7H550V104c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v156h-62.8c-6 0-9.4 7-5.7 11.7l100.8 127.6zm11.4 225.4a7.14 7.14 0 00-11.3 0L405.6 752.3a7.23 7.23 0 005.7 11.7H474v156c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V764h62.8c6 0 9.4-7 5.7-11.7L517.7 624.7z"
                        ></path>
                      </svg>
                    </el-tooltip>
                    <!-- 固定列首 -->
                    <el-tooltip
                      class="box-item"
                      effect="dark"
                      content="固定在列首"
                      placement="top-end"
                      :show-after="1000"
                      :offset="20"
                    >
                      <svg
                        viewBox="64 64 896 896"
                        focusable="false"
                        data-icon="vertical-align-top"
                        width="15"
                        height="12"
                        fill="currentColor"
                        aria-hidden="true"
                        class="yidongIcon"
                        @click="clickFixLeft(element)"
                      >
                        <path
                          d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"
                        ></path>
                      </svg>
                    </el-tooltip>
                  </div>
                </template>
              </draggable>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, reactive, onBeforeMount, onMounted, watch } from 'vue'
  import draggable from 'vuedraggable'

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
    // 布局
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 属性
    defaultAttribute: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableHeader: {
      type: Array,
      required: true,
      default() {
        return []
      }
    }
  })

  const emit = defineEmits([
    'clickBatchButton',
    'fullScreenButton',
    'setTableHeader'
  ])

  const state = reactive({
    props: {
      data: []
    },
    tableHeader: [],
    leftFixList: [],
    noFixList: [],
    rightFixList: []
  })

  const checkAll = ref(false)
  const indeterminate = ref(false)

  // 初始化数据
  function initData() {
    state.props.data = props.data
    state.props.defaultAttribute = props.defaultAttribute
  }

  // 点击批量按钮
  function clickBatchButton(item, index) {
    emit('clickBatchButton', item, index)
  }

  // 设置表头拖拽内容
  function initHeaderData() {
    state.leftFixList = []
    state.noFixList = []
    state.rightFixList = []
    state.tableHeader.forEach(item => {
      if (item.fixed === 'left') {
        state.leftFixList.push(item)
      } else if (item.fixed === 'right') {
        state.rightFixList.push(item)
      } else {
        state.noFixList.push(item)
      }
    })
  }

  // 取消固定
  function cancelFix(element) {
    const index = state.tableHeader.findIndex(i => i.prop === element.prop)
    if (index > -1) {
      delete state.tableHeader[index].fixed
    }
    initHeaderData()
    emit('setTableHeader', state.tableHeader)
  }

  // 固定到列首
  function clickFixLeft(element) {
    const index = state.tableHeader.findIndex(i => i.prop === element.prop)
    if (index > -1) {
      state.tableHeader[index].fixed = 'left'
    }
    initHeaderData()
    emit('setTableHeader', state.tableHeader)
  }

  // 固定到列尾
  function clickFixRight(element) {
    const index = state.tableHeader.findIndex(i => i.prop === element.prop)
    if (index > -1) {
      state.tableHeader[index].fixed = 'right'
    }
    initHeaderData()
    emit('setTableHeader', state.tableHeader)
  }

  // 操作是否显示
  function changeCheckBox() {
    state.tableHeader = state.leftFixList
      .concat(state.noFixList)
      .concat(state.rightFixList)
    initTopCheckBox()
    emit('setTableHeader', state.tableHeader)
  }

  function changeAllCheckBox() {
    if (checkAll.value) {
      state.tableHeader.forEach(i => (i.show = true))
    } else {
      state.tableHeader.forEach(i => (i.show = false))
    }
    emit('setTableHeader', state.tableHeader)
    initHeaderData()
  }

  function initTopCheckBox() {
    console.log(
      state.tableHeader.filter(i => i.show).length === state.tableHeader.length
    )
    checkAll.value =
      state.tableHeader.filter(i => i.show).length === state.tableHeader.length
    indeterminate.value =
      state.tableHeader.filter(i => i.show).length &&
      state.tableHeader.filter(i => i.show).length !== state.tableHeader.length
  }

  function reset() {
    state.tableHeader = JSON.parse(JSON.stringify(props.tableHeader))
    initHeaderData()
    initTopCheckBox()
    emit('setTableHeader', state.tableHeader)
  }

  watch(props, () => {
    // 初始化数据
    initData()
  })
  onBeforeMount(() => {
    // console.log(`the component is now onBeforeMount.`)
    // 初始化数据
    initData()
    state.tableHeader = JSON.parse(JSON.stringify(props.tableHeader))
    initHeaderData()
    initTopCheckBox()
  })
  onMounted(() => {
    // console.log(`the component is now mounted.`)
  })
</script>
<style lang="scss" scoped>
  .components-batch {
    margin: 0%;
    width: 100%;
    .ap-box {
      width: 100%;
      display: flex;
      flex-flow: wrap;
      justify-content: flex-start;
      align-items: flex-end;
      align-content: flex-end;
      .ap-box-left {
        .el-button {
          font-size: var(--jy-font-size-caption);
        }
      }
      .ap-box-right {
        margin-left: auto;
        display: flex;
        align-items: center;
        .ap-box-right-icon {
          cursor: pointer;
          @include mixin-width(16);
          @include mixin-height(16);
        }
        .checked {
          display: none;
        }
        .ap-box-right-fill {
          @include mixin-margin-right(16);
        }
        .shuaxin:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .daochu:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .dayin:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .quanping:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
        .shezhi:hover {
          .ap-box-right-icon {
            display: none;
          }
          .checked {
            display: inline-block;
          }
        }
      }
    }

    .margin-0 {
      margin: 0% !important;
    }
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .button {
      color: #3e78d0;
    }
    .text {
      font-size: 14px;
    }

    .item {
      margin-bottom: 18px;
    }

    .box-card {
      width: 480px;
    }
  }
</style>
<style lang="scss">
  .popoverTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    padding: 0 15px;

    .reset {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }

  .popoverBottom {
    padding: 5px 15px 15px;
  }

  .oneDraggable {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;

    .customCheckbox {
      margin-left: 15px;

      .el-checkbox__label {
        width: 110px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  .dragClass {
    border: 2px solid var(--el-color-primary);
  }

  .chosenClass {
    background-color: var(--el-color-primary);
  }

  .dragTitle {
    margin: 6px 0;
    padding-left: 24px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }

  .yidongIcon {
    color: var(--el-color-primary);
    margin-left: 5px;
    cursor: pointer;
  }

  .oneDraggable:hover {
    background-color: var(--el-color-primary-light-9);
  }
</style>
