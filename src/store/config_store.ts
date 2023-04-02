import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

export const configStore = defineStore('config', {
  persist: true,
  state: (): IConfigStore => {
    return <IConfigStore>{
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
      sym: [
        ['(', ')'],
        ['[', ']'],
        ['{', '}']
      ],
      switch: {
        autoStart: {
          name: '自动开始',
          active: false
        },
        table: false
      },
      gradioConfigItems: [
        'txt2img_sampling',
        'txt2img_steps',
        'txt2img_height',
        'txt2img_width',
        'txt2img_batch_count',
        'txt2img_batch_size',
        'txt2img_cfg_scale',
        'txt2img_restore_faces'],
      gradioConfig: {}
    }
  },
  actions: {
    GradioConfig(read?: boolean) {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-unused-expressions
        gradio_config.components.forEach(v => {
          this.gradioConfigItems.forEach(v2 => {
            if (v2 === v.props.elem_id) {
              // console.log(v2, v.props.elem_id)
              if (read) {
                if (typeof this.gradioConfig[v2] !== 'undefined') {
                  v.props.value = this.gradioConfig[v2]
                }
              } else {
                this.gradioConfig[v2] = v.props.value
              }
            }
          })
        })
        ElMessage.success('读取/保存配置成功：' + this.gradioConfig.toString())
      } catch (e) {
        ElMessage.error('读取/保存配置失败：' + e)
      }
    }
  }
})
