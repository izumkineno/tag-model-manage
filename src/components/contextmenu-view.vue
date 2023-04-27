<template>
  <div v-if="contextmenu.showMenu" :style="{ top: `${contextmenu.y}px`, left: `${contextmenu.x}px` }" class="menu">
    <ul>
      <li v-for="i of contextmenu.menu" :key="i.name" @click="() => {i.action();contextmenu.showMenu = false}">{{ i.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { contextmenuStore } from '@/store/contextmenu_store'

const contextmenu = contextmenuStore()

</script>

<style lang="less" scoped>
.menu {
  display: inline-block;
  position: fixed;
  box-sizing: border-box;
  background-color: var(--el-color-primary-dark-2);
  border: 1px solid #0077c2;
  padding: 5px;
  z-index: 999;
  width: auto;
  border-radius: 5px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 5px;
      cursor: pointer;
      color: white;
      border-radius: 5px;
    }

    li:hover {
      background-color: var(--el-color-primary-light-3);
    }
  }
}

</style>
