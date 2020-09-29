import {get, post } from "./http.js";
import {put} from "./http";

// 开票信息列表
export function getInvoiceData() {
    return get("/system/billingInformation/getList", {});
}
// 新增-表单tab模板数据
export function findTemplateList(Data) {
    return get("/app/formTemplateInfo/findTemplateList", Data);
}
// 新增-开票编号
export function getNumber() {
    return get("/system/billingInformation/getNumber", {});
}
// 新增-开票-保存
export function addList(Data) {
    return post("/system/billingInformation",Data)
}