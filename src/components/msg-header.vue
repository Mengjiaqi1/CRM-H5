<template>
  <div class="custom_top">
    <p class="custom_name">{{msg.title}}</p>
    <p class="custom_company"><span class="custom_company_text">{{msg.name}}</span><span class="custom_company_time">截止 2020-06-21 18:43:21 </span></p>
  </div>
</template>
<script>
    export default {
        props: ['msg'],
        data() {
            return {

            };
        },
        methods: {}
    };
</script>
<style lang="scss" scoped>
  /*顶部样式*/
  .custom_top{
    padding: 0.16rem 0.12rem;
    font-family:PingFangSC-Regular,PingFang SC;
    .custom_name{
      font-size: 0.21rem;
      color: #333;
      margin-bottom: 0.09rem;
    }
    .custom_company{
      .custom_company_text{
        border-radius: 0.02rem;
        background: #006aff;
        color: #fff;
        font-size: 0.02rem;
        padding: 0.02rem 0.09rem;
        line-height: 0.17rem;
        margin-top: 0.01rem;
      }
      .custom_company_time{
        margin-left: 0.08rem;
        color: #666;
        font-size: 0.16rem;
        line-height:0.22rem;
      }
    }
  }
</style>