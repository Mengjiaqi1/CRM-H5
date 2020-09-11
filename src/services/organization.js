import {get } from "./http.js";

// 根据部门id查询用户
export function getUserList(deptId, nickName, checkUserId) {
    return get("/system/user/getUserList", { deptId, nickName, checkUserId });
}