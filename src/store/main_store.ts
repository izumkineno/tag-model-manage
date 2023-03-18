import { defineStore } from 'pinia'
import { nextTick } from 'vue'
import { ElMessage } from 'element-plus'

export const mainStore = defineStore('main', {
  persist: true,
  state: (): IMainStore => {
    return {
      info: {
        prompt: {
          name: '提示词',
          expansion: true,
          type: 'prompt'
        },
        promptNeg: {
          name: '反向提示词',
          expansion: true,
          type: 'promptNeg'
        },
        todo: {
          name: '待选/草稿栏',
          expansion: false,
          type: 'todo'
        }
      },
      config: {
        sym: [
          ['(', ')'],
          ['[', ']']
        ],
        switch: {
          autoStart: {
            name: '自动开始',
            active: false
          }
        }
      },
      gradioConfigItems: [
        'txt2img_sampling',
        'txt2img_steps',
        'txt2img_height',
        'txt2img_width',
        'txt2img_batch_count',
        'txt2img_batch_size',
        'txt2img_cfg_scale'],
      gradioConfig: {},
      cate: [],
      tableData: [],
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
          name: '这里创建负面提示词',
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
      todo: []
    }
  },
  actions: {
    gradioConfig(read?: boolean) {
      try {
        this.gradioConfigItems.forEach(v => {
          if (!read) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-unused-expressions
            this.gradioConfig[v] = gradio_config.components.filter(v2 => v2.props.elem_id === v)[0].props.value
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-unused-expressions
            gradio_config.components.filter(v2 => v2.props.elem_id === v)[0].props.value = this.gradioConfig[v]
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    cerfaiSearch(
      useCate: boolean,
      callback: (response: { responseText: string }) => void,
      keyword?: string,
      id?: string) {
      const main = 'https://api.cerfai.com'
      const cate = '/open/get_full_categories'
      const search = '/search_tags'
      const data: {
        keyword: string,
        // eslint-disable-next-line camelcase
        category_id?: string
      } = {
        keyword: keyword || ''
      }
      if (id) data.category_id = id
      const req = {
        method: 'Post',
        url: useCate ? main + cate : main + search,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(useCate ? '' : data),
        onload: callback
      }
      // console.log('Request', req)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.Request(req)
    },
    cerfaitagSearch(value: string, id?: string) {
      this.cerfaiSearch(false, (response) => {
        const res = JSON.parse(response.responseText)
        if (res.code === 200) {
          this.tableData = res.data
          // console.log('data', res.data)
          ElMessage.success(res.msg || `获取数据成功，共 ${res.data.length} 条`)
        } else {
          ElMessage.error(res.msg)
          // console.log('data', res.msg)
        }
      }, value, id)
    },
    cataGet() {
      this.cerfaiSearch(true, (response) => {
        const res = JSON.parse(response.responseText)
        if (res.code === 200) {
          this.cate = res.data
          // console.log('cate', res.data)
          ElMessage.success(res.msg || '获取子类成功')
        } else {
          ElMessage.error(res.msg)
          // console.log('cate', res.msg)
        }
      })
    },
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
     *
     *  @index 从根元素到父元素的位置数组，如果没有爷级则为[]，同上文 computer 中的 index
     *
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
        4: () => this.contextmenu(),
        5: () => this.add(e, index, type),
        6: () => this.add(e, index, type),
        7: () => this.longTextMode()
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const f = fun[key]
      f()
    },
    // 寻找数据位置 todo: 优化？？
    pos(target: EventTarget | null, index: number[], type: TTagType, father?: boolean, detail?: boolean) {
      // console.log(target, index)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const p = target.parentElement.__draggable_component__ || target.__draggable_component__
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    // 通用input，修改和权重，数字范围判断使用符号还是数字
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
    // 通用input自动聚焦，修改和权重
    inputFocus(e: PointerEvent, index: number[], t: TInputType, type: TTagType) {
      if (this.input(e, index, t, type)) {
        nextTick(() => {
          if (e.target) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            e.target.children[0].focus()
          }
        })
      }
    },
    // 开启关闭
    switch(e: PointerEvent, index: number[], type: TTagType) {
      const el: ITag | ITag[] = this.pos(e.target, index, type, true, true)
      if ('state' in el && el.state) {
        el.state.active = !el.state.active
      }
    },
    // 修改后保存
    editingInput(v: ITag) {
      v.name = v.name.trim()
      v.state.editing = false
    },
    // 判断是否有多个被输入
    editingInputMulti(v: ITag, i: number[], type: TTagType) {
      v.name = v.name.trim()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // console.log(e, i, e.target.parentElement)
      if (v.name.search(',') !== -1) {
        const tags = v.name.split(',')
        let p: ITag['children'] | ITag = this[type]
        for (const v of i) {
          if (p) {
            p = p[v].children
          }
        }
        // console.log(p, i)
        if (p) {
          const curIndex = p.indexOf(v)
          // console.log(p, v, curIndex)
          p.splice(curIndex, 1)
          for (const t of tags) {
            if (t.length > 0) {
              const newTag = this.tagModel()
              newTag.name = t
              newTag.state.editing = false
              p.push(newTag)
            }
          }
        }
      }
      this.editingInput(v)
    },
    // 删除
    delete(e: PointerEvent, i: number[], type: TTagType): void {
      // console.log(e)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const context = e.target.__draggable_context
      if (context) {
        const { index } = context
        const parent = this.pos(e.target, i, type, true)
        // console.log(parent, index, index, context)
        if (Array.isArray(parent)) {
          parent.splice(index, 1)
        } else {
          if (parent.children) {
            parent.children.splice(index, 1)
          }
        }
      }
    },
    // 修改后保存
    weightInput(v: ITag) {
      v.state.weightEditing = false
      const weight = v.weight.toString()
      // console.log(v, weight, weight.length)
      if (typeof v.weight as unknown === 'string') {
        v.weight = 0
      }
      if (v.weight > 0 && v.weight < 2 && weight.length > 1) {
        v.weightNu = v.weight
      } else {
        v.weightNu = undefined
        v.weight = Number(v.weight.toFixed(0))
      }
    },
    // 添加
    add(e: PointerEvent, index: number[], type: TTagType): void {
      // console.log(e)
      // 准备模板数据
      const newTag = this.tagModel()
      // Alt 点击 增加组
      if (e.altKey) {
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const com = typeof e.target.__draggable_component__ !== 'undefined'
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const con = typeof e.target.__draggable_context !== 'undefined'
        if (com || con) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // console.log(e.target.__draggable_component__, e.target.__draggable_context)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const targetF = e.target.lastChild.children
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // console.log(targetF, e.target.lastChild)
          if (com) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            targetF[0].focus()
            targetF[0].select()
          } else {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const children = e.target.parentElement.children
            const target = children[children.length - 1]
            target.children[0].focus()
            // target.children[0].select()

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            if (typeof targetF !== 'undefined') {
              targetF[targetF.length - 1].firstChild.focus()
              targetF[targetF.length - 1].firstChild.select()
            }
          }
        }
      })
    },
    // 输出tag
    output() {
      // console.log(this.tag)
      // const tags: ITag[] = []
      // 添加权重
      const weight = (element: ITag, center: string) => {
        const sym = this.config.sym
        let s
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
            s = center.padStart(length + nu, char[0]).padEnd(length + nu * 2, char[1])
          }
        }
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          if (this.config.switch.autoStart.active) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            document.querySelector('body > gradio-app').shadowRoot.querySelector('#txt2img_generate').click()
          }
        }
      } catch (e) {
        // console.log(e)
      }
    },
    // todo: 右键菜单
    contextmenu() {
      console.log('菜单')
    },
    // todo: 长文本模式
    longTextMode() {
      console.log('长文本模式')
    }
  }
})
