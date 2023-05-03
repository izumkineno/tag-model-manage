<template>
  <div v-if="contextmenu.showMenu" :style="{ top: `${contextmenu.y}px`, left: `${contextmenu.x}px` }" id="menu" class="menu">
    <div>{{ contextmenu.event.target.__draggable_context.element.name }}</div>
    <ul>
      <li v-for="i of contextmenu.menu" :key="i.name" @click="menuClick(i)">{{ i.name }}</li>
    </ul>
  </div>
  <div v-if="contextmenu.showMenuGroup" :style="{ top: `${contextmenu.y}px`, left: `${contextmenu.x}px` }" id="menu-group"  class="menu">
    <ul>
      <li v-for="i of contextmenu.menuGroup" :key="i.name" @click="menuGroupClick(i)">{{ i.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { contextmenuStore } from '@/store/contextmenu_store'

const contextmenu = contextmenuStore()

const menuClick = (i: { action: () => void; }) => {
  i.action()
  contextmenu.showMenu = false
}

const menuGroupClick = (i: { action: () => void; }) => {
  i.action()
  contextmenu.showMenuGroup = false
}

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
  width: 100px;
  border-radius: 5px;
  overflow-x: hidden;

  div {
    color: white;
    font-weight: bold;
    background: var(--el-color-primary);
    border-radius: 5px;
    box-sizing: border-box;
    margin: 5px auto;
    padding: 5px;
    width: 90px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  div:hover {
    white-space: normal;
    overflow: visible;
    text-overflow: unset;
    word-break: break-all;
  }

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
