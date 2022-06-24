// 表单校验规则
const rules = {
  name: [
    {
      required: true,
      message: '用户名不可为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,20}$/,
      message: '用户名必须是5~20个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不可为空',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或数字',
      trigger: 'blur'
    }
  ],
  num: [
    {
      required: true,
      message: '手机号不可为空',
      trigger: 'blur'
    },
    {
      pattern:
        /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不可为空',
      trigger: 'blur'
    }
  ]
}

export { rules }
