import { nwRequest } from '../index'
// 1.获取页面数据
export function getPageListData(url: string, queryInfo: any = {}) {
  return nwRequest.post({
    url: url,
    data: queryInfo
  })
}
// 2.删除页面行数据
export function deletePageRowData(url: string) {
  return nwRequest.delete({
    url: url
  })
}
// 3.新建页面行数据
export function createPageData(url: string, newData: any) {
  return nwRequest.post({
    url: url,
    data: newData
  })
}
// 4.编辑页面行数据
export function editPageData(url: string, editData: any) {
  return nwRequest.patch({
    url: url,
    data: editData
  })
}
// 5.获取商品分类页面数据(这个是get请求)
export function getGoodsCategoryData(url: string) {
  return nwRequest.get({
    url: url
  })
}
