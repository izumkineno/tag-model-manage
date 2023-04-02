<template>
  <Draggable
    :item-key="typeof props.index === 'undefined' ? '' : index.toString()"
    :list="children"
    class="dragArea"
    tag="ul"
    v-bind="dragOptions"

    @click.stop.exact="store.clickHandle($event, index, type)"
    @click.stop.exact.ctrl="store.clickHandle($event, index, type)"
    @click.stop.exact.alt="store.clickHandle($event, index, type)"
    @click.stop.exact.ctrl.alt="store.clickHandle($event, index, type)"

    @contextmenu.prevent.stop.exact="store.clickHandle($event, index, type)"
    @contextmenu.prevent.stop.exact.ctrl="store.clickHandle($event, index, type)"
    @contextmenu.prevent.stop.exact.alt="store.clickHandle($event, index, type)"
    @contextmenu.prevent.stop.exact.ctrl.alt="store.clickHandle($event, index, type)">
    <template #item="{ element }">
      <li
        :class="ElState(element)"
        :style="ElStyle(element)"
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
        <input
          v-if="element.state.weightEditing"
          v-model="element.weight"
          class="tag-input"
          :step="store.isLora(element) ? 0.1 : 1"
          max="7"
          min="-7"
          type="number"
          @pointerdown.stop
          @blur="store.weightInput(element)"
          @keyup.enter="store.weightInput(element)"/>
        <div v-if="element.state.editing" style="display: inline-block; visibility: hidden;">{{
            element.name + '1'
          }}
        </div>
        <span v-else>{{ element.name }}</span>
        <NestedItem
          v-if="element.children"
          :children="element.children"
          :index="index.concat([props.children.indexOf(element)])"
          :type="type"/>
      </li>
    </template>
  </Draggable>
</template>
<script lang="ts" setup>
import Draggable from 'vuedraggable'
import { computed } from 'vue'
import { mainStore } from '@/store/main_store'

const store = mainStore()

const props = defineProps<{
  children: ITag[]
  type: TTagType
  index?: number[]
}>()

// Draggable 配置
const dragOptions = {
  animation: 200,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
}

// 从根元素到父元素的位置数组，如果没有爷级则为[]
const index = computed(() => {
  return typeof props.index === 'undefined' ? [] : props.index
})

// tag 状态
const ElState = (element: ITag) => {
  const editing = element.state.editing ? 'editing ' : ''
  const weightEditing = element.state.weightEditing ? 'weight ' : ''
  const active = element.state.active ? '' : 'off '
  const group = typeof element.children !== 'undefined' ? 'group ' : ''
  return group + active + editing + weightEditing
}
// tag css
const ElStyle = (element: ITag) => {
  // 统一调动颜色区间
  const color = (nu: number) => {
    return nu * 0.7 + 0.3
  }
  // 模板
  const model: { background?: string } = {}
  let bg
  if (typeof element.weightNu !== 'undefined') {
    const nu = element.weightNu
    bg = nu > 1
      ? `rgba(0, 200, 0, ${color(nu - 1)}`
      : `rgba(200, 0, 0, ${color(1 - nu)})`
  } else {
    const nu = element.weight
    if (nu === 0) {
      bg = ''
    } else {
      bg = nu > 0
        ? `rgba(0, 200, 0, ${color(1.1 ** nu - 1)})`
        : `rgba(200, 0, 0, ${color(1 - 1 / (1.1 ** -nu))})`
    }
  }
  if (bg.length > 0) {
    model.background = bg
  }
  return model
}

</script>

<style lang="less">
li {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.dragArea {
  box-sizing: border-box;
  padding: 10px;

  li.tag-frame {
    border: 2px solid;
    border-radius: 15px;
  }

  li.tag-frame.off {
    background: var(--el-color-info) !important;
  }

  li.tag-frame.group {
    border: 1px dashed;
  }
}

div.el-card__body {
  padding: 0.5rem;

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    margin: 0;
    padding: 1rem;

    li {
      margin: 5px;
      align-items: center;

      span {
        margin: 10px 10px 10px 0;
      }

      .dragArea {
        display: flex;
        flex-wrap: wrap;
        border: 1px dashed;
        border-radius: 15px;
        border-color: var(--el-color-primary-light-7);
      }
    }
  }
}

div.el-card__body > ul > li {
  border-radius: 15px;
  background: var(--el-color-primary);
  color: white;

  span {
    padding-left: 10px;
    pointer-events: none;
  }
}

.group.ghost {
  background: rgba(0, 0, 0, .4);
  .dragArea {
    display: none;
  }
}

.tag-frame.editing, .tag-frame.weight {
  display: inline-block;
  position: relative;

  .tag-input {
    width: calc(100% - 2rem);
    margin: 1rem 1rem -1rem;
    border: none;
    border-radius: 15px;
    padding: 3px 10px;
    box-sizing: border-box;
  }

  .tag-input:focus {
    border: 0;
    outline: 3px solid aqua;
    box-shadow: 1px 1px 10px 1px aqua;
  }
}

.tag-frame.weight {
  text-align: center;

  span {
    display: block;
    margin: 0.5rem 0;
  }
}

</style>
