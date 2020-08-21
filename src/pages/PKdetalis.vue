<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">{{titleName}}PK榜</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="PK_title">
        <div class="PK_category_left fl" @click="changeCategory">
          <p class="category_left_text">{{titleName}}</p>
          <div class="PK_category_triangle"></div>
        </div>
        <div class="PK_category_right fr">
          <router-link tag="p" to="/selection">
            <div class="category_time">全公司/本月
              <div class="PK_time_triangle"></div>
            </div>
          </router-link>
        </div>
      </div>
      <!--合同回款-->
<!--      <van-tabs>-->
<!--        <van-tab v-for="index in 8" :title="'标签 ' + index">-->
<!--          内容 {{ index }}-->
<!--        </van-tab>-->
<!--      </van-tabs>-->
      <div class="pk_detalis_content">
        <van-tabs>
          <van-tab v-for="each in MenuData" :key="each.id" :title="each.name">
            <ul class="pk_detalis_list">
              <li>
                <div class="pk_detalis_num">1</div>
              </li>
              <li>
                <div class="pk_detalis_company">
                  <p class="detalis_company_name">张彦辉</p>
                  <p class="detalis_company">望京物业管理部</p>
                </div>
              </li>
              <li>
                <div class="pk_detalis_amount">
                  ¥<span class="pk_detalis_money">897,00</span>
                </div>
              </li>
            </ul>
            <ul class="pk_detalis_list">
              <li>
                <div class="pk_detalis_num">2</div>
              </li>
              <li>
                <div class="pk_detalis_company">
                  <p class="detalis_company_name">林君如</p>
                  <p class="detalis_company">望京物业管理部</p>
                </div>
              </li>
              <li>
                <div class="pk_detalis_amount">
                  ¥<span class="pk_detalis_money">865,00</span>
                </div>
              </li>
            </ul>
            <ul class="pk_detalis_list">
              <li>
                <div class="pk_detalis_num">3</div>
              </li>
              <li>
                <div class="pk_detalis_company">
                  <p class="detalis_company_name">六六</p>
                  <p class="detalis_company">望京物业管理部</p>
                </div>
              </li>
              <li>
                <div class="pk_detalis_amount">
                  ¥<span class="pk_detalis_money">797,00</span>
                </div>
              </li>
            </ul>
          </van-tab>
        </van-tabs>
      </div>
    </main>
    <!--PK类别弹框-->
    <van-popup v-model="isCategory" position="bottom" :style="{ height: '40%' }">
      <div class="popul_bottom_text">
        <span class="popul_bottom_cancel" @click="categoryCancel">取消</span>
        <span class="popul_bottom_confirm" @click="categoryConfirm">确认</span>
      </div>
      <div   class="popul_bottom_li"
             v-for="(each, index) in categoryData"
             :key="index"
             :class="timeCategory == index ? 'activeText' : 'eachText'"
      >
        <span @click="changeCategoryPk(index,each.name)">{{each.name}}</span>
      </div>
    </van-popup>
  </div>
