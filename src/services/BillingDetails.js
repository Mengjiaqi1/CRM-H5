import {
    get,
    post
} from "./http.js";

//开票信息详情-文件柜
export function findByContactsNo(businessNo) {
    return get("/app/fileCabinet/findByContactsNo", {
        businessNo
    });
}