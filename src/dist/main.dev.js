"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

require("@/common/js/flexible.js");

require("@/common/style/index.scss");

require("./assets/iconfont/iconfont.css");

var _axios = _interopRequireDefault(require("axios"));

var _echarts = _interopRequireDefault(require("echarts"));

var _vconsole = _interopRequireDefault(require("vconsole"));

var _vant = require("vant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var vConsole = new _vconsole["default"]();

_vue["default"].use(_vant.NavBar);

_vue["default"].use(_vant.Toast);

_vue["default"].use(_vant.Swipe);

_vue["default"].use(_vant.SwipeItem);

_vue["default"].use(_vant.Divider);

_vue["default"].use(_vant.Tab);

_vue["default"].use(_vant.Tabs);

_vue["default"].use(_vant.Checkbox);

_vue["default"].use(vConsole);

_vue["default"].use(_vant.Popup);

_vue["default"].use(_vant.DatetimePicker);

_vue["default"].use(_vant.Field);

_vue["default"].use(_vant.ShareSheet);

_vue["default"].use(_vant.Overlay);

_vue["default"].use(_vant.Search);

_vue["default"].use(_vant.List);

_vue["default"].config.productionTip = false;
_vue["default"].config.isToken = true; // axios的一些配置

_axios["default"].defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
_vue["default"].prototype.$http = _axios["default"];
_vue["default"].prototype.$echarts = _echarts["default"];

_vue["default"].component("myHeader", function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("@/components/my-header"));
  });
});

new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");