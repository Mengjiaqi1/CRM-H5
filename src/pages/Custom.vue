<template>
  <div class="wrap">
    <myHeader />
    <main>
      <!--顶部-->
      <div class="custom_top">
        <p class="custom_name">客户总数</p>
        <p class="custom_company"><span class="custom_company_text">全公司</span><span class="custom_company_time">截止 2020-06-21 18:43:21 </span></p>
      </div>
      <div class="space"></div>
      <!--内容-->
      <div class="custom_content">
        <div class="custom_content_top clearfix">
          <p class="custom_content_address fl">北京黄村西大街</p>
          <p class="custom_content_status fr">成交客户</p>
        </div>
        <div class="line"></div>
        <ul class="custom_content_text">
          <li class="margin_bottom">
            <p>负责人：</p>
            <p>张彦君</p>
          </li>
          <li class="margin_bottom">
            <p>创建人：</p>
            <p>张彦君</p>
          </li>
          <li>
            <p>最近跟进时间：</p>
            <p>一周内</p>
          </li>
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
    main{
      flex: 1;
      overflow: scroll;
      margin-top: 44px;
      text-align: left;
      .fl{
        float: left;
      }
      .fr{
        float: right;
      }
      .clearfix::after{
        content: " ";
        display: block;
        height: 0;
        line-height: 0;
        clear: both;
        visibility: hidden;
      }
      /*顶部样式*/
      .custom_top{
        padding: 0.16rem 0.12rem;
        .custom_name{
          font-size: 0.21rem;
          color: #333;
          margin-bottom: 0.09rem;
        }
        .custom_company{
          .custom_company_text{
            border:0.01rem solid #006aff;
            border-radius: 0.02rem;
            background: #006aff;
            color: #fff;
            font-size: 0.02rem;
            padding: 0.02rem 0.09rem;
          }
          .custom_company_time{
            margin-left: 0.08rem;
            color: #666;
            font-size: 0.16rem;
            vertical-align: middle;
          }
        }
      }
      .space{
        height: 0.12rem;
        background: #F8F9FA;
      }
      /*内容*/
      .custom_content{
        padding: 0.12rem 0.12rem 0.19rem 0.12rem;
        .custom_content_top{
          .custom_content_address{
            font-size: 0.16rem;
            color: #333;
          }
          .custom_content_status{
            font-size: 0.14rem;
            color: #006aff;
            vertical-align: middle;
          }
        }
        .line{
          border: 0.01rem solid #DBE4EF;
          margin-top: 0.1rem;
        }
        .custom_content_text{
          padding: 0.13rem 0rem 0.19rem;
          li{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            p{
              width: 50%;
              display: flex;
              flex-wrap: wrap;
              /*justify-content: center;*/
              color: #666666;
              font-size: 0.12rem;
            }
            p:nth-child(1){
              width: 35%;
              text-align: left;
              justify-content: left;
            }
            p:nth-child(2){
              width: 65%;
              color: #999999;
            }
          }
          .margin_bottom{
            margin-bottom: 0.06rem;
          }
        }
      }
    }
  }


</style>