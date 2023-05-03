<template>
  <el-card @contextmenu.prevent :body-style="config.info[type].expansion ? '' : { display: 'none' }">
    <template #header>
      <el-row align="middle" class="row-bg" justify="space-between">
        <div>{{ config.info[type].name }}</div>
        <el-switch
          v-model="config.info[type].expansion"
          inline-prompt/>
      </el-row>
    </template>
    <NestedTab :children="store[type + 'Tab']" :type="type + 'Tab'" />
    <el-divider />
    <NestedItem
      :children="store[type]"
      :type="type"/>
  </el-card>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/main_store'
import { configStore } from '@/store/config_store'
import NestedItem from '@/components/nested-item.vue'
import NestedTab from '@/components/nested-tab.vue'

const store = mainStore()
const config = configStore()

defineProps<{
  type: TTagType
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

.el-divider.el-divider--horizontal {
  margin: 0;
}
</style>
