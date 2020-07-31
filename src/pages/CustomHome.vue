<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">自定义首页</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="chart_type">
        <div class="custom_tit">选择数据图形类型</div>
        <div class="chart_box" @click="changeChart">
          <div :class="[chartFlag == false ? 'chart_active' : 'chart_left']">
            <img src="../common/images/Line_chart.png" type="a" alt="" />
          </div>
          <div :class="[chartFlag == true ? 'chart_active' : 'chart_left']">
            <img src="../common/images/Bar_chart.png" type="b" alt="" />
          </div>
        </div>
      </div>
      <div class="chart_type">
        <div class="custom_tit">已添加的卡片</div>
        <div class="add_card">
          <DragGable />
        </div>
      </div>
      <div class="chart_type">
        <div class="custom_tit">更多卡片</div>
        <div class="more_card">
          <DragGable />
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import DragGable from "../components/DragGable.vue";
export default {
  data() {
    return {
      type: "a",
      chartFlag: false
    };
  },
  created() {},
  methods: {
    changeChart() {
      //   console.log(e.target);
      this.chartFlag = !this.chartFlag;
    }
  },
  components: {
    DragGable
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  main {
    flex: 1;
    overflow: scroll;
    margin-top: 0.44rem;
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
      color: rgba(153, 153, 153, 1);
      line-height: 0.17rem;
      box-sizing: border-box;
    }
    .chart_type {
      box-sizing: border-box;
      padding: 0 0.12rem;
      background: rgba(248, 249, 250, 1);
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
    }
  }
}
</style>
