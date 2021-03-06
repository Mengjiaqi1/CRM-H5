import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/common/js/flexible.js";
import "@/common/style/index.scss";
import "@/common/fonts/iconfont.js";
// icon 图标引入
import "@/assets/iconfont/iconfont.scss";
import "@/assets/iconfont/iconfont.js";
import Axios from "axios";

import Vconsole from "vconsole";
let vConsole = new Vconsole();


import {
    NavBar,
    Toast,
    Swipe,
    SwipeItem,
    Divider,
    Tab,
    Tabs,
    Checkbox,
    Popup,
    DatetimePicker,
    Field,
    ShareSheet,
    Search,
    Overlay,
    List,
    PullRefresh,
    DropdownMenu,
    DropdownItem,
    Form,
    Button,
    Area,
    Uploader,
    ActionSheet,
    SwipeCell,
    Card,
    ImagePreview,
    Picker,
    Icon,
    RadioGroup,
    Cell,
    CellGroup,
    Radio,
    CheckboxGroup,
    Rate,
} from "vant";

Vue.use(NavBar);
Vue.use(Toast);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(vConsole);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Field);
Vue.use(ShareSheet);
Vue.use(Overlay);
Vue.use(Search);
Vue.use(List);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(PullRefresh);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(Button);
Vue.use(Area);
Vue.use(ActionSheet);
Vue.use(SwipeCell);
Vue.use(Card);
Vue.use(ImagePreview);
Vue.use(Uploader);
Vue.use(Picker);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Rate);

Vue.config.productionTip = false;
Vue.config.isToken = true;
// axios的一些配置
Axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
Vue.prototype.$http = Axios;


Vue.component("myHeader", () => {
    return import ("@/components/my-header");
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");