<template>
  <div class="wrap">
    <myHeader />
    <main>
      <div class="none"></div>
      <div class="selection">
        <div class="selec_tit">
          <span class="selec_tit_type">选择部门</span>
          <span class="selec_tit_empty" @click="changeSeCempty">清空</span>
        </div>
        <div class="selec_content">
          <div
            v-for="(each, index) in sectionData"
            :key="each.id"
            :class="RadioSelec == index ? 'active' : 'each'"
            @click="changeSection(index)"
          >
            <span>{{ each.name }}</span>
          </div>
        </div>
      </div>
      <div class="selection">
        <div class="selec_tit">
          <span class="selec_tit_type">选择时间</span>
          <span class="selec_tit_empty" @click="changeTimeEmpty">清空</span>
        </div>
        <div class="selec_content">
          <div
            v-for="(each, index) in timeData"
            :key="index"
            v-if="index<num"
            :class="timeSelec == index ? 'active' : 'each'"
          >
            <span @click="changeTime(index)" v-if="index<num">{{each.time}}</span>
          </div>
          <!-- {{showList}} -->
          <span  v-if="timeData.length>5" class="more_show" @click="showMore">{{isShow?'更多':'收起'}}</span>

        </div>
      </div>
    </main>
    <footer>
      <div class="recovery">
        <van-checkbox
          v-model="checked"
          checked-color="#07c160"
          icon-size=".19rem"
        >
          恢复默认
        </van-checkbox>
      </div>
      <div class="selecBox">
        <div
          :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
          @click="changeCancel()"
        >
          取消
        </div>
        <div
          :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
          @click="changeConfirm()"
        >
          确认
        </div>
      </div>
    </footer>
    <!--年份-->
    <van-popup v-model="isYearShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
              v-model="currentDateYear"
              @cancel="cancelPickerYear"
              @confirm="confirmPickerYear"
              type="year"
              :columns-order="['year']"
              :formatter="formatter"
      />
    </van-popup>
    <!--半年-->
    <van-popup v-model="isHalfYear" position="bottom" :style="{ height: '30%' }">
      <div class="half_year_text">
        <span class="half_year_cancel" @click="halfCancel">取消</span>
        <span class="half_year_confirm" @click="halfConfirm">确认</span>
      </div>
      <div   class="half_time"
             v-for="(each, index) in halfTime"
             :key="index"
             :class="timeHalf == index ? 'activeText' : 'eachText'"
      >
        <span @click="changeHalfTime(index,each.name)">{{each.name}}</span>
      </div>
    </van-popup>
    <!--季度-->
    <van-popup v-model="isQuarter" position="bottom" :style="{ height: '35%' }">
      <div class="half_year_text">
        <span class="half_year_cancel" @click="quarterCancel">取消</span>
        <span class="half_year_confirm" @click="quarterConfirm">确认</span>
      </div>
      <div   class="half_time"
             v-for="(each, index) in quarterTime"
             :key="index"
             :class="timeQuarter == index ? 'activeText' : 'eachText'"
      >
        <span @click="changeQuarterTime(index,each.name)">{{each.name}}</span>
      </div>
    </van-popup>
    <!--月份-->
    <van-popup v-model="isMouthshow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
              v-model="currentDate"
              @cancel="cancelPickerMonth"
              @confirm="confirmPickerMonth"
              type="year-month"
              :min-date="minDate"
              :max-date="maxDate"
      />
    </van-popup>
    <!--自定义-->
    <van-popup v-model="isCustom">
        <div class="custom_content">
          <p class="custom_content-text">开始时间</p>
          <input
                  class="height-amount-input"
                  placeholder="请选择"
                  ref="termEnd"
                  @click="showDatePicker('termStart')"
                  v-model="inputData.start_Time"
                  readonly="readonly" />
          <p class="custom_content-text">结束日期</p>
          <input
            class="height-amount-input"
            placeholder="请选择"
            ref="termEnd"
            v-model="inputData.end_Time"
            @click="showDatePickers('termEnd')"
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
    <!--年月日-->
    <van-popup v-model="isPopShow" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
              @cancel="cancelPicker"
              @confirm="confirmPicker"
              v-model="startTime"
              v-if="showTime"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
      />
    </van-popup>
    <van-popup v-model="isPop" position="bottom" :style="{ height: '30%' }">
      <van-datetime-picker
              @cancel="cancelPickers"
              @confirm="confirmPickers"
              v-if="showTime"
              v-model="endTime"
              type="date"
              :min-date="minDate"
              :max-date="maxDate"
      />
    </van-popup>
  </div>
