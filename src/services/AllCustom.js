import {get, post } from "./http.js";
// 通过日期查询当前客户列表
export function getCustomData(Data) {
    return post("/app/customerManagementInfo/findCustomerInfoListByDate", Data);
}
// 全部客户表单模板
export function findTemplateList(Data) {
    return post("/app/formTemplateInfo/findTemplateList", Data);
}
// 全部客户列表
export function getAllCustomData(Data) {
    return post("/app/customerManagementInfo/findAllCustomerList", Data);
}