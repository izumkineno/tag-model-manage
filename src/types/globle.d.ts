interface ITag {
  id: string
  name: string
  state: {
    active: boolean
    editing: boolean
    weightEditing: boolean
  }
  longText: boolean
  weight: number
  weightNu?: number | undefined
  children?: ITag[]
}

type TTagType = 'prompt' | 'promptNeg' | 'todo'
type TInputType = 'weightEditing' | 'editing'

interface ISwitch {
  name: string
  active: boolean
}

interface IInfoTags {
  name: string
  expansion: boolean
  type: TTagType
}

interface IMainStore extends Record<TTagType, ITag[]> {
  info: Record<TTagType, IInfoTags>
  config: {
    sym: Array<Array<string>>
    switch: {
      autoStart: ISwitch
    }
  }
  gradioConfigItems: string[]
  gradioConfig: {
    [prop: string]: string | number
  }
  cate: JSON[]
  tableData: JSON[]
}
