import type { ILoginState } from './login/type'
import type { IMainState } from './main/type'

export interface IRootState {
  entireDepartment: []
  entireRole: []
  entireMenu: []
}
interface IRootWithModule {
  login: ILoginState
  main: IMainState
}

export type IStoreType = IRootState & IRootWithModule
