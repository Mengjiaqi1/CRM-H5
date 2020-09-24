<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">新建{{ titleName }}</div>
      <div class="h_right"></div>
    </myHeader>
    <main>
      <div class="add_custom">
        <div class="add_title">
          <div class="add_category_left fl">
            <p class="category_left_text">{{ customerNo }}</p>
          </div>
          <div class="add_category_right fr" @click="changeCategory">
            <div class="category_time">
              {{ titleName }}
              <div class="add_time_triangle"></div>
            </div>
          </div>
        </div>

        <div class="build_form">
          <van-form @submit="onSubmit" @failed="onFail" validate-first>
            <van-field
              v-model="username"
              label="创建人"
              placeholder="王大陆"
              input-align="right"
              required
              :rules="[{ required: true, message: '请选择创建人' }]"
            />
            <van-field
              label="负责人"
              placeholder="王大陆"
              input-align="right"
            />
            <div class="space"></div>
            <van-field
              v-model="customerFullName"
              label="客户全称"
              required
              placeholder="请输入"
              input-align="right"
              :rules="[{ required: true, message: '请输入客户全称' }]"
            />
            <van-field
              v-model="type"
              label="客户类型"
              required
              class="form_icon"
              placeholder="请选择"
              right-icon="arrow"
              @click="typeChange"
              input-align="right"
              :rules="[{ required: true, message: '必填' }]"
            />
            <!--          <img src="../../common/images/arrow.png" alt="" style="width: 0.2rem;height: 0.2rem">-->
            <van-field
              v-model="customerShortName"
              label="客户简称"
              placeholder="请输入"
              input-align="right"
            />
            <van-field
              readonly
              clickable
              :value="valueArea"
              label="客户地址"
              placeholder="请选择"
              right-icon="arrow"
              @click="showArea = true"
              input-align="right"
            />
            <van-field
              v-model="customerAddress"
              rows="3"
              autosize
              maxlength="60个字符"
              type="textarea"
              show-word-limit
              placeholder="请输入详细地址"
            />
            <div class="space"></div>
            <van-field
              v-model="customerOfficialWebsite"
              label="客户官网"
              placeholder="请输入"
              input-align="right"
            />
            <van-field
              v-model="customerBrief"
              label="客户简介"
              placeholder="请输入"
              input-align="right"
            />
            <div class="space"></div>
            <van-field label="相关图片" />
            <van-uploader
              :after-read="afterRead"
              multiple
              v-model="imageFileIds"
            >
              <img
                src="../../common/images/uploads.png"
                alt=""
                style="width: 0.64rem;height: 0.64rem;"
              />
            </van-uploader>
            <div class="space"></div>
            <van-field label="备注" />
            <van-field
              v-model="remark"
              rows="3"
              autosize
              maxlength="2000个字符"
              type="textarea"
              show-word-limit
              placeholder="请输入备注信息"
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
import upLoaderImg from "../../common/js/upLoaderImg";
import {
  findTemplateList,
  getSeqList,
  addList
} from "../../services/AllCustom";
export default {
  components: {
    area
  },
  data() {
    return {
      arr: [],
      username: "",
      MenuData: [],
      message: "",
      // 数据初始化
      customerNo: "",
      customerFullName: "",
      customerTypeId: "1",
      createUserId: 3,
      customerShortName: "",
      provinceId: "",
      cityId: "",
      areaId: "",
      customerAddress: "",
      customerOfficialWebsite: "",
      customerBrief: "",
      remark: "",
      imageFileIds: [],
      imageFileIdss: "",
      uploadImg: {},
      // add类别
      isCategory: false,
      timeCategory: 0,
      titleName: this.$route.query.templateName,
      templateIds: this.$route.query.templateId,
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
      ]
    };
  },
  created() {
    this.buildInfo();
    this.getCode();
    console.log(this.$route.query, "123");
  },
  methods: {
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
      let Datas = {
        templateId:  this.templateIds,
      };
      getSeqList(Datas).then(res => {
        if (res.code == 200) {
          this.customerNo = res.data;
        }
      });
    },
    // 省级县三级联动
    onConfirm(values) {
      this.valueArea = values.map(item => item.name).join("/");
      this.areaCode = values.map(item => item.code).join(",");
      this.provinceId = this.areaCode.substr(0, 6);
      this.cityId = this.areaCode.substr(7, 6);
      this.areaId = this.areaCode.substr(14, 6);
      this.showArea = false;
      console.log(values, this.areaCode, "0011223344");
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
    // 图片上传
    async afterRead(file) {
      //文件读取完成后的回调函数
      //this.uploadImg = await upLoaderImg(file.file)//使用上传的方法。file.file
      // window.localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQ4YzNjNGQ1LTNiMDgtNDJjNS1iYTEyLTBlNjEwZmQ2Y2Y1NCJ9.YutjxQjQu_l1j2wvDRrCHjS-f8JD1rvDK3WSGc4Uh4k57CIzb85usazT5tVnLCN8V8vMqA8ooKMWJM6qlChZgQ')
    },
    async onSubmit() {
      //提交的数组
      //每次点击都清除 循环重新赋值
      this.arr = [];
      //判断this.imageFileIds 是否为空数组
      if (this.imageFileIds.length > 0) {
        await this.imageFileIds.forEach(async item => {
          let uploadImg = await upLoaderImg(item.file); //接口的返回结果
          this.arr.push(uploadImg.result.fileId);
          console.log(uploadImg.result.fileId, this.arr, "++++");
        });
      }
      // let result = this.arr.join(',')
      let Data = {
        customerNo: this.customerNo,
        templateId: this.templateIds,
        createUserId: 3,
        customerFullName: this.customerFullName,
        customerTypeId: this.customerTypeId,
        customerShortName: this.customerShortName,
        provinceId: this.provinceId,
        cityId: this.cityId,
        areaId: this.areaId,
        customerAddress: this.customerAddress,
        customerBrief: this.customerBrief,
        customerOfficialWebsite: this.customerOfficialWebsite,
        remark: this.remark,
        imageFileIdList: this.arr
      };

      await addList(Data).then(res => {
        console.log(Data, 2, "===");
        if (res.code == 200) {
          // this.MenuData = res.rows;
          // this.$toast({
          //     message: "保存中",
          //     position: "center"
          // });
          // this.$router.push({ path: "/allCustom" });
        }
      });
    },
    onFail() {
      this.$toast({
        message: "表单验证不通过",
        position: "center"
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
