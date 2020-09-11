import { post } from "./http.js";
//客户详情-基本信息
export function findBase(customerId) {
    return post("/app/customerManagementInfo/findBase", { customerId });
}
// 客户详情-跟进记录
export function findRecordBaseList(customerId, pageNum, pageSize) {
    return post("/app/customerFollowRecords/findRecordBaseList", {
        customerId,

        pageNum,
        pageSize
    });
}