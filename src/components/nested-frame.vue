<template>
  <div :style="store.info.todo.expansion && {position: 'sticky'}" class="todo-frame">
    <NestedTags :data="store.todo" :data-info="store.info.todo"/>
  </div>
  <NestedTags :data="store.prompt" :data-info="store.info.prompt"/>
  <NestedTags :data="store.promptNeg" :data-info="store.info.promptNeg"/>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/main_store'
import NestedTags from '@/components/nested-tags.vue'

const store = mainStore()

</script>
<style scoped>
.todo-frame {
  top: 0;
  z-index: 9999;
}
</style>
