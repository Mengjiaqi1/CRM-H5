<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">新建开票信息</div>
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
            <div v-for="(item, index) in MenuData" :key="index" class="relation">
              <van-field
                      v-model="username"
                      :label="'关联'+item.templateName+'客户'"
                      placeholder="请选择"
                      input-align="right"
                      right-icon="arrow"
                      class="relation_event"
                      readonly
              />
            </div>

            <div class="space"></div>
            <van-field
                    v-model="accountName"
                    label="银行账户户名"
                    placeholder="请输入"
                    input-align="right"
                    required
                    :rules="[{ required: true, message: '请输入银行账号户名' }]"
            />
            <van-field
                    v-model="bankDeposit"
                    label="开户行"
                    placeholder="请输入"
                    input-align="right"
                    required
                    :rules="[{ required: true, message: '请输入开户行' }]"
            />
            <van-field
                    v-model="bankAccount"
                    label="银行账号"
                    required
                    placeholder="请输入"
                    input-align="right"
                    :rules="[{ required: true, message: '请输入客户全称' }]"
            />
            <van-field
                    v-model="taxpayerNumber"
                    label="纳税人识别号"
                    required
                    placeholder="请输入"
                    input-align="right"
                    :rules="[{ required: true, message: '请输入客户全称' }]"
            />
<!--            <van-field-->
<!--                    v-model="type"-->
<!--                    label="客户类型"-->
<!--                    required-->
<!--                    class="form_icon"-->
<!--                    placeholder="请选择"-->
<!--                    right-icon="arrow"-->
<!--                    @click="typeChange"-->
<!--                    input-align="right"-->
<!--                    :rules="[{ required: true, message: '必填' }]"-->
<!--            />-->
            <van-field
                    readonly
                    clickable
                    :value="valueArea"
                    label="客户地址"
                    placeholder="请选择"
                    right-icon="arrow"
                    @click="showArea = true"
                    input-align="right"
                    required

            />
            <van-field
                    v-model="address"
                    rows="2"
                    autosize
                    maxlength="60个字符"
                    type="textarea"
                    show-word-limit
                    placeholder="请输入详细地址"
                    :rules="[{ required: true, message: '请输入地址' }]"
            >
              {{address}}
