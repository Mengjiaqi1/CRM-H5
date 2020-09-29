<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">新建销售机会</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="add_custom">
        <div class="add_title">
          <div class="add_category_left fl">
            <p class="category_left_text">{{invoiceNo}}</p>
          </div>
        </div>

        <div class="build_form">
          <van-form @submit="onSubmit" @failed="onFail" validate-first>
            <van-field
                    v-model="deptName"
                    label="所属部门"
                    placeholder="请选择"
                    input-align="right"
                    right-icon="arrow"
                    @click="handleDept"
            />
            <van-field
                    v-model="customerName"
                    label="客户名称"
                    placeholder="请输入"
                    input-align="right"
                    right-icon="arrow"
                    @click="handleCustomName"
            />
<!--            required-->
<!--            :rules="[{ required: true, message: '此为必填项' }]"-->
            <van-field
                    v-model="bankDeposit"
                    label="负责人"
                    placeholder="请输入"
                    input-align="right"
                    right-icon="arrow"
                    @click="handlePerson"
            />
<!--            required-->
<!--            :rules="[{ required: true, message: '请选择负责人' }]"-->
            <div class="space"></div>

            <van-field
                    v-model="salesOpportunityName"
                    label="销售机会名称"
                    required
                    placeholder="请输入"
                    input-align="right"
                    :rules="[{ required: true, message: '请输入销售机会名称' }]"
            />
            <van-field
                    v-model="type"
                    label="销售机会来源"
                    required
                    class="form_icon"
                    placeholder="请选择"
                    right-icon="arrow"
                    @click="typeChange"
                    input-align="right"
                    :rules="[{ required: true, message: '必填' }]"
            />
            <van-field
                    v-if="type=='市场活动'"
                    v-model="marketName"
                    label="市场活动"
                    required
                    class="form_icon"
                    placeholder="请选择"
                    right-icon="arrow"
                    @click="changeCategory"
                    input-align="right"
                    :rules="[{ required: true, message: '必填' }]"
            />
            <van-field
                    v-model="majorName"
                    label="专业分类"
                    required
                    class="form_icon"
                    placeholder="请选择"
                    right-icon="arrow"
                    @click="majorChange"
                    input-align="right"
                    :rules="[{ required: true, message: '必填' }]"
            />
            <van-field label="销售机会描述" required>
            </van-field>
            <van-field
                    v-model="salesOpportunityDesc"
                    rows="2"
                    autosize
                    maxlength="1000个字符"
                    type="textarea"
                    show-word-limit
                    placeholder="请输入"
                    :rules="[{ required: true, message: '必填' }]"
            />
            <van-field
                    v-model="contactsName"
                    label="客户联系人"
                    class="form_icon"
                    right-icon="arrow"
                    input-align="right"
                    required
                    :rules="[{ required: true, message: '必填' }]"
                    @click="contactsChange"
            />
            <van-field
                    v-model="estimatedAmount"
                    label="预计金额"
                    required
                    placeholder="请输入"
                    input-align="right"
                    :rules="[{ required: true, message: '请输入预计金额' }]"
            />
            <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="estimatedEndTime"
                    label="预计结束日期"
                    input-align="right"
                    placeholder="请选择"
                    right-icon="arrow"
                    required
                    @click="showPicker = true"
                    :rules="[{ required: true, message: '必填' }]"
            />
            <van-popup v-model="showPicker" position="bottom">
              <van-datetime-picker
                      v-model="currentDate"
                      type="date"
                      :min-date="minDate"
                      :max-date="maxDate"
                      @confirm="onConfirm"
                      @cancel="showPicker = false"
              />
            </van-popup>
            <div class="space"></div>
            <van-field
                    v-model="stage"
                    label="销售阶段"
                    placeholder="请选择"
                    input-align="right"
                    right-icon="arrow"
                    required
                    :rules="[{ required: true, message: '必填' }]"
                    @click="stageChange"
            />
            <van-field label="重要程度" input-align="right">
              <template #input>
                <van-rate v-model="rate" color="#ccc" @change="onRate"/>
              </template>
            </van-field>
            <van-field label="备注" />
            <van-field
                    v-model="remark"
                    rows="2"
                    autosize
                    maxlength="1000个字符"
                    type="textarea"
                    show-word-limit
                    placeholder="请输入备注信息"
            />
            <van-field
                    label="附件"
                    input-align="right"
                    right-icon="back-top"
            />
            <div class="space"></div>
            <div class="add_botton">
              <van-button round block type="info" native-type="submit">
                提交
              </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </main>
    <!--所属部门-->
    <van-popup v-model="isDept" position="bottom" :style="{ height: '35%' }">
      <div class="type_text">
        <span class="type_cancel" @click="deptCancel">取消</span>
        <!--        <span class="type_confirm" @click="typeConfirm">确认</span>-->
      </div>
      <div
              class="type"
              v-for="(each, index) in deptData"
              :key="index"
              :class="deptSource == index ? 'activeText' : 'eachText'"
              @click="changeDept(index, each.userDeptName, each.userDeptId)"
      >
        <span style="float: left">{{ each.userDeptName }}</span>
        <span v-if="checkedIds == each.userDeptId" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
      </div>
    </van-popup>
    <!--销售机会来源-->
    <van-popup v-model="isType" position="bottom" :style="{ height: '35%' }">
      <div class="type_text">
        <span class="type_cancel" @click="typeCancel">取消</span>
        <!--        <span class="type_confirm" @click="typeConfirm">确认</span>-->
      </div>
      <div
              class="type"
              v-for="(each, index) in sourceData"
              :key="index"
              :class="typeSource == index ? 'activeText' : 'eachText'"
              @click="changeType(index, each.dictLabel, each.dictValue)"
      >
        <span style="float: left">{{ each.dictLabel }}</span>
        <span v-if="checkedIds == each.dictValue" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
      </div>
    </van-popup>
    <!--市场活动弹框-->
    <van-popup
            v-model="isCategory"
            position="bottom"
            :style="{ height: '40%' }"
    >
      <div class="popul_bottom_text">
        <span class="popul_bottom_cancel" @click="categoryCancel">取消</span>
