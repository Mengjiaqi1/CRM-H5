<template>
  <div class="wrap">
    <div class="header">
      <div class="header_tit">
        <div class="h_left">
          <img
            src="../../common/images/d_right.png"
            class="goBack"
            @click="$router.go(-1)"
            alt=""
          />

          <img
            src="../../common/images/d_close.png"
            class="close"
            @click="changeClose"
            alt=""
          />
        </div>
        <div class="h_center"></div>
        <div class="h_right">
          <span class="operation" @click="gobuild">操作</span>
        </div>
      </div>
      <div class="header_content">
        <p class="Nickname">
          <span class="surname">李</span><span class="occupation">销售</span>
        </p>
        <p class="relation">
          <span class="customers">关联客户&nbsp;:</span
          ><span class="customers">廊坊盛世</span>
        </p>
      </div>
      <div class="header_team">
        <div class="header_t_center">
          <img src="../../common/images/2.jpg" alt="" />
          <span class="text">海绵宝宝</span>
        </div>
        <div class="triangle"></div>
      </div>
    </div>
    <div class="content">
      <div class="none"></div>
      <van-tabs>
        <van-tab title="基本信息">
          <div class="Basic_infor">
            <div class="none"></div>
            <div class="form">
              <van-field v-model="customerNo" label="编号" readonly />
              <van-field
                v-model="customer"
                label="关联客户"
                type="text"
                readonly
              />
              <van-field
                v-model="Fullname"
                type="text"
                label="姓名"
                autosize
                readonly
                required
              />
              <van-field
                v-model="Telephone"
                type="text"
                label="联系电话"
                readonly
                required
              />
              <van-field
                v-model="department"
                type="text"
                label="部门"
                readonly
              />
              <!-- <van-field v-model="" type="text" label="" readonly /> -->
            </div>
          </div>
        </van-tab>
        <van-tab title="跟进记录">
          <div class="Follow_record ">
            <div class="con_follow_li">
              <div class="none"></div>
              <div class="con_follow_li_tit">
                <div class="head">
                  <img src="" alt="" />
                  <div class="ImgShow">
                    1
                  </div>
                </div>
                <div class="msg">
                  <div class="msg_top">
                    <div class="msg_top_tit">
                      <span class="company">孟佳琦</span>
                      <span class="type">电话拜访 </span>
                    </div>
                    <div class="occupation">廊坊盛世（合作经营）</div>
                  </div>
                  <div class="msg_down">
                    <div class="occupation2">廊坊盛世（合作经营）</div>
                    <p class="msg_down_text text">
                      <span>联系人:</span><span>李</span>
                    </p>
                    <p class="msg_down_text AIter">
                      <span class="alter_name">跟进业务：</span>
                      <span class="followWorkId">
                        销售机会
                        <i class="followWorkNo"> （OPP.20200408010）</i></span
                      >
                    </p>
                  </div>
                </div>
                <div class="goTo">
                  <img src="../../common/images/rights.png" alt="" />
                </div>
              </div>
              <div class="con_follow_li_time">
                <div class="con_follow_li_time_min">
                  <p class="ymd">
                    <span>2020-09-14 12:52:01</span>
                  </p>
                  <ul class="comments">
                    <li class="comment_li">
                      <img src="../../common/images/comment.png" alt="" />
                      <span>1</span>
                    </li>
                    <li class="line"></li>
                    <li class="comment_li">
                      <img src="../../common/images/zan.png" alt="" />
                      <span>1</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="文件柜">
          <div class="File_cabinet">
            <div class="titwrap">
              <div class="tit">
                <span class="total">共计文件</span><span class="num">2</span>
              </div>
              <div class="file_upload">
                <van-uploader class="uploadImg" :after-read="afterRead">
                  <img src="../../common/images/upload.png" alt="" />
                </van-uploader>
              </div>
            </div>
            <div class="file_wrap">
              <div class="file_content" ref="fileContent">
                <van-swipe-cell>
                  <div class="file_content_li">
                    <div class="left">
                      <img src="../../common/images/excel.png" alt="" />
                    </div>
                    <div class="center">
                      <div class="Scheduling">项目排期.rar</div>
                      <div class="nameAndtime">
                        <span class="surname">何强</span>
                        <li class="time">
                          <span class="ymd">2020-12-01</span>
                          <span class="hsm">12:32:21</span>
                        </li>
                      </div>
                      <div class="size">1.1M</div>
                    </div>
                    <div class="right">
                      <img src="../../common/images/check.png" alt="" />
                    </div>
                    <van-image-preview v-model="Fileshow" :images="images">
                    </van-image-preview>
                  </div>
                  <template #right>
                    <van-button type="danger" class="delete-button-none" />
                    <van-button
                      square
                      text="删除"
                      type="danger"
                      class="delete-button"
                    />
                  </template>
                </van-swipe-cell>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="buttonwrap">
      <div class="button">
        <li>
          <img src="../../common/images/follow-up.png" alt="" />
          <span>写跟进</span>
        </li>
        <span class="line"></span>
        <li @click="showPopup">
          <img src="../../common/images/contacts2.png" alt="" />
          <span>联系方式</span>
        </li>
      </div>
    </div>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="block_wrap">
            <div class="tit">联系人号码</div>
            <div class="content">
              <li>
                <p class="deptName">
                  <span class="name">孟佳琦</span
                  ><span class="phone">10086</span><span class="line"></span>
                </p>
                <p class="phoneImg">
                  <img
                    src="../../common/images/phone.png"
                    alt=""
                    @click="handleCall(10086)"
                  />
                </p>
              </li>
            </div>
          </div>
          <div class="close" @click="show = false">关闭</div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="showImg" @click="showImg = false">
      <div class="wrapper" @click="showImg = false" @click.stop>
        <div class="block">
          <img :src="imgUrl" alt="" id="img" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import * as dd from 'dingtalk-jsapi'

