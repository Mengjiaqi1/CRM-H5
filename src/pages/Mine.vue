<template>
  <div class="mine">
    <header>
      <div class="header_box">
        <div class="header_title">
          <div class="h_left">
            <router-link tag="p" to="/">
              <img src="../common/images/goBack.png" alt="" />
            </router-link>
          </div>
          <div class="h_right">
            <img src="../common/images/add.png" @click="changeAdd" alt="" />
          </div>
        </div>
        <div>个人信息部分</div>
      </div>
      <div class="list_box">
        <div class="list_center">
          <ul class="list">
            <li>
              <p><img src="../common/images/file.png" alt="" class="icon_mine"/></p>
              <p class="text_mine">帮助文档</p>
              <p class="icon"><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
            </li>
            <li>
              <p><img src="../common/images/problem.png" alt="" class="icon_mine"/></p>
              <p class="text_mine">常见问题</p>
              <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
            </li>
            <li>
              <p><img src="../common/images/hotline.png" alt="" class="icon_mine"/></p>
              <p class="text_mine">客服热线</p>
              <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
            </li>
            <li>
              <p><img src="../common/images/feedback.png" alt="" class="icon_mine"/></p>
              <p class="text_mine">意见反馈</p>
              <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
            </li>
            <li>
              <p><img src="../common/images/about.png" alt="" class="icon_mine"/></p>
              <p class="text_mine">关于我们</p>
              <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
            </li>
            <li>
<!--            <router-link tag="li" to="/commonForms">-->
              <p><img src="../common/images/setting.png" alt="" class="icon_mine"/></p>
              <p class="text_mine">我的设置</p>
              <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
<!--            </router-link>-->
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main></main>
    <MyFooter />
  </div>
</template>
<script>
import MyFooter from "@/components/MyFooter.vue";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    changeAdd(){

    }
  },
  mounted() {},
  computed: {},
  components: {
      MyFooter,
  }
};
</script>
<style lang="scss" scoped>
  .mine{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    header {
      position: relative;
      .header_box {
        width: 100%;
        height: 2.8rem;
        box-sizing: border-box;
        background: url("../common/images/BG.png") no-repeat center center;
        background-size: 100%;
      }
      .header_title {
        width: 100%;
        height: 0.39rem;
        padding-top: 0.1rem;
        box-sizing: border-box;
        .h_left {
          float: left;
          img {
            width: 0.25rem;
            height: 0.25rem;
            margin-left: 0.1rem;
          }
        }
        .h_right {
          float: right;
          img {
            width: 0.25rem;
            height: 0.25rem;
            margin-right: 0.1rem;
          }
        }
      }

      .list_box {
        width: 100%;
        box-sizing: border-box;
        padding: 0 0.15rem;
        position: absolute;
        top: 2.5rem;
        left: 0;
      }
      .list_center {
        width: 100%;
        border-radius: 0.08rem;
        box-shadow:2px 2px 6px 0px rgba(13,48,98,0.1);
        background: rgba(255, 255, 255, 1);
      }
      .list {
        width: 100%;
        box-sizing: border-box;
        padding: 0.4rem 0.05rem 1.38rem 0.12rem;
        li {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.33rem;
          p {
            width: 33.33%;
            display: flex;
            flex-wrap: wrap;
            .icon_mine{
              width: 0.22rem;
              height: 0.22rem;
              vertical-align: middle;
            }
            .text_mine{
              width: 85%;
              font-size: 0.12rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 700;
              color: #333333;
              vertical-align: middle;
            }
          }
          p:nth-child(1),p:nth-child(3){
            width: 7%;
            justify-content: center;
            text-align: center;
          }
          p:nth-child(2){
            width: 86%;
            padding-left: 0.11rem;
            box-sizing: border-box;
          }
        }
        li:last-child{
          margin-bottom: 0rem;
        }
      }
    }
  }
</style>
