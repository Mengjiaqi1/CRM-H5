<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">销售简报</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="brief_detalis">
        <p class="brief_detalis_title"><span>客户数据</span></p>
        <ul class="brief_detalis_text">
          <li class="line">名称</li>
          <li class="line">07-17</li>
          <li class="line">7月总计</li>
        </ul>
        <ul class="brief_detalis_content" style="padding-top: 10px">
          <li>新增客户数</li>
          <li>130</li>
          <li>453</li>
        </ul>
        <ul class="brief_detalis_content">
          <li>新增合同客户数</li>
          <li>13</li>
          <li>400</li>
        </ul>
        <ul class="brief_detalis_content">
          <li>新增机会客户数</li>
          <li>1324</li>
          <li>40</li>
        </ul>
        <ul class="brief_detalis_content">
          <li>跟进客户数</li>
          <li>15</li>
          <li>4</li>
        </ul>
        <ul class="brief_detalis_content" style="padding-bottom: 17px;">
          <li>跟进次数</li>
          <li>6</li>
          <li>47</li>
        </ul>
      </div>
      <div class="brief_detalis">
        <p class="brief_detalis_title"><span>合同数据</span></p>
        <ul class="brief_detalis_text">
          <li class="line">名称</li>
          <li class="line">07-17</li>
          <li class="line">7月总计</li>
        </ul>
        <ul class="brief_detalis_content" style="padding-top: 10px">
          <li>新增客户数</li>
          <li>130</li>
          <li>453</li>
        </ul>
        <ul class="brief_detalis_content">
          <li>新增合同客户数</li>
          <li>13</li>
          <li>400</li>
        </ul>
        <ul class="brief_detalis_content">
          <li>新增机会客户数</li>
          <li>1324</li>
          <li>40</li>
        </ul>
        <ul class="brief_detalis_content">
          <li>跟进客户数</li>
          <li>15</li>
          <li>4</li>
        </ul>
        <ul class="brief_detalis_content" style="padding-bottom: 17px;">
          <li>跟进次数</li>
          <li>6</li>
          <li>47</li>
        </ul>
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
  .wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #F8F9FA !important;
    main{
      flex: 1;
      overflow: scroll;
      margin-top: 44px;
      text-align: left;
      background: #F8F9FA;
      .brief_detalis{
        .brief_detalis_title{
          font-size: 0.12rem;
          color: #999999;
          height: 32px;
          line-height: 32px;
          span{
            padding: 0rem 0.12rem;
          }
        };
        .brief_detalis_text,.brief_detalis_content{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0rem 0.12rem;
          background: #fff;
          font-family:PingFangSC-Regular,PingFang SC;
          li{
            width: 33%;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: center;*/
            padding: 0.04rem 0rem 0.04rem 0rem;
            color: #666666;
            font-size:0.13rem;
            line-height:0.18rem;
          }
          .line{
            border-bottom: 0.01rem solid #DBE4EF;
            padding: 0.14rem 0rem 0.1rem 0rem;
            color: #333333;
            font-size: 0.14rem;
            line-height:0.2rem;
          }
          li:nth-child(1){
            width: 45%;
            text-align: left;
            justify-content: left;
          }
          li:nth-child(2){
            width: 30%;
          }
          li:nth-child(3){
            width: 25%;
          }
        }
      }
    }
  }


</style>