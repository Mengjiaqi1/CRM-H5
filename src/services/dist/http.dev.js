"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.patch = patch;
exports.put = put;
exports.del = del;

var _axios = _interopRequireDefault(require("axios"));

var _qs = _interopRequireDefault(require("qs"));

var _router = _interopRequireDefault(require("../router"));

var _auth = require("../untils/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2019-12-19 20:26:07
 * @LastEditors  : sueRimn
 * @LastEditTime : 2019-12-31 10:59:28
 */
_axios["default"].defaults.timeout = 1000; // 设置请求网络超时

_axios["default"].defaults.baseURL = "/api";
_axios["default"].defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";

_axios["default"].interceptors.request.use(function (config) {
  var tokenKey = (0, _auth.getCookie)("tokenKey");

  if (!config.headers["Content-Type"]) {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8"
    };
  }

  if (config.url.split("/").pop() == "login") {
    return config;
  } else {
    config.headers.Authorization = tokenKey;
  }

  return config;
}); // http request 拦截器


_axios["default"].interceptors.response.use(function (response) {
  // 如果code是-1，说明用户已注销或者token已过期
  // 此时需要重新登录，并且还要清除本地缓存信息和store数据
  if (response.status == 200) {
    var data = response.data;

    if (data.code != 200) {
      logoutFun();
    }
  } else if (response.data.token) {
    (0, _auth.setCookie)("tokenKey", response.data.token);
  }

  return response;
}, function (err) {
  // console.log(err);
  if (err.response.status === 401) {
    // 未授权
    logoutFun();
  }
});

function logoutFun() {
  // 清空本地缓存的token和store里的token
  (0, _auth.delCookie)("tokenKey"); // 跳转至登录页，并携带用户退出时或token失效时的页面路由，方便登录后直接跳转到此页面。

  _router["default"].push("/");
} // // Add a request interceptor
// 封装get方法


function get(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].get(url, {
      params: params
    }).then(function (response) {
      resolve(response.data);
    })["catch"](function (err) {
      reject(err);
    });
  });
} // 封装post请求


function post(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isJSON = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  if (isJSON) {
    _axios["default"].defaults.headers["Content-Type"] = "application/json";
  } else {
    _axios["default"].defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
    _axios["default"].defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  }

  if (!isJSON) {
    // 转换成表单提交数据
    data = qs.stringify(data);
  } // console.log(data)
  // console.log(isJSON)
  // console.log(axios.defaults.headers['Content-Type'])
  // console.log(axios.defaults.headers.post['Content-Type'])


  return new Promise(function (resolve, reject) {
    _axios["default"].post(url, data).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
} // 封装patch请求


function patch(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new Promise(function (resolve, reject) {
    _axios["default"].patch(url, data).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
} // 封装put请求


function put(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  _axios["default"].defaults.headers["Content-Type"] = "application/json";
  return new Promise(function (resolve, reject) {
    _axios["default"].put(url, data, {
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      }
    }).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
} // 封装delete请求


function del(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var isJSON = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var data = {
    data: params
  };

  if (!isJSON) {
    _axios["default"].defaults.headers["Content-Type"] = "application/json";
  }

  return new Promise(function (resolve, reject) {
    _axios["default"]["delete"](url, data).then(function (response) {
      resolve(response.data);
    }, function (err) {
      reject(err);
    });
  });
}