<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { getLogin } from './services/login'
import * as dd from 'dingtalk-jsapi'
import router from './router'
import { setCookie, getCookie } from './untils/auth'
export default {
  data() {
    return {}
  },
  mounted() {},
  async created() {
    if (dd.env.platform != 'notInDingTalk') {
      await this.getDDCode()
    } else {
      setCookie(
        'tokenKey',
        'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6IjRlZDRlMDU5LTk3ZWUtNGFhYy05NDU1LWY4MWJhOTdkYTVjZSJ9.M57K9J53bs11HFhqynzoW7QGej_wlhffUdoVAAKyODDrlo9F8VBGcyDiJDchRH8phYyIyO1sS9CXWTcx8okxyA'
      )
      this.getDDCode()
    }
  },
  methods: {
    getDDCode() {
      return new Promise((resolve, reject) => {
        dd.ready(function() {
          dd.runtime.permission.requestAuthCode({
            corpId: 'ding4549e680a3f82a1c35c2f4657eb6378f', // 企业id
            onSuccess: function(info) {
              const tempCode = info.code
              console.log(tempCode, 'code')
              if (
                getCookie('tokenKey') == null ||
                getCookie('tokenKey') == undefined
              ) {
                getLogin(tempCode).then((res) => {
                  console.log(res, 'loginres')
                  if (res.code == 200 && res.token) {
                    setCookie('tokenKey', res.token)
                    router.push('/home')
                  }
                })
              }
              resolve()
            },
            onFail: function(err) {
              console.log(err, 'OnFailerr')
              this.toast({
                message: '获取code失败，请退出重试',
              })
              reject(err)
            },
          })
          dd.error((err) => {
            console.log(err, 'dingerr')
          })
        })
      })
    },
  },
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  /deep/element.style {
    z-index: 0;
  }
  /deep/.van-overlay {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
  /deep/.van-image-preview__overlay {
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }
}

* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.14rem;
  font-family: PingFangSC-Regular, PingFang SC;
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
  font-family: 'iconfont' !important;
  font-size: 1.16rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}
</style>
