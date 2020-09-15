import axios from "axios"

// http://localhost:3030/api/menulist
let $axios = axios.create({
    // baseURL:"http://localhost:3030",   // 基准前缀地址！
    baseURL:"/api",   // 跨域解决方法
    timeout:3000   // 请求时长！
})

// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
    // if (config.url =='/userlogin'){  // 登录请求！
    //     return config;
    // }else{
    //     let userinfo = JSON.parse(localStorage.getItem("userinfo"))
    //     console.log(config)
    //     // 请求头里面携带上token!   具体的字段名要和后端沟通！
    //     config.headers.authorization = userinfo.token;
    //     return config;
    // }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    // 对数据进行处理
    return response.data
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

// 暴露axios实例！
export default $axios;