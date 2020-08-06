import {get, post, put } from "./http.js";

//获取日期
// export function getTreeselect() {
//     return get("/app/formsettings/treeselect/0", {});
// }
export function getData() {
    return get("/dev-api/app/customHome/getDate", {deptType});
}
// export function getCreate(userId, name, icon, type, id) {
//     return post("/app/customIndex/create", { userId, name, icon, type, id });
// }