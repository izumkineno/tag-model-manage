import { defineStore } from 'pinia'
import { mainStore } from '@/store/main_store'

export const contextmenuStore = defineStore('contextmenu', {
  persist: false,
  state: (): contextMenuStore => {
    return {
      showMenu: false,
      showMenuGroup: false,
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
          name: '复制',
          icon: 'copy',
          key: '',
          action: () => {
            // @ts-ignore
            main.copy(this.event, this.index, this.type)
          }
        },
        5: {
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
    },
    menuGroup() {
      const main = mainStore()
      const menuFunc: Record<number, menuFunction> = {
        1: {
          name: '新建tag',
          icon: 'new',
          key: '',
          action: () => {
            // @ts-ignore
            main.add(this.event, this.index, this.type)
          }
        },
        2: {
          name: '新建tag组',
          icon: 'new',
          key: '',
          action: () => {
            // @ts-ignore
            main.add(this.event, this.index, this.type, true)
          }
        }
      }
      return menuFunc
    }
  },
  actions: {
    // 右键tag菜单 todo: 随屏幕滚动
    contextMenuClick(e: PointerEvent, index: number[], type: TTagType, group?: boolean) {
      // 记录传入参数
      this.event = e
      this.index = index
      this.type = type
      // 关闭菜单
      const onClickOutside = () => {
        // 降低关闭优先级
        const t1 = setTimeout(() => {
          group ? this.showMenuGroup = false : this.showMenu = false
          clearTimeout(t1)
        })
      }

      const t2 = setTimeout(() => {
        // 展开菜单
        group ? this.showMenuGroup = true : this.showMenu = true

        // 屏幕长宽
        const screenWidth = window.innerWidth
        const screenHeight = window.innerHeight
        console.log(screenWidth, screenHeight, e.clientX, e.clientY)

        const menuWidth = 350
        const menuHeight = Object.keys(group ? this.menuGroup : this.menu).length * 50 + 50

        this.x = e.clientX + menuWidth > screenWidth ? screenWidth - menuWidth : e.clientX
        this.y = e.clientY + menuHeight > screenHeight ? screenHeight - menuHeight : e.clientY

        // 添加关闭菜单监听
        document.addEventListener('mouseup', onClickOutside, { once: true })
        clearTimeout(t2)
      }, 100)
    }
  }
})
