import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { configStore } from './config_store'
import { contextmenuStore } from '@/store/contextmenu_store'

export const mainStore = defineStore('main', {
  persist: true,
  state: (): TMainStore => {
    return {
      prompt: [
        {
          id: '0',
          name: '这里创建提示词',
          state: {
            active: false,
            editing: false,
            weightEditing: false
          },
          weight: 0,
          longText: false,
          children: []
        }
      ],
      promptNeg: [
        {
          id: '1',
          name: '这里创建反向提示词',
          state: {
            active: false,
            editing: false,
            weightEditing: false
          },
          weight: 0,
          longText: false,
          children: []
        }
      ],
      todo: [],
      promptTab: [],
      promptNegTab: [],
      todoTab: []
    }
  },
  actions: {
    // todo: 按功能拆分文件
    /***
     *  左键默认功能和快捷键映射
     *  0  None        启用/禁用
     *  1  + Ctr       编辑
     *  2  + Alt       权重
     *  3  + Ctr + Alt 删除
     *
     *  右键默认功能和快捷键映射
     *  4  None        菜单
     *  5  + Ctr       添加
     *  6  + Alt       添加组
     *  7  + Ctr + Alt 切换tag模式
     * @param e 点击事件，用于获取原型链上的draggable实例
     * @param index 从根元素到父元素的位置数组，如果没有爷级则为[]，组件nested-item computer 中的 index
     * @param type tag所属类型见类型定义TTagType
     */
    clickHandle(e: PointerEvent, index: number[], type: TTagType) {
      // console.log(e, index)
      // console.log(e.altKey, e.ctrlKey)
      const kc = e.ctrlKey
      const ka = e.altKey
      const clickType = ['click', 'contextmenu']
      const key = (kc ? ka ? 3 : 1 : ka ? 2 : 0) + clickType.indexOf(e.type) * 4
      // console.log(key)
      const fun = {
        0: () => this.switch(e, index, type),
        1: () => this.inputFocus(e, index, 'editing', type),
        2: () => this.inputFocus(e, index, 'weightEditing', type),
        3: () => this.delete(e, index, type),
        4: () => this.contextmenu(e, index, type),
        5: () => this.add(e, index, type),
        6: () => this.add(e, index, type, true),
        7: () => this.longTextMode()
      }
      // @ts-ignore
      const f = fun[key]
      f()
    },
    // todo: 优化？？
    /**
     * 获取tag在draggable数组中的位置
     * @param target 事件的目标event.target
     * @param index 同上，从根元素到父元素的位置数组，如果没有爷级则为[]，组件nested-item computer 中的 index
     * @param type 同上，tag所属类型见类型定义TTagType
     * @param father 是否获取目标元素的父元素
     * @param detail father必须是true才有用，精准获取点击元素的draggable数组实例
     */
    pos(target: EventTarget | null, index: number[], type: TTagType, father?: boolean, detail?: boolean) {
      // console.log(target, index)
      // @ts-ignore
      const p = target.parentElement.__draggable_component__ || target.__draggable_component__
      // @ts-ignore
      const end = target.__draggable_context
      const keys = index || Array.from(p.itemKey)
      let numbers = typeof end === 'undefined' ? keys : keys.concat(end.index)

      if (father) {
        numbers = numbers.slice(0, numbers.length - 1)
      }

      let s: ITag[] = this[type]
      for (let i = 0; i < numbers.length; i++) {
        const key = numbers[i]
        const children = s[key].children

        if (typeof children !== 'undefined') {
          s = children
        }
      }

      if (father && detail && end) {
        return s[end.index]
      }

      return s
    },
    /**
     * 通用input，修改和权重，数字范围判断使用符号还是数字
     * @param e 点击事件，用于获取原型链上的draggable实例
     * @param index 从根元素到父元素的位置数组，如果没有爷级则为[]，组件nested-item computer 中的 index
     * @param t 修改输入类型
     * @param type tag所属类型见类型定义TTagType
     */
    input(e: PointerEvent, index: number[], t: TInputType, type: TTagType) {
      // console.log(e, index)
      const el: ITag | ITag[] = this.pos(e.target, index, type, true, true)
      if ('state' in el && el.state) {
        el.state[t] = !el.state[t]
        return true
      } else {
        return false
      }
    },
    // tag 模板
    tagModel(name?: string): ITag {
      const id = '' + Math.random().toString(36).slice(-8)
      return {
        id: id,
        longText: false,
        name: name || id,
        state: {
          active: true,
          editing: true,
          weightEditing: false
        },
        weight: 0
      }
    },
    // tag -> tab分组
    tabChange(type: TTagType, el: ITag | ITag[]) {
      if (typeof el !== 'undefined' && typeof (el as ITag[]).length === 'undefined') {
        el = el as ITag
        // 转换选取状态
        if (type.search('Tab') !== -1) {
          this[type] = this[type].map((v: ITag) => {
            v.state.active = true
            return v
          })
          el.state.active = false
          if (typeof el.children === 'undefined') {
            el.children = []
          }
          // 保存值
          // @ts-ignore
          this[type.replace('Tab', '')] = el.children
        }
      }
    },
    // 输出tag
    output() {
      const config = configStore()
      // console.log(this.tag)
      // const tags: ITag[] = []
      // 添加权重
      const weight = (element: ITag, center: string) => {
        const sym = config.sym
        let s
        if (!this.isLora(element)) {
          if (typeof element.weightNu !== 'undefined') {
            const nu = element.weightNu
            s = `${sym[0][0]}${center}:${nu}${sym[0][1]}`
          } else {
            let nu = element.weight
            if (nu === 0) {
              s = center
            } else {
              const char = nu > 0 ? sym[0] : sym[1]
              nu = Math.abs(nu)
              const length = center.length
              s = center.trim().padStart(length + nu, char[0]).padEnd(length + nu * 2, char[1])
            }
          }
        } else s = center
        // console.log(s)
        return s
      }
      // 递归寻找tag
      const recursionTag = (tag: ITag[]) => {
        const t: string[] = []
        tag.forEach((v: ITag) => {
          if (v.state.active) {
            let temp
            if (typeof v.children === 'undefined') {
              // tags.push(v)
              // t.push(weight(v, v.name))
              temp = weight(v, v.name)
            } else {
              // t.push(weight(v, recursionTag(v.children)))
              temp = weight(v, recursionTag(v.children))
            }
            if (temp.length > 0) {
              t.push(temp)
            }
          }
        })
        return t.join(',')
      }
      const p = recursionTag(this.prompt)
      const pn = recursionTag(this.promptNeg)
      // console.log(tags)
      // console.log(p)
      // console.log(pn)

      try {
        // @ts-ignore
        const cps = gradio_config.components
        if (cps) {
          const input: any[] = []
          cps.forEach((v: any, i: number) => {
            // console.log(v.type)
            if (v.type === 'textbox') {
              // console.log(v.props)
              const v1 = v.props
              if (v1.elem_id === 'txt2img_prompt' && v1.label === 'Prompt') {
                input.push(cps[i])
              }
              if (v1.elem_id === 'txt2img_neg_prompt' && v1.label === 'Negative prompt') {
                input.push(cps[i])
              }
            }
          })
          // console.log(input)
          input[0].props.value = p
          input[1].props.value = pn
          if (config.switch.autoStart.active) {
            // @ts-ignore
            document.querySelector('body > gradio-app').shadowRoot.querySelector('#txt2img_generate').click()
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    /******************************************************************************************************************/
    // func: 通用input自动聚焦，修改和权重
    inputFocus(e: PointerEvent, index: number[], t: TInputType, type: TTagType) {
      if (this.input(e, index, t, type)) {
        nextTick(() => {
          if (e.target) {
            // @ts-ignore
            e.target.children[0].focus()
          }
        })
      }
    },
    // func: 开启关闭
    switch(e: PointerEvent, index: number[], type: TTagType) {
      const el = this.pos(e.target, index, type, true, true)
      // console.log(e, e.target, el)
      if ('state' in el && el.state) {
        el.state.active = !el.state.active
      }
      this.tabChange(type, el as ITag)
    },
    // func: 删除
    delete(e: PointerEvent, i: number[], type: TTagType): void {
      // console.log(e)
      // @ts-ignore
      const context = typeof e.__draggable_context === 'undefined' ? e.target.__draggable_context : e.__draggable_context
      if (context) {
        const { index } = context
        // @ts-ignore
        const parent = this.pos(typeof e.target !== 'undefined' ? e.target : e, i, type, true)
        // console.log(parent, index, index, context)
        const f = typeof this[type][index] !== 'undefined' ? this[type][index].state.active : true
        if (Array.isArray(parent)) {
          parent.splice(index, 1)
        } else {
          if (parent.children) {
            parent.children.splice(index, 1)
          }
        }
        if (!f && this[type].length !== 0) this.tabChange(type, this[type][index - 1] || this[type][index])
        // console.log(type.search('Tab'), parent.length)
        // 当tab为最后一个时连内容一起删除
        // @ts-ignore
        if (type.search('Tab') !== -1 && parent?.length === 0) {
          // @ts-ignore
          this[type.replace('Tab', '')] = []
        }
      }
    },
    // func: 添加
    add(e: PointerEvent, index: number[], type: TTagType, group?: boolean): void {
      const tabOld = () => {
        if (this[type].length === 1) {
          const tab = this.tagModel('old')
          // @ts-ignore
          tab.children = this[type.replace('Tab', '')]
          tab.state.editing = false
          // console.log(tab)
          // @ts-ignore
          if (tab.children.length > 0) this[type].unshift(tab)
        }
      }
      const tabFocus = () => {
        // @ts-ignore
        const el = e.target.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild.lastElementChild
        el.firstElementChild.focus()
        el.firstElementChild.select()
        // console.log(el, el.firstChild)
      }
      // console.log(e)
      // 准备模板数据
      const newTag = this.tagModel()
      // Alt 点击 增加组
      if (group) {
        newTag.children = []
      }
      // 寻找位置，并添加
      const target = this.pos(e.target, index, type)
      // console.log(target)
      const targetTag = target as ITag
      const targetTags = target as ITag[]
      if (typeof targetTag.children !== 'undefined') {
        targetTag.children.push(newTag)
        // console.log('targetTag.children', targetTag.children)
      } else {
        targetTags.push(newTag)
        // console.log('target', t)
      }
      nextTick(() => {
        // @ts-ignore
        const com = typeof e.target.__draggable_component__ !== 'undefined'
        // @ts-ignore
        const con = typeof e.target.__draggable_context !== 'undefined'
        // 判断是否是draggable的元素
        if (com || con) {
          // @ts-ignore
          const targetF = e.target.lastChild.children
          // @ts-ignore
          // console.log(targetF, e.target.lastChild)
          if (com) {
            // @ts-ignore
            targetF[0].focus()
            targetF[0].select()
          } else {
            // @ts-ignore
            const children = e.target.parentElement.children
            const target = children[children.length - 1]
            target.children[0].focus()
            // target.children[0].select()
            // @ts-ignore
            if (typeof targetF !== 'undefined') {
              targetF[targetF.length - 1].firstChild.focus()
              targetF[targetF.length - 1].firstChild.select()
            }
          }
        } else {
          tabOld()
          tabFocus()
          this.tabChange(type, newTag)
        }
      })
    },
    // func: 复制
    copy(e: PointerEvent, i: number[], type: TTagType): void {
      // console.log(e)
      // @ts-ignore
      const context = typeof e.__draggable_context === 'undefined' ? e.target.__draggable_context : e.__draggable_context
      if (context) {
        const { index } = context
        // @ts-ignore
        const parent = this.pos(typeof e.target !== 'undefined' ? e.target : e, i, type, true)

        if (Array.isArray(parent)) {
          parent.splice(index, 0, JSON.parse(JSON.stringify(parent[index])))
        }
      }
    },
    // func: 右键菜单
    contextmenu(e: PointerEvent, index: number[], type: TTagType): void {
      const contextmenu = contextmenuStore()
      // console.log('菜单', e)
      // @ts-ignore
      if (e.target.__draggable_context !== undefined) {
        contextmenu.contextMenuClick(e, index, type)
      }
      // @ts-ignore
      if (e.target.__draggable_component__ !== undefined) {
        contextmenu.contextMenuClick(e, index, type, true)
      }
    },
    // todo: func: 长文本模式
    longTextMode() {
      console.log('长文本模式')
    },
    /******************************************************************************************************************/

    // 修改后保存权重
    weightInput(v: ITag) {
      v.state.weightEditing = false
      const weight = v.weight.toString()
      // console.log(v, weight, weight.length)
      if (typeof v.weight as unknown === 'string') {
        v.weight = 0
      }
      // 数字权重一般在0和2之间
      if (v.weight > 0 && v.weight < 2 && (weight.length > 1 || v.weight === 1)) {
        v.weightNu = v.weight
        if (this.isLora(v)) {
          v.name = v.name.replace(/:(\d|\d(\.\d{1,2}))>/g, `:${v.weightNu >= 0 ? v.weightNu : 0}>`)
        }
      } else {
        v.weightNu = undefined
        v.weight = Number(v.weight.toFixed(0))
      }
    },
    // 修改后保存
    editingInput(v: ITag) {
      v.name = v.name.trim()
      v.state.editing = false
      v.weight = this.isLora(v) ? 1 : 0
    },
    // 切割没有被括号包围的字符串
    extractStrings(text: string, cut: string): string[] {
      const result: string[] = []
      let start = 0
      let s = 0
      let m = 0
      let l = 0
      let b = 0
      for (let i = 0; i < text.length; i++) {
        switch (text[i]) {
          case '(': s++; break
          case ')': s--; break
          case '[': m++; break
          case ']': m--; break
          case '{': l++; break
          case '}': l--; break
          case '<': b++; break
          case '>': b--; break
          case cut: if (s === 0 && m === 0 && l === 0 && b === 0) {
            const t = text.slice(start, i).trim()
            result.push(t)
            start = i + 1
          }
        }
      }
      result.push(text.slice(start).trim())
      return result
    },
    // 判断是否有多个被输入
    editingInputMulti(iTag: ITag, numbers: number[], type: TTagType) {
      // @ts-ignore
      // console.log(e, i, e.target.parentElement)
      // 切割tag字符串
      iTag.name = iTag.name.trim()
      iTag.name = iTag.name.replace('，', ',')
      iTag.name = iTag.name.replace('（', '(')
      iTag.name = iTag.name.replace('）', ')')
      const tags = this.extractStrings(iTag.name, ',')

      let p: ITag['children'] | ITag = this[type]
      for (const v of numbers) {
        if (p) {
          p = p[v].children
        }
      }
      // console.log(p, i)
      if (p) {
        const curIndex = p.indexOf(iTag)
        // console.log(p, v, curIndex)
        p.splice(curIndex, 1)
        // 为当前tags实例化
        this.editingInputMultiCheck(p, tags)
      }
      this.editingInput(iTag)
    },
    editingInputMultiCheck(p: ITag[], tags: string[]) {
      const checkWeight = (Tag: ITag, t: string) => {
        // console.log(Tag)
        if (this.isWeightNu(Tag.name)) {
          this.getWeightNu(Tag)
        } else {
          this.getWeight(t, Tag)
        }
      }
      // console.log(tags)
      for (const t of tags) {
        if (t.length > 0) {
          const tag = this.tagModel()
          tag.state.editing = false
          tag.name = t.trim()
          // 判断权重类型
          checkWeight(tag, t)
          // todo: 判断组
          if (t.includes(',') && t[0] !== '<') {
            const tags = this.extractStrings(tag.name, ',')
            if (tags.length > 1) {
              tag.children = []
              tag.name = '组'
              this.editingInputMultiCheck(tag.children, tags)
            }
          }
          if (this.isLora(tag)) {
            this.getLoraWeight(tag)
          }
          p.push(tag)
        }
      }
    },
    /**
     * todo: 判断tag类型
     * 1. (abc)
     * 2. [abc] | {abc}
     * 3. (abc:1.2)
     * 4. // [abc|ab]
     * 5. // [from:to:when]
     * 6. // [to:when]
     * 7. // [from::when]
     * 8. <lore:abc:1>
     */
    // 获取权重
    getWeight(t: string, tag: ITag) {
      // console.log('getWeight')
      const left = t.match(/^(\{|\[|\(){0,}/g)
      const right = t.match(/(\}|\]|\)){0,}$/g)
      if (left && right) {
        const weight = left[0].length > right[0].length ? right[0].length : left[0].length
        // console.log(weight)

        // todo
        // 排除渐变语法
        if (t.includes('|') || t.search(/:\s?\d+(\.\d+)?]/g) !== -1) {
          return
        }

        if (t[0] === '(') {
          tag.weight = weight
        } else if (t[0] === '[' || t[0] === '{') {
          tag.weight = 0 - weight
        }
        tag.name = tag.name.slice(weight, tag.name.length - weight).trim()
      }
    },
    // 获取数字权重
    getWeightNu(tag: ITag) {
      const wn = tag.name.match(/:\s?\d+(\.\d+)?\)$/g)
      const nu = wn?.[0]
      if (typeof nu !== 'undefined') {
        const nuNumber = nu.length > 0 ? Number(nu.slice(1, nu.length - 1)) : 0
        tag.weightNu = nuNumber
        tag.weight = nuNumber
        tag.name = tag.name.slice(1, tag.name.length - nu.length)
        // console.log(nu, nu.length, nuNumber)
      }
    },
    // 获取lora权重
    getLoraWeight(tag: ITag) {
      const lw = tag.name.match(/:\s?\d+(\.\d+)?>$/g)
      const nu = lw?.[0]
      if (typeof nu !== 'undefined') {
        const nuNumber = nu.length > 0 ? Number(nu.slice(1, nu.length - 1)) : 0
        tag.weightNu = nuNumber
        tag.weight = nuNumber
      }
    },
    // 判断数字权重
    isWeightNu(text: string): boolean {
      return text.search(/:\s?\d+(\.\d+)?\)$/g) !== -1
    },
    // 判断lora
    isLora(v: ITag): boolean {
      return v.name.trim().search(/^<lora:.*:(\d|\d(\.\d{1,2}))>$/g) !== -1
    }
  }
})
