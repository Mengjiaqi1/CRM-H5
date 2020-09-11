import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "qwe",
        Flag: true,
        customerId: ""
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
        }
    },
    actions: {
        set_token({ commit }, i) {
            commit("set_token", i);
        }
        // set_customerId({ commit }, i) {
        //     commit("set_customerId", i);
        // }
    },
    getters: {},
    modules: {}
});