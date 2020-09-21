<template>
  <div>
    <myHeader>
      <div class="h_center"></div>
      <div class="h_right">
        <img class="add" src="../common/images/build.png" alt="" />
      </div>
    </myHeader>
    <main>
      <div class="tit">
        <p class='number'>HUH34567890</p>
       <p>中国邮政集团</p>
        <p>银行账户:<span>中国邮政集团公司北京市邮政公寓<span></p>
         <p>编号:<span>HUH34567890<span></p>
      </div>
    </main>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  background: #f8f9fa;
    display: flex;
    flex-direction: column;
  main{
      flex:1;
      overflow:srcoll;
      .tit{
          padding:.22rem 0 0 .24rem;
          .number{ 
            font-size: .16rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
          }
      }
  }
}
</style>
