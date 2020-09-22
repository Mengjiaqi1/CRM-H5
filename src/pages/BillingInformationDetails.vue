<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center"></div>
      <div class="h_right">
        <img src="../common/images/build.png" alt="" />
      </div>
    </myHeader>
    <main>
      <div class="main_tit">
        <p class="number">UHU12345678</p>
        <p><span class="company">中国邮政集团</span></p>
        <p class="text">
          <span class="account">银行账户:</span
          ><span class="content">中国邮政集团北京邮政公寓</span>
        </p>
        <p class="text">
          <span class="account">编号:</span
          ><span class="content">UHU12345678</span>
        </p>
      </div>
      <div class="nav">
        <van-tabs>
          <van-tab title="基本信息">
            <div class="Basic_infor">
              <div class="none"></div>
              <div class="form">
                <van-field v-model="customerNo" label="编号" readonly />
                <div class="relevance_wrap">
                  <div class="relevance">
                    <p class="customer">关联餐饮客户</p>
                    <p class="company"><span>廊坊盛世 (合作经营)</span></p>
                  </div>
                </div>
                <div class="relevance_wrap">
                  <div class="relevance">
                    <p class="customer">关联餐饮客户</p>
                    <p class="company"><span>廊坊盛世 (合作经营)</span></p>
                  </div>
                </div>
                <!-- <van-field
                  v-model="customer"
                  label="关联客户"
                  type="text"
                  readonly
                /> -->
                <van-field
                  v-model="Bank"
                  type="text"
                  label="开户行"
                  autosize
                  readonly
                  required
                />
                <van-field
                  v-model="account"
                  type="text"
                  label="银行账户"
                  readonly
                  required
                />
                <van-field
                  v-model="taxpayer"
                  type="text"
                  label="纳税人"
                  readonly
                />
              </div>
            </div>
          </van-tab>
          <van-tab title="文件柜">
            <div class="File_cabinet">
              <div class="titwrap">
                <div class="tit">
                  <span class="total">共计文件</span><span class="num">2</span>
                </div>
                <div class="file_upload">
                  <van-uploader class="uploadImg" :after-read="afterRead">
                    <img src="../common/images/upload.png" alt="" />
                  </van-uploader>
                </div>
              </div>
              <div class="file_wrap">
                <div class="file_content" ref="fileContent">
                  <van-swipe-cell>
                    <div class="file_content_li">
                      <div class="left" @click="changeImg('http://baidu.png')">
                        <img src="../common/images/excel.png" alt="" />
                        <van-uploader v-model="uploader" />
                      </div>
                      <div class="center">
                        <div class="Scheduling">项目排期.rar</div>
                        <div class="nameAndtime">
                          <span class="surname">何强</span>
                          <li class="time">
                            <span class="ymd">2020-12-01</span>
                            <span class="hsm">12:32:21</span>
                          </li>
                        </div>
                        <div class="size">1.1M</div>
                      </div>
                      <div class="right" @click="handlecheck">
                        <img src="check" alt="" />
                      </div>
                    </div>
                    <template #right>
                      <van-button type="danger" class="delete-button-none" />
                      <van-button
                        square
                        text="删除"
                        type="danger"
                        class="delete-button"
                        @click="handlerDel(index)"
                      />
                    </template>
                  </van-swipe-cell>
                </div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </main>
    <van-overlay :show="showImg" @click="showImg = false">
      <div class="wrapper" @click="showImg = false" @click.stop>
        <div class="block">
          <img :src="imgUrl" alt="" id="img" />
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import upLoaderImg from '../common/js/upLoaderImg'
import {
  findBase,
  findRecordBaseList,
  findByCustomerNo,
  findRecordsCount,
  remove,
  add,
} from '../services/CustomerDetails'
export default {
  data() {
    return {
      reg: /\.(png|jpg|gif|jpeg|webp)$/,
      total: 0,
      check: require('../common/images/check.png'),
      xiazai: require('../common/images/xiazai.png'),
      customerNo: '', // 编号
      customer: '', //关联客户
      Bank: '', // 开户行
      account: '', // 银行账户
      taxpayer: '', // 纳税人
      Fileshow: false,
      fileList: [],
      images: [],
      show: false,
      showImg: false,
      imgUrl: '',
      uploader: [], // 点击图片放大
    }
  },
  methods: {
    //vant 上传文件
    async onRead(file) {
      await upLoaderImg(file.file).then((res) => {
        this.fileId = res.result.fileId
      })
      await this.getAdd()
    },
    getAdd() {
      add(this.customerNo, this.activeName, this.customerNo, this.fileId).then(
        (res) => {
          if (res.code == 200) {
            console.log(res)
          }
        }
      )
    },
    handlerDel(id, ind) {
      this.fileList.splice(ind, 1)
      remove(id).then((res) => {
        if (res.code == 200) {
          console.log(res)
          this.$toast({
            message: '删除成功',
            position: 'center',
          })
        }
      })
    },
    //正则判断上传文件类型
    uploadType(url) {
      return /(png|jpg|gif|jpeg|webp)$/.test(
        url.substring(url.lastIndexOf('.') + 1, url.length)
      )
    },
    // 文件柜
    changeImg(url) {
      this.uploader.push({ url: url })
    },
    // 文件柜查看文件
    handlecheck(url) {
      if (this.uploadType(url)) {
        this.showImg = true
        this.imgUrl = url
      } else {
        this.showImg = false
        this.$router.push({ path: '/xls', query: { url } })
      }
    },
    afterRead(file) {
      console.log(file)
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    overflow: scroll;
    background: #f8f9fa;
    margin-top: 0.44rem;
    .main_tit {
      width: 100%;
      padding: 0.16rem 0.12rem 0.24rem 0.12rem;
      background: #fff;
      box-sizing: border-box;
      p {
        text-align: left;
        line-height: 22px;
        margin-top: 0.06rem;
        &.number {
          font-size: 0.16rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
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
    .nav {
      width: 100%;
      height: 100%;
      // background: #f8f9fa;
      margin-top: 0.1rem;
      .none {
        width: 100%;
        height: 0.1rem;
        background: #f8f9fa;
        /deep/.van-tabs__content {
          height: 100%;
        }
      }

      /deep/.van-tabs__wrap--scrollable {
        padding-left: 0.12rem;
        padding-right: 0.12rem;
      }
      /deep/.van-tabs__line {
        width: 0.32rem !important;
      }
      /deep/.van-tab {
        margin-right: 0.45rem;
        padding: 0 0;
      }
      /deep/.van-tab--active {
        .van-tab__text {
          color: #006aff;
        }
      }
      /deep/.van-tabs__line {
        background-color: #006aff;
      }
      /deep/.van-tab__text {
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
      /deep/.van-cell--required::before {
        position: absolute;
        left: 0.13rem;
        color: #ee0a24;
        font-size: 0.14rem;
        content: '*';
      }
      /deep/.van-tabs__wrap--scrollable {
        padding-left: 0.12rem;
        padding-right: 0.12rem;
      }
      /deep/.van-tabs__line {
        width: 0.32rem !important;
      }
      /deep/.van-tabs__wrap--scrollable .van-tabs__nav--complete {
        padding-left: 0;
        padding-right: 0;
      }
      /deep/.van-tab {
        margin-right: 0.45rem;
        padding: 0 0;
      }
      /deep/.van-tab--active {
        .van-tab__text {
          color: #006aff;
        }
      }
      /deep/.van-tabs__line {
        background-color: #006aff;
      }
      .Basic_infor {
        .form {
          .relevance_wrap {
            width: 100%;
            background: #fff;
            padding-left: 0.16rem;
            padding-right: 0.16rem;
            box-sizing: border-box;
            .relevance {
              padding: 0.11rem 0 0.14rem 0;
              border-bottom: 0.01rem solid rgb(245, 246, 247);
              // margin-left: 0.12rem;
              .customer {
                text-align: left;
                font-size: 0.14rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                margin-left: 0.22rem;
              }
              .company {
                text-align: left;
                margin-top: 0.08rem;
                margin-left: 0.22rem;
                span {
                  font-size: 0.12rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #006aff;
                  padding: 0.01rem 0.05rem;
                  background: #f2f7ff;
                  border-radius: 0.02rem;
                  border: 0.01rem solid #006aff;
                }
              }
            }
          }
          /deep/.van-cell {
            min-height: 0.44rem;
            display: flex;
            align-items: center;
            padding: 0 0.16rem;
            span {
              display: inline-block;
              margin-left: 0.1rem;
              height: 0.2rem;
              font-size: 0.14rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
          }
          /deep/ .van-cell__value {
            //   margin-top: 0.12rem;
          }
          /deep/ .van-field__label.van-cell__title {
            width: 0.84rem;
            margin-left: 0.12rem;
            display: flex;
            align-items: center;
          }
        }
      }
      .File_cabinet {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        // background: #f8f9fa;
        .titwrap {
          width: 100%;
          height: 0.42rem;
          padding: 0 0.12rem;
          background: #f8f9fa !important;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .tit {
            display: flex;
            .total {
              font-size: 0.12rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
            .num {
              width: 0.2rem;
              height: 0.14rem;
              background: #017cff;
              border-radius: 0.06rem;
              margin-left: 0.1rem;
              font-size: 0.13rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ffffff;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .file_upload {
            box-sizing: border-box;
            img {
              width: 0.24rem;
              height: 0.24rem;
            }
            .uploadImg {
              width: 0.24rem;
              height: 0.24rem;
            }
          }
        }

        .file_wrap {
          padding: 0 0.12rem;
          box-sizing: border-box;
        }
        .file_content {
          width: 100%;
          height: 5rem;
          border-radius: 0.08rem;
          background: #fff;
          padding: 0 0.11rem;
          box-sizing: border-box;
          /deep/element.style {
            transform: translate3d(-79px, 0px, 0px);
          }
          /deep/.van-swipe-cell__right {
            display: flex;
          }
          /deep/.van-button--danger {
            background: #ff6189;
            border: none;
          }
          /deep/ .goods-card {
            margin: 0;
            background-color: #fff;
          }
          /deep/.delete-button-none {
            width: 0.15rem;
            background: #fff;
            height: 100%;
            border-bottom: 0.01rem solid #eceff2;
          }
          /deep/.delete-button {
            width: 0.64rem;
            height: 100%;
          }
          .file_content_li {
            width: 100%;
            display: flex;
            justify-content: space-between;
            border-bottom: 0.01rem solid #eceff2;
            background: #fff;
            box-sizing: border-box;
            padding-bottom: 0.16rem;
            .left {
              margin-top: 0.24rem;
              width: 0.4rem;
              height: 0.4rem;
              position: relative;
              img {
                width: 0.4rem;
                height: 0.4rem;
              }
              /deep/.van-uploader {
                width: 0.4rem;
                height: 0.4rem;
              }
              /deep/.van-uploader__upload {
                display: none;
              }
              /deep/.van-uploader__preview-image {
                width: 0.4rem;
                height: 0.4rem;
              }
              /deep/.van-uploader__preview-delete {
                display: none;
              }
              /deep/.van-uploader__preview {
                position: absolute;
                top: -0.4rem;
                opacity: 0;
              }
            }
            .center {
              flex: 1;
              margin-left: 0.2rem;
              margin-top: 0.16rem;

              .Scheduling {
                width: 2rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 0.16rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 0.22rem;
                display: flex;
              }
              .nameAndtime {
                display: flex;
                margin-top: 0.05rem;
                .surname {
                  display: flex;
                  min-width: 0.39rem;
                  font-size: 0.12rem;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                }
                .time {
                  margin-left: 0.18rem;
                }
              }

              .size {
                display: flex;
                margin-top: 0.05rem;
                font-size: 0.12rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
              }
            }
            .right {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 0.08rem;
              img {
                widows: 0.14rem;
                height: 0.14rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
