<template>
  <div class="wrap">
    <main>
      <div class="chart_type">
        <div class="custom_tit">团队负责人</div>
        <div class="add_card">
          <div class="fluid container">
            <div class="col-md-3">
              <draggable
                class="list-group"
                tag="ul"
                :name="'flip-list'"
                disabled="false"
              >
                <li
                  class="list-group-item"
                  v-for="element in principalList"
                  :key="element.userId"
                >
                  <div class="headwrap">
                    <div class="head">
                      <img
                        :class="element.userProfile == '' ? 'ImgHide' : ''"
                        :src="element.userProfile + '_100x100.jpg'"
                        alt=""
                      />
                      <p
                        :class="
                          element.userProfile == '' ? 'ImgShow' : 'ImgHide'
                        "
                      >
                        {{
                          element.userName.length >= 3
                            ? element.userName.substring(
                                element.userName.length - 2,
                                element.userName.length
                              )
                            : element.userName
                        }}
                      </p>
                    </div>
                    <span class="text">{{ element.userName }} </span>
                  </div>
                  <span class="badge">
                    <img
                      :src="forms_reduce"
                      alt=""
                      class="reducer"
                      @click="
                        removeprincipal(
                          element.customerNo,
                          element.type,
                          element.userId
                        )
                      "
                    />
                  </span>
                </li>
              </draggable>
            </div>
          </div>
        </div>
      </div>
      <div class="chart_type">
        <div class="custom_tit">团队协同人</div>
        <div class="add_card">
          <div class="fluid container">
            <div class="col-md-3">
              <draggable
                class="list-group"
                tag="ul"
                :name="'flip-list'"
                disabled="false"
              >
                <li
                  class="list-group-item"
                  v-for="element in partnerList"
                  :key="element.userId"
                >
                  <div class="headwrap">
                    <div class="head">
                      <img
                        :class="element.userProfile == '' ? 'ImgHide' : ''"
                        :src="element.userProfile + '_100x100.jpg'"
                        alt=""
                      />
                      <p
                        :class="
                          element.userProfile == '' ? 'ImgShow' : 'ImgHide'
                        "
                      >
                        {{
                          element.userName.length >= 3
                            ? element.userName.substring(
                                element.userName.length - 2,
                                element.userName.length
                              )
                            : element.userName
                        }}
                      </p>
                    </div>
                    <span class="text">{{ element.userName }} </span>
                  </div>
                  <span class="badge">
                    <img
                      :src="forms_reduce"
                      alt=""
                      class="reducer"
                      @click="
                        removepartner(
                          element.customerNo,
                          element.type,
                          element.userId
                        )
                      "
                    />
                  </span>
                </li>
              </draggable>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="addcontacts">
      <div class="add" @click="goOranization">
        <img src="../common/images/add.png" alt="" />
      </div>
    </div>
    <div class="footer">
      <van-button type="info" @click="changeCall">电话会议</van-button>
      <van-button type="primary">Ding</van-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { findChargeList, add } from "../services/organization";
import * as dd from "dingtalk-jsapi";
export default {
  data() {
    return {
      addCard: [
        { menuId: 0, name: "1" },
        { menuId: 1, name: "2" },
        { menuId: 2, name: "3" }
      ],
      forms_add: require("../common/images/home_add.png"),
      forms_reduce: require("../common/images/home_reducer.png"),
      customerNo: "",
      partnerList: [], //协同人
      principalList: [], // 负责人
      users: [], //工号测试
      usersList: [] //工号
    };
  },
  created() {
    this.customerNo = this.$route.query.id;
    this.getfindChargeList();
    console.log(JSON.parse(JSON.stringify(this.users)), "list");
    // let arr = [{ 0: "梦" }, { 1: "佳琦" }];
    for (var each of this.users) {
      for (var key in each) {
        console.log(each[key]);
      }
    }
    console.log(this.usersList, "lsit2");
  },
  methods: {
    //电话会议
    changeCall() {
      dd.ready(function() {
        dd.biz.telephone.call({
          users: ["2031031816751911", "201913384023551116"], //用户列表，工号
          corpId: "ding4549e680a3f82a1c35c2f4657eb6378f", //企业id
          onSuccess: function() {},
          onFail: function() {}
        });
      });
      dd.error(err => {
        console.log(err, "err");
      });
    },
    goOranization() {
      this.$router.push({
        path: "/organization",
        query: { id: this.customerNo }
      });
    },
    // 查询协同人，负责人
    getfindChargeList() {
      findChargeList(this.customerNo).then(res => {
        if (res.code == 200) {
          this.partnerList = res.data.partnerList;
          this.principalList = res.data.principalList;
          this.principalList.map(each => {
            this.users.push(each.staffId);
          });
        }
      });
    },
    // 删除负责人
    removeprincipal(customerNo, type, userId) {
      add(customerNo, type, userId).then(res => {
        console.log(res);
      });
    },
    // 删除协同人
    removepartner(customerNo, type, userId) {
      add(customerNo, type, userId).then(res => {
        console.log(res);
      });
    }
  },
  components: {
    draggable
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  main {
    // flex: 1;
    // overflow: srcoll;
    .chart_type {
      background: rgba(248, 249, 250, 1);
      .custom_tit {
        width: 100%;
        height: 0.32rem;
        padding-left: 0.12rem;
        display: flex;
        align-items: center;
        background: rgba(248, 248, 248, 1);
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0.17rem;
        box-sizing: border-box;
      }
      .add_card {
        box-sizing: border-box;
        padding: 0 0.12rem;
        background: #fff;
      }
      .chart_box {
        width: 100%;
        height: 1.28rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .chart_left {
          width: 48%;
          height: 1.04rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 1);
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
        }
        .chart_active {
          width: 48%;
          height: 1.04rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.04rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(0, 106, 255, 1);
          background: rgba(242, 247, 255, 1);
          border: 0.01rem solid rgba(0, 106, 255, 1);
          background: url("../common/images/Select.png") no-repeat bottom right;
          background-size: 0.18rem 0.18rem;
          box-sizing: border-box;
          img {
            width: 0.6rem;
            height: 0.6rem;
          }
        }
      }
      .list-group {
        :last-child {
          border-bottom: none;
        }
        .list-group-item {
          width: 100%;
          height: 0.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.12rem;
          box-sizing: border-box;
          border-bottom: 0.01rem solid #eceff2;
          .headwrap {
            display: flex;
            align-items: center;
            .head {
              width: 0.28rem;
              height: 0.28rem;
              border-radius: 50%;
            }
            .ImgHide {
              display: none;
            }
            .ImgShow {
              width: 0.28rem;
              height: 0.28rem;
              border-radius: 50%;
              margin-right: 0.11rem;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #006aff;
              color: #fff;
              font-size: 0.12rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
            }
          }

          .text {
            margin-left: 0.1rem;
          }
          .reducer {
            width: 0.15rem;
            height: 0.15rem;
          }
        }
      }
    }
  }
  .addcontacts {
    width: 100%;
    padding: 0 0.12rem;
    position: absolute;
    bottom: 0.7rem;
    right: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.2rem;
    .add {
      width: 0.4rem;
      height: 0.4rem;
      background: #006aff;
      box-shadow: 0.02rem 0.02rem 0.06rem 0 rgba(26, 94, 188, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    img {
      width: 0.12rem;
      height: 0.12rem;
    }
  }
  .footer {
    width: 100%;
    height: 0.63rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.12rem;
    box-sizing: border-box;
    /deep/.van-button {
      width: 49.5%;
      height: 0.39rem;
      border-radius: 0.04rem;
    }
  }
}
</style>
