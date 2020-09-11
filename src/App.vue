<template>
  <div id="app">
    <router-view />
    <!-- <input type="text" v-model="inp" ref="text" id="inp" /> -->
  </div>
</template>
<script>
import { getLogin } from "./services/login";
import * as dd from "dingtalk-jsapi";
import router from "./router";
import { setCookie, getCookie } from "./untils/auth";

export default {
  data() {
    return {
      ddCode: null,
      inp: ""
    };
  },
  async created() {
    if (dd.env.platform != "notInDingTalk") {
      await this.getDDCode();
    } else {
      setCookie(
        "tokenKey",
        "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjM0NjVlZmQ2LTZmZjktNGRmZS1iNzY1LThmMGQwNWIwNjdlMCJ9.P9uGa8zaiu7LVO0W5ohO4ivRe8w8YmyVGgKhTRBbj-ME52j-VdDEoBUFPjpoaWKqTCjxtAovIH5QRtlJI3PM7w"
      );
      this.getDDCode();
    }
  },
  methods: {
    getDDCode() {
      return new Promise((resolve, reject) => {
        dd.ready(function() {
          dd.runtime.permission.requestAuthCode({
            corpId: "ding4549e680a3f82a1c35c2f4657eb6378f", // 企业id
            onSuccess: function(info) {
              const tempCode = info.code;
              if (
                getCookie("tokenKey") == null ||
                getCookie("tokenKey") == undefined
              ) {
                getLogin(tempCode).then(res => {
                  if (res.code == 200 && res.token) {
                    setCookie("tokenKey", res.token);
                    router.push("/home");
                  }
                });
              }
              resolve();
            },
            onFail: function(err) {
              //   console.log(err);
              this.toast({
                message: "获取code失败，请退出重试"
              });
              reject(err);
            }
          });
        });
      });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.14rem;
}

#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  box-sizing: border-box;
}

#nav {
  padding: 0.3rem;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

// 阿里字体图标设置
.icon,
.iconfont {
  font-family: "iconfont" !important;
  font-size: 1.16rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
