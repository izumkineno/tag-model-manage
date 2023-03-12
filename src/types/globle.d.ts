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

interface ISwitch {
  name: string,
  active: boolean
}

interface IMainStore {
  prompt: ITag[]
  promptNeg: ITag[]
  config: {
    sym: Array<Array<string>>
    switch: {
      autoStart: ISwitch
    }
  }
}

type TTagType = 'prompt' | 'promptNeg'
type TInputType = 'weightEditing' | 'editing'