</template>
<script>
// import {getTreeselect} from "../services/forms";
export default {
  data() {
    return {
      // PK类别
      isCategory:false,
      timeCategory:0,
      titleName: '合同金额',
      categoryData: [
        {
          name: "合同金额",
          id: "0"
        },
        {
          name: "合同回款",
          id: "1"
        },
        {
          name: "新增报价数",
          id: "2"
        },
        {
          name: "新增报价金额",
          id: "3"
        },
        {
          name: "报价转化率",
          id: "4"
        }
      ],
      MenuData:[
          {
            name:"1-10名",
            id:'0',
          },
          {
            name:"11-20名",
            id:'1',
          },
          {
            name:"21-30名",
            id:'2',
          },
          {
            name:"31-40名",
            id:'3',
          },
          {
            name:"41-50名",
            id:'4',
          },
          {
              name:"51-60名",
              id:'5',
          },
      ]
    };
  },
  created() {
      this.treeselect();
  },
  methods: {
    // PK类别
    changeCategory() {
      this.isCategory = true;
    },
    changeCategoryPk(ind,name) {
      this.timeCategory = ind;
      this.flag = !this.flag
      console.log(ind, name,this.categoryData, '222');
      this.quarter = name
        this.titleName = name
    },
    categoryCancel(){
      this.isCategory = false;
    },
    categoryConfirm(){
      // this.timeData[8].time =  this.quarter;
      this.isCategory = false;
    },
    // 获取tab数据
    treeselect() {
        // getTreeselect().then(res => {
        //     if (res.code == "200") {
        //         this.MenuData = res.data && res.data;
        //     }
        // });
    },
  }
};
</script>
<style lang="scss" scoped>
  .van-tabs__line{
    background: #006aff !important;
  }
  .wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    main{
      flex: 1;
      overflow: scroll;
      margin-top: 0.44rem;
      text-align: left;
      .fl{
        float: left;
      }
      .fr{
        float: right;
      }
      .PK_title{
        height: 0.54rem;
        line-height: 0.54rem;
        background: #F8F9FA;
      }
      .PK_category_left{
        float: left;
        padding-left: 0.12rem;
        .category_left_text{
          display: inline-block;
        }
        .PK_category_triangle{
          margin-left: 0.09rem;
          width: 0;
          height: 0;
          border-top: 0.05rem solid transparent;
          border-left: 0.05rem solid #0067FF;
          border-bottom: 0.05rem solid transparent;
          display: inline-block;
          vertical-align: middle;
        }

      }
      .PK_category_right{
        float: right;
        padding-right: 0.12rem;
        margin-top: 0.15rem;
        .category_time{
          height: 0.24rem;
          line-height: 0.24rem;
          background: #006aff;
          color: #fff;
          font-size: 0.12rem;
          padding: 0rem 0.09rem;
          border-radius: 0.04rem;
        }
        .PK_time_triangle{
          width: 0;
          height: 0;
          border-top: 0.05rem solid transparent;
          border-left: 0.05rem solid #fff;
          border-bottom: 0.05rem solid transparent;
          display: inline-block;
          vertical-align: middle;
          margin-top: -0.02rem;
          margin-left: 0.02rem;
        }
      }
      /*合同回款内容*/
      .pk_detalis_content {
        min-height: 3rem;
        /deep/.van-tab--active {
          color: #006aff;
        }
        /deep/.van-tab__text--ellipsis {
          margin-left: -0.08rem;
        }
        /deep/.van-tabs__line {
          background-color: #006aff;
          margin-left: -0.04rem;
        }
        /*内容*/
        .pk_detalis_list{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 0rem 0.12rem;
          li{
            width: 33.33%;
            height: 0.4rem;
            line-height: 0.4rem;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: center;*/
            padding: 0.16rem 0rem;
            border-bottom: 0.01rem solid #DBE4EF;
            .pk_detalis_num{
              width: 0.4rem;
              height: 0.4rem;
              line-height: 0.4rem;
              text-align: center;
              background: #F1F7FF;
              font-size: 0.24rem;
              color: #006aff;
            }
            .pk_detalis_company{
              height: 0.4rem;
              line-height: 0.4rem;
              .detalis_company_name{
                height: 0.22rem;
                line-height: 0.22rem;
                font-size: 0.16rem;
                color: #333;
                margin-bottom: 0.04rem;
              }
              .detalis_company{
                height: 0.17rem;
                line-height: 0.17rem;
                font-size: 0.12rem;
                color: #666;
              }
            }
            .pk_detalis_amount,.pk_detalis_money{
              font-size: 0.18rem;
              color: #333333;
              font-weight: 600;
              .pk_detalis_money{
                margin-left: 0.08rem;
              }
            }
          }
          li:nth-child(1){
            width: 15%;
            text-align: left;
            justify-content: left;
          }
          li:nth-child(2){
            width: 60%;
          }
          li:nth-child(3){
            width: 25%;
          }
        }
      }
    }
    /*PK分类样式*/
    .popul_bottom_li{
      height: 0.44rem;
      line-height: 0.44rem;
      text-align: left;
      margin-left: 0.2rem;
    }
    .popul_bottom_text{
      height: 0.44rem;
      line-height: 0.44rem;
    }
    .popul_bottom_cancel{
      float: left;
      margin-left: 0.2rem;
    }
    .popul_bottom_confirm{
      float: right;
      color: #576b95;
      margin-right: 0.2rem;
    }
    /*底部弹出层选中样式*/
    .activeText{
      color: #333;
    }
    .eachText{
      color: #6666;
    }
  }
</style>
