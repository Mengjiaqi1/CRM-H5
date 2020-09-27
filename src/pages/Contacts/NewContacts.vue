<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">新建联系人</div>
      <div class="h_right">...</div>
    </myHeader>
    <main>
      <div class="content">
        <div class="tit">
          <p class="number">编号：BY.20200429002</p>
        </div>
        <div class="form">
          <van-form @submit="onSubmit" validate-first>
            <van-field
              v-model="customer"
              @click="changecustomer"
              label="关联客户"
              required
              input-align="right"
              placeholder="请输入"
              right-icon="arrow"
              :rules="[{ required: true, message: '此项为必填项' }]"
            />
            <div class="none"></div>
            <van-field
              v-model="Fullname"
              label="姓名"
              required
              input-align="right"
              placeholder="请输入"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
            <van-field
              v-model="Telephone"
              label="联系电话"
              type="text"
              required
              input-align="right"
              :rules="[{ required: true, message: '电话号码不能为空' }]"
              right-icon="add"
              @click="AdditionalCalls"
              ref="call"
            />
            <div class="telList">
              <div class="telLi">
                <div class="tel_left">
                  <p class="tel">1222222222222</p>
                  <div class="tel_type">
                    家庭
                    <div class="triangle"></div>
                  </div>
                </div>
                <div class="tel_right">
                  <img :src="forms_reduce" alt="" />
                </div>
              </div>
              <div class="telLi">
                <div class="tel_left">
                  <input
                    class="tel"
                    v-model="tel2"
                    type="text"
                    placeholder="请输入电话号码"
                  />
                  <div class="tel_type">
                    家庭
                    <div class="triangle"></div>
                  </div>
                </div>
                <div class="tel_right">
                  <img :src="forms_reduce" alt="" />
                </div>
              </div>
              <div class="telLi">
                <div class="tel_left">
                  <input
                    class="tel"
                    v-model="tel2"
                    type="text"
                    placeholder="请输入电话号码"
                  />
                  <div class="tel_type">
                    家庭
                    <div class="triangle"></div>
                  </div>
                </div>
                <div class="tel_right">
                  <img :src="forms_reduce" alt="" />
                </div>
              </div>
              <div class="telLi">
                <div class="tel_left">
                  <input
                    class="tel"
                    v-model="tel2"
                    type="text"
                    placeholder="请输入电话号码"
                  />
                  <div class="tel_type">
                    家庭
                    <div class="triangle"></div>
                  </div>
                </div>
                <div class="tel_right">
                  <img :src="forms_reduce" alt="" />
                </div>
              </div>
            </div>
            <div class="none"></div>
            <van-field
              v-model="department"
              type="text"
              label="部门"
              placeholder="请输入"
              input-align="right"
            />
            <van-field
              v-model="Telephone"
              type="text"
              label="职务"
              placeholder="请输入"
              input-align="right"
            />
            <van-field
              readonly
              @click="showArea = true"
              :value="valueArea"
              type="text"
              label="地址"
              placeholder="请选择"
              input-align="right"
              right-icon="arrow"
            />
            <van-field
              v-model="address"
              rows="3"
              autosize
              maxlength="60个字符"
              type="textarea"
              show-word-limit
              placeholder="请输入详细地址"
            />
            <div class="none"></div>
            <van-field
              v-model="Postcode"
              label="邮编"
              placeholder="请输入"
              input-align="right"
            />
            <van-field
              v-model="mailbox"
              label="邮箱"
              type="text"
              placeholder="请输入"
              input-align="right"
            />
            <van-field
              v-model="birthday"
              @click="flag = true"
              type="text"
              label="生日"
              placeholder="请选择"
              autosize
              readonly
              input-align="right"
              right-icon="arrow"
            />
            <van-field
              v-model="Gender"
              type="text"
              label="性别"
              placeholder="请选择"
              autosize
              readonly
              input-align="right"
              right-icon="arrow"
              @click="isGender = true"
            />
            <van-field
              v-model="hobby"
              type="text"
              label="爱好"
              placeholder="请输入"
              autosize
              input-align="right"
            />
            <van-field type="text" label="备注" autosize readonly />
            <van-field
              v-model="remarks"
              rows="3"
              autosize
              maxlength="2000个字符"
              type="textarea"
              show-word-limit
              placeholder="请输入备注信息"
            />
            <div class="add_botton">
              <van-button round block type="info" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </main>
    <!-- 新建公司信息 -->
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
    <!--省市县三级联动-->
    <van-popup v-model="showArea" position="bottom" :style="{ height: '35%' }">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
    <!-- 性别 -->
    <van-popup v-model="isGender" position="bottom" :style="{ height: '35%' }">
      <van-picker
        show-toolbar
        :columns="GenderList"
        @confirm="changeConfirm"
        @cancel="onCancel"
      />
    </van-popup>
    <!-- 生日 -->
    <van-popup v-model="flag" position="bottom" :style="{ height: '35%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="ConfirmBrith"
        @cancel="CancelBrith"
      />
    </van-popup>
  </div>
