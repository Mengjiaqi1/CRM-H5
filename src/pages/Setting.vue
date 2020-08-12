<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">设置</div>
      <div class="h_right h_more" @click="showShare = true">更多</div>
      <van-share-sheet
              v-model="showShare"
              title="立即分享给好友"
              :options="options"
              :lock-scroll="false"
              @select="onSelect"
      />
    </myHeader>
    <main>
      <div class="space"></div>
      <ul class="list">
        <router-link to="/customHome" tag="p">
          <li>
            <p class="text_mine">自定义首页</p>
            <p class="icon"><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
          </li>
        </router-link>
        <li class="space"></li>
        <router-link to="/commonForms" tag="p">
          <li>
            <p class="text_mine">常用表单</p>
            <p class="icon"><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
          </li>
        </router-link>
        <li>
          <p class="text_mine">快捷新建</p>
          <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
        </li>
        <li>
          <p class="text_mine">业绩目标</p>
          <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
        </li>
        <li>
          <p class="text_mine">签到设置</p>
          <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
        </li>
        <li class="space"></li>
        <li>
          <p class="text_mine">关于我们</p>
          <p><img src="../common/images/arrow.png" alt="" class="icon_mine"></p>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
  import { Toast } from 'vant';
  export default {
    data() {
      return {
        showShare: false,
        options: [
          { name: '微信', icon: 'wechat' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
        ],
      };
    },
    methods: {
      onSelect(option) {
          Toast(option.name);
          this.showShare = false;
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
    background: #F8F9FA !important;
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
      margin-top: 44px;
      text-align: left;
      background: #F8F9FA;
      .space{
        height: 0.12rem;
        background: #F8F9FA;
        padding: 0rem !important;
      }
      .list {
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        /*padding: 0.4rem 0.05rem 1.38rem 0.12rem;*/

        li {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          padding: 0.12rem 0rem;
          p {
            width: 33.33%;
            display: flex;
            flex-wrap: wrap;
            color: #333333;
            .icon_mine {
              width: 0.22rem;
              height: 0.22rem;
              vertical-align: middle;
            }
            .text_mine {
              width: 85%;
              font-size: 0.12rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 700;
              color: #333333;
              vertical-align: middle;
            }
          }

          p:nth-child(2) {
            width: 7%;
            justify-content: center;
            text-align: center;
          }

          p:nth-child(1) {
            width: 86%;
            padding-left: 0.12rem;
            box-sizing: border-box;
          }
        }

        li:last-child {
          margin-bottom: 0rem;
        }
      }
    }
  }


</style>