<!--        <span class="popul_bottom_confirm" @click="categoryConfirm">确认</span>-->
      </div>
      <van-search v-model="keySearch" placeholder="搜索" @input="onMarket"/>
      <div
              class="popul_bottom_li"
              v-for="(each, index) in marketData"
              :key="index"
              :class="timeCategory == index ? 'activeText' : 'eachText'"
              @click="changeCategoryAdd(index,each.activityName, each.id)"
      >
        <span style="float: left">{{ each.activityName}}</span>
        <span v-if="checkedIds == each.id" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
      </div>
    </van-popup>
    <!--专业分类弹框-->
    <van-popup
            v-model="isMajor"
            position="bottom"
            :style="{ height: '40%' }"
    >
      <div class="popul_bottom_text">
        <span class="popul_bottom_cancel" @click="majorCancel">取消</span>
        <!--        <span class="popul_bottom_confirm" @click="majorConfirm">确认</span>-->
      </div>
      <van-search v-model="majorSearch" placeholder="搜索" @input="onSearch"/>
      <div
              class="popul_bottom_li"
              v-for="(each, index) in majorData"
              :key="index"
              :class="timeMajor == index ? 'activeText' : 'eachText'"
              @click="changeMajorAdd(index,each.dictLabel, each.dictValue)"
      >
        <span style="float: left">{{ each.dictLabel}}</span>
        <span v-if="checkedIds == each.dictValue" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
      </div>
    </van-popup>
    <!--销售阶段-->
    <van-popup v-model="isStage" position="bottom" :style="{ height: '35%' }">
      <div class="type_text">
        <span class="type_cancel" @click="stageCancel">取消</span>
        <!--        <span class="type_confirm" @click="typeConfirm">确认</span>-->
      </div>
      <div
              class="type"
              v-for="(each, index) in stageData"
              :key="index"
              :class="stageSource == index ? 'activeText' : 'eachText'"
              @click="changeStage(index, each.dictLabel, each.dictValue)"
      >
        <span style="float: left">{{ each.dictLabel }}</span>
        <span v-if="checkedIds == each.dictValue" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
      </div>
    </van-popup>
  </div>
