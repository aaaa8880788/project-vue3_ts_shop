export const checkMobile = (
  rule: any,
  value: any,
  callback: any,
  source: any,
  options: any
) => {
  const regMobile =
    /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/
  if (regMobile.test(value)) {
    // 合法手机号
    return callback()
  }
  callback(new Error('请输入合法的手机或电话号码'))
}
