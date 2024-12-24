import axios from "axios";
import { getToken } from "./auth";
const request = axios.create({
    baseURL: 'http://www.codeedu.com.cn/'
})

// 请求拦截
request.interceptors.request.use(config => {
    if (config.isToken) {
        config.headers.Authorization = getToken()
    }
    return config
})

// 响应拦截
request.interceptors.response.use(xhr => {
    return xhr.data
})

export default request