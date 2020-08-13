import {get, post, put } from "./http.js";

//获取日期
export function getData(Data) {
    return get("/app/customHome/getDate", {Data});
}
