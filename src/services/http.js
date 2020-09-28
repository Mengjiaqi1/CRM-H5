/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2019-12-19 20:26:07
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-31 10:59:28
 */
import axios from "axios";
import qs from "qs";
import router from "../router";
import {
    setCookie,
    getCookie,
    delCookie
} from "../untils/auth";
axios.defaults.timeout = 2000; // 设置请求网络超时
axios.defaults.baseURL = "/api";
axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
axios.interceptors.request.use(config => {
    const tokenKey = getCookie("tokenKey");
    if (!config.headers["Content-Type"]) {
        config.data = JSON.stringify(config.data);
        config.headers = {
            "Content-Type": "application/json;charset=UTF-8"
        };
    }
    if (
        config.url.split("/").pop() == "login" ||
        config.url.split("/").pop() == "getSignature"
    ) {
        return config;
    } else {
        config.headers.Authorization = tokenKey;
    }
    return config;
});

// http request 拦截器
axios.interceptors.response.use(
    response => {
        // console.log(response, "response");
        // 如果code是-1，说明用户已注销或者token已过期
        // 此时需要重新登录，并且还要清除本地缓存信息和store数据
        if (response.status == 200) {
            const data = response.data;
            // if (data.code == 500 || data.code == 401) {
            //     logoutFun();
            // }
        } else if (response.data.token) {
            setCookie("tokenKey", response.data.token);
        }
        return response;
    },
    err => {
        // console.log(err);
        if (err.response.status === 401) {
            // 未授权
            logoutFun();
        }
    }
);

function logoutFun() {
    // 清空本地缓存的token和store里的token

    delCookie("tokenKey");
    alert("认证失败请重新登录");
    // 跳转至登录页，并携带用户退出时或token失效时的页面路由，方便登录后直接跳转到此页面。
    router.push("/");
}

// // Add a request interceptor
// 封装get方法
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
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
        data = Qs.stringify(data);
    }
    // console.log(data)
    // console.log(isJSON);
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