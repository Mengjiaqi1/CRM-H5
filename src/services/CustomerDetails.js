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
// 客户详情-跟进次数
export function findRecordsCount(customerId) {
    return post("/app/customerFollowRecords/findRecordsCount", { customerId });
}
//客户详情-文件柜
export function findByCustomerNo(customerNo, type, pageNum, pageSize) {
    return post("/app/fileCabinet/findByCustomerNo", {
        customerNo,
        type,
        pageNum,
        pageSize
    });
}
//客户详情-联系人列表
export function findContactsByCustomerId(customerId) {
    return post("/app/customerContactsInfo/findContactsTableByCustomerId", {
        customerId
    });
}
//客户详情-文件柜-删除文件
export function remove(cabinetIds) {
    return post("/app/fileCabinet/remove", {
        cabinetIds
    });
}
// 客户详情 -文件柜 -上传文件
export function fileupload(base64ImgStr, name) {
    return post("/upload/base64Image/file", { base64ImgStr, name });
}
export function File(file) {
    return post("/upload/fileUpload/file", { file });
}
//客户详情-文件柜-添加文件
export function add(businessNo, cabinetType, customerNo, fileIds, fileType) {
    return post("/app/fileCabinet/add", {
        businessNo,
        cabinetType,
        customerNo,
        fileIds,
        fileType
    });
}