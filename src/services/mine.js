import {get, post, put } from "./http.js";

//获取日期
export function getUserData() {
    return get("/system/user/getUserInfo", {});
}