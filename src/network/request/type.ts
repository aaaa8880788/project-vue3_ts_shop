import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface NWRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

interface NWRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: NWRequestInterceptors<T>
}

export { NWRequestInterceptors, NWRequestConfig }
