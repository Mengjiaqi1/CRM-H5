<template>
  <div class="content">
    <div class="none"></div>
    <router-link tag="div" class="content_li" to="/organization">
      <span class="left">北京首邮实业发展总公司</span
      ><span class="right"
        ><b class="num">6</b><img src="../common/images/rights.png" alt=""
      /></span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;

  .none {
    width: 100%;
    height: 0.1rem;
    background: #f8f9fa;
  }
  .content_li {
    width: 100%;
    height: 0.53rem;
    padding: 0 0.12rem;
    box-sizing: border-box;
    border-bottom: 0.01rem solid #eceff2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 0.16rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
    .right {
      display: flex;
      align-items: center;
      .num {
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
      img {
        width: 0.11rem;
        height: 0.11rem;
        margin-left: 0.06rem;
      }
    }
  }
}
</style>
