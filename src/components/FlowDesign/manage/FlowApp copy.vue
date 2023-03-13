<template>
  <div class="flow-app">
    <a-space direction="vertical" class="w-fill">
      <a-row :gutter="8">
        <a-col :span="6">
          <a-card>
            <div class="app-todo">
              <a-row>
                <a-col :span="12" class="mt-icon">
                  <span
                    role="img"
                    aria-label="bell"
                    class="anticon anticon-bell"
                  >
                    <svg
                      focusable="false"
                      class=""
                      data-icon="bell"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      aria-hidden="true"
                      viewBox="64 64 896 896"
                    >
                      <path
                        d="M512 220c-55.6 0-107.8 21.6-147.1 60.9S304 372.4 304 428v340h416V428c0-55.6-21.6-107.8-60.9-147.1S567.6 220 512 220zm280 208c0-141.1-104.3-257.8-240-277.2v.1c135.7 19.4 240 136 240 277.1zM472 150.9v-.1C336.3 170.2 232 286.9 232 428c0-141.1 104.3-257.7 240-277.1z"
                        fill="#e6f7ff"
                      ></path>
                      <path
                        d="M816 768h-24V428c0-141.1-104.3-257.7-240-277.1V112c0-22.1-17.9-40-40-40s-40 17.9-40 40v38.9c-135.7 19.4-240 136-240 277.1v340h-24c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h216c0 61.8 50.2 112 112 112s112-50.2 112-112h216c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM512 888c-26.5 0-48-21.5-48-48h96c0 26.5-21.5 48-48 48zm208-120H304V428c0-55.6 21.6-107.8 60.9-147.1S456.4 220 512 220c55.6 0 107.8 21.6 147.1 60.9S720 372.4 720 428v340z"
                        fill="#1890ff"
                      ></path>
                    </svg>
                  </span>
                </a-col>
                <a-col :span="12">
                  <div class="mt-title">我的代办</div>
                  <div class="mt-value">59</div>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
        <a-col :span="18">
          <a-card>
            <a-row>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <span
                      role="img"
                      aria-label="play-circle"
                      class="anticon anticon-play-circle"
                      ><svg
                        focusable="false"
                        class=""
                        data-icon="play-circle"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                      >
                        <path
                          d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"
                          fill="#1890ff"
                        ></path>
                        <path
                          d="M512 140c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm164.1 378.2L457.7 677.1a8.02 8.02 0 01-12.7-6.5V353a8 8 0 0112.7-6.5l218.4 158.8a7.9 7.9 0 010 12.9z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M676.1 505.3L457.7 346.5A8 8 0 00445 353v317.6a8.02 8.02 0 0012.7 6.5l218.4-158.9a7.9 7.9 0 000-12.9z"
                          fill="#1890ff"
                        ></path></svg
                    ></span>
                  </div>
                  <span class="app-task-title">我发起的</span>
                </div>
              </a-col>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <span
                      role="img"
                      aria-label="carry-out"
                      class="anticon anticon-carry-out"
                      ><svg
                        focusable="false"
                        class=""
                        data-icon="carry-out"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                      >
                        <path
                          d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v584z"
                          fill="#1890ff"
                        ></path>
                        <path
                          d="M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v584h656V256H712v48zm-17.5 128.8L481.9 725.5a16.1 16.1 0 01-26 0l-126.4-174c-3.8-5.3 0-12.7 6.5-12.7h55.2c5.2 0 10 2.5 13 6.6l64.7 89 150.9-207.8c3-4.1 7.9-6.6 13-6.6H688c6.5 0 10.3 7.4 6.5 12.8z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M688 420h-55.2c-5.1 0-10 2.5-13 6.6L468.9 634.4l-64.7-89c-3-4.1-7.8-6.6-13-6.6H336c-6.5 0-10.3 7.4-6.5 12.7l126.4 174a16.1 16.1 0 0026 0l212.6-292.7c3.8-5.4 0-12.8-6.5-12.8z"
                          fill="#1890ff"
                        ></path></svg
                    ></span>
                  </div>
                  <span class="app-task-title">我处理的</span>
                </div>
              </a-col>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <span
                      role="img"
                      aria-label="sound"
                      class="anticon anticon-sound"
                      ><svg
                        focusable="false"
                        class=""
                        data-icon="sound"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                      >
                        <path
                          d="M275.4 424H146v176h129.4l18 11.7L586 803V221L293.3 412.3z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M892.1 737.8l-110.3-63.7a15.9 15.9 0 00-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0021.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM934 476H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM760 344a15.9 15.9 0 0021.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 00-21.7-5.9L746 287.8a15.99 15.99 0 00-5.8 21.8L760 344zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1zM586 803L293.4 611.7l-18-11.7H146V424h129.4l17.9-11.7L586 221v582z"
                          fill="#1890ff"
                        ></path></svg
                    ></span>
                  </div>
                  <span class="app-task-title">抄送我的</span>
                </div>
              </a-col>
              <a-col :span="6">
                <div class="app-task">
                  <div class="app-task-icon">
                    <span
                      role="img"
                      aria-label="file-add"
                      class="anticon anticon-file-add"
                      ><svg
                        focusable="false"
                        class=""
                        data-icon="file-add"
                        width="1em"
                        height="1em"
                        fill="currentColor"
                        aria-hidden="true"
                        viewBox="64 64 896 896"
                      >
                        <path
                          d="M534 352V136H232v752h560V394H576a42 42 0 01-42-42zm126 236v48c0 4.4-3.6 8-8 8H544v108c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V644H372c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h108V472c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v108h108c4.4 0 8 3.6 8 8z"
                          fill="#e6f7ff"
                        ></path>
                        <path
                          d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0042 42h216v494z"
                          fill="#1890ff"
                        ></path>
                        <path
                          d="M544 472c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v108H372c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h108v108c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V644h108c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V472z"
                          fill="#1890ff"
                        ></path></svg
                    ></span>
                  </div>
                  <span class="app-task-title">发起流程</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>

      <a-card title="我的流程">
        <template #extra>
          <a-button type="primary" shape="round" :size="size">
            <template #icon>
              <plus-outlined />
            </template>
            <span>创建</span>
          </a-button>
        </template>
        <a-row>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
          <a-col :span="4">
            <a-dropdown :trigger="['contextmenu']">
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a-button type="link" @click="design(data)"
                      >流程设计</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="edit(data)"
                      >模型修改</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="sort(data, 2)"
                      >模型排序</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="move(data)"
                      >模型移动</a-button
                    >
                  </a-menu-item>
                  <a-menu-item>
                    <a-button type="link" @click="stop(data)">
                      <span style="color: red">模型停用</span>
                    </a-button>
                  </a-menu-item>
                </a-menu>
              </template>
              <div class="app-item">
                <div class="low-app-icon size-middle back-color-3">
                  <span
                    class="app-iconify anticon"
                    style="font-size: 28px; display: inline-flex"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      aria-hidden="true"
                      role="img"
                      class="iconify iconify--ant-design"
                      width="1em"
                      height="1em"
                      preserveAspectRatio="xMidYMid meet"
                      viewBox="0 0 1024 1024"
                    >
                      <path
                        fill="currentColor"
                        d="M894 462c30.9 0 43.8-39.7 18.7-58L530.8 126.2a31.81 31.81 0 0 0-37.6 0L111.3 404c-25.1 18.2-12.2 58 18.8 58H192v374h-72c-4.4 0-8 3.6-8 8v52c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-52c0-4.4-3.6-8-8-8h-72V462h62zM381 836H264V462h117v374zm189 0H453V462h117v374zm190 0H642V462h118v374z"
                      ></path></svg
                  ></span>
                </div>
                <div class="app-item-name">门户应用</div>
              </div>
            </a-dropdown>
          </a-col>
        </a-row>
      </a-card>
    </a-space>
  </div>
