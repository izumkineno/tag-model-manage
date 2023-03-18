<template>
  <el-card :body-style="dataInfo.expansion ? '' : {display: 'none'}">
    <template #header>
      <el-row class="row-bg" justify="space-between">
        <div>{{ dataInfo.name }}</div>
        <el-switch
          v-model="dataInfo.expansion"
          inline-prompt/>
      </el-row>
    </template>
    <NestedItem
      :children="data"
      :type="dataInfo.type"/>
  </el-card>
</template>

<script lang="ts" setup>
import NestedItem from '@/components/nested-item.vue'

defineProps<{
  data: ITag[]
  dataInfo: IInfoTags
}>()
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
