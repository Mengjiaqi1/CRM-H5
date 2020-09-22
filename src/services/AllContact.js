import {get, post } from "./http.js";
import {put} from "./http";
// 联系人列表
export function getAllContactData(Datas) {
    return post("/app/customerContactsInfo/findAllList", Datas);
}
// // 筛选分配时间排序
// export function sortDefaultList(Data) {
//     return post("/app/sortDefault/list", Data);
// }
// // 筛选-设置筛选项-查询
// export function getScreenList(Data) {
//     return post("/app/filedSizer/findSizerList", Data);
// }
