import { defineStore } from 'pinia'
import { mainStore } from '@/store/main_store'

export const contextmenuStore = defineStore('contextmenu', {
  persist: false,
  state: (): contextMenuStore => {
    return {
      showMenu: false,
      x: 0,
      y: 0
    }
  },
  getters: {
    menu() {
      const main = mainStore()
      const menuFunc: Record<number, menuFunction> = {
        1: {
          name: '开启/关闭',
          icon: 'dashboard',
          key: '',
          action: () => {
            // @ts-ignore
            main.switch(this.event, this.index, this.type)
          }
        },
        2: {
          name: '编辑',
          icon: 'dashboard',
          key: '',
          action: () => {
            // @ts-ignore
            main.inputFocus(this.event, this.index, 'editing', this.type)
          }
        },
        3: {
          name: '权重编辑',
          icon: 'dashboard',
          key: '',
          action: () => {
            // @ts-ignore
            main.inputFocus(this.event, this.index, 'weightEditing', this.type)
          }
        },
        4: {
          name: '删除',
          icon: 'dashboard',
          key: '',
          action: () => {
            // @ts-ignore
            main.delete(this.event, this.index, this.type)
          }
        }
      }
      return menuFunc
    }
  },
  actions: {
    contextMenuClick(e: PointerEvent, index: number[], type: TTagType) {
      // 关闭菜单
      const onClickOutside = () => {
        this.showMenu = false
        document.removeEventListener('click', onClickOutside)
      }
      // 记录传入参数
      this.event = e
      this.index = index
      this.type = type
      // 展开菜单
      this.showMenu = true
      this.x = e.pageX
      this.y = e.pageY
      document.addEventListener('click', onClickOutside)
      // @ts-ignore
      this.event.target.addEventListener('click', onClickOutside)
    }
  }
})
