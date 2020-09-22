<template>
  <div class="navwrap">
    <div class="nav">
      <li>
        <router-link tag="li" to="/approval">
          <img src="../common/images/remind2.png" alt="" />
          <span style="width: 0.24rem">提醒</span>
        </router-link>
      </li>
      <li>
        <img src="../common/images/follow-up.png" alt="" />
        <span>写跟进</span>
      </li>
      <li @click="showPopup">
        <img src="../common/images/contacts2.png" alt="" />
        <span>联系人</span>
      </li>
      <li>
        <img src="../common/images/position.png" alt="" />
        <span>位置</span>
      </li>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="block_wrap">
            <div class="tit">联系人号码</div>
            <div class="content">
              <li v-for="(each, ind) in phoneList" :key="ind">
                <p class="deptName">
                  <span class="name">{{ each.contactsName }}</span
                  ><span class="phone">{{ each.phoneNum }}</span
                  ><span class="line"></span>
                </p>
                <p class="phoneImg">
                  <img
                    src="../common/images/phone.png"
                    alt=""
                    @click="handleCall(each.phoneNum)"
                  />
                </p>
              </li>
            </div>
          </div>
          <div class="close" @click="show = false">关闭</div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import { findContactsByCustomerId } from "../services/CustomerDetails";
import * as dd from "dingtalk-jsapi";
export default {
  data() {
    return {
      show: false,
      Telephone: "",
      options: [],
      phoneList: "",
      //   telactions: [],
      OrdinaryTelephone: "" //普通电话
    };
  },
  created() {},
  methods: {
    handerStop(e) {
      console.log(e);
    },
    showPopup() {
      this.show = true;
      this.getfindContactsByCustomerId();
    },
    handleCall(tel) {
      dd.ready(function() {
        dd.biz.telephone.showCallMenu({
          phoneNumber: tel, // 期望拨打的电话号码
          code: "+86", // 国家代号，中国是+86
          showDingCall: true, // 是否显示钉钉电话
          onSuccess: function() {
            console.log("success");
          },
          onFail: function(err) {
            console.log(err);
          }
        });
      });
      dd.error(err => {
        console.log(err, "err");
      });
      this.Telephone = tel;
    },
    getfindContactsByCustomerId() {
      findContactsByCustomerId(this.$store.state.customerId).then(res => {
        if (res.code == 200) {
          this.phoneList = res.rows;
        }
      });
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
}
.navwrap {
  width: 100%;
  height: 0.59rem;
  margin: 0 auto;
  padding: 0 0.12rem;
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  background: #fff;
  .nav {
    width: 100%;
    height: 0.49rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0.02rem 0.02rem 0.04rem 0 rgba(0, 106, 255, 0.1);
    border-radius: 0.08rem;
    li {
      width: 25%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      img {
        width: 0.26rem;
        height: 0.26rem;
      }
      span {
        font-size: 0.1rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }
  }
  /deep/.van-overlay {
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .close {
      width: 100%;
      height: 0.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .block {
    width: 100%;
    min-height: 3rem;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .block_wrap {
      width: 100%;
      height: 100%;
    }
    .tit {
      width: 100%;
      height: 0.34rem;
      background: #f4f4f4;
      display: flex;
      align-items: center;
      padding-left: 0.12rem;
      font-size: 0.12rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .content {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        height: 0.54rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 0.01rem solid #eceff2;
        padding-left: 0.12rem;
        box-sizing: border-box;

        .deptName {
          flex: 7.5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .name {
            font-size: 0.16rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
          }
          .phone {
            font-size: 0.16rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            letter-spacing: 0.01rem;
          }
          .line {
            width: 0.01rem;
            height: 0.2rem;
            background: #eceff2;
          }
        }
        .phoneImg {
          flex: 2.5;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.16rem;
            height: 0.16rem;
          }
        }
      }
    }
    .close {
      width: 100%;
      height: 0.44rem;
      border-top: 0.01rem solid #f1f5fa;
      font-size: 0.16rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  .sheet {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    // background: rgba(0, 0, 0, 0.5);
    /deep/.van-overlay {
      background: rgba(0, 0, 0, 0.5);
    }
    /deep/.van-action-sheet {
      width: 93%;
      margin-left: 6%;
    }
    /deep/.van-popup {
      margin: 0 auto;
      background: none;
    }
    /deep/.van-popup--bottom {
      left: 0.12rem;
      bottom: 0.1rem;
      border-radius: 0.08rem;
    }
    /deep/.van-action-sheet__item {
      width: 100%;
      height: 0.49rem;
      padding: 0.14rem 0.12rem;
      box-sizing: border-box;
      border-bottom: 0.01rem solid #f1f5fa;
      font-size: 0.16rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #006aff;
      background: #fff;
      &:nth-of-type(3) {
        border-radius: 0 0 0.08rem 0.08rem;
      }
    }
    /deep/.van-action-sheet__gap {
      width: 100%;
      height: 0.12rem;
      background: rgba(0, 0, 0, 0);
    }
    /deep/.van-action-sheet__cancel {
      width: 100%;
      height: 0.49rem;
      font-size: 0.14rem;
      color: #006aff;
      border-radius: 0.08rem;
      background: #fff;
    }
  }

  /deep/.van-action-sheet {
    // display: none;
  }
  .tel {
    width: 100%;
    height: 100%;
    /deep/.van-popup {
      width: 100%;
      min-height: 1rem;
    }
    .content {
      width: 100%;
      min-height: 0.4rem;
    }
  }
}
</style>
