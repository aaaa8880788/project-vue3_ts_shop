import { IForm } from '@/base-ui/form/type'
export const dialogFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '商品旧价',
      placeholder: '请输入商品旧价'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '商品新价',
      placeholder: '请输入商品新价'
    },
    {
      field: 'desc',
      type: 'input',
      label: '商品描述',
      placeholder: '请输入商品描述',
      otherOptions: {
        autosize: true,
        type: 'textarea'
      }
    },
    {
      field: 'status',
      type: 'select',
      label: '商品是否已上架',
      placeholder: '请选择商品是否已上架',
      options: [
        {
          label: '未上架',
          value: 0
        },
        {
          label: '已上架',
          value: 1
        }
      ]
    },
    {
      field: 'imgUrl',
      type: 'upload',
      label: '商品图片',
      placeholder: '请上传商品图片',
      otherOptions: {
        action: 'https://jsonplaceholder.typicode.com/posts/'
      }
    },
    {
      field: 'address',
      type: 'input',
      label: '发货地址',
      placeholder: '请输入发货地址，例如：北京'
    }
  ],
  itemColLayout: {
    span: 24
  },
  itemStyle: {}
}
