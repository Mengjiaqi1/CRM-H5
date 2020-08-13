import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: "qwe",
        Flag: true
    },
    mutations: {
        set_token(state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        },
        set_flag(state, flag) {
            state.Flag = flag;
        }
    },
    actions: {
        set_token({ commit }, i) {
            commit("set_token", i);
        }
    },
    modules: {}
});