<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">默认排序设置</div>
      <div class="h_right h_more" @click="handleConfirm">确定</div>
    </myHeader>
    <main>
       <div class="default_sort">
         <van-cell :title="this.fieldDescText" is-link @click="changeTime"/>
         <van-cell :title="this.getSort" is-link @click="changeSort"/>
       </div>
    </main>
    <!--默认排序设置-->
    <van-popup v-model="isTime" position="bottom" :style="{ height: '35%' }">
      <div class="type_text">
        <span class="type_cancel" @click="timeCancel">取消</span>
                <span class="type_confirm" @click="timeConfirm">确认</span>
      </div>
      <div class="default">
      <div   class="type"
             v-for="(each, index) in defaultData"
             :key="index"
             :class="timeCustom == index ? 'activeText' : 'eachText'"
             @click="timeChange(index,each.fieldDesc,each.fieldId)"
      >
        <span style="float: left">{{each.fieldDesc}}</span>
<!--        <span style="float: left">{{this.userField.fieldDesc}}</span>{{each.fieldDesc}}{{this.userField.fieldDesc}}-->
        <span v-if="checkedIds==each.fieldId" style="float: right;">
          <img src="../common/images/checked.png" alt="" style="width: 0.28rem;height: 0.28rem">
        </span>
      </div>
      </div>
    </van-popup>
    <!--降序-->
    <van-popup v-model="isSort" position="bottom" :style="{ height: '20%' }">
      <div class="type_text">
        <span class="type_cancel" @click="sortCancel">取消</span>
        <span class="type_confirm" @click="sortConfirm">确认</span>
      </div>
      <div   class="type"
             v-for="(each, index) in sortData"
             :key="index"
             :class="sortCustom == index ? 'activeText' : 'eachText'"
             @click="sortChange(index,each.name,each.id)"
      >
        <span style="float: left">{{each.name}}</span>
        <span v-if="checkedIds==each.id" style="float: right;">
          <img src="../common/images/checked.png" alt="" style="width: 0.28rem;height: 0.28rem">
        </span>
      </div>
    </van-popup>
  </div>
</template>
<script>
    import {getSortList, findSortFieldList} from "../services/AllCustom";

    export default {
      data() {
        return {
          // 分配时间
          isTime:false,
          timeCustom:0,
          checkedIds:null,
          defaultData:[],
          userField:{},
          fieldDescText:'',
          fieldId:1,
          getSort:'',
          // 排序
          Sort:'',
          isSort:false,
          sortCustom:0,
          sortText:'',
          sortData: [
              {
                name: "升序",
                id: "1"
              },
              {
                name: "降序",
                id: "2"
              },
          ],
        };
      },
      created() {
          this.sortDefault();
      },
      methods: {
        sortDefault() {
          // 全部客户参数
          // let  Data = {
          //     formId:1,
          //     templateId:1,
          //     userId:1,
          // }
          // 联系人参数
          // let  Data = {
          //     formId:2,
          //     templateId:0,
          // }
          // 全部机会参数
          let  Data = {
              formId:5,
              templateId:0,
          }
          findSortFieldList(Data).then(res =>{
            if(res.code == 200){
              this.defaultData = res.rows.allField;
              this.userField = res.rows.userField;
              this.fieldDescText=res.rows.userField.fieldDesc;
              this.fieldId=res.rows.userField.fieldId;
              this.getSort = res.rows.userField.orderDesc;
              console.log(res,'===')
            }
          })
        },
        // 时间
        changeTime(){
          this.isTime = true;
        },
        timeChange(ind,fieldDesc,fieldId) {
            this.timeCustom = ind;
            this.flag = !this.flag
            this.type = fieldDesc;
            if(this.checkedIds = fieldId){
                this.fieldDesc = fieldDesc;
                console.log(this.checkedIds,this.fieldDesc,'123');//选中图片id
            }
        },
        // 时间弹框
        timeCancel(){
          this.isTime = false;
        },
        timeConfirm(){
          this.fieldDescText = this.fieldDesc;
          console.log(this.fieldDesc,this.fieldDescText,'000---')
          this.isTime = false;
        },
        // 降序
        changeSort(){
            this.isSort = true;
        },
        sortChange(ind,name,id) {
          this.sortCustom = ind;
          this.flag = !this.flag
          this.type = name;
          if(this.checkedIds = id){
              this.sortText = name,
              console.log(this.checkedIds,'1234');//选中图片id
          }
          console.log(ind,name,id,'111');
        },
        // 降序弹框
        sortCancel(){
          this.isSort = false;
        },
        sortConfirm(){
            this.getSort = this.sortText;
            this.isSort = false;
        },
        // 确定提交按钮
        handleConfirm(){
            console.log(this.getSort,4444)
            if(this.getSort==='降序'){
                this.Sort = "DESC";
            } else if(this.getSort==='升序'){
                this.Sort = "ASC";
            }
            // let Data = {
            //     formId:1,
            //     templateId:1,
            //     userId:1,
            //     fieldDesc:this.fieldDescText,
            //     orderType:this.Sort,
            // }
            let Data = {
                formId:2,
                templateId:0,
                fieldDesc:this.fieldDescText,
                orderType:this.Sort,
            }
            getSortList(Data).then(res => {
                console.log(Data,'00001111');
                if (res.code == 200) {
                    this.$toast({
                        message: "保存成功",
                        position: "center"
                    });
                    this.$router.push({ path: "/AllCustom"});
                    this.$router.push({ path: "/contact"});
                }
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
    header {
      .h_right,
      .h_more {
        color: #006aff;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.16rem;
        margin-top: 0.03rem;
      }
    }
    main {
      flex: 1;
      overflow: scroll;
      margin-top: 44px;
      text-align: left;
      background: #f8f9fa;
      .default_sort{

      }
    }
    /*单元格样式*/
    .default{
      height: 1.76rem;
      overflow-y: scroll;
    }
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