import {
    get,
    post
} from "./http.js";
// 查询表单模板
export function findTemplateList(formId) {
    return get("/app/formTemplateInfo/findTemplateList", {
        formId
    });
}
// 全部客户列表
export function FindAllCustomer(templateId, customerFullName) {
    return get("/app/customerManagementInfo/FindAllCustomerByTemplateId", {
        templateId,
        customerFullName
    });
}