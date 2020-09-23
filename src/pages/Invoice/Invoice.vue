<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">开票信息</div>
      <div class="h_right h_more">
        <img src="../../common/images/adds.png" alt="" @click="changeBuild" />
      </div>
    </myHeader>
    <main>
      <div class="invoice_content">
<!--        <div class="search_icon" @click="handleSearch">-->
<!--          <input-->
<!--                  v-model="keywordInput"-->
<!--                  disabled-->
<!--                  style="display: inline-block;height: 0rem"-->
<!--          />-->
<!--          <img src="../../common/images/search.png" alt="" />-->
<!--        </div>-->

        <form class="form" action="/">
          <van-search
                  v-model="value"
                  placeholder="请输入您想搜索的内容"
                  @input="handleInput"
                  @search="onSearch"
          />
          <template>
            <div @click="onSearch" class="search">
              <img src="../../common/images/search2.png" alt="" />
            </div>
          </template>
        </form>
        <div class="space"></div>
        <div class="invoice_list">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
                    v-model="loading"
                    :immediate-check="false"
                    :finished="finished"
                    finished-text="没有更多数据"
                    @load="onLoad"
            >
              <router-link
                      tag="div"
                      class="custom_contents"
                      v-for="(item, index) in invoiceList"
                      :key="index"
                      :to="{
                    path: '/billingInformationDetail',
                    query: { id: item.id }
                  }"
              >
                <div class="main_tit">
                  <p class="number">{{item.number}}</p>
                  <div class="line"></div>
                  <p class="text">
                    <span class="account">银行账户:</span>
                    <span class="content">{{item.accountName}}</span>
                  </p>
                  <p class="text">
                    <span class="account">编号:</span>
                    <span class="content">{{item.number}}</span>
                  </p>
                  <p><span class="company">{{item.accountName}}</span></p>
                </div>
                <div class="space"></div>
              </router-link>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
    import {
        getInvoiceData,
    } from "../../services/invoice";
    import { Toast } from "vant";
    import {getUserList} from "../../services/organization";
    export default {
        components: {
        },
        data() {
            return {
                // 联系人列表
                invoiceList: [],
                contactTotal:undefined,
                // 加载刷新
                isLoading: false,
                loading: false,
                finished: false,
                // 当前页数
                pageNum: 0,
                // 当前条数
                pageSize: 10,
                // 确定筛选条件初始值
                formId: 1,
                userId: 1,
                // 搜索
                searchBtn: false,
                keywordInput: "",
                value: "", // 搜索框val
            };
        },
        created() {
            this.getContactInfo();
        },
        methods: {
            // 初始化列表数据
            getContactInfo() {
                getInvoiceData().then(res => {
                    if (res.code == "200") {
                        if (res.data.length > 0) {
                            this.invoiceList = res.data;
                            // this.invoiceList = this.invoiceList.concat(res.rows);
                            // this.pageNum++
                            this.loading = false;
                            if (res.data.length !== 15) {
                                this.loading = false;
                                this.finished = true;
                            }
                        } else {
                            this.invoiceList = res.data;
                            this.loading = false;
                            this.finished = true;
                        }
                    }
                });
            },
            // 下拉刷新方法
            onRefresh() {
                setTimeout(() => {
                    Toast("刷新成功");
                    this.isLoading = false;
                    this.pageNum = 0;
                    this.invoiceList = [];
                    this.getContactInfo();
                }, 1000);
            },
            // 上拉加载方法
            onLoad() {
                this.pageNum++;
                this.getContactInfo();
                // setTimeout(() => {
                //     Toast('加载中')
                //     this.pageNum++;
                //     this.getContactInfo();
                //     this.loading = true
                // }, 500)
            },
            // 新建
            changeBuild() {
                this.$router.push({
                    path: "/addInvoice",
                    query: {}
                });
            },
            // 搜索
            handleSearch() {
                this.searchBtn = true;
            },
            hanleCancel() {
                this.searchBtn = false;
            },
            searchEnter() {
                this.formData.keyword = this.keywordInput;
                // this.init()
                this.searchBtn = false;
                // }, 500);
            },
            // 搜索框查询
            handleInput(e) {
                this.nickName = e;
                getUserList(this.deptId, e, this.userId).then(res => {
                    if (res.code == 200) {
                        this.userData = res.data;
                    }
                });
            },
            onSearch() {
                getUserList(this.deptId, this.value, this.userId).then(res => {
                    if (res.code == 200) {
                        this.userData = res.data;
                    }
                });
            },

            handleBlur() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    header {
      .h_right,
      .h_more {
        color: #999 !important;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.12rem;
        margin-top: 0.03rem;
        position: relative;
        img {
          width: 0.2rem;
          height: 0.2rem;
          background-size: cover;
        }
      }
    }
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
      /*全部客户内容*/
      .invoice_content {
        min-height: 3rem;
        position: relative;
        background-color: #fff;
        .search_icon {
          width: 0.2rem;
          background: #ffffff;
          display: inline-block;
          text-align: center;
          margin-right: 0.16rem;
          margin-top: -0.1rem;
          img {
            width: 0.2rem;
            height: 0.2rem;
          }
        }
        .form {
          width: 100%;
          justify-content: center;
          display: flex;
          align-items: center;
          position: relative;
          .search {
            margin-right: 0.12rem;
            width: 0.68rem;
            height: 0.34rem;
            background: #006aff;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.04rem;
            position: absolute;
            right: 0;
          }
        }
        /deep/form {
          //   border-bottom: 0.01rem solid #dbe4ef;
        }
        /deep/.van-search {
          width: 100%;
          padding: 0.05rem 0.12rem !important;
        }
        /deep/.van-search__content {
          width: 100%;
          height: 0.32rem;
          background: #ffffff;
          border-radius: 0.04rem;
          border: 0.01rem solid #e1e1e1;
          position: relative;
        }
        /deep/.van-field__left-icon {
          display: none;
        }
        .space {
          height: 0.12rem;
          background: #f8f9fa;
        }
        /*内容*/
        .invoice_list {
          .custom_contents {
            font-family: PingFangSC-Regular, PingFang SC;
            .main_tit {
              width: 100%;
              padding: 0.12rem;
              background: #fff;
              box-sizing: border-box;
              p {
                text-align: left;
                line-height: 22px;
                &.number {
                  font-size: 0.16rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #333333;
                  margin-bottom: 0.1rem;
                }
                .company {
                  font-size: 0.12rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #ffffff;
                  padding: 0.01rem 0.05rem;
                  line-height: 17px;
                  background: #ffb000;
                  border-radius: 0.02rem;
                }
                &.text {
                  display: flex;
                  align-items: center;
                  line-height: 0.2rem;
                  margin-bottom: 0.06rem;
                }
                .account {
                  flex: 2;
                  font-size: 0.14rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                }
                .content {
                  flex: 8;
                  font-size: 0.14rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #999999;
                }
              }
            }
            .line {
              /*margin: 0rem 0.12rem;*/
              border: 0.01rem solid #ECEFF2;
              margin-bottom: 0.11rem;
            }
          }
        }
      }
    }
    /*公共样式--取消，确认*/
    .selecBox {
      width: 100%;
      margin-top: 0.22rem;
      margin-bottom: 0.12rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cancel {
        width: 49%;
        height: 0.39rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 106, 255, 1);
        line-height: 0.22rem;
        background: rgba(242, 247, 255, 1);
        border-radius: 0.04rem;
      }
      .confirm {
        width: 49%;
        height: 0.39rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 106, 255, 1);
        line-height: 0.22rem;
        background: rgba(242, 247, 255, 1);
        border-radius: 0.04rem;
      }
      .selecActive {
        width: 49%;
        height: 0.39rem;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.22rem;
        background: rgba(0, 106, 255, 1);
        border-radius: 0.04rem;
      }
    }

  }
</style>