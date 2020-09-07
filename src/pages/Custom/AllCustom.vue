<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">全部客户</div>
      <div class="h_right h_more" @click="changeBuild">新建</div>
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
                    title="筛选"
                    ref="item"
                    @open="handleOrtherItem"
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
                    <div class="selection">
                      <div class="selec_tit">
                        <span class="selec_tit_type">弃用</span>
                      </div>
                      <div class="selec_content">
                        <div
                          v-for="(each, index) in giveData"
                          :key="each.id"
                          :class="giveStatus == index ? 'active' : 'each'"
                          @click="giveSection(index)"
                        >
                          <span>{{ each.name }}</span>
                        </div>
                      </div>
                    </div>
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
                    <!--客户类型-->
                    <div class="selection">
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
                    <!--创建时间-->
                    <div class="selection">
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
                    <div class="selection">
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
                    <!--分配时间-->
                    <div class="selection">
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
                    <!--公海退回时间-->
                    <div class="selection" style="margin-bottom: 0.5rem">
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
                  <van-dropdown-item
                    v-model="value2"
                    :options="option2"
                    @open="handleOrtherItem"
                    :close-on-click-overlay="true"
                  />
                  <!--<van-dropdown-item class="bg-color"></van-dropdown-item>-->
                </van-dropdown-menu>
                <div class="search_icon fr" @click="handleSearch">
                  <input v-model="keywordInput" disabled />
                  <img src="../../common/images/search.png" alt="" />
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
        <div class="all_custom_list">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :immediate-check="false"
              :finished="finished"
              finished-text="没有更多数据"
              @load="onLoad"
              style="margin-top: 0.92rem"
            >
              <!--          <van-cell v-for="(item,index) in inCustomList" :key="index">-->
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
                    <p v-if="item.personInCharge">{{ item.personInCharge }}</p>
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
              <!--          </van-cell>-->
            </van-list>
          </van-pull-refresh>
        </div>
      </div>
    </main>
    <!--最后时间自定义-->
    <van-popup v-model="isCustom">
      <div class="custom_content">
        <p class="custom_content-text">开始时间</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termStart"
          @click="showDatePicker('termStart')"
          @blur="handleBlur"
          v-model="inputData.start_Time"
          readonly="readonly"
        />
        <p class="custom_content-text">结束日期</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termEnd"
          v-model="inputData.end_Time"
          @click="showDatePickers('termEnd')"
          @blur="handleBlur"
          readonly="readonly"
        />
        <div class="selecBox">
          <div
            style="width: 30%;margin-left: 10%;"
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
    <!--创建时间自定义-->
    <van-popup v-model="isCreate">
      <div class="custom_content">
        <p class="custom_content-text">开始时间</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termStart"
          @click="createTimePicker('termStart')"
          @blur="handleBlur"
          v-model="createTimeData.create_start_Time"
          readonly="readonly"
        />
        <p class="custom_content-text">结束日期</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termEnd"
          v-model="createTimeData.create_end_Time"
          @click="createTimePickers('termEnd')"
          @blur="handleBlur"
          readonly="readonly"
        />
        <div class="selecBox">
          <div
            style="width: 30%;margin-left: 10%;"
            :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
            @click="createCancelTime()"
          >
            取消
          </div>
          <div
            style="width: 30%;margin-right: 10%;"
            :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
            @click="createConfirmTime()"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <!--更新时间自定义-->
    <van-popup v-model="isUpdate">
      <div class="custom_content">
        <p class="custom_content-text">开始时间</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termStart"
          @click="updateTimePicker('termStart')"
          @blur="handleBlur"
          v-model="updateTimeData.update_start_Time"
          readonly="readonly"
        />
        <p class="custom_content-text">结束日期</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termEnd"
          v-model="updateTimeData.update_end_Time"
          @click="updateTimePickers('termEnd')"
          @blur="handleBlur"
          readonly="readonly"
        />
        <div class="selecBox">
          <div
            style="width: 30%;margin-left: 10%;"
            :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
            @click="updateCancelTime()"
          >
            取消
          </div>
          <div
            style="width: 30%;margin-right: 10%;"
            :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
            @click="updateConfirmTime()"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <!--分配时间自定义-->
    <van-popup v-model="isDistribute">
      <div class="custom_content">
        <p class="custom_content-text">开始时间</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termStart"
          @click="distributeTimePicker('termStart')"
          @blur="handleBlur"
          v-model="distributeTimeData.distribute_start_Time"
          readonly="readonly"
        />
        <p class="custom_content-text">结束日期</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termEnd"
          v-model="distributeTimeData.distribute_end_Time"
          @click="distributeTimePickers('termEnd')"
          @blur="handleBlur"
          readonly="readonly"
        />
        <div class="selecBox">
          <div
            style="width: 30%;margin-left: 10%;"
            :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
            @click="distributeCancelTime()"
          >
            取消
          </div>
          <div
            style="width: 30%;margin-right: 10%;"
            :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
            @click="distributeConfirmTime()"
          >
            确认
          </div>
        </div>
      </div>
    </van-popup>
    <!--分配时间自定义-->
    <van-popup v-model="isReturn">
      <div class="custom_content">
        <p class="custom_content-text">开始时间</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termStart"
          @click="returnTimePicker('termStart')"
          @blur="handleBlur"
          v-model="returnTimeData.return_start_Time"
          readonly="readonly"
        />
        <p class="custom_content-text">结束日期</p>
        <input
          class="height-amount-input"
          placeholder="请选择"
          ref="termEnd"
          v-model="returnTimeData.return_end_Time"
          @click="returnTimePickers('termEnd')"
          @blur="handleBlur"
          readonly="readonly"
        />
        <div class="selecBox">
          <div
            style="width: 30%;margin-left: 10%;"
            :class="[cancelShow == 2 ? 'selecActive' : 'confirm']"
            @click="returnCancelTime()"
          >
            取消
          </div>
          <div
            style="width: 30%;margin-right: 10%;"
            :class="[cancelShow == 1 ? 'selecActive' : 'confirm']"
            @click="returnConfirmTime()"
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
import { findTemplateList, getAllCustomData } from "../../services/AllCustom";
import area from "../../common/js/area";
export default {
  components: {
    area
  },
  data() {
    return {
      inCustomList: [],
      // 加载刷新
      refreshing: false,
      loading: false,
      finished: false,
      // 当前页数
      pageNum: 1,
      // 当前条数
      pageSize: 10,
      // 显示遮罩层
      PublishValue: false,
      // 下拉菜单默认值
      value1: 0,
      value2: 0,
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
      isPop: false, // 弹出层隐藏与显示
      showTime: false,
      minDate: new Date(2009, 12, 1),
      maxDate: new Date(2030, 11, 31),
      // 最后跟进时间自定义
      isCustom: false,
      inputData: {
        start_Time: "",
        end_Time: ""
      },
      cancelShow: 1,
      // 创建时间
      isCreate: false,
      createTimeData: {
        create_start_Time: "",
        create_end_Time: ""
      },
      // 更新时间
      isUpdate: false,
      updateTimeData: {
        update_start_Time: "",
        update_end_Time: ""
      },
      // 分配时间
      isDistribute: false,
      distributeTimeData: {
        distribute_start_Time: "",
        distribute_end_Time: ""
      },
      // 公海退回时间
      isReturn: false,
      returnTimeData: {
        return_start_Time: "",
        return_end_Time: ""
      },
      // 省市县三级联动
      area: "",
      value: "",
      valueArea: "",
      showArea: false,
      areaList: area, // 数据格式见 Area 组件文档
      // 全部客户菜单切换
      MenuData: [],
      templateId: 1,
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
      option2: [
        { text: "更新时间", value: 0 },
        { text: "更新时间（默认）", value: 1 },
        { text: "创建时间↑", value: 2 },
        { text: "创建时间↓", value: 3 },
        { text: "最后跟进时间↑", value: 4 },
        { text: "最后跟进时间↓", value: 5 },
        { text: "默认排序设置", value: 6 }
      ],
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
      giveData: [
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
  },
  methods: {
    meunTab(title, name) {
      this.templateId = title;
      console.log(title, name, this.templateId, "222");
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
          console.log(Data, this.MenuData, "8888");
        }
      });
    },
    // 初始化列表数据
    getCustomInfo() {
      let Data = {
        templateId: this.templateId
        // pageNum:this.pageNum,
        // pageSize:10,
      };
      getAllCustomData(Data)
        .then(res => {
          if (res.code == 200) {
            console.log(Data, "8888");
            this.total = res.total;
            this.inCustomList = res.rows;
            console.log(res.rows, "9900");
            // console.log(this.total,this.inCustomList,'001122')
            // // 加载状态结束
            // this.loading = false
            // this.refreshing = false
            // // 数据全部加载完成
            // // if (this.inCustomList.length >= 40) {
            //     this.finished = true
            // // }

            const rows = res.rows;
            console.log(rows.length, "996");
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
    },
    // 新建
    changeBuild() {
      this.$router.push({ path: "/build" });
    },
    // 筛选
    customState(value) {},
    // 打开菜单栏触发事件
    handleOrtherItem() {
      this.PublishValue = true;
    },
    // 公共日期弹框按钮-开始时间-结束时间
    cancelPicker() {
      // 选择器取消按钮点击事件
      this.isPopShow = false;
      this.PublishValue = true;
    },
    confirmPicker(value) {
      // 确定按钮，时间格式化并显示在页面上
      var date = value;
      var m = date.getMonth() + 1;
      var d = date.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timer = date.getFullYear() + "-" + m + "-" + d;
      if (this.inputData) {
        this.inputData.start_Time = timer;
      }
      if (this.createTimeData) {
        this.createTimeData.create_start_Time = timer; //新
      }
      if (this.updateTimeData) {
        this.updateTimeData.update_start_Time = timer; //新
      }
      if (this.distributeTimeData) {
        this.distributeTimeData.distribute_start_Time = timer; //新
      }
      if (this.returnTimeData) {
        this.returnTimeData.return_start_Time = timer; //新
      }
      this.isPopShow = false;
    },
    cancelPickers() {
      // 选择器取消按钮点击事件
      this.isPop = false;
      this.PublishValue = true;
    },
    confirmPickers(value) {
      // 确定按钮，时间格式化并显示在页面上
      var dates = value;
      var m = dates.getMonth() + 1;
      var d = dates.getDate();
      if (m >= 1 && m <= 9) {
        m = "0" + m;
      }
      if (d >= 0 && d <= 9) {
        d = "0" + d;
      }
      var timers = dates.getFullYear() + "-" + m + "-" + d;
      if (this.inputData) {
        this.inputData.end_Time = timers;
      }
      if (this.createTimeData) {
        this.createTimeData.create_end_Time = timers;
      }
      if (this.updateTimeData) {
        this.updateTimeData.update_end_Time = timers;
      }
      if (this.distributeTimeData) {
        this.distributeTimeData.distribute_end_Time = timers;
      }
      if (this.returnTimeData) {
        this.returnTimeData.return_end_Time = timers;
      }
      this.isPop = false;
      this.datePicker = "";
    },
    // 最后跟进时间
    changeSection(ind) {
      this.RadioSelec = ind;
      this.flag = !this.flag;
      if (ind == "4") {
        this.isCustom = true;
        this.inputData.start_Time = "";
        this.inputData.end_Time = "";
      }
    },
    // 最后跟进时间--自定义弹框控制
    showDatePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      this.showTime = true;
    },
    showDatePickers() {
      //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime = true;
    },
    // 最后跟进时间--自定义弹框--按钮
    changeCancelTime() {
      this.isCustom = false;
      this.PublishValue = true;
    },
    changeConfirmTime() {
      if (this.inputData.start_Time == "" || this.inputData.end_Time == "") {
        this.isCustom = true;
        this.$toast({
          message: "请选择有效日期",
          position: "center"
        });
      } else {
        let start_Time = this.inputData.start_Time;
        let start = new Date(start_Time).getTime();
        let end_Time = this.inputData.end_Time;
        let end = new Date(end_Time).getTime();
        if (start > end) {
          this.$toast({
            message: "开始时间不能大于结束时间",
            position: "center"
          });
        } else {
          this.isCustom = false;
          this.sectionData[4].name =
            this.inputData.start_Time + "\n" + this.inputData.end_Time;
        }
      }
    },
    // 未联系时间
    contactSection(ind) {
      this.ContactSelec = ind;
    },
    // 归档状态
    fileSection(ind) {
      this.fileStatus = ind;
    },
    // 创建人
    createrSection(ind) {
      this.createrStatus = ind;
    },
    // 负责人
    chargeSection(ind) {
      this.chargeStatus = ind;
    },
    // 弃用
    giveSection(ind) {
      this.giveStatus = ind;
    },
    // 客户地址
    addressSection(ind) {
      this.addressStatus = ind;
      this.showArea = true;
    },
    // 省级县三级联动
    onConfirm(values) {
      console.log(values, "0011223344");
      this.valueArea = values.map(item => item.name).join("/");
      this.showArea = false;
      this.addressData[0].name = this.valueArea;
    },
    // 客户类型
    typeSection(ind) {
      this.typeStatus = ind;
    },
    // 创建时间
    createTimeSection(ind) {
      this.createTimeSelec = ind;
      this.isCreate = true;
    },
    // 创建时间--自定义弹框控制
    createTimePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      this.showTime = true;
    },
    createTimePickers() {
      //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime = true;
    },
    // 创建时间--自定义弹框--按钮
    createCancelTime() {
      this.isCreate = false;
      this.PublishValue = true;
    },
    createConfirmTime() {
      if (
        this.createTimeData.create_start_Time == "" ||
        this.createTimeData.create_end_Time == ""
      ) {
        this.isCreate = true;
        this.$toast({
          message: "请选择有效日期",
          position: "center"
        });
      } else {
        let start_Time = this.createTimeData.create_start_Time;
        let start = new Date(start_Time).getTime();
        let end_Time = this.createTimeData.create_end_Time;
        let end = new Date(end_Time).getTime();
        if (start > end) {
          this.$toast({
            message: "开始时间不能大于结束时间",
            position: "center"
          });
        } else {
          this.isCreate = false;
          this.createTimeData[0].name =
            this.createTimeData.create_start_Time +
            "\n" +
            this.createTimeData.create_end_Time;
        }
      }
    },
    // 更新时间
    updateTimeSection(ind) {
      this.updateTimeSelec = ind;
      this.isUpdate = true;
    },
    // 更新时间--自定义弹框控制
    updateTimePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      this.showTime = true;
    },
    updateTimePickers() {
      //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime = true;
    },
    // 更新时间--自定义弹框--按钮
    updateCancelTime() {
      this.isUpdate = false;
      this.PublishValue = true;
    },
    updateConfirmTime() {
      if (
        this.updateTimeData.update_start_Time == "" ||
        this.updateTimeData.update_end_Time == ""
      ) {
        this.isUpdate = true;
        this.$toast({
          message: "请选择有效日期",
          position: "center"
        });
      } else {
        let start_Time = this.updateTimeData.update_start_Time;
        let start = new Date(start_Time).getTime();
        let end_Time = this.updateTimeData.update_end_Time;
        let end = new Date(end_Time).getTime();
        if (start > end) {
          this.$toast({
            message: "开始时间不能大于结束时间",
            position: "center"
          });
        } else {
          this.isUpdate = false;
          this.updateTimeData[0].name =
            this.updateTimeData.update_start_Time +
            "\n" +
            this.updateTimeData.update_end_Time;
        }
      }
    },
    // 分配时间
    distributeTimeSection(ind) {
      this.distributeTimeSelec = ind;
      this.isDistribute = true;
    },
    // 分配时间--自定义弹框控制
    distributeTimePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      this.showTime = true;
    },
    distributeTimePickers() {
      //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime = true;
    },
    // 分配时间--自定义弹框--按钮
    distributeCancelTime() {
      this.isDistribute = false;
      this.PublishValue = true;
    },
    distributeConfirmTime() {
      if (
        this.distributeTimeData.distribute_start_Time == "" ||
        this.distributeTimeData.distribute_end_Time == ""
      ) {
        this.isDistribute = true;
        this.$toast({
          message: "请选择有效日期",
          position: "center"
        });
      } else {
        let start_Time = this.distributeTimeData.distribute_start_Time;
        let start = new Date(start_Time).getTime();
        let end_Time = this.distributeTimeData.distribute_end_Time;
        let end = new Date(end_Time).getTime();
        if (start > end) {
          this.$toast({
            message: "开始时间不能大于结束时间",
            position: "center"
          });
        } else {
          this.isDistribute = false;
          this.distributeData[0].name =
            this.distributeTimeData.distribute_start_Time +
            "\n" +
            this.distributeTimeData.distribute_end_Time;
        }
      }
    },
    // 公海退回时间
    returnTimeSection(ind) {
      this.returnTimeSelec = ind;
      this.isReturn = true;
    },
    // 公海退回时间--自定义弹框控制
    returnTimePicker() {
      //弹出层并显示时间选择器
      this.isPopShow = true;
      this.showTime = true;
    },
    returnTimePickers() {
      //弹出层并显示时间选择器
      this.isPop = true;
      this.showTime = true;
    },
    // 公海退回时间--自定义弹框--按钮
    returnCancelTime() {
      this.isReturn = false;
      this.PublishValue = true;
    },
    returnConfirmTime() {
      if (
        this.returnTimeData.return_start_Time == "" ||
        this.returnTimeData.return_end_Time == ""
      ) {
        this.isReturn = true;
        this.$toast({
          message: "请选择有效日期",
          position: "center"
        });
      } else {
        let start_Time = this.returnTimeData.return_start_Time;
        let start = new Date(start_Time).getTime();
        let end_Time = this.returnTimeData.return_end_Time;
        let end = new Date(end_Time).getTime();
        if (start > end) {
          this.$toast({
            message: "开始时间不能大于结束时间",
            position: "center"
          });
        } else {
          this.isReturn = false;
          this.returnData[0].name =
            this.returnTimeData.return_start_Time +
            "\n" +
            this.returnTimeData.return_end_Time;
        }
      }
    },
    // 设置筛选项
    changeScreen() {
      this.$router.push({ path: "/customScreen" });
    },
    // 筛选重置
    changeSet() {},
    // 筛选确认
    changeConfirm() {
      this.PublishValue = false;
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
      /deep/.van-dropdown-item__content {
        max-height: 100% !important;
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
          width: 75%;
        }
        .search_icon {
          width: 20%;
          height: 0.28rem;
          line-height: 0.28rem;
          background: #ffffff;
          position: absolute;
          right: 0rem;
          top: 0.18rem;
          text-align: center;
          img {
            width: 0.2rem;
            height: 0.2rem;
            position: absolute;
            right: 0.2rem;
            top: 0rem;
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
  /*分配时间自定义*/
  .custom_content {
    width: 3rem;
    /*height: 230px;*/
    padding: 0.2rem 0.2rem;
    .custom_content-text {
      text-align: left;
      margin-bottom: 0.2rem;
    }
    input {
      width: 100%;
      height: 0.32rem;
      line-height: 0.32rem;
      border: 0.01rem solid #ccc;
      margin-bottom: 0.2rem;
    }
    input::-webkit-input-placeholder {
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
