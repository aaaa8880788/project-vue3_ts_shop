import { IForm } from '@/base-ui/form/type'
export const dialogFormConfig: IForm = {
  formItems: [
    {
      field: 'title',
      type: 'input',
      label: '故事标题',
      placeholder: '请输入故事标题'
    },
    {
      field: 'content',
      type: 'input',
      label: '故事内容',
      placeholder: '请输入故事内容',
      otherOptions: {
        type: 'textarea',
        autosize: true
      }
    }
  ],
  itemColLayout: {
    span: 24
  },
  itemStyle: {}
}
