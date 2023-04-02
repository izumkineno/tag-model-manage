import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import { configStore } from './config_store'

export const tableStore = defineStore('table', {
  persist: false,
  state: ():ITableStore => {
    return {
      cate: [],
      tableData: []
    }
  },
  actions: {
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
      const config = configStore()
      this.cerfaiSearch(false, (response) => {
        const res = JSON.parse(response.responseText)
        if (res.code === 200) {
          this.tableData = res.data
          // console.log('data', res.data)
          ElMessage.success(res.msg || `获取数据成功，共 ${res.data.length} 条`)
          config.switch.table = true
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
    }
  }
})
