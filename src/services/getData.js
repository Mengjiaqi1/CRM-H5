import {get, post, put } from "./http.js";

//获取日期
// export function getData(params) {
//     return get("/dev-api/app/customHome/getDate", {params});
// }
export function getData(Data) {
    return get("/app/customHome/getDate", {Data});
}
// export function getData() {
//
//     return get("/dev-api/app/customHome/getDate", {});
// }


// export function getCreate(userId, name, icon, type, id) {
//     return post("/app/customIndex/create", { userId, name, icon, type, id });
// }