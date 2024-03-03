import axios from "axios"
import { message } from "antd"
import { getToken } from "../utils/user-token"

const instance = axios.create({
  timeout: 10 * 1000,
})

export default instance

//request拦截 ：每次请求都带上token
instance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = `Bearer ${getToken()}` //JWT的固定格式
    return config
  },
  error => Promise.reject(error)
)

//response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResDataType
  const { errno, data, msg } = resData

  if (errno !== 0) {
    //错误提示
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }

  return data as any
})

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}
