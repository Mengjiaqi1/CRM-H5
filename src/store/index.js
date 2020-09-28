import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "",
        Flag: true,
        customerId: "",
        customerNo: "", // 客户编号
        userIdList: [], // 组织构架多选框用户的userId
        followTime: null, // 跟进时间
        radio: "" // 关联客户单选
    },
    mutations: {
        set_token(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        set_flag(state, flag) {
            state.Flag = flag;
        },
        set_customerId(state, customerId) {
            state.customerId = customerId;
            localStorage.setItem("customerId", customerId);
        },
        set_customerNo(state, customerNo) {
            state.customerNo = customerNo;
            localStorage.setItem("customerNo", customerNo);
        },
        set_followTime(state, time) {
            state.followTime = time;
            localStorage.setItem("followTime", time);
        },
        set_radio(state, radio) {
            state.radio = radio;
            localStorage.setItem("radio", radio);
        }
    },
    actions: {
        set_token({
            commit
        }, i) {
            commit("set_token", i);
        }
        // set_customerId({ commit }, i) {
        //     commit("set_customerId", i);
        // }
    },
    getters: {},
    modules: {}
});