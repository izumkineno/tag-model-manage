<template>
  <NestedTags :type="'todo'"
              :style="config.info.todo.expansion ? { position: 'sticky',top: 0,'z-index': 3000 } : ''"
              class="todo-frame"/>
  <NestedTags :type="'prompt'"/>
  <NestedTags :type="'promptNeg'"/>
  <contextmenu-view />
</template>

<script lang="ts" setup>
import { configStore } from '@/store/config_store'
import NestedTags from '@/components/nested-card.vue'
import ContextmenuView from '@/components/contextmenu-view.vue'

const config = configStore()

</script>
<style lang="less">
.todo-frame {
  top: 0;
  z-index: 3000;
  .el-card__body {
    max-height: 40vh;
    overflow: hidden;
  }
}
</style>