</template>
<script>
    import {
        getNumber,
        getDeptData,
        getClassificationData,
        getMarketData,
        addList
    } from "../../services/opportunity";
    export default {
        components: {

        },
        data() {
            return {
                // 开票编号
                invoiceNo: "",
                // 弹框
                message: "",
                // 数据初始化
                number:'',
                deptId:null,
                customerName:'',
                person:[],
                salesOpportunityName:'',
                salesOpportunitySource:null,
                activityId:null,
                classifyId:null,
                salesOpportunityDesc:'',
                contactsId:[],
                estimatedAmount:'',
                estimatedEndTime:'',
                salesStage:null,
                importantLevel:0,
                remark: "",
                imageFileIdList:[],
                // 负责人
                bankDeposit:'',
                taxpayerNumber:'',
                market:'',
                marketId:null,
                // 上传附件
                // fileList:[],
                // 所属部门
                deptName:'',
                isDept: false,
                deptSource: 0,
                deptData:[],
                // 销售机会来源
                isType: false,
                typeSource: 0,
                checkedIds: null,
                sourceData:[],
                sourceId:undefined,
                // 市场活动
                isCategory: false,
                timeCategory: 0,
                marketName: '',
                marketId: undefined,
                activityName:'',
                type: "",
                keySearch:'',
                marketData:[],
                // 专业分类
                isMajor: false,
                timeMajor: 0,
                majorName: '',
                majorId: undefined,
                majorSearch:'',
                majorData:[],
                majorLabel:'',
                // 选择时间
                showPicker: false,
                minDate: new Date(1919, 12, 1),
                maxDate: new Date(2119, 12, 1),
                currentDate: new Date(),
                // 联系人
                contactsName:'',
                // 销售阶段
                stage:'',
                isStage: false,
                stageSource: 0,
                stageData:[],
                stageId:undefined,
                // 重要程度
                rate: 0,
                value:0,
            };
        },
        created() {
            // 序列号
            this.getCode();
            // 所属部门
            this.getDept();
            // 销售机会来源
            this.getOpportunity();
            // 市场活动
            this.getMarket();
            //专业分类
            this.getMajor();
            // 销售阶段
            this.getStage();
        },
        methods: {
            // 序列号
            getCode() {
                // 序列号
                getNumber().then(res => {
                    if (res.code == 200) {
                        this.invoiceNo = res.msg;
                    }
                });
            },
            // 所属部门
            getDept(){
                getDeptData().then(res => {
                    if (res.code == 200) {
                        this.deptData = res.data.sysUserManyDept;
                        this.deptName = res.data.deptName;
                        this.deptId = res.data.deptId;
                    }
                });
            },
            // 销售机会来源
            getOpportunity(){
                let data = {
                    dictType:'source_of_sales',
                }
                getClassificationData(data).then(res => {
                    if (res.code == 200) {
                        this.sourceData = res.data;
                    }
                });
            },
            // 市场活动
            getMarket(){
                getMarketData().then(res => {
                    if (res.code == 200) {
                        this.marketData = res.data;
                    }
                });
            },
            // 市场活动搜索
            onMarket(val){
                this.activityName = val;
                let data = {
                    activityName:this.activityName,
                }
                getMarketData(data).then(res => {
                    if (res.code == 200) {
                        this.marketData = res.data;
                    }
                });
            },
            // 专业分类
            getMajor(){
                let data = {
                    dictType:'major_classification',
                }
                getClassificationData(data).then(res => {
                    if (res.code == 200) {
                        this.majorData = res.data;
                    }
                });
            },
            // 专业分类搜索
            onSearch(val) {
                this.majorLabel = val;
                let data = {
                    dictType:'major_classification',
                    dictLabel:this.majorLabel,
                }
                getClassificationData(data).then(res => {
                    if (res.code == 200) {
                        this.majorData = res.data;
                    }
                });
            },
            // 销售阶段
            getStage(){
                let data = {
                    dictType:'sales_stage',
                }
                getClassificationData(data).then(res => {
                    if (res.code == 200) {
                        this.stageData = res.data;
                    }
                });
            },
            // 客户名称事件
            handleCustomName(){
                this.$router.push({
                    path: "/associated",
                    query: {}
                });
            },
            //负责人事件
            handlePerson(){
                this.$router.push({
                    path: "/organization",
                    query: {}
                });
            },
            // 所属部门事件和弹框
            handleDept() {
                this.isDept = true;
            },
            changeDept(ind,userDeptName,userDeptId) {
                this.typeSource = ind;
                this.flag = !this.flag;
                this.deptName = userDeptName;
                if ((this.checkedIds = userDeptId)) {
                    this.deptId = userDeptId;
                    console.log(this.checkedIds, userDeptId, "123"); //选中图片id
                    // this.isType = false;
                }
            },
            deptCancel() {
                this.isDept = false;
            },
            deptConfirm() {
                this.isDept = false;
            },
            // 销售机会来源事件和弹框
            typeChange() {
                this.isType = true;
            },
            changeType(ind, dictLabel, dictValue) {
                this.typeSource = ind;
                this.flag = !this.flag;
                this.type = dictLabel;
                if ((this.checkedIds = dictValue)) {
                    this.sourceId = dictValue;
                    console.log(this.checkedIds, dictValue,this.sourceId, "123"); //选中图片id
                    // this.isType = false;
                }
            },
            typeCancel() {
                this.isType = false;
            },
            typeConfirm() {
                this.isType = false;
            },
            // 市场活动事件和弹框
            changeCategory() {
                this.isCategory = true;
            },
            changeCategoryAdd(ind, activityName, id) {
                this.timeCategory = ind;
                this.flag = !this.flag;
                this.marketName = activityName;
                if ((this.checkedIds = id)) {
                    this.marketId = id;
                    console.log(this.checkedIds, "123"); //选中图片id
                }
            },
            categoryCancel() {
                this.isCategory = false;
            },
            categoryConfirm() {
                this.isCategory = false;
            },
            // 专业分类事件和弹框
            majorChange() {
                this.isMajor = true;
            },
            changeMajorAdd(ind, dictLabel, dictValue) {
                this.timeMajor = ind;
                this.flag = !this.flag;
                this.majorName = dictLabel;
                if ((this.checkedIds = dictValue)) {
                    this.majorId = dictValue;
                    console.log(this.checkedIds, "123"); //选中图片id
                }
            },
            majorCancel() {
                this.isMajor = false;
            },
            majorConfirm() {
                this.isMajor = false;
            },
            // 选择时间
            onConfirm(time) {
                let date = time;
                let m = date.getMonth() + 1;
                let d = date.getDate();
                if (m >= 1 && m <= 9) {
                    m = "0" + m;
                }
                if (d >= 0 && d <= 9) {
                    d = "0" + d;
                }
                this.estimatedEndTime = date.getFullYear() + "-" + m + "-" + d
                // this.estimatedEndTime = time;
                this.showPicker = false;
                console.log(this.estimatedEndTime,'1234')
            },
            // 联系人
            contactsChange(){
              // if(this.customerName===""){
              //     this.$toast({
              //         message: "请先选择客户",
              //         position: "center"
              //     });
              // }else{
              //     console.log(123)
              // }
            },
            // 销售阶段事件和弹框
            stageChange(){
                this.isStage = true;
            },
            changeStage(ind, dictLabel, dictValue) {
                this.stageSource = ind;
                this.flag = !this.flag;
                this.stage = dictLabel;
                if ((this.checkedIds = dictValue)) {
                    this.stageId = dictValue;
                    console.log(this.checkedIds, dictValue,this.stageId, "123"); //选中图片id
                }
            },
            stageCancel() {
                this.isStage = false;
            },
            stageConfirm() {
                this.isStage = false;
            },
            // 重要程度
            onRate(value){
               this.importantLevel = value;
            },
            onSubmit() {
                //提交
                let Data = {
                    number: this.invoiceNo,
                    deptId:this.deptId,
                    customerName: this.customerName,
                    person:this.person,
                    salesOpportunityName:this.salesOpportunityName,
                    salesOpportunitySource:this.sourceId,
                    activityId:this.marketId,
                    classifyId:this.majorId,
                    salesOpportunityDesc:this.salesOpportunityDesc,
                    // contactsId:[],
                    estimatedAmount:this.estimatedAmount,
                    estimatedEndTime:this.estimatedEndTime,
                    salesStage:this.stageId,
                    importantLevel:this.importantLevel,
                    remark: this.remark,
                    // imageFileIdList:
                };
                addList(Data).then(res => {
                    console.log(Data, 2, "===");
                    if (res.code == 200) {
                        this.$toast({
                            message: "保存中",
                            position: "center"
                        });
                        this.$router.push({ path: "/invoice" });
                    }
                });
            },
            onFail() {
                this.$toast({
                    message: "表单验证不通过",
                    position: "center"
                });
            },
        }
    };
