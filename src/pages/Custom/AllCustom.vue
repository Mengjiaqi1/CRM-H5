<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">全部客户</div>
      <div class="h_right h_more">
        <div class="search_icon" @click="handleSearch">
          <input
            v-model="keywordInput"
            disabled
            style="display: inline-block;height: 0rem"
          />
          <img src="../../common/images/search.png" alt="" />
        </div>
        <img src="../../common/images/adds.png" alt="" @click="changeBuild" />
      </div>
    </myHeader>
    <main>
      <div class="all_custom_content">
        <div class="all_custom_fixed">
          <van-tabs @change="meunTab">
            <!--            <van-tab v-for="each in MenuData" :key="each.id" :title="each.name">-->
            <van-tab
              v-for="each in MenuData"
              :key="each.templateName"
              :title="each.templateName"
              :name="each.templateId"
            >
              <!--下拉菜单-->
              <div class="space"></div>
              <div class="dropdown-menu clearfix">
                <van-dropdown-menu
                  :overlay="PublishValue"
                  active-color="#006aff"
                  class="dropdown fl"
                >
                  <van-dropdown-item
                    v-model="value1"
                    :options="option1"
                    @change="customState"
                    @open="handleOrtherItem"
                    :close-on-click-overlay="true"
                  />
                  <van-dropdown-item
                    title="范围"
                    ref="timeMenu"
                    @open="handleOrtherItems"
                  >
                    <!--最后跟进时间-->
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">最后跟进时间</span>
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
                    <!--未联系时间-->
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">未联系时间</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in noContactData"
                          :key="each.id"
                          :class="ContactSelec == index ? 'active' : 'each'"
                          @click="contactSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--归档状态-->
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">归档状态</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in fileData"
                          :key="each.id"
                          :class="fileStatus == index ? 'active' : 'each'"
                          @click="fileSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--创建人-->
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">创建人</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in createrData"
                          :key="each.id"
                          :class="createrStatus == index ? 'active' : 'each'"
                          @click="createrSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--负责人-->
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">负责人</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in chargeData"
                          :key="each.id"
                          :class="chargeStatus == index ? 'active' : 'each'"
                          @click="chargeSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--弃用-->
                    <!--                    <div class="selection">-->
                    <!--                      <div class="selec_tit">-->
                    <!--                        <span class="selec_tit_type">弃用</span>-->
                    <!--                      </div>-->
                    <!--                      <div class="selec_content">-->
                    <!--                        <div-->
                    <!--                                v-for="(each, index) in chargeData"-->
                    <!--                                :key="each.id"-->
                    <!--                                :class="chargeStatus == index ? 'active' : 'each'"-->
                    <!--                                @click="chargeSection(index)"-->
                    <!--                        >-->
                    <!--                          <span>{{ each.name }}</span>-->
                    <!--                        </div>-->
                    <!--                      </div>-->
                    <!--                    </div>-->
                    <!--客户地址-->
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">客户地址</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in addressData"
                          :key="each.id"
                          :class="addressStatus == index ? 'active' : 'each'"
                          @click="addressSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--创建时间-->
                    <div class="selection" v-if="isCreat === true">
                      <div class="selec_tit">
                        <span class="selec_tit_type">创建时间</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in createTimeData"
                          :key="each.id"
                          :class="createTimeSelec == index ? 'active' : 'each'"
                          @click="createTimeSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--更新时间-->
                    <div class="selection" v-if="isUpdata === true">
                      <div class="selec_tit">
                        <span class="selec_tit_type">更新时间</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in updateTimeData"
                          :key="each.id"
                          :class="updateTimeSelec == index ? 'active' : 'each'"
                          @click="updateTimeSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--客户类型-->
                    <div class="selection" v-if="isType === true">
                      <div class="selec_tit">
                        <span class="selec_tit_type">客户类型</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in typeData"
                          :key="each.id"
                          :class="typeStatus == index ? 'active' : 'each'"
                          @click="typeSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--公海退回时间-->
                    <div class="selection" v-if="isReturn === true">
                      <div class="selec_tit">
                        <span class="selec_tit_type">公海退回时间</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in returnData"
                          :key="each.id"
                          :class="returnTimeSelec == index ? 'active' : 'each'"
                          @click="returnTimeSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--分配时间-->
                    <div class="selection" v-if="isBranch === true">
                      <div class="selec_tit">
                        <span class="selec_tit_type">分配时间</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in distributeData"
                          :key="each.id"
                          :class="
                            distributeTimeSelec == index ? 'active' : 'each'
                          "
                          @click="distributeTimeSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
                    <!--按钮-->
                    <div style="margin-bottom: 0.5rem"></div>
                    <div class="selecBox selecBox_fixed">
                      <div
                        style="width: 20%;text-align: center"
                        @click="changeScreen"
                      >
                        <img
                          src="../../common/images/setColor.png"
                          alt=""
                          style="width: 0.2rem;height: 0.2rem"
                        />
                      </div>
                      <div
                        style="width: 40%;"
                        :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
                        @click="changeSet()"
                      >
                        重置
                      </div>
                      <div
                        style="width: 40%;"
                        :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
                        @click="changeConfirm()"
                      >
                        确认
                      </div>
                    </div>
                  </van-dropdown-item>
                  <!--                  <van-dropdown-item v-model="value2" :options="option2" @open="handleOrtherItem" :close-on-click-overlay="true">-->
                  <van-dropdown-item
                    v-model="value2"
                    :options="option"
                    @change="toggleFieldDesc"
                    @open="handleOrtherItem"
                    :close-on-click-overlay="true"
                  >
                    <div class="all_custom_set" @click="handleSet">
                      <img src="../../common/images/setColor.png" alt="" />
                      <span>默认排序设置</span>
                    </div>
                  </van-dropdown-item>
                </van-dropdown-menu>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <div class="all_custom_list">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="没有更多数据"
              @load="onLoad"
              style="margin-top: 0.92rem"
            >
              <div class="space" style="height: 0.18rem"></div>
                <router-link
                  tag="div"
                  class="custom_contents"
                  v-for="(item, index) in inCustomList"
                  :key="index"
                  :to="{
                    path: '/customerDetails',
                    query: { id: item.customerId }
                  }"
                >
                  <div class="custom_content_top clearfix">
                    <p class="custom_content_address fl">
                      {{ item.customerFullName }}
                    </p>
                  </div>
                  <div class="line"></div>
                  <ul class="custom_content_text">
                    <li class="margin_bottom">
                      <p>负责人：</p>
                      <p v-if="item.personInCharge">
                        {{ item.personInCharge }}
                      </p>
                      <p v-else>--</p>
                    </li>
                    <li>
                      <p>最近跟进时间：</p>
                      <p v-if="item.lastFollowUpTime">
                        {{ item.lastFollowUpTime }}
                      </p>
                      <p v-else>--</p>
                    </li>
                  </ul>
                  <div class="space"></div>
                </router-link>
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </main>
    <!--时间自定义-->
    <TimePopup
      :msg="{ title, isCustom, isPopShow, timePopSelected }"
      @child-cancel="handleCancel"
      @child-confirm="handleConfirm"
      @child-start-time="showDatePicker"
      @child-end-time="showDatePickers"
    ></TimePopup>
    <!--按钮-->
    <van-popup v-model="searchBtn" position="right" class="search_popup">
      <div class="search-history">
        <div class="search-history-bgc">
          <div class="search-history-top">
            <input
              class="search-history-input"
              :focus="true"
              @keydown.enter="searchEnter"
              ref="searchInput"
              v-model="keywordInput"
              placeholder="客户名称搜索"
            />
            <span class="search-cancel" @click="hanleCancel">取消</span>
          </div>
        </div>
      </div>
    </van-popup>
    <!--省市县三级联动-->
    <van-popup v-model="showArea" position="bottom" :style="{ height: '35%' }">
      <van-area
        :area-list="areaList"
        @confirm="onConfirm"
        @cancel="showArea = false"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  findTemplateList,
  getAllCustomData,
  getScreenList,
  sortDefaultList
} from "../../services/AllCustom";
import TimePopup from "../../components/TimePopup";
import area from "../../common/js/area";
import { Toast } from "vant";
export default {
  components: {
    TimePopup
  },
  data() {
    return {
      title: "客户总数",
      isCreat: true,
      isUpdata: true,
      isType: true,
      isReturn: true,
      isBranch: true,
      inCustomList: [],
      // 加载刷新
      isLoading: false,
      loading: false,
      finished: false,
      // 当前页数
      pageNum: 0,
      // 当前条数
      pageSize: 10,
      // 显示遮罩层
      PublishValue: false,
      // 下拉菜单默认值
      value1: 0,
      timeName: "",
      timeValue: 0,
      fieldDesc: "",
      fieldDescValue: "",
      // 搜索
      searchBtn: false,
      keywordInput: "",
      // 筛选初始化数据
      RadioSelec: null,
      ContactSelec: null,
      fileStatus: null,
      createrStatus: null,
      chargeStatus: null,
      giveStatus: null,
      addressStatus: null,
      typeStatus: null,
      createTimeSelec: null,
      updateTimeSelec: null,
      distributeTimeSelec: null,
      returnTimeSelec: null,
      // 年月日弹框
      startTime: new Date(), // 开始时间
      endTime: new Date(), // 结束时间
      isPopShow: false, // 弹出层隐藏与显示
      timePopSelected: "", // 当前弹框选项 (定义出来：1.创建时间 2.更新时间，3.。。。。其他)
      isPop: false, // 弹出层隐藏与显示
      showTime: false,
      minDate: new Date(2009, 12, 1),
      maxDate: new Date(2030, 11, 31),
      // 确定筛选条件初始值
      formId: 1,
      userId: 1,
      lastFollowTimeStart: "",
      lastFollowTimeEnd: "",
      notContactTimeType: "",
      filingType: "",
      createUserType: "",
      createUserId: "",
      personInChargeType: "",
      personInChargeId: "",
      deprecatedUserType: "",
      deprecatedUserId: "",
      areaId: "",
      customerType: "",
      createTimeStart: "",
      createTimeEnd: "",
      updateTimeStart: "",
      updateTimeEnd: "",
      allocateTimeStart: "",
      allocateTimeEnd: "",
      sendBackPondStart: "",
      sendBackPondEnd: "",
      isAsc: "",
      orderByColumn: "",
      fieldName: "",
      // 自定义时间
      isCustom: false,
      inputData: {
        start_Time: "",
        end_Time: ""
      },
      cancelShow: 1,
      // 省市县三级联动
      area: "",
      value: "",
      valueArea: "",
      areaCode: "",
      showArea: false,
      areaList: area, // 数据格式见 Area 组件文档
      // 全部客户菜单切换
      MenuData: [],
      templateId: 1,
      templateName: "绿洲",
      // MenuData:[
      //   {
      //     name:"绿洲",
      //     id:'0',
      //   },
      //   {
      //     name:"邮中",
      //     id:'1',
      //   },
      //   {
      //     name:"餐饮",
      //     id:'2',
      //   },
      //   {
      //     name:"北邮",
      //     id:'3',
      //   },
      // ],
      // 全部option
      option1: [
        { text: "全部", value: 0 },
        { text: "今日新增", value: 1 },
        { text: "本周新增", value: 2 },
        { text: "7天未跟进", value: 3 },
        { text: "即将退回公海池", value: 4 },
        { text: "我负责的", value: 5 },
        { text: "我协同的", value: 6 },
        { text: "下属负责的", value: 7 },
        { text: "下属协同的", value: 8 }
      ],
      // 时间option
      sortList: [],
      value2: 0,
      value3: 0,
      option: [],
      text: "",
      optionItem: {
        text: "客户官网降序",
        value: 0,
        isAsc: "",
        orderByColumn: ""
      },
      // 最后跟进时间
      sectionData: [
        {
          name: "今日",
          id: "1"
        },
        {
          name: "本周",
          id: "2"
        },
        {
          name: "本月",
          id: "3"
        },
        {
          name: "三个月",
          id: "4"
        },
        {
          name: "自定义时间",
          id: "5"
        }
      ],
      // 未联系时间
      noContactData: [
        {
          name: "一周到两周",
          id: "1"
        },
        {
          name: "两周到一月",
          id: "2"
        },
        {
          name: "一月到两月",
          id: "3"
        },
        {
          name: "两月以上",
          id: "4"
        }
      ],
      fileData: [
        {
          name: "未归档",
          id: "1"
        },
        {
          name: "已归档",
          id: "2"
        }
      ],
      createrData: [
        {
          name: "我的",
          id: "1"
        },
        {
          name: "下属的",
          id: "2"
        },
        {
          name: "选择员工",
          id: "3"
        }
      ],
      chargeData: [
        {
          name: "我的",
          id: "1"
        },
        {
          name: "下属的",
          id: "2"
        },
        {
          name: "选择员工",
          id: "3"
        }
      ],
      // giveData:[
      //   {
      //     name: "我的",
      //     id: "1"
      //   },
      //   {
      //     name: "下属的",
      //     id: "2"
      //   },
      //   {
      //     name: "选择员工",
      //     id: "3"
      //   },
      // ],
      addressData: [
        {
          name: "选择省市区",
          id: "1"
        }
      ],
      typeData: [
        {
          name: "局内客户",
          id: "1"
        },
        {
          name: "外省客户",
          id: "2"
        },
        {
          name: "行业客户",
          id: "3"
        },
        {
          name: "纯社会客户",
          id: "4"
        }
      ],
      createTimeData: [
        {
          name: "自定义时间",
          id: "1"
        }
      ],
      updateTimeData: [
        {
          name: "自定义时间",
          id: "1"
        }
      ],
      distributeData: [
        {
          name: "自定义时间",
          id: "1"
        }
      ],
      returnData: [
        {
          name: "自定义时间",
          id: "1"
        }
      ]
    };
  },
  created() {
    this.findTemplate();
    this.getCustomInfo();
    // 分配时间筛选数据
    this.sortDefault();
  },
  methods: {
    meunTab(title, name) {
      this.templateId = title;
      this.templateName = name;
      console.log(title, name, this.templateId, this.templateName, "222");
      this.getCustomInfo();
    },
    // tab菜单模板
    findTemplate() {
      let Data = {
        formId: 1
      };
      findTemplateList(Data).then(res => {
        if (res.code == 200) {
          this.MenuData = res.rows;
        }
      });
    },
    // 初始化列表数据
    getCustomInfo() {
      let Datas = {
        templateId: this.templateId,
        lastFollowTimeType: this.lastFollowTimeType,
        lastFollowTimeStart: this.lastFollowTimeStart,
        lastFollowTimeEnd: this.lastFollowTimeEnd,
        notContactTimeType: this.notContactTimeType,
        filingType: this.filingType,
        createUserType: this.createUserType,
        // createUserId:this.createUserId,
        personInChargeType: this.personInChargeType,
        // personInChargeId:this.personInChargeId,
        // deprecatedUserType:this.deprecatedUserType,
        // deprecatedUserId:this.deprecatedUserId,
        areaId: this.areaId,
        customerType: this.customerType,
        createTimeStart: this.createTimeStart,
        createTimeEnd: this.createTimeEnd,
        updateTimeStart: this.updateTimeStart,
        updateTimeEnd: this.updateTimeEnd,
        allocateTimeStart: this.allocateTimeStart,
        allocateTimeEnd: this.allocateTimeEnd,
        sendBackPondStart: this.sendBackPondStart,
        sendBackPondEnd: this.sendBackPondEnd,
        isAsc: this.isAsc,
        orderByColumn: this.orderByColumn,
        pageNum: this.pageNum
        // pageSize:10,
      };
      getAllCustomData(Datas).then(res => {
        if (res.code == "200") {
          // if(this.templateId){
          if (res.rows.length > 0) {
            this.inCustomList = res.rows;
            console.log(this.inCustomList,'我是全部客户数据')
            // this.inCustomList = this.inCustomList.concat(res.rows);
            // this.pageNum++
            this.loading = false;
            if (res.rows.length !== 15) {
              this.loading = false;
              this.finished = true;
            }
          } else {
            this.inCustomList = res.rows;
            this.loading = false;
            this.finished = true;
          }
          // }
        }
      });
      let Data = {
        formId: 1,
        templateId: 1,
        // userId: 1
      };
      getScreenList(Data).then(res => {
        if (res.code == 200) {
          this.screenData = res.rows;
          this.isCreat = this.screenData[6].checked;
          this.isUpdata = this.screenData[7].checked;
          this.isType = this.screenData[8].checked;
          this.isReturn = this.screenData[9].checked;
          this.isBranch = this.screenData[10].checked;
        }
      });
    },
    // 下拉刷新方法
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.pageNum = 0;
        this.inCustomList = [];
        this.getCustomInfo();
      }, 1000);
    },
    // 上拉加载方法
    onLoad() {
      this.pageNum++;
      this.getCustomInfo();
      // setTimeout(() => {
      //     Toast('加载中')
      //     this.pageNum++;
      //     this.getCustomInfo();
      //     this.loading = true
      // }, 500)
    },
    // 分配时间筛选数据
    sortDefault() {
      let Data = {
        templateId: this.templateId,
        formId: 1,
        userId: 1
      };
      sortDefaultList(Data).then(res => {
        if (res.code == 200) {
          let list = res.rows;
          for (var index = 0; index < list.length; index++) {
            const element = list[index];
            const option = JSON.parse(JSON.stringify(this.option));

            this.fieldDesc = element.fieldDesc;
            this.orderDesc = element.orderDesc;
            this.optionItem.text = this.fieldDesc + this.orderDesc;
            this.optionItem.value = this.value3++;
            this.optionItem.isAsc = element.orderType;
            this.optionItem.orderByColumn = element.fieldName;
            option.push(this.optionItem);
            this.option = option;
          }
        }
      });
    },
    toggleFieldDesc(value) {
      this.isAsc = this.option[value].isAsc;
      this.orderByColumn = this.option[value].orderByColumn;

      console.log(value, this.isAsc, this.orderByColumn, "---####");
      this.getCustomInfo();
    },
    // 新建
    changeBuild() {
      this.$router.push({
        path: "/build",
        query: { templateId: this.templateId, templateName: this.templateName }
      });
    },
    // 筛选
    customState(value) {
      console.log(value);
    },
    // 打开菜单栏触发事件
    handleOrtherItem() {
      this.PublishValue = true;
    },
    handleOrtherItems() {
      this.PublishValue = true;
    },
    // 自定义弹框--按钮
    handleCancel(data) {
      console.log(data);
      this.isCustom = false;
      // this.isCreate =false;
      this.PublishValue = true;
    },
    handleConfirm(data) {
      console.log(data.start_Time, this.inputData.end_Time, "====");

      if (data.start_Time == "" || data.end_Time == "") {
        this.isCustom = true;
        this.$toast({
          message: "请选择有效日期",
          position: "center"
        });
      } else {
        let start_Time = data.start_Time;
        let start = new Date(start_Time).getTime();
        let end_Time = data.end_Time;
        let end = new Date(end_Time).getTime();
        if (start > end) {
          this.$toast({
            message: "开始时间不能大于结束时间",
            position: "center"
          });
        } else {
          this.isCustom = false;
          console.log(this.timePopSelected, "-----");
          if (this.timePopSelected == "1") {
            this.sectionData[4].name = data.start_Time + "\n" + data.end_Time;
            this.lastFollowTimeStart = data.start_Time;
            this.lastFollowTimeEnd = data.end_Time;
          }
          if (this.timePopSelected == "2") {
            this.createTimeData[0].name =
              data.start_Time + "\n" + data.end_Time;
            this.createTimeStart = data.start_Time;
            this.createTimeEnd = data.end_Time;
          }
          if (this.timePopSelected == "3") {
            this.updateTimeData[0].name =
              data.start_Time + "\n" + data.end_Time;
            this.updateTimeStart = data.start_Time;
            this.updateTimeEnd = data.end_Time;
          }
          if (this.timePopSelected == "4") {
            this.distributeData[0].name =
              data.start_Time + "\n" + data.end_Time;
            this.allocateTimeStart = data.start_Time;
            this.allocateTimeEnd = data.end_Time;
          }
          if (this.timePopSelected == "5") {
            this.returnData[0].name = data.start_Time + "\n" + data.end_Time;
            this.sendBackPondStart = data.start_Time;
            this.sendBackPondEnd = data.end_Time;
          }
        }
      }
    },
    // 自定义--开始结束时间--弹框控制
    showDatePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      // this.timePopSelected = '1';
      this.showTime = true;
    },
    showDatePickers() {
      //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime = true;
    },
    // 最后跟进时间
    changeSection(ind) {
      this.RadioSelec = ind;
      if (ind >= 0 && ind <= 3) {
        this.lastFollowTimeType = ind + 1;
      }
      if (ind == "4") {
        this.isCustom = true;
        this.timePopSelected = "1";
        this.lastFollowTimeType = "";
      }
    },
    // 未联系时间
    contactSection(ind) {
      this.ContactSelec = ind;
      this.notContactTimeType = ind + 1;
    },
    // 归档状态
    fileSection(ind) {
      this.fileStatus = ind;
      this.filingType = ind;
    },
    // 创建人
    createrSection(ind) {
      this.createrStatus = ind;
      if (ind >= 0 && ind <= 1) {
        this.createUserType = ind + 1;
      }
    },
    // 负责人
    chargeSection(ind) {
      this.chargeStatus = ind;
      if (ind >= 0 && ind <= 1) {
        this.personInChargeType = ind + 1;
      }
    },
    // 弃用
    giveSection(ind) {
      this.giveStatus = ind;
      if (ind >= 0 && ind <= 1) {
        this.deprecatedUserType = ind + 1;
      }
    },
    // 客户地址
    addressSection(ind) {
      this.addressStatus = ind;
      this.showArea = true;
    },
    // 省级县三级联动
    onConfirm(values) {
      this.valueArea = values.map(item => item.name).join(",");
      this.areaCode = values.map(item => item.code).join(",");
      this.areaId = this.areaCode.substr(14, 6);
      this.showArea = false;
      this.addressData[0].name = this.valueArea;
      console.log(values, this.areaCode, this.areaId, "0011223344");
    },
    // 客户类型
    typeSection(ind) {
      this.typeStatus = ind;
      this.customerType = ind + 1;
    },
    // 创建时间
    createTimeSection(ind) {
      this.createTimeSelec = ind;
      this.isCustom = true;
      this.timePopSelected = "2";
      this.inputData.start_Time = "";
      this.inputData.end_Time = "";
    },
    // 更新时间
    updateTimeSection(ind) {
      this.updateTimeSelec = ind;
      this.isCustom = true;
      this.timePopSelected = "3";
      this.inputData.start_Time = "";
      this.inputData.end_Time = "";
    },
    // 分配时间
    distributeTimeSection(ind) {
      this.distributeTimeSelec = ind;
      this.isCustom = true;
      this.timePopSelected = "4";
      this.inputData.start_Time = "";
      this.inputData.end_Time = "";
    },
    // 公海退回时间
    returnTimeSection(ind) {
      this.returnTimeSelec = ind;
      this.isCustom = true;
      this.timePopSelected = "5";
      this.inputData.start_Time = "";
      this.inputData.end_Time = "";
    },
    // 设置筛选项
    changeScreen() {
      this.$router.push({ path: "/limitScreen" });
    },
    // 筛选重置
    changeSet() {
      if (this.RadioSelec == "4") {
        this.sectionData[4].name = "自定义时间";
        this.RadioSelec = null;
      }
      if (this.RadioSelec >= 0 && this.RadioSelec <= 3) {
        this.RadioSelec = null;
        this.inputData.start_Time = "";
        this.inputData.end_Time = "";
      }
      if (this.ContactSelec >= 0 && this.ContactSelec <= 3) {
        this.ContactSelec = null;
      }
      if (this.fileStatus >= 0 && this.fileStatus <= 1) {
        this.fileStatus = null;
      }
      if (this.createrStatus >= 0 && this.createrStatus <= 2) {
        this.createrStatus = null;
      }
      if (this.chargeStatus >= 0 && this.chargeStatus <= 2) {
        this.chargeStatus = null;
      }
      if (this.giveStatus >= 0 && this.giveStatus <= 2) {
        this.giveStatus = null;
      }
      if (this.addressStatus == "0") {
        this.addressStatus = null;
        this.addressData[0].name = "选择省市区";
      }
      if (this.typeStatus >= 0 && this.giveStatus <= 3) {
        this.typeStatus = null;
      }
      if (this.createTimeSelec == "0") {
        this.createTimeSelec = null;
        this.createTimeData[0].name = "自定义时间";
        this.inputData.start_Time = "";
        this.inputData.end_Time = "";
      }
      if (this.updateTimeSelec == "0") {
        this.updateTimeSelec = null;
        this.updateTimeData[0].name = "自定义时间";
        this.inputData.start_Time = "";
        this.inputData.end_Time = "";
      }
      if (this.distributeTimeSelec == "0") {
        this.distributeTimeSelec = null;
        this.distributeData[0].name = "自定义时间";
        this.inputData.start_Time = "";
        this.inputData.end_Time = "";
      }
      if (this.returnTimeSelec == "0") {
        this.returnTimeSelec = null;
        this.returnData[0].name = "自定义时间";
        this.inputData.start_Time = "";
        this.inputData.end_Time = "";
      }
    },
    // 筛选确认
    changeConfirm() {
      this.PublishValue = false;
      // this.$nextTick(function () {
      //   this.$refs.timeMenu.toggle();
      // })
      // this.$refs.timeMenu.close();
      // console.log(this.$refs.timeMenu.toggle(),'0099');
      this.getCustomInfo();
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
    // 默认排序
    handleSet() {
      this.$router.push({ path: "/defaultSort" });
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
    .all_custom_content {
      min-height: 3rem;
      position: relative;
      background-color: #fff;
      /deep/.van-ellipsis {
        margin-right: 0.02rem;
      }
      /deep/.van-tab {
        /*flex-basis: 16% !important;*/
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
        /*<!--width: 30.5px !important;-->*/
        /*<!--transform: translateX(30.5px) translateX(-50%) !important;-->*/
      }
      /deep/.van-dropdown-item__content {
        max-height: 100% !important;
      }
      /deep/.van-dropdown-menu__bar{
        box-shadow: none !important;
      }
      /*头部内容固定*/
      .all_custom_fixed {
        width: 100%;
        position: fixed;
        z-index: 999;
        margin-top: -0.05rem;
      }
      .selection {
        padding: 0 0.12rem;
        box-sizing: border-box;
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
          /*justify-content:flex-start ;*/
          div {
            width: 31% !important;
            margin-right: 0.1rem !important;
          }
          div:nth-child(3n) {
            margin-right: 0rem !important;
          }
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
            background: url("../../common/images/Select.png") no-repeat bottom
              right;
            background-size: 0.18rem 0.18rem;
            margin-bottom: 0.11rem;
            text-align: center;
            box-sizing: border-box;
          }
          .month-height-color,
          .van-field__control:disabled {
            outline: none;
            color: rgba(0, 106, 255, 1) !important;
          }
          .more_show {
            width: 31%;
            margin-top: 0.1rem;
            color: #666;
          }
        }
      }
      .dropdown-menu {
        position: relative;
        .dropdown {
          width: 100%;
        }
        .all_custom_set {
          padding: 0.1rem 0.16rem;
          img {
            width: 0.2rem;
            height: 0.2rem;
          }
          span {
            margin-left: 0.1rem;
            color: #999999;
          }
        }
      }
      .space {
        height: 0.12rem;
        background: #f8f9fa;
      }
      /*内容*/
      .all_custom_list {
        .custom_contents {
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
  .selecBox_fixed {
    background-color: #fff;
    z-index: 999;
    position: fixed;
    bottom: 0rem;
    margin-top: 0rem;
    margin-bottom: 0rem;
  }
  /* 搜索 */
  .search_popup {
    width: 100%;
    height: 7%;
    position: absolute;
    top: 1.1rem;
    .search-history {
      width: 100%;
      height: 7%;
      position: relative;
      background: #fff;
    }
    .search-history-bgc {
      width: 100%;
      background: #fff;
      text-align: center;
      border-top: 0.01rem solid #d7dde4;
    }
    .search-history-top {
      margin-top: 0.1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-history-input {
      width: 3rem;
      height: 0.3rem;
      line-height: 0.3rem;
      letter-spacing: 0.02rem;
      color: #464c5b;
      font-size: 0.14rem;
      background-color: #f5f7f9;
      text-align: left;
      padding-left: 0.12rem;
      box-sizing: border-box;
      border-radius: 0.04rem;
      display: inline-block;
      margin-right: 0.12rem;
    }
    .search-cancel {
      font-size: 0.16rem;
      font-weight: 400;
      color: #006aff;
      display: inline-block;
    }
    .search-history-center {
      text-align: left;
      margin-left: 0.12rem;
      margin-bottom: 0.12rem;
    }
    .search-history-center .search-history-text {
      text-align: left;
      font-size: 0.2rem;
      font-weight: 500;
    }
    .search-history-center img {
      width: 0.2rem;
      height: 0.2rem;
      vertical-align: bottom;
    }
  }
}
</style>
