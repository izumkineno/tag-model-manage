<template>
  <NestedCard :type="'todo'"
              :style="config.info.todo.expansion ? { position: 'sticky',top: 0,'z-index': 900 } : ''"
              class="todo-frame"/>
  <NestedCard :type="'prompt'"/>
  <NestedCard :type="'promptNeg'"/>
  <contextmenu-view />
</template>

<script lang="ts" setup>
import { configStore } from '@/store/config_store'
import NestedCard from '@/components/nested-card.vue'
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