</script>
<style lang="scss" scoped>
  .wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #f8f9fa !important;
    main {
      flex: 1;
      overflow: scroll;
      margin-top: 44px;
      text-align: left;
      background-color: #ffffff;
      .add_custom {
        position: relative;
        .build_form {
          margin-bottom: 0.7rem;
          /deep/.van-field__control {
            color: #999999;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            white-space: nowrap; /* 不换行 */
            overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
            text-overflow: ellipsis;
          }
          /deep/.van-field__error-message {
            text-align: right !important;
          }
          /deep/.van-field__label {
            color: #666666;
          }
          /deep/.van-field__word-num {
            font-size: 0.12rem;
            color: #006aff;
          }
          /deep/.van-uploader {
            margin: 0.22rem 0rem 0.24rem 0.18rem;
          }
          /deep/.van-uploader__preview-image {
            width: 0.64rem !important;
            height: 0.64rem !important;
          }
          /deep/.van-button {
            height: 0.4rem;
            border-radius: 0.04rem;
            font-size: 0.16rem;
          }
          .add_botton {
            padding: 0.16rem 0.12rem;
            position: fixed;
            bottom: 0rem;
            width: 3.5rem;
            background: #f8f9fa;
          }
          .relation{
            .relation_event{
              border-bottom: 0.01rem solid #ECEFF2;
              background: #F3F5F6;
            }
            /*.relation_event:last-child{*/
            /*  border-bottom: none;*/
            /*}*/
          }
        }
        .space {
          height: 0.12rem;
          background: #f8f9fa;
        }
        .fl {
          float: left;
        }
        .fr {
          float: right;
        }
        .add_title {
          height: 0.54rem;
          line-height: 0.54rem;
          background: #f8f9fa;
        }
        .add_category_left {
          float: left;
          padding-left: 0.12rem;
          .category_left_text {
            display: inline-block;
            font-size: 0.16rem;
            font-weight: 500;
            color: #333333;
            line-height: 0.22rem;
          }
          .add_category_triangle {
            margin-left: 0.09rem;
            width: 0;
            height: 0;
            border-top: 0.05rem solid transparent;
            border-left: 0.05rem solid #0067ff;
            border-bottom: 0.05rem solid transparent;
            display: inline-block;
            vertical-align: middle;
          }
        }
        .add_category_right {
          float: right;
          padding-right: 0.12rem;
          margin-top: 0.15rem;
          .category_time {
            height: 0.24rem;
            line-height: 0.24rem;
            background: #006aff;
            color: #fff;
            font-size: 0.12rem;
            padding: 0rem 0.09rem;
            border-radius: 0.04rem;
          }
          .add_time_triangle {
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
        .color_text {
          background-color: #ccc;
          height: 0.4rem;
        }
        /*上传样式*/
        .upload_img {
        }
      }
    }
    /*客户类型样式*/
    .type {
      height: 44px;
      line-height: 44px;
      text-align: left;
      padding: 0rem 0.2rem;
    }
    .type_text {
      height: 44px;
      line-height: 44px;
    }
    .type_cancel {
      float: left;
      margin-left: 0.2rem;
    }
    .type_confirm {
      float: right;
      color: #576b95;
      margin-right: 0.2rem;
    }
    /*add分类样式*/
    .popul_bottom_li {
      height: 0.44rem;
      line-height: 0.44rem;
      text-align: left;
      margin-left: 0.2rem;
    }
    .popul_bottom_text {
      height: 0.44rem;
      line-height: 0.44rem;
    }
    .popul_bottom_cancel {
      float: left;
      margin-left: 0.2rem;
    }
    .popul_bottom_confirm {
      float: right;
      color: #576b95;
      margin-right: 0.2rem;
    }
  }
</style>