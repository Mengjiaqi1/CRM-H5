import Vue from "vue";
import VueRouter from "vue-router";
import MyHome from "../views/Home.vue";
import Home from "../pages/Home.vue";
import Visitor from "../pages/Visitor.vue";
import Work from "../pages/Work.vue";
import Mine from "../pages/Mine.vue";
import News from "../pages/News.vue";
import Selection from "../pages/Selection";
import Brief  from "../pages/Brief.vue";
import PKdetalis  from "../pages/PKdetalis.vue";
import Custom from "../pages/Custom/Custom";
import Collection from "../pages/Collection";
import CommonForms from "../pages/CommonForms";
import CustomHome from "../pages/CustomHome";
import AllCustom from "../pages/Custom/AllCustom";
import Build from "../pages/Custom/Build";
import CustomScreen from "../pages/Custom/CustomScreen";
import Setting from "../pages/Setting";
import ShortcutForms from "../pages/ShortcutKeyForm";
import store from "../store";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/home",
        meta: {
            title: "首页"
        }
    },
    {
        path: "/work",
        name: "Work",
        component: Work
    },
    {
        path: "/news",
        name: "News",
        component: News
    },
    {
        path: "/visitor",
        name: "Visitor",
        component: Visitor
    },
    {
        path: "/mine",
        name: "Mine",
        component: Mine
    },
    {
        path: "/myHome",
        name: "myHome",
        component: MyHome
    },
    {
        path: "/selection",
        name: "Selection",
        component: Selection
    },

    {
        path: "/customHome",
        name: "CustomHome",
        component: CustomHome
    },
    // 表单设置
    {
        path: "/commonForms",
        name: "CommonForms",
        component: CommonForms
    },
    // 快捷键表单设置
    {
        path: "/shortcutForms",
        name: "ShortcutForms",
        component: ShortcutForms
    },
    // 简报详情
    {
        path: "/brief",
        name: "Brief",
        component: Brief
    },
    // PK详情
    {
        path: "/PkDetalis",
        name: "PKdetalis",
        component: PKdetalis
    },
    // 当前客户数
    {
        path: "/custom",
        name: "Custom",
        component: Custom
    },
    // 计划收款
    {
        path: "/collection",
        name: "Collection",
        component: Collection
    },
    // 设置
    {
        path: "/setting",
        name: "Setting",
        component: Setting
    },
    // 全部客户
    {
        path: "/allCustom",
        name: "AllCustom",
        component: AllCustom
    },
    // 新建
    {
        path: "/build",
        name: "Build",
        component: Build
    },
    // 设置筛选项
    {
        path: "/customScreen",
        name: "CustomScreen",
        component: CustomScreen
    },
    {
        path: "/home",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // 按需加载模式
        component: () =>
            import ( /* webpackChunkName: "about" */ "../pages/Home.vue")
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    if (to.path == "/home") {
        store.commit("set_flag", true);
    } else if (to.path == "/setting") {
        store.commit("set_flag", false);
    }
    if (to.path === "/") {
        next();
    } else {
        let token = localStorage.getItem("token");

        if (token === null || token === "") {
            next("/");
        } else {
            next();
        }
    }
});

export default router;