<template>
  <el-affix :offset="120">
    <el-button :icon="Edit" circle type="primary" @click="drawer = true"/>
  </el-affix>
  <el-drawer
    modal-class="black"
    v-model="drawer"
    :title="title"
    direction="ltr"
    size="75%">
    <template #header>
      <el-space wrap>
        <a href="https://github.com/izumkineno/tag-model-manage" target="_blank" title="项目地址">
          <svg aria-hidden="true" height="50"
               style=" color:#fff; z-index: 999; position: fixed; top: 0; border: 0; left: 0; transform: scale(-1, 1);"
               viewBox="0 0 250 250"
               width="50">
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" style="fill:var(--el-color-primary);"></path>
            <path
              class="octo-arm"
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor" style="transform-origin: 130px 106px;"></path>
            <path
              class="octo-body"
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
          </svg>
        </a>
        <el-button style="margin-left: 0.7rem" type="primary" @click="store.output">输出到webUI</el-button>
        <el-switch
          v-model="store.config.switch.autoStart.active"
          :active-text="store.config.switch.autoStart.name"
          :inactive-text="store.config.switch.autoStart.name"
          class="ml-2"
          inline-prompt/>
        <el-button ref="buttonRef" v-click-outside="onClickOutside">帮助</el-button>
        <el-button @click="store.GradioConfig(false)">保存生成图基础配置</el-button>
        <el-input v-model="input" clearable placeholder="词条搜索（cerfai提供）" @keydown.enter="tagSearch"/>
        <el-button :icon="Search" circle size="small" type="primary" @click="tagSearch"/>
      </el-space>
      <el-popover
        ref="popoverRef"
        :virtual-ref="buttonRef"
        :width="200"
        title="快捷键"
        trigger="click"
        virtual-triggering>
        <div v-for="i of text" :key="i"> {{ i }}</div>
      </el-popover>
    </template>
    <el-scrollbar>
      <res-show/>
      <NestedFrame/>
    </el-scrollbar>
  </el-drawer>
</template>

<script lang="ts" setup>
import NestedFrame from '@/components/nested-frame.vue'
import { Edit, Search } from '@element-plus/icons-vue'
import { onMounted, ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { mainStore } from '@/store/main_store'
import ResShow from '@/components/tags-cerfai.vue'

const store = mainStore()

const title = 'AI画图标签管理器'

const text = [
  '左键',
  'click       启用/禁用',
  '+ Ctr       编辑',
  '+ Alt       权重',
  '+ Ctr + Alt 删除',
  '右键',
  'click       菜单',
  '+ Ctr       添加（回车键批量）',
  '+ Alt       添加组',
  '+ Ctr + Alt 切换tag模式',
  '点击下面空白处生成tag',
  '回车键或输入栏右边按钮搜索',
  '点击一次搜索可能没响应，好像是API的原因',
  '空输入时清空表格',
  '点击表格后 待选/草稿栏 会出现对应tag'
]

const drawer = ref(false)
const input = ref('')
const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const tagSearch = () => {
  if (input.value.length > 0) {
    store.cerfaitagSearch(input.value)
  } else {
    store.tableData = []
  }
}
onMounted(() => {
  try {
    store.GradioConfig(true)
  } catch (e) {
    console.log(e)
  }
})
</script>
<style>
.el-affix {
  position: absolute;
  top: 5rem;
  right: 0.5rem;
}

.el-drawer__header {
  margin: 0 !important;
}

.el-scrollbar__view {
  padding-right: 1rem;
}
</style>
