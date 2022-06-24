import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { NWRequestInterceptors, NWRequestConfig } from './type'
// 定义网络请求的封装类
class NWRequest {
  instance: AxiosInstance
  interceptors?: NWRequestInterceptors
  constructor(config: NWRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 从config中取出的拦截器是对应的实例的拦截器
    // 只有new实例的时候有传入拦截器才有
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器:请求成功拦截')
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器:请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器:响应成功拦截')
        return res.data
      },
      (err) => {
        // console.log('所有的实例都有的拦截器:响应失败拦截')
        return err
      }
    )
  }

  request(config: NWRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get(config: NWRequestConfig) {
    return this.request({
      ...config,
      method: 'GET'
    })
  }

  post(config: NWRequestConfig) {
    return this.request({
      ...config,
      method: 'POST'
    })
  }

  delete(config: NWRequestConfig) {
    return this.request({
      ...config,
      method: 'DELETE'
    })
  }

  patch(config: NWRequestConfig) {
    return this.request({
      ...config,
      method: 'PATCH'
    })
  }
}

export default NWRequest
