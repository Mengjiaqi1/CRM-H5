import {
    get,
    post
} from "./http.js";

//通过id查询开票详情
export function a() {
    return get("/system/billingInformation/{id}", {});
}