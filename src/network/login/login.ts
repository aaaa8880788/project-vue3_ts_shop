import { nwRequest } from '../index'
import type { IAccount } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return nwRequest.post({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return nwRequest.get({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenusByRoleId(id: number) {
  return nwRequest.get({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
