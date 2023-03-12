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

interface IMainStore {
  prompt: ITag[]
  promptNeg: ITag[]
  sym: Array<Array<string>>
}

type TTagType = 'prompt' | 'promptNeg'
type TInputType = 'weightEditing' | 'editing'
