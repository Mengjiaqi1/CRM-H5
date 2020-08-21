<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">新建绿洲</div>
      <div class="h_right h_more">提交</div>
    </myHeader>
    <main>
      <div class="build_form">
        <van-form @submit="onSubmit">
          <van-field
            name="必填"
            label="必填"
            class="color_text"
          />
          <van-field
            v-model="username"
            name="客户名称"
            label="客户名称"
            required
            placeholder="请输入"
            :rules="[{ required: true, message: '请输入客户名称' }]"
          />
          <van-field
            v-model="type"
            name="客户类型"
            label="客户类型"
            required
            class="form_icon"
            placeholder="请选择"
            right-icon="arrow"
            @click="typeChange"
            :rules="[{ required: true, message: '必填' }]"
          />
          <van-field
                  name="选填"
                  label="选填"
                  class="color_text"
          />
          <van-field
                  v-model="username"
                  name="客户简称"
                  label="客户简称"
                  placeholder="请输入"
          />
          <van-field
                  readonly
                  clickable
                  :value="valueArea"
                  label="客户地址"
                  placeholder="请选择"
                  right-icon="arrow"
                  @click="showArea = true"
          />
          <van-field
                  label=""
                  placeholder="请输入详细地址"
                  right-icon="location-o"
          />
          <van-field
                  v-model="username"
                  name="客户官网"
                  label="客户官网"
                  placeholder="请输入"
          />
          <van-field
                  v-model="username"
                  name="客户简介"
                  label="客户简介"
                  placeholder="请输入"
          />
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </main>
    <!--客户类型-->
    <van-popup v-model="isType" position="bottom" :style="{ height: '35%' }">
      <div class="type_text">
        <span class="type_cancel" @click="typeCancel">取消</span>
<!--        <span class="type_confirm" @click="typeConfirm">确认</span>-->
      </div>
      <div   class="type"
             v-for="(each, index) in typeData"
             :key="index"
             :class="typeCustom == index ? 'activeText' : 'eachText'"
             @click="changeType(index,each.name,each.id)"
      >
        <span style="float: left">{{each.name}}</span>
        <span v-if="checkedIds==each.id" style="float: right;">
          <img src="../../common/images/checked.png" alt="" style="width: 0.28rem;height: 0.28rem">
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
  export default {
    components: {
        area,
    },
    data() {
      return {
        username: '',
        type: '',
        area:'',
        // 省市县三级联动
          value:'',
        valueArea: '',
        showArea: false,
        areaList: area, // 数据格式见 Area 组件文档
        // 客户类型
        isType:false,
        typeCustom:0,
        checkedIds:null,
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
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      // 省级县三级联动
      onConfirm(values) {
          console.log(values,'0011223344')
          this.valueArea = values.map((item) => item.name).join('/');
          this.showArea = false;
      },
      // 客户类型
      typeChange(){
        this.isType = true;
      },
      changeType(ind,name,id) {
          this.typeCustom = ind;
          this.flag = !this.flag
          this.type = name;
          if(this.checkedIds = id){
              console.log(this.checkedIds,'123');//选中图片id
          }
          console.log(ind,name,id,'111');
      },
      typeCancel(){
        this.isType = false;
      },
      typeConfirm(){
        if(this.quarter){
            this.timeData[8].time = this.quarter;
        }
        if(this.typeCustom=="0"){
            this.quarterId = '1' //新
        }
        if(this.typeCustom=="1"){
            this.quarterId = '2' //新
        }
        if(this.typeCustom=="2"){
            this.quarterId = '3' //新
        }
        if(this.typeCustom=="3"){
            this.quarterId = '4' //新
        }
        this.isType = false;
    },
    }
  };
</script>
<style lang="scss" scoped>
  .wrap{
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background: #F8F9FA !important;
    header{
      .h_right,.h_more {
        color: #006aff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.16rem;
        margin-top: 0.03rem;
      }
    }
    main{
      flex: 1;
      overflow: scroll;
      margin-top: 44px;
      text-align: left;
      background: #F8F9FA;
      .build_form{
        /deep/.van-field__control{
          text-align: right !important;
        }
        /deep/.van-field__error-message{
          text-align: right !important;
        }
      }
      .color_text{
        background-color: #ccc;
        height: 0.4rem;
      }
    }
    /*客户类型样式*/
    .type{
      height: 44px;
      line-height: 44px;
      text-align: left;
      padding: 0rem 0.2rem;
    }
    .type_text{
      height: 44px;
      line-height: 44px;
    }
    .type_cancel{
      float: left;
      margin-left: 0.2rem;
    }
    .type_confirm{
      float: right;
      color: #576b95;
      margin-right: 0.2rem;
    }
  }


</style>