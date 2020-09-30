<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">关联客户</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="tit">
        <p class="company">
          <span class="beiyou" @click="isCategory = true">{{
            company == '' ? '绿洲' : company
          }}</span
          ><span class="triangle"></span>
        </p>
        <p class="search">
          <van-search
            v-model="value"
            placeholder="请输入您想要搜索的内容"
            @input="onSearch"
          />
        </p>
      </div>
      <div class="content">
        <van-radio-group v-model="radio">
          <van-cell-group v-for="each in customerList" :key="each.createUserId">
            <van-cell
              :title="each.customerFullName"
              clickable
              @click="changeradio(each.customerId, each.customerFullName)"
            >
              <template #right-icon>
                <van-radio
                  :name="each.customerId"
                  checked-color="rgb(23,221,131)"
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </main>
    <div class="btnwrap">
      <div class="btn empty" @click="changeEmpty">清空</div>
      <div class="btn confirm" @click="changeConfirm">确认</div>
    </div>
    <!-- 选择公司类别 -->
    <van-popup
      v-model="isCategory"
      position="bottom"
      :style="{ height: '35%' }"
    >
      <van-picker
        show-toolbar
        :columns="MenuData"
        @confirm="ConfirmNew"
        @cancel="onCancelNew"
      />
    </van-popup>
  </div>
</template>
<script>
import { findTemplateList, FindAllCustomer } from '../services/Associated'

export default {
  data() {
    return {
      company: '',
      value: '',
      radio: null,
      isCategory: false,
      MenuData: [],
      templateId: '1',
      customerList: null,
      templateName: '', // 选择的客户名称
    }
  },
  created() {
    if (this.$store.state.radio != '') {
      this.radio = this.$store.state.radio
    }
    this.getfindTemplateList()
    this.getFindAllCustomer()
  },
  methods: {
    // 搜索
    onSearch(value) {
      FindAllCustomer(this.templateId, value).then((res) => {
        if (res.code == 200) {
          this.customerList = res.rows
        }
      })
    },
    //查询全部客户
    getFindAllCustomer() {
      FindAllCustomer(this.templateId).then((res) => {
        if (res.code == 200) {
          this.customerList = res.rows
        }
      })
    },
    // 查询表单模板
    getfindTemplateList() {
      findTemplateList('1').then((res) => {
        if (res.code == 200) {
          res.rows.map((each) => {
            this.MenuData.push({
              text: each.templateName,
              templateId: each.templateId,
            })
          })
        }
      })
    },
    //确定按钮
    changeConfirm() {
      this.$router.push({
        path: '/newContacts',
        query: { name: this.templateName, id: this.radio },
      })
    },
    // 取消按钮
    changeEmpty() {
      this.radio = null
    },
    changeradio(id, name) {
      this.$store.commit('set_radio', id)
      this.templateName = name
      this.radio = id
    },
    // 选择公司确认
    ConfirmNew(value) {
      this.company = value.text
      this.templateId = value.templateId
      this.isCategory = false
      this.getFindAllCustomer()
    },
    onCancelNew() {
      this.isCategory = false
    },
  },
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    overflow: scroll;
    margin-top: 0.44rem;
    .tit {
      width: 100%;
      height: 0.74rem;
      padding-left: 0.12rem;
      padding-right: 0.12rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      .company {
        padding: 0.03rem 0.13rem;
        background: #0067ff;
        border-radius: 0.04rem;
        display: flex;
        align-items: center;
        justify-content: center;
        .beiyou {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
        .triangle {
          width: 0;
          height: 0;
          border-top: 0.05rem solid transparent;
          border-left: 0.05rem solid #fff;
          border-bottom: 0.05rem solid transparent;
          display: inline-block;
          margin-left: 0.1rem;
          vertical-align: middle;
        }
      }
      .search {
        flex: 1;
        margin-left: 0.11rem;
        /deep/.van-search {
          padding: 0;
          background: #ffffff;
          box-shadow: 0.02rem 0.02rem 0.04rem 0 rgba(0, 22, 54, 0.1);
          border-radius: 0.04rem;
        }
        /deep/.van-icon-search {
          color: #006aff;
        }
        /deep/.van-field__body {
          margin-left: 0.05rem;
        }
        /deep/.van-field__control {
          font-size: 0.12rem;
          font-weight: 400;
          color: #999999;
        }
      }
    }
    .content {
      width: 100%;
      padding: 0 0.12rem;
      box-sizing: border-box;
      /deep/.van-cell-group {
      }
      /deep/.van-cell {
        height: 0.44rem;
        padding: 0.1rem 0;
        align-items: center;
        position: relative;
      }
      /deep/.van-cell__title {
        margin-left: 0.3rem;
        display: flex;
      }
      /deep/.van-radio {
        width: 0.19rem;
        height: 0.19rem;
        position: absolute;
        left: 0;
      }
      li {
        width: 100%;
        height: 0.44rem;
        border-bottom: 0.01rem solid #eceff2;
        display: flex;
        align-items: center;
        .text {
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          margin-left: 0.1rem;
        }
      }
    }
  }
  .btnwrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 0.12rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    .btn {
      width: 49.3%;
      height: 0.39rem;

      border-radius: 0.04rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.16rem;
      font-weight: 400;

      &.empty {
        color: #006aff;
        background: #f2f7ff;
      }
      &.confirm {
        color: #ffffff;
        background: #006aff;
      }
    }
  }
  /*选择二级公司*/
  /deep/.van-picker__confirm {
    font-size: 0.16rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #006aff;
  }
  /deep/.van-picker__cancel {
    font-size: 0.16rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
  }
  /deep/.van-picker-column__item {
    .van-ellipsis {
      font-size: 0.16rem;
      font-weight: 400;
      color: #666666;
    }
  }
  /deep/.van-picker-column__item--selected {
    // background: #f3f8ff;
    .van-ellipsis {
      font-size: 0.16rem;
      font-weight: 400;
      color: #006aff;
    }
  }
}
</style>
