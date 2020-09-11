import Vue from "vue";
import VueRouter from "vue-router";
import MyHome from "../views/Home.vue";
import Visitor from "../pages/Visitor.vue";
import Work from "../pages/Work.vue";
import Mine from "../pages/Mine.vue";
import News from "../pages/News.vue";
import Selection from "../pages/Selection";
import Brief from "../pages/Brief.vue";
import PKdetalis from "../pages/PKdetalis.vue";
import Custom from "../pages/Custom/Custom";
import Collection from "../pages/Collection";
import CommonForms from "../pages/CommonForms";
import CustomHome from "../pages/CustomHome";
import AllCustom from "../pages/Custom/AllCustom";
import Build from "../pages/Custom/Build";
import CustomScreen from "../pages/Custom/CustomScreen";
import Setting from "../pages/Setting";
import ShortcutForms from "../pages/ShortcutKeyForm";
import Organization from "../pages/Organization";
import Entrance from "../pages/Entrance";
import CustomerDetails from "../pages/Custom/CustomerDetails";
import store from "../store";
import { getCookie } from "../untils/auth";
import Team from "../pages/Team";
Vue.use(VueRouter);

const routes = [
    //首页从定向
    {
        path: "/",
        redirect: "/home",
        meta: {
            title: "首页"
        }
    },
    {
        path: "/work",
        name: "Work",
        component: Work,
        meta: {
            title: "工作"
        }
    },
    {
        path: "/news",
        name: "News",
        component: News,
        meta: {
            title: "消息"
        }
    },
    {
        path: "/visitor",
        name: "Visitor",
        component: Visitor,
        meta: {
            title: "访客"
        }
    },
    {
        path: "/mine",
        name: "Mine",
        component: Mine,
        meta: {
            title: "我的"
        }
    },
    {
        path: "/team",
        name: "Team",
        component: Team,
        meta: {
            title: "团队负责人"
        }
    },
    {
        path: "/entrance",
        name: "Entrance",
        component: Entrance,
        meta: {
            title: "组织架构入口"
        }
    },
    {
        path: "/organization",
        name: "Organization",
        component: Organization,
        meta: {
            title: "组织架构"
        }
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
        component: CustomHome,
        meta: {
            title: "自定义首页"
        }
    },
    // 表单设置
    {
        path: "/commonForms",
        name: "CommonForms",
        component: CommonForms,
        meta: {
            title: "表单设置"
        }
    },
    // 快捷键表单设置
    {
        path: "/shortcutForms",
        name: "ShortcutForms",
        component: ShortcutForms,
        meta: {
            title: "快捷键表单设置"
        }
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
    // 客户详情
    {
        path: "/customerDetails",
        name: "CustomerDetails",
        component: CustomerDetails
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
        const tokenKey = getCookie("tokenKey");

        if (tokenKey === null || tokenKey === "") {
            next("/");
        } else {
            next();
        }
    }
});

export default router;