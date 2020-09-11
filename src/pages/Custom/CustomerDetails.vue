<template>
  <div class="wrap">
    <div class="header">
      <van-action-sheet
        v-model="show"
        :actions="actions"
        @select="onSelect"
        title="标题"
      />
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
          <span class="operation" @click="show = true">操作</span>
        </div>
      </div>
      <div class="header_content">
        <div class="h_c_left">
          <div class="company">北京器材有限公司</div>
          <div class="personnel_wrap">
            <span class="personnel">负责人 ：</span>
            <span class="names">刘山山</span>
            <span class="time">一个月内</span>
          </div>
        </div>
        <div class="h_c_right">
          <img src="../../common/images/Notfiled.png" alt="" />
        </div>
      </div>
      <div class="header_team">
        <div class="header_t_left">
          <div class="header_t_center">
            <img src="../../common/images/2.jpg" alt="" />
            <span class="text">海绵宝宝</span>
          </div>
        </div>
        <div class="header_t_right">
          <div class="header_t_center">
            <img src="../../common/images/2.jpg" alt="" />
            <span class="text">派大星</span>
          </div>
        </div>
      </div>
    </div>
    <div class="scroll">
      <div class="scroll_list">
        <div class="scroll_li">
          <span class="num">989</span>
          <span class="scroll_text">跟进次数</span>
        </div>
        <div class="line"></div>
        <div class="scroll_li">
          <span class="num">989</span>
          <span class="scroll_text">跟进次数</span>
        </div>
        <div class="line"></div>
        <div class="scroll_li">
          <span class="num">989</span>
          <span class="scroll_text">跟进次数</span>
        </div>
        <div class="line"></div>
        <div class="scroll_li">
          <span class="num">989</span>
          <span class="scroll_text">跟进次数</span>
        </div>
        <div class="line"></div>
        <div class="scroll_li">
          <span class="num">989</span>
          <span class="scroll_text">跟进次数</span>
        </div>
        <div class="line"></div>
        <div class="scroll_li">
          <span class="num">989</span>
          <span class="scroll_text">跟进次数</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="nav">
        <van-tabs>
          <van-tab title="基本信息">
            <div class="Basic_infor">
              <div class="none"></div>
              <div class="form">
                <van-field v-model="number" label="编号" readonly />
                <van-field v-model="text" label="负责人" type="text" readonly />
                <van-field
                  v-model="Fullname"
                  type="text"
                  label="客户全称"
                  autosize
                  readonly
                />
                <van-field
                  v-model="type"
                  type="text"
                  label="客户类型"
                  readonly
                />
                <van-field
                  v-model="abbreviation"
                  type="text"
                  label="客户简称"
                  readonly
                />
                <van-field
                  v-model="address"
                  type="textarea"
                  label="客户地址"
                  readonly
                />
                <van-field v-model="GW" type="text" label="客户官网" readonly />
                <van-field
                  v-model="synopsis"
                  type="text"
                  label="客户简介"
                  readonly
                />
              </div>
              <div class="none"></div>
              <div class="files">
                <div class="files_tit">
                  <div class="Pictures">相关图片</div>
                </div>
                <div class="files_imgList">
                  <div
                    class="files_img"
                    v-for="each in imageList"
                    :key="each.fileId"
                  >
                    <img :src="each.urlThumbnail" alt="" />
                  </div>
                  <div class="files_img">
                    <img src="../../common/images/2.jpg" alt="" />
                  </div>
                </div>

                <div class="none"></div>
              </div>
              <div class="form">
                <van-field
                  maxlength="50"
                  v-model="enclosure"
                  label="附件"
                  readonly
                />
                <van-field
                  maxlength="20"
                  v-model="remarks"
                  label="备注"
                  type="text"
                  readonly
                />
                <van-field
                  v-model="Abandonment"
                  type="text"
                  label="弃用"
                  autosize
                  readonly
                />
              </div>
            </div>
          </van-tab>
          <van-tab title="跟进记录">
            <div class="Follow_record ">
              <div
                class="con_follow_li"
                v-for="each in FollowrecordData"
                :key="each.recordsId"
              >
                <div class="none"></div>
                <div class="con_follow_li_tit">
                  <div class="head">
                    <img :src="each.createUserProfile" alt="" />
                  </div>
                  <div class="msg">
                    <div class="msg_top">
                      <div class="msg_top_tit">
                        <span class="company">{{ each.customerFullName }}</span>
                        <span class="type">{{
                          each.followWorkType == 1
                            ? "当面拜访"
                            : each.followWorkType == 2
                            ? "电话拜访"
                            : each.followWorkType == 3
                            ? "网络拜访"
                            : null
                        }}</span>
                      </div>
                      <div class="occupation">{{ each.createUserName }}</div>
                    </div>
                    <div class="msg_down">
                      <p class="msg_down_text text">
                        {{ each.followContent }}
                      </p>
                      <p class="msg_down_text AIter">
                        <span class="alter_name"
                          >{{ each.customerFullName }}：</span
                        >
                        <span class="followWorkId"
                          >{{
                            each.followWorkId == 1
                              ? "销售机会"
                              : each.followWorkId == 2
                              ? "合同订单"
                              : each.followWorkId == 3
                              ? "报价单"
                              : null
                          }}<i class="followWorkNo">
                            ({{ each.followWorkNo }})</i
                          ></span
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
                      <span>{{ each.visitTime }}</span>
                    </p>
                    <ul class="comments">
                      <li class="comment_li">
                        <img src="../../common/images/comment.png" alt="" />
                        <span>{{ each.commentNum }}</span>
                      </li>
                      <li class="line"></li>
                      <li class="comment_li">
                        <img src="../../common/images/zan.png" alt="" />
                        <span>{{ each.likeNum }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="工单记录"> 内容 1</van-tab>
          <van-tab title="回款管理"> 内容 2 </van-tab>
          <van-tab title="开票信息">
            <div class="Billing_infor">
              <div class="tit">发票信息</div>
              <div class="form">
                <van-field
                  maxlength="50"
                  v-model="Invoice_type"
                  label="发票类型"
                  readonly
                />
                <van-field
                  maxlength="20"
                  v-model="Invoice_title"
                  label="发票抬头"
                  type="text"
                  readonly
                />
                <van-field
                  v-model="taxpayer"
                  type="text"
                  label="纳税人识别号"
                  autosize
                  readonly
                />
                <van-field
                  v-model="tel"
                  type="text"
                  label="注册电话"
                  readonly
                />
                <van-field
                  v-model="Invoice_address"
                  type="text"
                  label="开票地址"
                  readonly
                />
                <van-field v-model="GW" type="text" label="客户官网" readonly />
                <van-field v-model="Bank" type="text" label="开户行" readonly />
              </div>
            </div>
          </van-tab>
          <van-tab title="上下级"> 内容 3 </van-tab>
          <van-tab title="文件柜">
            <div class="File_cabinet">
              <div class="tit">
                <span class="total">共计文件</span><span class="num">2</span>
              </div>
              <div class="file_wrap">
                <div class="file_nav">
                  <div class="nav">
                    <van-tabs type="card">
                      <van-tab title="客户">
                        <div class="file_content">
                          <van-swipe-cell>
                            <div class="file_content_li">
                              <div class="left">
                                <img
                                  src="../../common/images/excel.png"
                                  alt=""
                                />
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
                                <img
                                  src="../../common/images/xiazai.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <template #right>
                              <van-button
                                type="danger"
                                class="delete-button-none"
                              />
                              <van-button
                                square
                                text="删除"
                                type="danger"
                                class="delete-button"
                              />
                            </template>
                          </van-swipe-cell>
                          <van-swipe-cell>
                            <div class="file_content_li">
                              <div class="left">
                                <img
                                  src="../../common/images/excel.png"
                                  alt=""
                                />
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
                                <img
                                  @click="changePreview"
                                  src="../../common/images/check.png"
                                  alt=""
                                />
                              </div>
                              <van-image-preview
                                v-model="Fileshow"
                                :images="images"
                              >
                              </van-image-preview>
                            </div>
                            <template #right>
                              <van-button
                                type="danger"
                                class="delete-button-none"
                              />
                              <van-button
                                square
                                text="删除"
                                type="danger"
                                class="delete-button"
                              />
                            </template>
                          </van-swipe-cell>
                        </div>
                      </van-tab>
                      <van-tab title="合作">内容 2</van-tab>
                      <van-tab title="机会">内容 3</van-tab>
                    </van-tabs>
                    <div class="file_upload">
                      <img src="../../common/images/upload.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import { findBase, findRecordBaseList } from "../../services/CustomerDetails";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      show: false,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      number: "", // 编号
      text: "", // 负责人
      Fullname: "", // 客户全称
      type: "", // 客户类型
      address: "", // 客户地址
      GW: "", // 客户官网
      abbreviation: "", // 客户简称
      enclosure: "", // 附件
      synopsis: "", // 简介
      remarks: "", //备注
      Abandonment: "", // 弃用
      imageList: "", // 图片列表
      accessoryList: "", // 附件信息
      Urlshumbnail: "", // 图片
      Invoice_type: "", // 发票类型
      Invoice_title: "", // 发票抬头
      taxpayer: "", // 纳税人识别号
      Invoice_address: "", // 发票地址
      tel: "", //注册电话
      Bank: "", //开户行,
      customerId: "",
      Fileshow: false,
      index: 0,
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      FollowrecordData: "" // 跟进记录数据
    };
  },
  created() {
    this.customerId = this.$route.query.id;
    this.tel = "王大陆";
    this.getfindBase();
    this.getfindRecordBaseList();
  },
  methods: {
    onChange(index) {
      this.index = index;
    },
    changePreview() {
      ImagePreview([
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ]);
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.$Toast(item.name);
    },
    changeClose() {
      location.replace("/");
    },
    getfindBase() {
      findBase(this.customerId).then(res => {
        if (res.code == 200) {
          let success = res.data;
          this.number = success.customerNo;
          this.text = success.personInCharge;
          this.type =
            success.customerTypeId == 1
              ? "局内客户"
              : success.customerTypeId == 2
              ? "外省客户"
              : success.customerTypeId == 3
              ? "行业客户"
              : success.customerTypeId == 4
              ? "纯社会客户"
              : null;
          this.address = success.customerAddress;
          this.Fullname = success.customerFullName;
          this.enclosure = success.customerOfficialWebsite;
          this.remarks = success.remark;
          this.imageList = success.imageList;
          this.accessoryList = success.accessoryList;
          this.Abandonment = "qingxuanze";
          this.accessoryList.map(each => {
            this.enclosure = each.fileOldName;
          });
        }
      });
    },
    // 跟进记录
    getfindRecordBaseList() {
      findRecordBaseList(this.customerId, 0).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.FollowrecordData = res.rows;
        }
      });
    }
  },
  components: {}
};
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    width: 100%;
    height: 2rem;
    box-sizing: border-box;
    background: url("../../common/images/BG.png") no-repeat center center;
    background-size: 100%;
    position: relative;
    /deep/.van-popup--bottom.van-popup--round {
      border-radius: 0 0;
    }
    .header_tit {
      width: 100%;
      height: 0.45rem;
      padding: 0 0.15rem;
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
      height: 1.12rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.12rem;
      box-sizing: border-box;
      .h_c_left {
        display: flex;
        flex-wrap: wrap;
        .company {
          width: 1.6rem;
          display: flex;
          font-size: 0.16rem;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #ffffff;
          line-height: 0.22rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .personnel_wrap {
          display: flex;
          align-items: center;
          margin-top: 0.07rem;
          .personnel {
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 0.2rem;
            margin-right: 0.05rem;
          }
          .names {
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 0.2rem;
          }
          .time {
            width: 0.6rem;
            height: 0.18rem;
            background: #ffb000;
            border-radius: 0.02rem;
            color: #fff;
            font-size: 0.12rem;
            margin-left: 0.1rem;
            display: inline-block;
            line-height: 0.18rem;
          }
        }
      }
      .h_c_right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .header_team {
      width: 100%;
      height: 0.44rem;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 0;
      .header_t_center {
        height: 100%;
        display: flex;
        align-items: center;
        .text {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 0.17rem;
          margin-left: 0.22rem;
        }
        img {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
        }
      }
      .header_t_left {
        flex: 1;
        height: 100%;
        background: rgba(0, 0, 0, 0.06);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .header_t_right {
        flex: 1;
        height: 100%;
        background: rgba(0, 0, 0, 0.06);
        margin-left: 0.01rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .scroll {
    width: 100%;
    height: 0.98rem;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    background: #f8f9fa;
    &::-webkit-scrollbar {
      display: none;
    }
    .scroll_list {
      width: 200%;
      height: 0.74rem;
      display: flex;
      align-items: center;
      background: #fff;
      .line {
        width: 0.01rem;
        height: 0.3rem;
        background: #e8eaed;
      }
      .scroll_li {
        width: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        :last-child {
          border-right: none;
        }
        .num {
          font-size: 0.18rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 0.25rem;
        }
        .scroll_text {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 0.17rem;
        }
      }
    }
  }
  .content {
    .nav {
      height: 0.44rem;
      .none {
        width: 100%;
        height: 0.1rem;
        background: #f8f9fa;
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
    }
    .form {
      /deep/.van-cell {
        min-height: 0.44rem;
        display: flex;
        span {
          display: inline-block;
          margin-top: 0.12rem;
          height: 0.2rem;
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
      /deep/ .van-cell__value {
        margin-top: 0.12rem;
      }
      /deep/ .van-field__label {
        width: 0.84rem;
        margin-left: 0.12rem;
      }
      /deep/ .van-cell__title {
      }
    }
    .Basic_infor {
      .files {
        .files_tit {
          width: 100%;
          height: 0.44rem;
          padding: 0 0.12rem;
          box-sizing: border-box;
          .Pictures {
            width: 100%;
            height: 0.44rem;
            display: flex;
            align-items: center;
            border-bottom: 0.01rem solid #eceff2;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
        .files_imgList {
          width: 100%;
          height: 1.1rem;
          display: flex;
          align-items: center;
        }
        .files_img {
          margin-left: 0.11rem;
          img {
            width: 0.64rem;
            height: 0.64rem;
          }
        }
      }
      .form {
        /deep/.van-cell {
          min-height: 0.44rem;
          display: flex;
          span {
            display: inline-block;
            margin-top: 0.12rem;
            height: 0.2rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
        /deep/ .van-cell__value {
          margin-top: 0.12rem;
        }
        /deep/ .van-field__label {
          width: 0.84rem;
          margin-left: 0.12rem;
        }
        /deep/ .van-cell__title {
        }
      }
    }
    .Follow_record {
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
          }
          .msg {
            flex: 1;
            margin: 0.19rem 0 0 0.2rem;
            .msg_top {
              .msg_top_tit {
                display: flex;
                align-items: center;
                .company {
                  font-size: 0.16rem;
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
              .text {
                font-size: 0.16rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 0.22rem;
                // text-overflow: -o-ellipsis-lastline;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // display: -webkit-box;
                // -webkit-line-clamp: 2;
                // line-clamp: 2;
                // -webkit-box-orient: vertical;
              }
              .AIter {
                font-size: 0.12rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                margin-top: 0.05rem;
                .alter_name {
                  color: #578eff;
                }
                .followWorkId {
                  display: flex;
                }
                .followWorkNo {
                  margin-left: 0.01rem;
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
    .Billing_infor {
      .tit {
        width: 100%;
        padding: 0.07rem 0 0.07rem 0.09rem;
        background: #f8f9fa;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0.17rem;
      }
    }
    .File_cabinet {
      .tit {
        width: 100%;
        padding: 0.07rem 0 0.07rem 0.12rem;
        background: #f8f9fa;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .total {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 0.17rem;
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
      .file_wrap {
        width: 100%;
        background: #f8f9fa;
        padding: 0 0.12rem;
        box-sizing: border-box;
        .file_nav {
          width: 100%;
          min-height: 5rem;
          display: flex;
          .nav {
            width: 100%;
            position: relative;
            /deep/.van-tabs__wrap {
              height: 0.34rem;
              display: flex;
            }
            /deep/.van-tab--active {
              color: #017cff;
              font-size: 0.14rem;
              font-family: PingFangSC-Regular, PingFang SC;
            }
            /deep/.van-tabs__nav--card {
              height: 0.34rem;
              margin: 0 0 0 0;
              color: #666666;
              font-size: 0.14rem;
              border: none;
              border-radius: 0.04rem;
              margin-right: 0.05rem;
              font-family: PingFangSC-Regular, PingFang SC;
            }
            /deep/.van-tab {
              width: 0.88rem;
              height: 0.34rem;
              color: #666666;
              background: #fff;
              border: none;
              border-radius: 0.04rem;
              margin-right: 0.05rem;
            }

            /deep/.van-tabs__nav {
              background-color: #f8f9fa;
            }
          }
          .file_upload {
            position: absolute;
            right: 0;
            top: 0;
            img {
              width: 0.34rem;
              height: 0.34rem;
            }
          }
        }
        .file_content {
          width: 100%;
          height: 5rem;
          border-radius: 0.08rem;
          background: #fff;
          margin-top: 0.1rem;
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
            .left {
              margin-top: 0.24rem;
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
                display: flex;
                font-size: 0.16rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 0.22rem;
              }
              .nameAndtime {
                display: flex;
                margin-top: 0.05rem;
                .surname {
                  font-size: 0.12rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  margin-right: 0.18rem;
                }
                .time {
                  .ymd {
                    margin-right: 0.05rem;
                  }
                  .ymd .hms {
                    font-size: 0.12rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                  }
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
    }
  }
}
</style>
