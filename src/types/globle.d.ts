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

type TTagType = 'prompt' | 'promptNeg' | 'todo' | 'promptTab' | 'promptNegTab' | 'todoTab'
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

type TMainStore = Record<TTagType, ITag[]>

interface IConfigStore {
  sym: Array<Array<string>>
  info: Record<TTagType, IInfoTags>
  switch: {
    autoStart: ISwitch
    table: boolean
  }
  gradioConfigItems: string[]
  gradioConfig: {
    [prop: string]: string | number
  }
}

interface ITableStore {
  cate: JSON[]
  tableData: JSON[]
}

/// ///////////////////////////// 右键菜单
type contextualMenuIndex = 1 | 2 | 3 | 4
interface contextMenuStore {
  showMenu: boolean
  showMenuGroup: boolean
  x: number
  y: number
  event?: PointerEvent
  index?: number[]
  type?: TTagType
}
interface menuFunction {
  name: string
  icon: string
  key: string
  action: () => void
}
