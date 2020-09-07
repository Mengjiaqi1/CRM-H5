<template>
  <div class="wrap">
    <myHeader />
    <main>
      <!--顶部-->
      <msgHeader :msg="{ title, deptTypeName, beginTime, endTime }"></msgHeader>
      <div class="space"></div>
      <!--内容-->
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :immediate-check="false"
          :finished="finished"
          finished-text="没有更多数据"
          @load="onLoad"
        >
          <!--          <van-cell v-for="(item,index) in inCustomList" :key="index">-->
          <div
            class="custom_content"
            v-for="(item, index) in inCustomList"
            :key="index"
          >
            <div class="custom_content_top clearfix" @click="handleGo()">
              <p class="custom_content_address fl">
                {{ item.customerFullName }}
              </p>
              <p class="custom_content_status fr">{{ item.customerStatus }}</p>
            </div>
            <div class="line"></div>
            <ul class="custom_content_text">
              <li class="margin_bottom">
                <p>负责人：</p>
                <p v-if="item.personInCharge">{{ item.personInCharge }}</p>
                <p v-else>--</p>
              </li>
              <li class="margin_bottom">
                <p>创建人：</p>
                <p>{{ item.createUserName }}</p>
              </li>
              <li>
                <p>最近跟进时间：</p>
                <p v-if="item.lastFollowUpTime">{{ item.lastFollowUpTime }}</p>
                <p v-else>--</p>
              </li>
            </ul>
            <div class="space"></div>
          </div>
          <!--          </van-cell>-->
        </van-list>
      </van-pull-refresh>
    </main>
  </div>
</template>
<script>
import msgHeader from "../../components/msg-header";
import { getCustomData } from "../../services/AllCustom";
export default {
  components: {
    msgHeader
  },
  data() {
    return {
      title: "客户总数",
      deptTypeName: "",
      beginTime: "",
      endTime: "",
      inCustomList: [],
      // 加载刷新
      refreshing: false,
      loading: false,
      finished: false,
      // 当前页数
      pageNum: 1,
      // 当前条数
      pageSize: 10
    };
  },
  created() {
    this.getCustomInfo();
  },
  methods: {
    handleGo() {
      this.$route.push("/customerDetails");
    },
    // 初始化数据
    getCustomInfo() {
      let Data = {
        deptType: "1",
        // type:2,
        // year:this.newYears,
        // yearMonth:this.yearMonthb,
        // beginTime:this.beginTime,
        // endTime:this.endTime,
        // yearState:this.half, //新
        // quarter:this.quarter,   //新
        pageNum: this.pageNum
        // pageSize:10,
      };
      getCustomData(Data)
        .then(res => {
          if (res.code == 200) {
            console.log(Data, "8888");
            this.deptTypeName = res.deptTypeName;
            this.beginTime = res.beginTime;
            this.endTime = res.endTime;
            this.total = res.total;
            // this.inCustomList = res.rows;

            // console.log(this.total,this.inCustomList,'001122')
            // // 加载状态结束
            // this.loading = false
            // this.refreshing = false
            // // 数据全部加载完成
            // // if (this.inCustomList.length >= 40) {
            //     this.finished = true
            // // }

            const rows = res.rows;

            if (rows == null || rows.length === 0) {
              // 加载结束
              this.finished = true;
              return;
            }
            if (rows.length < this.pageSize) {
              // 最后一页不足10条的情况
              this.finished = true;
            }
            // 处理数据
            if (this.pageNum === 1) {
              this.inCustomList = rows;
            } else {
              this.inCustomList = this.inCustomList.concat(rows);
              alert(111);
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(() => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    /**
     *  下拉刷新方法
     */
    onRefresh() {
      this.pageNum = 1;
      // 清空列表数据
      this.finished = false;
      // this.refreshing = false;
      // 调用请求数据方法
      this.getCustomInfo();
      console.log(this.finished, this.refreshing, "564");
    },
    /**
     *  上拉加载方法
     *  页面打开时初始化会调用onLoad方法 如果想去掉初始化调用使用,给List添加属性immediate-check=false
     */
    onLoad() {
      this.pageNum++;
      this.loading = true;
      // 调用请求数据方法
      this.getCustomInfo();
      console.log(this.pageNum, this.finished, this.refreshing, "0678");
      // setTimeout(() => {
      //     if (this.refreshing) {
      //         this.inCustomList = [];
      //         this.refreshing = false;
      //     }
      //
      //     for (let i = 0; i < 10; i++) {
      //         this.inCustomList.push(this.inCustomList.length + 1);
      //     }
      //     this.loading = false;
      //
      //     // if (this.inCustomList.length >= 40) {
      //         this.finished = true;
      //     // }
      // }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  main {
    flex: 1;
    overflow: scroll;
    margin-top: 44px;
    text-align: left;
    .fl {
      float: left;
    }
    .fr {
      float: right;
    }
    .clearfix::after {
      content: " ";
      display: block;
      height: 0;
      line-height: 0;
      clear: both;
      visibility: hidden;
    }

    .space {
      height: 0.12rem;
      background: #f8f9fa;
    }
    /*内容*/
    .custom_content {
      padding: 0.12rem 0rem 0rem 0rem;
      font-family: PingFangSC-Regular, PingFang SC;
      .custom_content_top {
        padding: 0rem 0.12rem;
        .custom_content_address {
          font-size: 0.16rem;
          line-height: 0.22rem;
          color: #333;
          width: 80%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .custom_content_status {
          font-size: 0.14rem;
          color: #006aff;
          width: 18%;
          line-height: 0.22rem;
        }
      }
      .line {
        margin: 0rem 0.12rem;
        border: 0.01rem solid #dbe4ef;
        margin-top: 0.1rem;
      }
      .custom_content_text {
        padding: 0.13rem 0.12rem 0.19rem;
        li {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          p {
            width: 50%;
            display: flex;
            flex-wrap: wrap;
            /*justify-content: center;*/
            color: #666666;
            font-size: 0.12rem;
            line-height: 0.17rem;
          }
          p:nth-child(1) {
            width: 35%;
            text-align: left;
            justify-content: left;
          }
          p:nth-child(2) {
            width: 65%;
            color: #999999;
          }
        }
        .margin_bottom {
          margin-bottom: 0.06rem;
        }
      }
    }
  }
}
</style>
