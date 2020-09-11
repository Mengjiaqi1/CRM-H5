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
                  v-for="element in addCard"
                  :key="element.menuId"
                >
                  <p class="headwrap">
                    <img src="../common/images/2.jpg" alt="" class="head" />
                    <span class="text">{{ element.name }} </span>
                  </p>
                  <span class="badge">
                    <img
                      :src="forms_reduce"
                      alt=""
                      class="reducer"
                      @click="removeAdd(element.menuId, element.name)"
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
                  v-for="element in addCard"
                  :key="element.menuId"
                >
                  <p class="headwrap">
                    <img src="../common/images/2.jpg" alt="" class="head" />
                    <span class="text">{{ element.name }} </span>
                  </p>
                  <span class="badge">
                    <img
                      :src="forms_reduce"
                      alt=""
                      class="reducer"
                      @click="removeAdd(element.menuId, element.name)"
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
      <router-link tag="div" class="add" to="/organization">
        <img src="../common/images/add.png" alt="" />
      </router-link>
    </div>
    <div class="footer">
      <van-button type="info">电话会议</van-button>
      <van-button type="primary">Ding</van-button>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  data() {
    return {
      addCard: [
        { menuId: 0, name: "1" },
        { menuId: 1, name: "2" },
        { menuId: 2, name: "3" }
      ],
      forms_add: require("../common/images/home_add.png"),
      forms_reduce: require("../common/images/home_reducer.png")
    };
  },
  created() {},
  methods: {
    removeAdd(id, names) {
      console.log(id, names);
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
