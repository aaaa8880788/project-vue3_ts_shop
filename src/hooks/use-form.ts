import type { IForm } from '@/base-ui/form/type'
export function gernarateFormData(FormConfig: IForm) {
  // 1.从接收到的配置中取出各个field,组成表单的数据formData
  const formItems = FormConfig.formItems ?? []
  const formData = {}
  formItems.map((item) => {
    formData[item.field] = ''
  })
  return formData
}
