<template>
  <el-affix :offset="120">
    <el-button :icon="Edit" circle type="primary" @click="drawer = true"/>
  </el-affix>
  <el-drawer
    v-model="drawer"
    :title="title"
    direction="ltr"
    size="90%">
    <template #header>
      <el-space wrap>
        <el-button type="primary" @click="store.output">输出到webUI</el-button>
        <el-switch
          v-model="store.config.switch.autoStart.active"
          :active-text="store.config.switch.autoStart.name"
          :inactive-text="store.config.switch.autoStart.name"
          class="ml-2"
          inline-prompt
        />
        <el-button ref="buttonRef" v-click-outside="onClickOutside">帮助</el-button>
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
      <NestedFrame/>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup>
import NestedFrame from '@/components/nested-frame.vue'
import { Edit } from '@element-plus/icons-vue'
import { ref, unref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { mainStore } from '@/store/main_store'

const store = mainStore()

const drawer = ref(false)
const title = 'AI画图标签管理器'

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
.el-affix {
  position: absolute;
  top: 10rem;
  left: 0.5rem;
}

.el-drawer__header {
  margin: 0 !important;
}

.el-scrollbar__view {
  padding-right: 1rem;
}
</style>
