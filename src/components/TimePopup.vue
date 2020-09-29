<template>
  <div class="time">
    <van-popup v-model="msg.isCustom">
      <div class="custom_content">
        {{msg.isCustom}}{{msg.timePopSelected}}
        <p class="custom_content-text">开始时间</p>
        <input
                class="height-amount-input"
                placeholder="请选择"
                ref="termStart"
                @click="showDatePicker('termStart')"
                @blur="handleBlur"
                v-model="inputData.start_Time"
                readonly="readonly" />
        <p class="custom_content-text">结束日期</p>
        <input
                class="height-amount-input"
                placeholder="请选择"
                ref="termEnd"
                v-model="inputData.end_Time"
                @click="showDatePickers('termEnd')"
                @blur="handleBlur"
                readonly="readonly" />
        <div class="selecBox">
          <div style="width: 30%;margin-left: 10%;"
               :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
               @click="changeCancelTime()"
          >
            取消
          </div>
          <div
                  style="width: 30%;margin-right: 10%;"
                  :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
                  @click="changeConfirmTime()"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <!--具体时间选择-->
    <Time
      :msgs="{isPopShow,showTime,isPop,}"
      @childs-start-cancel="cancelPicker"
      @childs-start-confirm="confirmPicker"
      @childs-end-cancel="cancelPickers"
      @childs-end-confirm="confirmPickers"
    >
    </Time>
  </div>

</template>
<script>
    import Time from './Time'
    export default {
      props: ['msg'],
      components: {
          Time,
      },
      data() {
        return {
          cancelShow: 1,
          inputData:{
              start_Time:'',
              end_Time:'',
          },
          // 年月日弹框
          isPopShow: false, // 弹出层隐藏与显示
          isPop: false, // 弹出层隐藏与显示
          showTime:false,
        };
      },
      methods: {
        // 开始时间-结束时间-点击事件
        showDatePicker() { //开始时间弹出层并显示时间选择器
            this.isPopShow = true;
            this.showTime =true;

        },
        showDatePickers() { //结束时间弹出层并显示时间选择器
            this.isPop = true;
            this.showTime =true;
        },
        // 自定义时间弹框--按钮
        changeCancelTime() {
            this.$emit('child-cancel','我是子组件传过来的值');
        },
        changeConfirmTime() {
            this.$emit('child-confirm',this.inputData,'子组件选择有效日期')
        },
        handleBlur(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        },
        // 公共日期弹框按钮-开始时间-结束时间
        cancelPicker() { // 选择器取消按钮点击事件
            this.isPopShow = false;
        },
        confirmPicker(value) {// 确定按钮，时间格式化并显示在页面上
            let date = value;
            let m = date.getMonth() + 1;
            let d = date.getDate();
            if (m >= 1 && m <= 9) {
                m = "0" + m;
            }
            if (d >= 0 && d <= 9) {
                d = "0" + d;
            }
            let timer = date.getFullYear() + "-" + m + "-" + d
            if(this.inputData){
                this.inputData.start_Time = timer;
            }
            this.isPopShow = false;
        },
        cancelPickers() { // 选择器取消按钮点击事件
            this.isPop = false;
        },
        confirmPickers(value) {// 确定按钮，时间格式化并显示在页面上
            let dates = value;
            let m = dates.getMonth() + 1;
            let d = dates.getDate();
            if (m >= 1 && m <= 9) {
                m = "0" + m;
            }
            if (d >= 0 && d <= 9) {
                d = "0" + d;
            }
            let timers = dates.getFullYear() + "-" + m + "-" + d
            if(this.inputData){
                this.inputData.end_Time = timers;
            }
            this.isPop = false;
        },
      }
    };
</script>
<style lang="scss" scoped>
  .time{
    position: relative;
  }
  /*分配时间自定义*/
  .custom_content{
    width: 3rem;
    padding: 0.2rem 0.2rem;
    .custom_content-text{
      text-align: left;
      margin-bottom: 0.2rem;
    }
    input{
      width: 100%;
      height: 0.32rem;
      line-height: 0.32rem;
      border: 0.01rem solid #ccc;
      margin-bottom: 0.2rem;
    }
    input::-webkit-input-placeholder{
      padding-left: 0.1rem;
    }
  }
  /*公共样式取消，确认*/
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
</style>