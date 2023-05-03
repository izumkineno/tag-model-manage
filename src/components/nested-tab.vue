<template>
  <el-row style="align-items: center" justify="space-between">
    <el-scrollbar class="card-tab-scroll-container">
    <Draggable
      :item-key="typeof props.index === 'undefined' ? '' : index.toString()"
      :list="children"
      class="card-tab"
      filter=".on"
      tag="ul"
      v-bind="dragOptions"

      @dblclick="store.inputFocus($event, index, 'editing', type)"
      @click.stop.exact="store.clickHandle($event, index, type)"
      @click.stop.exact.ctrl="store.clickHandle($event, index, type)"
      @click.stop.exact.ctrl.alt="store.clickHandle($event, index, type)">
      <template #item="{ element }">
        <li
          style="flex-wrap: inherit"
          :class="ElState(element)"
          class="tag-frame">
          <input
            v-if="element.state.editing"
            v-model="element.name"
            class="tag-input"
            @pointerdown.stop
            @blur="store.editingInput(element)"
            @keyup.enter="store.editingInputMulti(element, index, type)"
            @click.stop
            @contextmenu.stop/>
          <div v-if="element.state.editing" style="display: inline-block; visibility: hidden;">
            {{ element.name + '1' }}
          </div>
          <span v-else>{{ element.name }}</span>
          <el-popconfirm :title="`确认删除?`"
            @confirm="btnClose(index, type)">
            <template #reference>
              <el-button v-if="!element.state.editing" circle size="small" style="margin-left: 3px; width: 1rem; height: 1rem; border: 0" :icon="Close" @click="getEvent"/>
            </template>
          </el-popconfirm>
        </li>
      </template>
    </Draggable>
  </el-scrollbar>
    <el-button circle :icon="Plus" class="tab-add" @click="store.add($event, index, type)" />
    <span class="counter">{{ store[type].length }}</span>
  </el-row>
</template>
<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { Plus, Close } from '@element-plus/icons-vue'
import { computed, onMounted, reactive } from 'vue'
import { mainStore } from '@/store/main_store'

const store = mainStore()

const props = defineProps<{
  children: ITag[]
  type: TTagType
  index?: number[]
}>()

// Draggable 配置
const dragOptions = reactive({
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost-tab'
})

// 从根元素到父元素的位置数组，如果没有爷级则为[]
const index = computed(() => {
  return typeof props.index === 'undefined' ? [] : props.index
})

// tab 状态
const ElState = (element: ITag) => {
  const editing = element.state.editing ? 'editing ' : ''
  const weightEditing = element.state.weightEditing ? 'weight ' : ''
  const active = element.state.active ? '' : 'on '
  const group = typeof element.children !== 'undefined' ? 'group ' : ''
  return group + active + editing + weightEditing
}

// 获取删除时的事件
let eventClose: { target: { parentElement: PointerEvent; }; }
const getEvent = (e: { target: { parentElement: PointerEvent; }; }) => {
  eventClose = e
}

// 删除
const btnClose = (index: number[], type: TTagType) => {
  // console.log(e, index, type, e.target.parentElement, e.target.parentElement.__draggable_context)
  store.delete(eventClose.target.parentElement, index, type)
}

onMounted(() => {
  // 解决第一次启动时显示数据和存储数据没连接的问题
  const active = props.children.filter(v => !v.state.active)[0]
  // console.log(active)
  store.tabChange(props.type, active)
})

</script>
<style lang="less">
.card-tab-scroll-container {
  width: calc(100% - 5rem);
  padding: 0 0.5rem;
  box-sizing: border-box;
  .card-tab {
    display: flex;
    flex-wrap: inherit;
    word-break: keep-all;
    padding: 0;
    cursor: pointer;
    .tag-frame {
      box-sizing: border-box;
      margin: 0;
      padding: 0.5rem;
      border: 1px solid var(--el-border-color);
      border-bottom: none;
      color: var(--el-color-info);
      font-weight: normal;
      span {
        margin: 0;
        pointer-events: none;
      }
    }
    .tag-frame.on {
      color: var(--el-color-primary);
      font-weight: bold;
    }
    .tag-frame.ghost-tab {
      background: rgba(255, 255, 255, .3);
      .dragArea {
        display: none;
      }
    }
  }
}

.el-button {
  .el-icon {
    pointer-events: none;
  }
}

</style>
