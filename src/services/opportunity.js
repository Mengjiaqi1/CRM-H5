import {get, post } from "./http.js";
import {put} from "./http";
// 全部机会列表
export function getAllOpportunityData(Datas) {
    return post("/system/opportunities/getList", Datas);
}
// // 筛选分配时间排序
// export function sortDefaultList(Data) {
//     return post("/app/sortDefault/list", Data);
// }
// // 筛选-设置筛选项-查询
// export function getScreenList(Data) {
//     return post("/app/filedSizer/findSizerList", Data);
// }
// 新增-销售机会编号
export function getNumber() {
    return get("/system/opportunities/getNumber", {});
}
// 新增-所属部门
export function getDeptData() {
    return get("/system/dept/getUserManyDept", {});
}
// 新增-销售机会来源/专业分类
export function getClassificationData(data) {
    return get("/system/dict/data/getList",data);
}
// 新增-市场活动
export function getMarketData(data) {
    return get("/system/marketingActivities/getTenList",data);
}
// 新增-销售机会-保存
export function addList(Data) {
    return post("/system/opportunities",Data)
}