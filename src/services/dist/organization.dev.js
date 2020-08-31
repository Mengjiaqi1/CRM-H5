"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserList = getUserList;

var _http = require("./http.js");

// 根据部门id查询用户
function getUserList(deptId, nickName, checkUserId) {
  return (0, _http.get)("/system/user/getUserList", {
    deptId: deptId,
    nickName: nickName,
    checkUserId: checkUserId
  });
}