<!--              right-icon="icon-test"-->
<!--              <van-icon class="iconfont" class-prefix="icon" slot="right-icon" name="icon-test" @click="handlelocation"></van-icon>-->

            </van-field>
            <div class="space" style="position: relative">
              <svg class="icon" style="position: absolute;top:-0.8rem;right:0.3rem;width: 0.20rem;height: 0.20rem;" @click="handlelocation"
                   aria-hidden="true">
                <use xlink:href="#icon-icon-test"></use>
              </svg>
            </div>
            <van-field
                    v-model="telephone"
                    label="电话"
                    placeholder="请输入"
                    input-align="right"
                    required
                    :rules="[{ required: true, message: '请输入电话' }]"
            />
            <van-field label="备注" />
            <van-field
                    v-model="remark"
                    rows="2"
                    autosize
                    maxlength="2000个字符"
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
    <!--add类别弹框-->
    <van-popup
            v-model="isCategory"
            position="bottom"
            :style="{ height: '40%' }"
    >
      <div class="popul_bottom_text">
        <span class="popul_bottom_cancel" @click="categoryCancel">取消</span>
        <span class="popul_bottom_confirm" @click="categoryConfirm">确认</span>
      </div>
      <div
              class="popul_bottom_li"
              v-for="(each, index) in MenuData"
              :key="index"
              :class="timeCategory == index ? 'activeText' : 'eachText'"
              @click="changeCategoryadd(index, each.templateName, each.templateId)"
      >
        <span style="float: left">{{ each.templateName }}</span>
        <span v-if="checkedIds == each.templateId" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
      </div>
    </van-popup>
    <!--客户类型-->
    <van-popup v-model="isType" position="bottom" :style="{ height: '35%' }">
      <div class="type_text">
        <span class="type_cancel" @click="typeCancel">取消</span>
        <!--        <span class="type_confirm" @click="typeConfirm">确认</span>-->
      </div>
      <div
              class="type"
              v-for="(each, index) in typeData"
              :key="index"
              :class="typeCustom == index ? 'activeText' : 'eachText'"
              @click="changeType(index, each.name, each.id)"
      >
        <span style="float: left">{{ each.name }}</span>
        <span v-if="checkedIds == each.id" style="float: right;">
          <img
                  src="../../common/images/checked.png"
                  alt=""
                  style="width: 0.28rem;height: 0.28rem"
          />
        </span>
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
    import area from "../../common/js/area";
    import * as dd from "dingtalk-jsapi";
    import "@/assets/iconfont/iconfont.scss";
    import upLoaderImg from "../../common/js/upLoaderImg";
    import {
        findTemplateList,
        getNumber,
        addList
    } from "../../services/invoice";
    import {jsapi} from "../../services/login";
    export default {
        components: {
            area
        },
        data() {
            return {
                arr: [],
                username: "",
                // 模板数据
                MenuData: [],
                // 开票编号
                invoiceNo: "",
                message: "",
                // 数据初始化
                accountName:'',
                bankDeposit:'',
                bankAccount:'',
                taxpayerNumber:'',
                provinceId: "",
                cityId: "",
                areaId: "",
                address:'',
                telephone:'',
                remark: "",
                // add类别
                isCategory: false,
                timeCategory: 0,
                titleName: this.$route.query.templateName,
                templateIds: "1",
                type: "",
                area: "",
                // 省市县三级联动
                value: "",
                valueArea: "",
                areaCode: "",
                showArea: false,
                areaList: area, // 数据格式见 Area 组件文档
                // 上传附件
                // fileList:[],
                // 客户类型
                isType: false,
                typeCustom: 0,
                checkedIds: null,
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
            };
        },
        created() {
            this.buildInfo();
            this.getCode();
            this.getjsapi()
        },
        methods: {
            // 钉钉鉴权
            getjsapi() {
                jsapi().then((res) => {
                    dd.config({
                        //实现验证
                        agentId: res.agentId,
                        corpId: res.corpId,
                        timeStamp: res.timeStamp,
                        nonceStr: res.nonceStr,
                        signature: res.signature,
                        type: 0,
                        jsApiList: [
                            'runtime.info',
                            'device.geolocation.get',
                            'biz.map.locate',
                        ],
                    })
                    dd.error((err) => {
                        console.log(err, 'err')
                    })
                })
            },
            buildInfo() {
                // 模板数据
                let Data = {
                    formId: 1
                };
                findTemplateList(Data).then(res => {
                    if (res.code == 200) {
                        this.MenuData = res.rows;
                    }
                });
            },
            // 序列号
            getCode() {
                // 序列号
                getNumber().then(res => {
                    if (res.code == 200) {
                        this.invoiceNo = res.msg;
                    }
                });
            },
            // 省级县三级联动
            onConfirm(values) {
                this.valueArea = values.map(item => item.name).join("");
                this.areaCode = values.map(item => item.code).join(",");
                console.log(this.valueArea,'我是选中的省市')
                this.provinceId = values[0].name;
                this.cityId = values[1].name;
                this.areaId = values[2].name;
                this.showArea = false;
                console.log(values, this.areaCode,"0011223344");
            },
            // add类别
            changeCategory() {
                this.isCategory = true;
            },
            changeCategoryadd(ind, templateName, templateId) {
                this.timeCategory = ind;
                this.flag = !this.flag;
                this.title = templateName;
                this.templateId = templateId;
                if ((this.checkedIds = templateId)) {
                    console.log(this.checkedIds, "123"); //选中图片id
                }
            },
            categoryCancel() {
                this.isCategory = false;
            },
            categoryConfirm() {
                this.isCategory = false;
                if (this.title) {
                    this.titleName = this.title;
                    this.templateIds = this.templateId;
                    this.getCode();
                }
            },
            // 客户类型
            typeChange() {
                this.isType = true;
            },
            changeType(ind, name, id) {
                this.typeCustom = ind;
                this.flag = !this.flag;
                this.type = name;
                if ((this.checkedIds = id)) {
                    this.customerTypeId = id;
                    console.log(this.checkedIds, id, "123"); //选中图片id
                    // this.isType = false;
                }
            },
            typeCancel() {
                this.isType = false;
            },
            typeConfirm() {
                this.isType = false;
            },
            onSubmit() {
                //提交
                let Data = {
                    number: this.invoiceNo,
                    accountName:this.accountName,
                    bankDeposit:this.bankDeposit,
                    bankAccount:this.bankAccount,
                    taxpayerNumber:this.taxpayerNumber,
                    province: this.provinceId,
                    city: this.cityId,
                    area: this.areaId,
                    address: this.address,
                    telephone:this.telephone,
                    remark: this.remark,
                };
                addList(Data).then(res => {
                    console.log(Data, 2, "===");
                    if (res.code == 200) {
                        // this.MenuData = res.rows;
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
            handlelocation(){
                console.log(12349);
                let _this = this;
                // 地图定位
                dd.ready(function() {
                    dd.biz.map.locate({
                        // latitude: 39.903578, // 纬度，非必须
                        // longitude: 116.473565, // 经度，非必须
                        scope: 500, // 限制搜索POI的范围；设备位置为中心，scope为搜索半径
                        onSuccess: function (result) {
                            _this.address = result.title;
                            _this.valueArea = result.province+result.city+result.adName
                            console.log(result);
                            /* result 结构 */
                            {
                                // province: 'xxx', // POI所在省会，可能为空
                                // provinceCode: 'xxx', // POI所在省会编码，可能为空
                                // city: 'xxx', // POI所在城市，可能为空
                                // cityCode: 'xxx', // POI所在城市编码，可能为空
                                // adName: 'xxx', // POI所在区名称，可能为空
                                // adCode: 'xxx', // POI所在区编码，可能为空
                                // distance: 'xxx', // POI与设备位置的距离
                                // postCode: 'xxx', // POI的邮编，可能为空
                                // snippet: 'xxx', // POI的街道地址，可能为空
                                // title: 'xxx', // POI的名称
                                // latitude: 39.903578, // POI的纬度
                                // longitude: 116.473565, // POI的经度

                            }
                            // console.log(result)
                        },
                        onFail: function (err) {
                        }
                    });
                });
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