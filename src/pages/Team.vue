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
                        removeprincipal(element.customerNo, element.userId)
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
                      @click="removepartner(element.customerNo, element.userId)"
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
      <van-button type="primary" @click="changeDing">Ding</van-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import { findChargeList, add, remove } from "../services/organization";
import * as dd from "dingtalk-jsapi";
var users = [];
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
      usersList: [], //工号
      userId: [], // 从组织架构传过来的用户id
      removeUser: [] //删除工号
    };
  },
  created() {
    this.customerNo = this.$store.state.customerNo;
    this.getfindChargeList();
  },
  methods: {
    //ding一下
    changeDing() {
      this.users = Array.from(new Set(this.users)).map(each => {
        return each;
      });
      users = this.users;
      dd.biz.ding.create({
        users: users, // 用户列表，工号
        corpId: "", // 企业id
        type: 1, // 附件类型 1：image  2：link
        alertType: 2, // 钉发送方式 0:电话, 1:短信, 2:应用内
        alertDate: { format: "yyyy-MM-dd HH:mm", value: "2015-05-09 08:00" },
        attachment: {
          images: [""]
        }, // 附件信息
        text: "", // 正文
        bizType: 0, // 业务类型 0：通知DING；1：任务；2：会议；
        confInfo: {
          bizSubType: 0, // 子业务类型如会议：0：预约会议；1：预约电话会议；2：预约视频会议；（注：目前只有会议才有子业务类型）
          location: "某某会议室", //会议地点；（非必填）
          startTime: { format: "yyyy-MM-dd HH:mm", value: "2015-05-09 08:00" }, // 会议开始时间
          endTime: { format: "yyyy-MM-dd HH:mm", value: "2015-05-09 08:00" }, // 会议结束时间
          remindMinutes: 30, // 会前提醒。单位分钟-1：不提醒；0：事件发生时提醒；5：提前5分钟；15：提前15分钟；30：提前30分钟；60：提前1个小时；1440：提前一天；
          remindType: 2 // 会议提前提醒方式。0:电话, 1:短信, 2:应用内
        },

        taskInfo: {
          ccUsers: users, // 抄送用户列表，工号
          deadlineTime: {
            format: "yyyy-MM-dd HH:mm",
            value: "2015-05-09 08:00"
          }, // 任务截止时间
          taskRemind: 30 // 任务提醒时间，单位分钟0：不提醒；15：提前15分钟；60：提前1个小时；180：提前3个小时；1440：提前一天；
        },

        onSuccess: function() {
          //onSuccess将在点击发送之后调用
        },
        onFail: function() {}
      });
    },
    //电话会议
    changeCall() {
      this.users = Array.from(new Set(this.users)).map(each => {
        return each;
      });
      users = this.users;
      dd.ready(function() {
        dd.biz.telephone.call({
          users: users, //用户列表，工号
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
        query: { id: this.customerNo, userId: this.userId }
      });
    },
    // 查询协同人，负责人
    getfindChargeList() {
      findChargeList(this.customerNo, "1").then(res => {
        if (res.code == 200) {
          this.partnerList = res.data.partnerList;
          this.principalList = res.data.principalList;
          this.principalList.map(each => {
            this.users.push(each.staffId);
            this.userId.push(parseInt(each.userId));
          });
        }
      });
    },
    // 删除负责人
    removeprincipal(customerNo, userId) {
      remove(customerNo, userId, 1).then(res => {
        console.log(res);
      });
      this.getfindChargeList();
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
            .head img {
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
              //   margin-right: 0.11rem;
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
            white-space: normal;
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