</template>
<script>
import { getData } from "../services/getData";
export default {
  data() {
    return {
      // selectFlag: true,
      checked: false,
      RadioSelec: 1,
      timeSelec: 1,
      timeHalf:0,
      timeQuarter:0,
      cancelShow: 1,
      // 年份
      isYearShow:false,
      currentDateYear: new Date(),
      // 半年
      isHalfYear:false,
      half:'',
      // 季度
      isQuarter:false,
      quarter:'',
      // 年月
      isMouthshow:false,
      currentDate: new Date(),
      minDate: new Date(2000, 1,),
      maxDate: new Date(2100, 10,),
      // 自定义
      isCustom:false,
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      isPopShow: false, // 弹出层隐藏与显示
      isPop: false, // 弹出层隐藏与显示
      showTime:false,
      // 更多收起
      num: 5,
      isShow:true,
      // 参数
      type:1,
      year:'',
      newYears:'',
      newYear:'',
      yearMonth:'',
      yearState:'',
      yearMonths:'',
      yearMonthb:'',

      beginTime:'',
      endTime:'',
      timeBetween:'',
      start_time:'',
      end_Time:'',
      // timeDiff:'',

      inputData:{
        start_Time:'',
        end_Time:'',
      },
      sectionData: [
        {
          name: "我的",
          checked: false,
          id: "0"
        },
        {
          name: "全公司",
          checked: false,
          id: "1"
        },
        {
          name: "营销中心",
          checked: false,
          id: "3"
        }
      ],
      timeData: [
        {
          time: "今日",
          id: "0"
        },
        {
          time: "本周",
          id: "1"
        },
        {
          time: "本月",
          id: "2"
        },
        {
          time: "昨日",
          id: "3"
        },
        {
          time: "上周",
          id: "4"
        },
        // {
        //   time: "更多",
        //   id: "98"
        // },
        {
          time: "上月",
          id: "5"
        },
        {
          time: "年份",
          id: "6"
        },
        {
          time: "半年",
          id: "7"
        },
        {
          time: "季度",
          id: "8"
        },
        {
          time: "月份",
          id: "9"
        },
        {
          time: "自定义",
          id: "10"
        },
        // {
        //   time: "收起",
        //   id: "180"
        // }
      ],
      halfTime: [
        {
          name: "上半年",
          id: "0"
        },
        {
          name: "下半年",
          id: "1"
        }
      ],
      quarterTime: [
        {
          name: "第一季度",
          id: "0"
        },
        {
          name: "第二季度",
          id: "1"
        },
        {
          name: "第三季度",
          id: "2"
        },
        {
          name: "第四季度",
          id: "3"
        }
      ],
    };
  },
  creates() {},
  methods: {
    showMore() {
        this.isShow = !this.isShow
        this.num = this.isShow ? 5 : this.timeData.length;
    },
    changeSeCempty() {
      this.RadioSelec = null;
    },
    changeSection(ind) {
      this.RadioSelec = ind;
    },
    changeTime(ind) {
      this.timeSelec = ind;
      this.flag = !this.flag
      console.log(this.timeSelec,'我是张展');
      if(ind>=0 && ind<=5) { //今日至上周--清除的是年份和月份，自定义、半年、季度的值
          this.type = ind;
          this.newYears= ''
          this.yearMonthb = ''
          this.beginTime = ''
          this.endTime = ''
      }
      if(ind == 9){ //月份--清楚年份和季度，半年、自定义的值
          this.newYears= ''
          this.beginTime = ''
          this.endTime = ''
      }
      if(ind == 10) { //自定义--清楚的是年份和月份的值
          this.newYears = ''
          this.yearMonthb = ''
      }
        //年份、半年、季度、自定义--清除的是月份的值
        if(ind == 6 || ind == 7 || ind == 8 || ind == 10){
            this.yearMonthb = ''
        }
      // ind->index 控制type的值是否为空，如果index的范围不再0-5之间type值为空
      if(ind>=6&&ind<=10) {
          this.type = ''
      }
      // 控制弹窗
      if (ind == '6'){
        this.isYearShow = true;
      };
      if (ind == '7'){
        this.isHalfYear = true;
      };
      if (ind == '8'){
        this.isQuarter = true;
      }
      if (ind == '9'){
        this.isMouthshow = true;
      };
      if (ind == '10'){
        this.isCustom = true;
        this.inputData.start_Time='';
        this.inputData.end_Time='';
      }
      // 控制恢复选中框内的汉字
      if((ind>=0&&ind<=5)||ind=='9'||ind=='10'||ind=='7') {
          this.timeData[6].time='年份';
          this.timeData[7].time='半年';
          this.timeData[8].time='季度';
          this.timeData[10].time='自定义'
      }
      if(ind==6||ind==7||ind==8||(ind>=0&&ind<=5)||ind==10){
          this.timeData[9].time='月份'
          this.timeData[10].time='自定义'
      }
      if(ind==8) {
          this.timeData[6].time='年份';
          this.timeData[7].time='半年';
      }
    },
    changeTimeEmpty() {
      this.timeSelec = null;
      this.type = ''
      this.timeData[6].time='年份';
      this.timeData[7].time='半年';
      this.timeData[8].time='季度';
      this.timeData[9].time='月份';
      this.timeData[10].time='自定义';
    },

    changeCancel() {
        console.log(this.timeSelec,111)
      this.cancelShow = 1;
        this.timeSelec = 1
        this.type = 1
      this.RadioSelec=1;
    },
    // 确定
    changeConfirm() {
      this.cancelShow = 2;
      // 半年
      if(this.timeSelec =='7'){
        this.$toast({
          message: "请选择年份",
          position: "center"
        });
      }
      // 季度
      if(this.timeSelec =='8'){
        this.$toast({
          message: "请选择年份",
          position: "center"
        });
      }
      // 年月
      if(this.timeSelec =='9'){
          this.yearMonth = this.timeData[9].time;
          this.yearMonths = this.yearMonth.replace(/[年]/g,"-");
          this.yearMonthb = this.yearMonths.replace(/[月]/,"");
      }
      // 自定义
      if(this.timeSelec =='10'){
          this.timeBetween = this.timeData[10].time
          this.beginTime = this.timeBetween.substring(0,10);
          this.endTime = this.timeBetween.substring(11,21);
      }
      let Data = {
          deptType:this.RadioSelec,
          type:this.type,
          year:this.newYears,
          yearMonth:this.yearMonthb,
          beginTime:this.beginTime,
          endTime:this.endTime,
          yearState:this.half, //新
          quarter:this.quarter,   //新
      }
      if(this.RadioSelec!=null){
        if((this.timeSelec>=0 && this.timeSelec<=5)||this.timeSelec =='6'||(this.timeSelec =='7'&&this.timeSelec =='6')||(this.timeSelec =='8'&&this.timeSelec =='6')||this.timeSelec =='9'||this.timeSelec =='10'){
          getData(Data).then(res => {
            if (res.code == "200") {
              this.$router.push({ path: "/" });
            }
          });
        }
      }else{
        this.$toast({
            message: "请选择部门",
            position: "center"
        });
      }
    },
    // 年份
    cancelPickerYear() { // 选择器取消按钮点击事件
      this.isYearShow = false;
      this.datePicker = "";
    },
    confirmPickerYear(value) {// 确定按钮，时间格式化并显示在页面上
      var date = value;
      var timer = date.getFullYear() + "年"
      this.timeData[6].time = timer;//月份的index值是6，直接给timeData下标为6的time赋值当前选中的日期的值
      this.newYear = timer;
      this.newYears = this.newYear.substring(0,this.newYear.length-1);
      this.isYearShow = false;
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
    },
    // 半年
    changeHalfTime(ind,name){
      this.timeHalf = ind;
      this.flag = !this.flag
      this.half = name;
      console.log(ind,name,this.halfTime,'111');
    },
    halfCancel(){
      this.isHalfYear = false;
    },
    halfConfirm(){
      if(this.half == '') {
        this.timeData[7].time='上半年';
      }
      if(this.half){
        this.timeData[7].time =  this.half;
      }
      if(this.timeHalf=="0"){
          // this.beginTime = "1"
          // this.endTime='6'
          this.half ='1' //新
          console.log(this.timeHalf,'777');
      }
      if(this.timeHalf=="1"){
          // this.beginTime = "7"
          // this.endTime='12'
          this.half ='2' //新
      }
      this.isHalfYear = false;
    },
    // 季度
    changeQuarterTime(ind,name) {
      this.timeQuarter = ind;
      this.flag = !this.flag
      this.quarter = name;
      console.log(ind,name,this.quarter,'111');
    },
    quarterCancel(){
      this.isQuarter = false;
    },
    quarterConfirm(){
      if(this.quarter == '') {
          this.timeData[8].time='第一季度';
      }
      if(this.quarter){
          this.timeData[8].time = this.quarter;
      }
        if(this.timeQuarter=="0"){
            // this.beginTime = "1"
            // this.endTime='3'
            this.quarter = '1' //新
            console.log(this.quarter,'000')
        }
        if(this.timeQuarter=="1"){
            // this.beginTime = "4"
            // this.endTime='6'
            this.quarter = '2' //新
        }
        if(this.timeQuarter=="2"){
            // this.beginTime = "7"
            // this.endTime='9'
            this.quarter = '3' //新
        }
        if(this.timeQuarter=="3"){
            // this.beginTime = "10"
            // this.endTime='12'
            this.quarter = '4' //新
        }
      this.isQuarter = false;
    },
    // 年月
    cancelPickerMonth() { // 选择器取消按钮点击事件
      this.isMouthshow = false;
      this.datePicker = "";
    },
    confirmPickerMonth(value) {// 确定按钮，时间格式化并显示在页面上
      var date = value;
      var m = date.getMonth() + 1;
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      var timer = date.getFullYear() + "年" + m + "月"
      this.timeData[9].time = timer;//月份的index值是9，直接给timeData下标为9的time赋值当前选中的日期的值
        this.beginTime = ""
        this.endTime=""
        this.isMouthshow = false;
    },
    // 自定义
    showDatePicker(picker) { //弹出层并显示时间选择器
      this.isPopShow = true;
      this.datePicker = picker;
      this.showTime =true;
    },
    showDatePickers() { //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime =true;
    },
    cancelPicker() { // 选择器取消按钮点击事件
      this.isPopShow = false;
    },
    confirmPicker(value) {// 确定按钮，时间格式化并显示在页面上
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d
      this.inputData.start_Time = timer;
        this.beginTime = ""
        this.endTime=""
      this.isPopShow = false;
    },
    cancelPickers() { // 选择器取消按钮点击事件
      this.isPop = false;
    },
    confirmPickers(value) {// 确定按钮，时间格式化并显示在页面上
      var dates = value;
      var m = dates.getMonth() + 1;
      var d = dates.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timers = dates.getFullYear() + "-" + m + "-" + d
      this.inputData.end_Time = timers;
      this.isPop = false;
      this.datePicker = "";
    },
    changeCancelTime() {
      this.isCustom = false;
    },
    changeConfirmTime() {
      if(this.inputData.start_Time==''||this.inputData.end_Time==''){
        this.isCustom = true;
        this.$toast({
            message: "请选择有效日期",
            position: "center"
        });
      }else{
          let start_Time = this.inputData.start_Time;
          let start = new Date(start_Time).getTime();
          let end_Time = this.inputData.end_Time;
          let end = new Date(end_Time).getTime();
          if(start>end){
            this.$toast({
                message: "开始时间不能大于结束时间",
                position: "center"
            });
          }else{
            this.isCustom = false;
            this.timeData[10].time = this.inputData.start_Time +'\n'+ this.inputData.end_Time ;
          }

      }
    },
  },
  components: {

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
    margin-top: 0.44rem;
    flex: 1;
    overflow: scroll;
    .none {
      width: 100%;
      height: 0.12rem;
      background: rgba(248, 249, 250, 1);
    }
    .selection {
      padding: 0 0.12rem;
      box-sizing: border-box;
    }
    .selec_tit {
      width: 100%;
      height: 0.44rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .selec_tit_type {
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.22rem;
      }
      .selec_tit_empty {
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.2rem;
      }
    }
    .selec_content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .more {
        width: 0.22rem;
        height: 0.2rem;
        color: #999;
      }
      .each {
        width: 31%;
        height: 0.34rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        background: rgba(251, 251, 251, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.04rem;
        margin-bottom: 0.11rem;
      }
      .active {
        width: 31%;
        height: 0.34rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.04rem;
        font-size: 0.14rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(0, 106, 255, 1);
        background: rgba(242, 247, 255, 1);
        border: 0.01rem solid rgba(0, 106, 255, 1);
        background: url("../common/images/Select.png") no-repeat bottom right;
        background-size: 0.18rem 0.18rem;
        margin-bottom: 0.11rem;
        box-sizing: border-box;
      }
      .month-height-color,.van-field__control:disabled{
        outline:none;
        color: rgba(0, 106, 255, 1) !important;
      }
      .more_show{
        width: 31%;
        margin-top: 0.1rem;
        color: #666;
      }
    }
  }
  footer {
    width: 100%;
    padding: 0 0.12rem;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
  }
  .custom_content{
    width: 3rem;
    /*height: 230px;*/
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
  /*半年样式*/
  .half_time{
    height: 44px;
    line-height: 44px;
    text-align: left;
    margin-left: 0.2rem;
  }
  .half_year_text{
    height: 44px;
    line-height: 44px;
  }
  .half_year_cancel{
    float: left;
    margin-left: 0.2rem;
  }
  .half_year_confirm{
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
