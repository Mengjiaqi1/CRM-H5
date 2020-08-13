import {get, post } from "./http.js";

// 表单设置 全部表单
export function getTreeselect() {
    return get("/app/formsettings/treeselect", {});
}

//表单设置 增加删除表单
export function getCreate(userId, name, icon, type, id) {
    return post("/app/customIndex/create", { userId, name, icon, type, id });
}

// 表单设置 查询表单
export function getcustomIndex() {
    return get("/app/customIndex/getData", {});
}

// 快捷快表单设置 所有表单
export function gettreeselectQuick() {
    return get("/app/formsettings/treeselectQuick", {});
}
// 快捷快表单设置 查询表单
export function getQuickInfo() {
    return get("/app/customIndex/getQuickInfo", {});
}
// 快捷快表单设置 删除添加
export function getaddQuick(userId, name, icon, type, id) {
    return post("/app/customIndex/addQuick", { userId, name, icon, type, id });
}