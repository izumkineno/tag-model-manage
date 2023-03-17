<template>
  <NestedTags :data="store.todo" :data-info="store.info.todo"/>
  <NestedTags :data="store.prompt" :data-info="store.info.prompt"/>
  <NestedTags :data="store.promptNeg" :data-info="store.info.promptNeg"/>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/main_store'
import NestedTags from '@/components/nested-tags.vue'

const store = mainStore()

</script>
<style>
</style>
