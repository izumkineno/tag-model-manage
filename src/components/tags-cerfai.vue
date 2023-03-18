<template>
  <el-scrollbar v-if="store.cate" class="menu">
    <el-menu
      :ellipsis="false"
      :unique-opened="true"
      menu-trigger="click"
      mode="horizontal"
      @select="handleSelect">
      <el-sub-menu v-for="i in cate.data.filter(v => v.level === 1)" :key="i.id" :index="i.id.toString()">
        <template #title>{{ i.name }}</template>
        <el-menu-item
          v-for="f in cate.data.filter(v => v.level === 2 && (v.id/100).toFixed(0) === (i.id/100).toFixed(0))"
          :key="f.id"
          :index="f.id.toString()">
          {{ f.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-scrollbar>
  <el-card v-if="store.tableData">
    <el-table
      :data="tableData.data"
      size="small"
      style="width: 100%; height: 50vh"
      @row-click="rowClick">
      <el-table-column fixed label="词条" prop="name"/>
      <el-table-column fixed label="中文名" prop="t_name"/>
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

const store = mainStore()
const cate = {
  code: 200,
  data: [],
  msg: '获取完整分类成功'
}

const tableData = {
  code: 200,
  data: []
}

const handleSelect = (index: number) => {
  console.log(index)
}
const rowClick = (row: { name: string | undefined; }) => {
  const tag: ITag = store.tagModel(row.name)
  tag.state.editing = false
  store.todo.push(tag)
  store.info.todo.expansion = true
}

</script>

<style scoped>
.menu {
  position: relative;
  overflow: hidden;
}
</style>
