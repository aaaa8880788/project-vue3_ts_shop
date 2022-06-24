export interface ITbaleOption {
  prop?: string
  label: string
  minWidth?: string
  slotName?: string
  align?: string
}
export interface ITable {
  propList: ITbaleOption[]
  showIndexColumn?: boolean
  showSelectColumn?: boolean
  childrenProps?: object
}
