<template>
  <el-button type="primary" @click="store.output">输出到webUI</el-button>
  <el-button ref="buttonRef" v-click-outside="onClickOutside">帮助</el-button>
  <el-popover
    ref="popoverRef"
    :virtual-ref="buttonRef"
    :width="200"
    title="快捷键"
    trigger="click"
    virtual-triggering>
    <div v-for="i of text" :key="i"> {{ i }}</div>
  </el-popover>
  <el-card>
    <template #header>
      <div>提示词</div>
    </template>
    <NestedItem
      :children="store.prompt"
      :type="'prompt'"/>
  </el-card>
  <el-card>
    <template #header>
      <div>反向提示词</div>
    </template>
    <NestedItem
      :children="store.promptNeg"
      :type="'promptNeg'"/>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { mainStore } from '@/store/main_store'
import NestedItem from '@/components/nested-item.vue'

const store = mainStore()

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}
const text = [
  '左键',
  'click       启用/禁用',
  '+ Ctr       编辑',
  '+ Alt       权重',
  '+ Ctr + Alt 删除',
  '右键',
  'click       菜单',
  '+ Ctr       添加',
  '+ Alt       添加组',
  '+ Ctr + Alt 切换tag模式',
  '点击下面空白处生成tag'
]
</script>
<style>
.el-card {
  margin: 0.5rem;
}

.el-card__header {
  padding: 0.5rem !important;
}

.el-card__body {
  width: 100%;
  min-width: 500px;
}

.el-card__body > ul {
  width: 100%;
  height: 100%;
}
</style>
