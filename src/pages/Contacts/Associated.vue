<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">关联客户</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="tit">
        <p class="company">
          <span class="beiyou" @click="isCategory = true">{{
            company == "" ? "北邮" : company
          }}</span
          ><span class="triangle"></span>
        </p>
        <p class="search">
          <van-search v-model="value" placeholder="请输入您想要搜索的内容" />
        </p>
      </div>
      <div class="content">
        <van-radio-group v-model="radio">
          <van-cell-group>
            <van-cell title="单选框 1" clickable @click="changeradio('1')">
              <template #right-icon>
                <van-radio name="1" checked-color="rgb(23,221,131)" />
              </template>
            </van-cell>
            <van-cell title="单选框 2" clickable @click="changeradio('2')">
              <template #right-icon>
                <van-radio name="2" checked-color="rgb(23,221,131)" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </main>
    <div class="btnwrap">
      <div class="btn empty" @click="changeEmpty">清空</div>
      <div class="btn confirm" @click="changeConfirm">确认</div>
    </div>
    <!-- 新建公司信息 -->
    <van-popup
      v-model="isCategory"
      position="bottom"
      :style="{ height: '35%' }"
    >
      <van-picker
        show-toolbar
        :columns="MenuData"
        @confirm="ConfirmNew"
        @cancel="onCancelNew"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      company: "",
      value: "",
      radio: "1",
      isCategory: false,
      MenuData: ["北邮", "绿洲", "总公司"]
    };
  },
  methods: {
    changeConfirm() {
      this.$router.go(-1);
    },
    changeEmpty() {
      this.radio = null;
    },
    changeradio(item) {
      this.radio = item;
    },
    // 选择二级公司
    ConfirmNew(value, index) {
      this.company = value;
      this.isCategory = false;
    },
    onCancelNew() {
      this.isCategory = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    overflow: scroll;
    margin-top: 0.44rem;
    .tit {
      width: 100%;
      height: 0.74rem;
      padding-left: 0.12rem;
      padding-right: 0.12rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      .company {
        padding: 0.03rem 0.13rem;
        background: #0067ff;
        border-radius: 0.04rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .beiyou {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
        .triangle {
          width: 0;
          height: 0;
          border-top: 0.05rem solid transparent;
          border-left: 0.05rem solid #fff;
          border-bottom: 0.05rem solid transparent;
          display: inline-block;
          margin-left: 0.1rem;
          vertical-align: middle;
        }
      }
      .search {
        flex: 1;
        margin-left: 0.11rem;
        /deep/.van-search {
          padding: 0;
          background: #ffffff;
          box-shadow: 0.02rem 0.02rem 0.04rem 0 rgba(0, 22, 54, 0.1);
          border-radius: 0.04rem;
        }
        /deep/.van-icon-search {
          color: #006aff;
        }
        /deep/.van-field__body {
          margin-left: 0.05rem;
        }
        /deep/.van-field__control {
          font-size: 0.12rem;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .content {
      width: 100%;
      padding: 0 0.12rem;
      box-sizing: border-box;
      /deep/.van-cell-group {
      }
      /deep/.van-cell {
        height: 0.44rem;
        padding: 0.1rem 0;
        align-items: center;
        position: relative;
      }
      /deep/.van-cell__title {
        margin-left: 0.3rem;
        display: flex;
      }
      /deep/.van-radio {
        width: 0.19rem;
        height: 0.19rem;
        position: absolute;
        left: 0;
      }
      li {
        width: 100%;
        height: 0.44rem;
        border-bottom: 0.01rem solid #eceff2;
        display: flex;
        align-items: center;
        .text {
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 0.1rem;
        }
      }
    }
  }
  .btnwrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.12rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    .btn {
      width: 49.3%;
      height: 0.39rem;

      border-radius: 0.04rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.16rem;
      font-weight: 400;

      &.empty {
        color: #006aff;
        background: #f2f7ff;
      }
      &.confirm {
        color: #ffffff;
        background: #006aff;
      }
    }
  }
  /*选择二级公司*/
  /deep/.van-picker__confirm {
    font-size: 0.16rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #006aff;
  }
  /deep/.van-picker__cancel {
    font-size: 0.16rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  /deep/.van-picker-column__item {
    .van-ellipsis {
      font-size: 0.16rem;
      font-weight: 400;
      color: #666666;
    }
  }
  /deep/.van-picker-column__item--selected {
    // background: #f3f8ff;
    .van-ellipsis {
      font-size: 0.16rem;
      font-weight: 400;
      color: #006aff;
    }
  }
}
</style>
