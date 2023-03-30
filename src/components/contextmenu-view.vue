<template>
  <div @contextmenu.prevent="onContextMenu">
    <div>1263</div>
  </div>
  <div v-if="showMenu" :style="{ top: `${y}px`, left: `${x}px` }" class="menu">
    <ul>
      <li>菜单项1</li>
      <li>菜单项2</li>
      <li>菜单项3</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showMenu = ref(false)
let x = 0
let y = 0

const onContextMenu = (event: MouseEvent) => {
  event.preventDefault()
  showMenu.value = true
  x = event.pageX
  y = event.pageY
  document.addEventListener('click', onClickOutside)
}

const onClickOutside = () => {
  showMenu.value = false
  document.removeEventListener('click', onClickOutside)
}

</script>

<style lang="less">
.menu {
  display: inline-block;
  position: fixed;
  box-sizing: border-box;
  background-color: var(--el-color-primary);
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
