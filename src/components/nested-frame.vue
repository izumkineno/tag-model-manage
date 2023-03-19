<template>
  <NestedTags :data="store.todo" :data-info="store.info.todo"
              :style="store.info.todo.expansion ? { position: 'sticky',top: 0,'z-index': 3000 } : ''"
              class="todo-frame"/>
  <NestedTags :data="store.prompt" :data-info="store.info.prompt"/>
  <NestedTags :data="store.promptNeg" :data-info="store.info.promptNeg"/>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/main_store'
import NestedTags from '@/components/nested-tags.vue'

const store = mainStore()

</script>
<style>
.todo-frame {
  top: 0;
  z-index: 3000;
  .el-card__body {
    max-height: 40vh;
    overflow: hidden;
  }
}
</style>