</template>
<script setup>
  import { ref, watch, computed, onMounted } from 'vue'
  import useCommon from '../hooks/useCommon'
  // 公共方法
  const { getflowIcon, size } = useCommon()
  const emit = defineEmits([
    'done',
    'rename',
    'sort',
    'del',
    'design',
    'edit',
    'stop',
    'move',
    'click'
  ])
  //  数据
  const categoryDatas = ref([])
  // 默认展开
  const defaultActiveKey = ref([...new Array(100).keys()])
  // 图标
  const iconList = ref([])

  // 接收属性
  const props = defineProps({
    datasource: {
      type: [Array, Function],
      required: true
    },
    width: {
      type: Number,
      required: false,
      default: 100
    },
    readable: {
      type: Boolean,
      default: false
    }
  })

  /**
   * 监听值变化
   */
  watch(
    () => props.datasource,
    newVal => {
      reload(newVal)
    }
  )

  /**
   * 图标
   */
  const activeIconSrc = computed(() => {
    return activeIcon => {
      const icon = iconList.value.find(t => t.name_suffix === activeIcon)
      return icon ? icon.url : ''
    }
  })

  /**
   * 表单面板样式
   */
  const modelPanelStyle = computed(() => {
    const width = props.width + '%'
    return {
      width
    }
  })

  onMounted(() => {
    reload()
    iconList.value = getflowIcon()
  })

  const reload = () => {
    if (Array.isArray(props.datasource)) {
      categoryDatas.value = props.datasource
      defaultActiveKey.value = [...new Array(categoryDatas.value.length).keys()]
      emit('done', props.datasource)
    } else if (typeof props.datasource === 'function') {
      props
        .datasource()
        .then(result => {
          categoryDatas.value = result
          defaultActiveKey.value = [
            ...new Array(categoryDatas.value.length).keys()
          ]
          emit('done', result)
        })
        .catch(e => {
          console.error(
            'datasource \u8FD4\u56DE\u7684\u6570\u636E\u9519\u8BEF: ',
            e == null ? void 0 : e.message
          )
        })
    }
  }

  /**
   * 重命名
   * @param {*} record
   */
  const rename = record => {
    emit('rename', record)
  }

  /**
   * 分类排序
   * @param {*} record
   */
  const sort = (record, type) => {
    emit('sort', record, type)
  }

  /**
   * 删除分类
   * @param {*} record
   */
  const delCategory = record => {
    emit('del', record)
  }

  /**
   * 设计
   * @param {*} record
   */
  const design = record => {
    emit('design', record)
  }

  /**
   * 编辑
   * @param {*} record
   */
  const edit = record => {
    emit('edit', record)
  }

  /**
   * 停用
   * @param {*} record
   */
  const stop = record => {
    emit('stop', record)
  }

  /**
   * 移动
   * @param {*} record
   */
  const move = record => {
    emit('move', record)
  }

  /**
   * 点击
   * @param {*} record
   */
  const click = record => {
    emit('click', record)
  }

  defineExpose({
    reload
  })
</script>
