<template>
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
import { mainStore } from '@/store/main_store'
import NestedItem from '@/components/nested-item.vue'

const store = mainStore()

</script>
<style>
.el-card {
  margin: 1rem;
}

.el-card__header {
  padding: 0.5rem !important;
}

.el-card__body > ul {
  width: 100%;
  height: 100%;
}
</style>