export default {
  data() {
    return {
      check: require('../../common/images/check.png'),
      xiazai: require('../../common/images/xiazai.png'),
      customerNo: '', // 编号
      customer: '', //关联客户
      Fullname: '', // 姓名
      Telephone: '', // 联系电话
      department: '', // 部门
      Fileshow: false,
      fileList: [],
      images: [],
      show: false,
      showImg: false,
      imgUrl: '',
    }
  },
  create() {},
  methods: {
    // 点击操作去新建
    gobuild() {
      this.$router.push('/newContacts')
    },
    // 点击联系人poup
    showPopup() {
      this.show = true
      //   this.getfindContactsByCustomerId();
    },
    handleCall(tel) {
      dd.ready(function() {
        dd.biz.telephone.showCallMenu({
          phoneNumber: '13522070865', // 期望拨打的电话号码
          code: '+86', // 国家代号，中国是+86
          showDingCall: true, // 是否显示钉钉电话
          onSuccess: function() {},
          onFail: function() {},
        })
      })
      this.showProup = true
      this.Telephone = tel
    },
    afterRead(file) {
      console.log(file)
    },
    changeClose() {
      location.replace('/')
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .header {
    width: 100%;
    height: 2rem;
    box-sizing: border-box;
    background: url('../../common/images/BG.png') no-repeat center center;
    background-size: 100%;
    position: relative;
    .header_tit {
      width: 100%;
      height: 0.45rem;
      padding: 0 0.13rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .h_left {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .goBack {
          width: 0.25rem;
          height: 0.25rem;
          margin-right: 0.1rem;
        }
        .close {
          width: 0.25rem;
          height: 0.25rem;
        }
      }
      .h_center {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.22rem;
      }
      .h_right {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .header_content {
      width: 100%;
      margin-top: 0.34rem;
      padding: 0 0.13rem;
      box-sizing: border-box;
      .Nickname {
        width: 100%;
        display: flex;
        align-items: center;
        .surname {
          font-size: 0.16rem;
          font-weight: 600;
          color: #ffffff;
        }
        .occupation {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          padding: 0 0.06rem;
          background: #ffb000;
          border-radius: 0.02rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.1rem;
        }
      }
      .relation {
        display: flex;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.17rem;
        margin-top: 0.1rem;
        .customers {
          margin-right: 0.1rem;
          color: #ffffff;
        }
      }
    }
    .header_team {
      width: 100%;
      height: 0.44rem;
      padding: 0 0.13rem;
      background: rgba(0, 0, 0, 0.06);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      position: absolute;
      left: 0;
      bottom: 0;
      .header_t_center {
        display: flex;
        align-items: center;
        img {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
        }
        .text {
          font-weight: 400;
          color: #666666;
          margin-left: 0.12rem;
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #fff;
        }
      }
      .triangle {
        width: 0;
        height: 0;
        border-top: 0.07rem solid transparent;
        border-left: 0.07rem solid #fff;
        border-bottom: 0.07rem solid transparent;
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    .none {
      width: 100%;
      height: 0.12rem;
      background: #f8f9fa;
    }

    /deep/.van-tab__text {
      font-size: 0.14rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }
    /deep/.van-cell--required::before {
      position: absolute;
      left: 0.13rem;
      color: #ee0a24;
      font-size: 0.14rem;
      content: '*';
    }
    /deep/.van-tabs__wrap--scrollable {
      padding-left: 0.12rem;
      padding-right: 0.12rem;
    }
    /deep/.van-tabs__line {
      width: 0.32rem !important;
    }
    /deep/.van-tabs__wrap--scrollable .van-tabs__nav--complete {
      padding-left: 0;
      padding-right: 0;
    }
    /deep/.van-tab {
      margin-right: 0.45rem;
      padding: 0 0;
    }
    /deep/.van-tab--active {
      .van-tab__text {
        color: #006aff;
      }
    }
    /deep/.van-tabs__line {
      background-color: #006aff;
    }
    .Basic_infor {
      .form {
        /deep/.van-cell {
          min-height: 0.44rem;
          display: flex;
          align-items: center;
          padding: 0 0.16rem;
          span {
            display: inline-block;
            margin-left: 0.1rem;
            // height: 0.2rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
        /deep/ .van-cell__value {
          //   margin-top: 0.12rem;
        }
        /deep/ .van-field__label.van-cell__title {
          width: 0.84rem;
          margin-left: 0.09rem;
          display: flex;
          align-items: center;
        }
      }
    }
    .Follow_record {
      width: 100%;
      height: 100%;
      .con_follow_li {
        width: 100%;
        .con_follow_li_tit {
          display: flex;
          justify-content: space-between;
          padding: 0 0.12rem;
          .head {
            margin-top: 0.17rem;
            width: 0.44rem;
            img {
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 50%;
            }
            .ImgHide {
              display: none;
            }
            .ImgShow {
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #006aff;
              color: #fff;
              font-size: 0.14rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
            }
          }
          .msg {
            flex: 1;
            margin: 0.19rem 0 0 0.2rem;
            .msg_top {
              .msg_top_tit {
                display: flex;
                align-items: center;
                .company {
                  font-size: 0.14rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #333333;
                  line-height: 0.22rem;
                }
                .type {
                  width: 0.48rem;
                  height: 0.17rem;
                  background: #006aff;
                  border-radius: 0.02rem;
                  font-size: 0.12rem;
                  display: flex;
                  align-items: center;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #ffffff;
                  margin-left: 0.07rem;
                }
              }
              .occupation {
                display: flex;
                font-size: 0.14rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 0.2rem;
              }
            }
            .msg_down {
              margin-top: 0.15rem;
              .msg_down_text {
                display: flex;
              }
              .occupation2 {
                display: flex;
                font-size: 0.16rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
              }
              .text {
                font-weight: 400;
                color: #666;
                // line-height: 0.22rem;
                margin-top: 0.07rem;
                span {
                  font-size: 0.12rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                }
              }
              .AIter {
                display: flex;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                margin-top: 0.05rem;
                color: #666;
                .alter_name {
                  color: #666;
                  font-size: 0.12rem;
                }
                .followWorkId {
                  display: flex;
                  font-size: 0.12rem;
                }
                .followWorkNo {
                  margin-left: 0.01rem;
                  font-size: 0.12rem;
                }
              }
            }
          }
          .goTo {
            width: 0.15rem;
            margin-top: 0.24rem;
            img {
              width: 0.14.4rem;
              height: 0.14.4rem;
            }
          }
        }
        .con_follow_li_time {
          width: 100%;
          height: 0.34rem;
          padding: 0 0.12rem;
          box-sizing: border-box;
          margin-top: 0.18rem;
          margin-bottom: 0.2rem;
          .con_follow_li_time_min {
            width: 100%;
            height: 0.34rem;
            background: #fbfbfb;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .ymd {
            margin-left: 0.11rem;
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 0.17rem;
            .hms {
              margin-left: 0.05rem;
            }
          }
          .comments {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 0.2rem;
            .comment_li {
              span {
                margin-left: 0.06rem;
              }
            }
            .line {
              width: 0.01rem;
              height: 0.1rem;
              background: #e8eaed;
              margin: 0 0.23rem;
            }
          }
        }
      }
    }
    .File_cabinet {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: #f8f9fa;
      .titwrap {
        width: 100%;
        height: 0.42rem;
        padding: 0 0.12rem;
        background: #f8f9fa;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tit {
          display: flex;
          .total {
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
          }
          .num {
            width: 0.2rem;
            height: 0.14rem;
            background: #017cff;
            border-radius: 0.06rem;
            margin-left: 0.1rem;
            font-size: 0.13rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .file_upload {
          box-sizing: border-box;
          img {
            width: 0.24rem;
            height: 0.24rem;
          }
          .uploadImg {
            width: 0.24rem;
            height: 0.24rem;
          }
        }
      }
    }
    .file_wrap {
      padding: 0 0.12rem;
      box-sizing: border-box;
    }
    .file_content {
      width: 100%;
      height: 5rem;
      border-radius: 0.08rem;
      background: #fff;
      padding: 0 0.11rem;
      box-sizing: border-box;
      /deep/element.style {
        transform: translate3d(-79px, 0px, 0px);
      }
      /deep/.van-swipe-cell__right {
        display: flex;
      }
      /deep/.van-button--danger {
        background: #ff6189;
        border: none;
      }
      /deep/ .goods-card {
        margin: 0;
        background-color: #fff;
      }
      /deep/.delete-button-none {
        width: 0.15rem;
        background: #fff;
        height: 100%;
        border-bottom: 0.01rem solid #eceff2;
      }
      /deep/.delete-button {
        width: 0.64rem;
        height: 100%;
      }
      .file_content_li {
        width: 100%;
        height: 0.96rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #eceff2;
        background: #fff;
        box-sizing: border-box;
        .left {
          margin-top: 0.24rem;
          width: 0.4rem;
          height: 0.4rem;
          img {
            width: 0.4rem;
            height: 0.4rem;
          }
        }
        .center {
          flex: 1;
          margin-left: 0.2rem;
          margin-top: 0.16rem;

          .Scheduling {
            width: 2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 0.16rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            line-height: 0.22rem;
            display: flex;
          }
          .nameAndtime {
            display: flex;
            margin-top: 0.05rem;
            .surname {
              display: flex;
              min-width: 0.39rem;
              font-size: 0.12rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
            .time {
              margin-left: 0.18rem;
            }
          }

          .size {
            display: flex;
            margin-top: 0.05rem;
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.08rem;
          img {
            widows: 0.14rem;
            height: 0.14rem;
          }
        }
      }
    }
  }
  .buttonwrap {
    padding: 0 0.13rem;
    box-sizing: border-box;
    width: 100%;
    height: 0.49rem;
    position: fixed;
    left: 0;
    bottom: 0.1rem;
    .button {
      width: 100%;
      height: 100%;
      box-shadow: 0.02rem 0.02rem 0.04rem 0 rgba(0, 106, 255, 0.1);
      border-radius: 0.08rem;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .line {
        width: 0.01rem;
        height: 0.28rem;
        background: #dbdbdb;
      }
      li {
        width: 49.5%;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
        }
        span {
          font-size: 0.1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 0.14rem;
        }
      }
    }
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
  /deep/.van-overlay {
    background: rgba(0, 0, 0, 0.5);
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
}
</style>