</template>
<script>
import area from '../../common/js/area'
import moment from 'moment'
export default {
  data() {
    return {
      forms_reduce: require('../../common/images/home_reducer.png'),
      forms_add: require('../../common/images/home_add.png'),
      customer: '', //关联客户
      Fullname: '', // 姓名
      Telephone: '', // 联系电话
      work: '', // 工作
      department: '', // 部门
      post: '', // 职务
      Postcode: '', // 邮编
      mailbox: '', // 邮箱
      birthday: '', // 生日
      Gender: '', // 性别
      hobby: '', // 爱好
      remarks: '', //备注
      tel2: '136', // 电话号码
      // add类别
      isCategory: false,
      timeCategory: 0,
      titleName: this.$route.query.templateName,
      templateIds: '1',
      type: '',
      company: '',
      MenuData: ['北邮', '绿洲', '总公司'],
      // 省市县三级联动
      address: '', //地址
      value: '',
      valueArea: '',
      showArea: false,
      areaList: area, // 数据格式见 Area 组件文档
      // 性别
      typeCustom: null,
      isGender: false,
      GenderList: ['男', '女'],
      // 生日
      flag: false,
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    }
  },
  created() {},
  methods: {
    // 关联客户
    changecustomer() {
      this.$router.push({ path: '/associated' })
    },
    // 追加联系人电话
    AdditionalCalls() {},
    // 生日选择器
    ConfirmBrith(value) {
      this.flag = false
      this.birthday = moment(value).format('YYYY-MM-DD')
    },
    CancelBrith() {
      this.flag = false
    },
    // 性别选项
    changeConfirm(value, index) {
      console.log(value)
      this.Gender = value
      this.isGender = false
    },
    // 取消性别选择
    onCancel() {
      this.isGender = false
    },
    // 新建
    onCancelNew() {
      this.isCategory = false
    },
    ConfirmNew(value, index) {
      this.company = value
      this.isCategory = false
    },
    onConfirm(values) {
      console.log(values, 'v')
      this.valueArea = values.map((item) => item.name).join('/')
      console.log(this.value, 'value')
      this.showArea = false
    },
    onSubmit(values) {
      console.log('submit', values)
    },
    onFail() {
      this.$toast({
        message: '表单验证不通过',
        position: 'center',
      })
    },
  },
}
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
    margin-top: 0.44rem;
    .content {
    }
    .tit {
      width: 100%;
      height: 0.54rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f8f9fa;
      padding-left: 0.12rem;
      padding-right: 0.12rem;
      box-sizing: border-box;
      .number {
        font-size: 0.16rem;
        font-weight: 500;
        color: #333333;
      }
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
      }
    }
    .form {
      margin-bottom: 1rem;
      .none {
        width: 100%;
        height: 0.12rem;
        background: #f8f9fa;
      }
      .telList {
        width: 100%;
        background: #fff;
        padding: 0 0.12rem;
        margin-bottom: 0.12rem;
        box-sizing: border-box;
        .telLi {
          width: 100%;
          height: 0.64rem;
          margin-top: 0.12rem;
          background: #f8f9fa;
          padding-left: 0.14rem;
          padding-right: 0.12rem;
          display: flex;
          justify-items: space-between;
          align-items: center;
          box-sizing: border-box;
          .tel_left {
            flex: 8;
            text-align: left;
            .tel {
              display: block;
            }
            .tel_type {
              // display: flex;
              display: inline-flex;
              align-items: center;
              margin-top: 0.05rem;
              background: #f2f7ff;
              border-radius: 0.02rem;
              border: 0.01rem solid #006aff;
              font-size: 0.12rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #006aff;
              padding: 0.01rem 0.02rem;
            }
            .triangle {
              width: 0;
              height: 0;
              border-right: 0.05rem solid transparent;
              border-left: 0.05rem solid transparent;
              border-top: 0.05rem solid #006aff;
              display: inline-block;
              margin-left: 0.05rem;
              vertical-align: middle;
            }
          }
          .tel_right {
            // flex: 2;
            // text-align: right;
          }
        }
      }
      /deep/.van-icon-clear {
        color: red;
      }
      /deep/.van-icon-add {
        color: #006aff;
        padding-right: 0.1rem;
      }
      /deep/textarea.van-field__control {
        padding-left: 0.22rem;
      }
      /deep/.van-tab__text {
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
      /deep/.van-cell--required::before {
        position: absolute;
        vertical-align: middle;
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
      /deep/.van-cell {
        min-height: 0.44rem;
        display: flex;
        align-items: center;
        padding: 0 0.16rem;
        span {
          display: inline-block;
          font-size: 0.14rem;
          font-weight: 400;
          color: #666666;
        }
      }
      /deep/.van-field__error-message {
        font-size: 0.12rem;
        font-weight: 400;
        text-align: right;
      }
      /deep/ .van-field__control::placeholder {
        color: #999;
      }
      /deep/ .van-field__label.van-cell__title {
        width: 0.84rem;
        margin-left: 0.09rem;
        display: flex;
        align-items: center;
      }
      .add_botton {
        padding: 0.16rem 0.12rem;
        position: fixed;
        bottom: 0rem;
        width: 3.5rem;
        background: #f8f9fa;
        z-index: 999;
      }
    }
  }
  /*add分类样式*/
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
