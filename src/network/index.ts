// network的统一出口
import NWRequest from './request'
// 导入本地缓存函数
import localCache from '@/utils/local-cache'

const baseURL = process.env.VUE_APP_BASE_URL
const timeout = Number(process.env.VUE_APP_TIME_OUT) || 1000

// 这里是有传入特有拦截器的实例
const nwRequest = new NWRequest({
  baseURL: baseURL,
  timeout: timeout,
  interceptors: {
    requestInterceptor: (config: any) => {
      // console.log('在new实例时有传入拦截器的实例才有的拦截器:请求成功的拦截')
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('在new实例时有传入拦截器的实例才有的拦截器:请求失败的拦截')
      return err
    },
    responseInterceptor: (config) => {
      // console.log('在new实例时有传入拦截器的实例才有的拦截器:响应成功的拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      // console.log('在new实例时有传入拦截器的实例才有的拦截器:响应失败的拦截')
      return err
    }
  }
})
// 这里是没有有传入特有拦截器的实例
// const nwRequest1 = new NWRequest({
//   baseURL: process.env.VUE_APP_BASE_URL,
//   timeout: process.env.VUE_APP_TIME_OUT
// })

export { nwRequest }
