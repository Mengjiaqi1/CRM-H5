<template>
  <div class="wrap">
    <myHeader />
    <main>
      <!--顶部-->
      <msgHeader :msg="{title,name}"></msgHeader>
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
  import msgHeader from '../components/msg-header'
  export default {
    components: {
        msgHeader
    },
    data() {
      return {
        title: '客户总数',
        name: '全公司',
        time: null,
        list: []
      };
    },
    methods: {
    // this.time = res.data.data.time
    // this.list = res.data.data.list
    }
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
              line-height: 0.17rem;
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