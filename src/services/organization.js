import {get, post } from "./http.js";

// 根据部门id查询用户
export function getUserList(deptId, nickName, checkUserId) {
    return get("/system/user/getUserList", { deptId, nickName, checkUserId });
}
//新增/修改负责人
export function add(customerNo, type, userIds) {
    return post("/app/customerManagementCharge/add", {
        customerNo,
        type,
        userIds
    });
}

//查询负责人、协同人列表
export function findChargeList(customerNo) {
    return post("/app/customerManagementCharge/findChargeList", { customerNo });
}