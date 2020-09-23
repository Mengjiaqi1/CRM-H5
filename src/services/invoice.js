import {get, post } from "./http.js";
import {put} from "./http";

// 开票信息列表
export function getInvoiceData() {
    return get("/system/billingInformation/getList", {});
}
// 筛选-设置筛选项-保存
export function filedSizerList(Data) {
    return put("/system/billingInformation",Data)
}