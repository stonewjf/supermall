import axios from 'axios'


export function request(config) {
    // 创建axios实例
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })

    // axios的拦截器
    //请求拦截
    instance.interceptors.request.use(config => {
        // console.log(config);
        //拦截成功，返回config，用途
        // 1、比如一些config中的信息不符合服务器的要求
        // 2.比如每次发送网络请求时，都希望在页面中显示一个请求图标
        // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息
        return config
    }, err => {
        console.log(err);
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res);
        // 拦截成功，返回data
        return res.data
    }, err => {
        console.log(err);
    })
    //instance本身是一个Promise
    return instance(config)
}