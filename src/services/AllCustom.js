import {get, post } from "./http.js";
import {put} from "./http";
// 通过日期查询-当前客户列表
export function getCustomData(Data) {
    return get("/app/customerManagementInfo/findCustomerInfoListByDate", Data);
}
// 全部客户表单tab模板数据
export function findTemplateList(Data) {
    return get("/app/formTemplateInfo/findTemplateList", Data);
}
// 全部客户列表
export function getAllCustomData(Datas) {
    return post("/app/customerManagementInfo/findAllCustomerList", Datas);
}
// 筛选分配时间排序
export function sortDefaultList(Data) {
    return get("/app/sortDefault/list", Data);
}
// 筛选分配时间-默认排序设置-分配时间-数据
export function findSortFieldList(Data) {
    return get("/app/sortDefault/findSortFieldList", Data);
}
// 筛选-设置筛选项-查询
export function getScreenList(Data) {
    return get("/app/filedSizer/findSizerList", Data);
}
// 筛选-设置筛选项-保存
export function filedSizerList(Data) {
    return put("/app/filedSizer",Data)
}
// 默认排序设置-保存
export function getSortList(Data) {
    return put("/app/sortDefault/editUserSort", Data);
}
// 新建客户序列号-数据
export function getSeqList(Datas) {
    return get("/win/sysSeqCounter/getSeqByTemplateId", Datas);
}
// 新建客户-保存
export function addList(Data) {
    return post("/app/customerManagementInfo/add", Data);
}