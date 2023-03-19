<template>
  <el-card :body-style="store.config.switch.table ? '' : {display: 'none'}">
    <template #header>
      <el-row align="middle" justify="space-between">
        <el-scrollbar style="width: calc(99% - 40px);overflow-y: hidden">
          <el-menu
            :ellipsis="false"
            :unique-opened="true"
            mode="horizontal"
            @select="handleSelect">
            <el-sub-menu v-for="i in store.cate.filter(v => v.level === 1)" :key="i.id" :index="i.id.toString()">
              <template #title>{{ i.name }}</template>
              <el-menu-item
                v-for="f in store.cate.filter(v => v.level === 2 && (v.id/100).toFixed(0) === (i.id/100).toFixed(0))"
                :key="f.id"
                :index="f.id.toString()">
                {{ f.name }}
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
        <el-switch
          v-model="store.config.switch.table"
          inline-prompt/>
      </el-row>
    </template>
    <el-table
      :data="store.tableData"
      size="small"
      style="width: 100%; height: 50vh"
      @row-click="rowClick">
      <el-table-column label="词条" prop="name"/>
      <el-table-column label="中文名" prop="t_name"/>
      <el-table-column label="NFSW" prop="is_nsfw"/>
      <el-table-column label="描述" prop="desc"/>
      <el-table-column label="备注" prop="remarks"/>
      <el-table-column label="更新时间" prop="update_time"/>
      <el-table-column label="贡献者" prop="contributor"/>
    </el-table>
  </el-card>
</template>

<script lang="ts" setup>
import { mainStore } from '@/store/main_store'
import { onMounted } from 'vue'

const store = mainStore()

onMounted(() => {
  try {
    store.cataGet()
  } catch (e) {
    ElMessage.error('获取分类失败：' + e)
  }
})

const handleSelect = (index: number) => {
  store.cerfaitagSearch('', index.toString())
}
const rowClick = (row: { name: string | undefined; }) => {
  const tag: ITag = store.tagModel(row.name)
  tag.state.editing = false
  store.todo.push(tag)
  store.info.todo.expansion = true
}

</script>

<style>
.menu {
  position: relative;
  overflow: hidden;
  width: 80%;
}

.el-sub-menu__title.el-tooltip__trigger.el-tooltip__trigger {

}

.el-menu.el-menu--popup {
  min-width: 0 !important;
  align-items: center;
}

.el-menu-item {
  display: flex;
  align-content: space-around;
}
</style>
