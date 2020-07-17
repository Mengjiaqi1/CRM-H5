/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2019-12-19 20:26:07
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-31 10:59:28
 */
import axios from "axios";
import qS from "qs";
// import store from "../store";

// import { Toast } from "vant"; // Toast 提示框组件

axios.defaults.timeout = 5000; // 设置请求网络超时
axios.defaults.baseURL = "/api";
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
// // http request 拦截器

// // Add a request interceptor
axios.interceptors.request.use(
    function(config) {
        // Do something before request is sent
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

// 封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err);
            });
    });
}

// 封装post请求
export function post(url, data = {}, isJSON = true) {
    if (isJSON) {
        axios.defaults.headers["Content-Type"] = "application/json";
    } else {
        axios.defaults.headers["Content-Type"] =
            "application/x-www-form-urlencoded";
        axios.defaults.headers.post["Content-Type"] =
            "application/x-www-form-urlencoded";
    }
    if (!isJSON) {
        // 转换成表单提交数据
        data = qs.stringify(data);
    }
    // console.log(data)
    // console.log(isJSON)
    // console.log(axios.defaults.headers['Content-Type'])
    // console.log(axios.defaults.headers.post['Content-Type'])
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

// 封装patch请求
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}

// 封装put请求

export function put(url, data = {}) {
    axios.defaults.headers["Content-Type"] = "application/json";
    return new Promise((resolve, reject) => {
        axios
            .put(url, data, {
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
            .then(
                response => {
                    resolve(response.data);
                },
                err => {
                    reject(err);
                }
            );
    });
}

// 封装delete请求

export function del(url, params = {}, isJSON = true) {
    let data = {
        data: params
    };
    if (!isJSON) {
        axios.defaults.headers["Content-Type"] = "application/json";
    }
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(
            response => {
                resolve(response.data);
            },
            err => {
                reject(err);
            }
        );
    });
}