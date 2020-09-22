<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">客户提醒</div>
      <div class="h_right h_more">一键已读</div>
    </myHeader>
    <main>
      <div class="approval_list">
        <van-tabs>
          <van-tab v-for="each in MenuData" :key="each.id" :title="each.name">
          </van-tab>
        </van-tabs>
        <div class="space"></div>
        <ul class="approval_list_content clearfix">
          <li class="fl approval_list_left">
            <img src="../../common/images/warn.png" alt="">
            <span class="active"></span>
          </li>
          <li class="fl approval_list_right">
            <h6>解惑大师的市场活动审批</h6>
            <p class="time">2020-09-12 12:45:45</p>
            <div class="line"></div>
            <p class="text">雁默：美企客户推动台企融入“红色供应链”，真是喜感十足</p>
          </li>
        </ul>
        <div class="space"></div>
        <ul class="approval_list_content clearfix">
          <li class="fl approval_list_left">
            <img src="../../common/images/warn.png" alt="">
            <span class="active"></span>
          </li>
          <li class="fl approval_list_right">
            <h6>解惑大师的市场活动审批</h6>
            <p class="time">2020-09-12 12:45:45</p>
            <div class="line"></div>
            <p class="text">7月，科技产业惊传大新闻。大陆企业立讯（LuXshare）以138亿台币，收购台企纬创资通（Wistron）的部分工厂。苹果iPhone供应链上竖起了大陆工厂的旗帜。日经新闻对此形容为，台湾企业垄断iPhone生产的历史落幕。</p>
          </li>
        </ul>
      </div>
      <div class="approval_button">
        <button @click="handleWarn">
          <span>新建跟进提醒</span>
        </button>
      </div>
    </main>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                active: 0,
                MenuData:[
                  {
                    name:"全部消息",
                    id:'0',
                  },
                  {
                    name:"未推送提醒",
                    id:'1',
                  },
                ],
            };
        },
        created() {

        },
        methods: {
          handleWarn(){
            console.log(123)
          },
        }
    };
</script>
<style lang="scss" scoped>
  .wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    header{
      .h_right,.h_more {
        color: #999 !important;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.12rem;
        margin-top: 0.03rem;
      }
    }
    main{
      flex: 1;
      overflow: scroll;
      margin-top: 0.44rem;
      text-align: left;
      /*background: #F8F9FA;*/
      /deep/.van-tab:first-child{
        border-right: 0.01rem solid #EFEFEF;
      }
      /deep/.van-tab:last-child{
        border-right: none;
      }
      /deep/.van-tab--active {
        color: #006aff;
      }
      /deep/.van-tab__text--ellipsis {
        margin-left: -0.08rem;
      }
      /deep/.van-tabs__line {
        background-color: #006aff;
        margin-left: -0.04rem;
        width: 80.5px;
      }
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
      .approval_list{
        .approval_list_content{
          padding: 0.2rem 0.1rem 0.12rem;
          .approval_list_left{
            margin-right: 0.1rem;
            position: relative;
            img{
              width: 0.2rem;
              height: 0.2rem;
            }
            span{
              position: absolute;
              right: 0rem;
              top: 0rem;
              width: 0.08rem;
              height: 0.08rem;
              border-radius: 50%;
              background:#FF6189 ;
            }
          }
          .approval_list_right{
            width:3.24rem ;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #333333;
            h6{
              line-height: 0.2rem;
              margin-bottom: 0.02rem;
              font-size: 0.14rem;
            }
            .time{
              color: #999999;
              line-height: 0.17rem;
              font-size: 0.12rem;
            }
            .line{
              height: 0.01rem;
              background:#EFEFEF ;
              margin-top: 0.08rem;
              margin-bottom: 0.07rem;
            }
            .text{
              color: #666666;
              line-height: 0.17rem;
              font-size: 0.12rem;
            }
          }
        }
      }
      .approval_button{
        position: fixed;
        bottom:0.12rem ;
        padding: 0rem 0.13rem;
        button{
          width: 3.5rem;
          height: 0.39rem;
          background: #006AFF;
          border-radius: 0.04rem;
          span{
            font-size: 0.16rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 0.22rem;
          }
        }
      }
    }
  }
</style>
