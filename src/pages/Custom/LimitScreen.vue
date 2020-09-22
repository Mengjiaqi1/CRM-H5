<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">设置筛选项</div>
      <div class="h_right h_more" @click="handleConfirm">保存</div>
    </myHeader>
    <main>
      <div class="chart_type">
        <div class="custom_tit">已启用</div>
        <div class="more_card">
          <div class="fluid container">
            <div class="col-md-3">
              <draggable class="list-group" tag="ul">
                <li
                        class="list-group-item"
                        v-for="element in addCard" v-if="element.checked"
                        :key="element.sizerId"
                        handle=".handle"
                >
                  <p>
                    <img
                            :src="element.isDefault == '1' ? forms_reduce : forbid"
                            alt=""
                            class="reducer"
                            @click="removeAt(element.sizerId, element.sizerDesc,element.isDefault)"
                    />
                    <span class="text">{{ element.sizerDesc }} </span>
                  </p>
                </li>
              </draggable>
            </div>
          </div>
        </div>
      </div>
      <div class="chart_type">
        <div class="custom_tit">未启用</div>
        <div class="add_card">
          <div class="fluid container">
            <div class="col-md-3">
              <draggable
                      class="list-group"
                      tag="ul"
                      handle=".handle"
                      :name="'flip-list'"
              >
                <li
                        class="list-group-item"
                        v-for="element in addCard" v-if="!element.checked"
                        :key="element.sizerId"
                >
                  <p>
                    <img
                            :src="forms_add"
                            alt=""
                            class="reducer"
                            @click="removeAt(element.sizerId, element.sizerDesc,element.isDefault)"
                    />
                    <span class="text">{{ element.sizerDesc }} </span>
                  </p>
                </li>
              </draggable>
              <!-- <rawDisplayer class="col-3" :value="addCard" title="flip-list" /> -->
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
    import DragGable from "../../components/DragGable.vue";
    import { getScreenList, filedSizerList} from "../../services/AllCustom";
    import draggable from "vuedraggable";
    // import rawDisplayer from "rawDisplayer";
    const message = [
        "vue.draggable",
        "draggable",
        "component",
        "for",
        "vue.js 2.0",
        "based",
        "on",
        "Sortablejs"
    ];
    export default {
        name: "wrap",
        display: "Handle",
        data() {
            return {
                type: "a",
                dragging: false,
                chartFlag: false,
                flag: false,
                list: message.map((name, index) => {
                    return { name, order: index + 1, fixed: false };
                }),
                list2: "",
                editable: true,
                isDragging: false,
                isDragging1: false,
                delayedDragging: false,
                typeCode: 0,
                forms_add: require("../../assets/forms_add.png"),
                forms_reduce: require("../../assets/forms_reduce.png"),
                forbid:require("../../assets/forbid.png"),
                screenData:[],//全部数据
                addCard:[],// 未启用卡片
                sizerIds:'',
                count: 1,
                sizerIdState:'',
                sizerContent:[],
            };
        },
        mounted() {
          this.removeAt();
        },
        created() {
          this.screenList();
        },

        methods: {
            // 筛选项数据
            screenList(){
                // 客户参数（客户templateId根据具体情况）
                // let  Data = {
                //     formId:1,
                //     templateId:1,
                //     userId:1,
                // }
                // 联系人参数（联系人无templateId 所以值为0）
                let  Data = {
                    formId:2,
                    templateId:0,
                }
                getScreenList(Data).then(res => {
                    if (res.code == 200) {
                      this.screenData = res.rows;
                      // 循环数据
                      for (var index = 0; index < this.screenData.length; index++) {
                          const element = this.screenData[index];
                          let addCartContent = {
                              sizerId: element.sizerId,
                              sizerDesc: element.sizerDesc,
                              checked: element.checked,
                              isDefault: element.isDefault,
                              flag:true,
                          }
                          this.addCard.push(addCartContent);
                          console.log(addCartContent,addCartContent.sizerId,'00112233')

                      }
                    }
                });
            },
            // 删除 添加 卡片
            removeAt(sizerId, sizerDesc,isDefault) {
              if(isDefault=='1'){
                this.addCard &&
                this.addCard.map(each => {
                    if (each.sizerId == sizerId){
                        each.checked = !each.checked;
                          this.flag = !this.flag;
                          console.log(this.flag,each.sizerId,each.checked,'555666');
                    }
                });
              }
            },
            handleConfirm(){
                this.addCard &&
                this.addCard.map(each => {
                    if (each.checked){
                        if(each.isDefault=='1'){
                            this.sizerContent.push(each.sizerId);
                            this.sizerIds = this.sizerContent.toString()
                            console. log(this.sizerIds,'234');
                        }
                    }
                });
                // let Data = {
                //     templateId:1,
                //     userId:1,
                //     sizerIds:this.sizerIds,
                // }
                let Data = {
                    templateId:0,
                    sizerIds:this.sizerIds,
                }

                filedSizerList(Data).then(res => {
                    if (res.code == 200) {
                      // 根据后端定义的模板id 判断跳转位置
                      // this.$router.push({ path: "/AllCustom"});
                      this.$router.push({ path: "/Contact"});
                    }
                });
            },
        },
        computed: {

        },
        components: {
            DragGable,
            draggable
            // rawDisplayer
        },
        watch: {
            isDragging(newValue) {
                if (newValue) {
                    this.delayedDragging = true;
                    return;
                }
                this.$nextTick(() => {
                    this.delayedDragging = false;
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
    main {
      flex: 1;
      overflow: scroll;
      margin-top: 0.44rem;
      .custom_tit {
        width: 100%;
        height: 0.32rem;
        padding-left: 0.12rem;
        display: flex;
        align-items: center;
        background: rgba(248, 248, 248, 1);
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 0.17rem;
        box-sizing: border-box;
      }
      .chart_type {
        box-sizing: border-box;
        padding: 0 0.12rem;
        background: rgba(248, 249, 250, 1);
      }
    }
  }
  .list-group-item {
    width: 100%;
    height: 0.5rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.15rem;
  }
  .button {
    margin-top: 35px;
  }

  .text {
    margin-left: 0.1rem;
  }
  .reducer {
    width: 0.15rem;
    height: 0.15rem;
  }
  .sort {
    width: 0.24rem;
    height: 0.24rem;
  }
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  li.list-group-item {
    cursor: move;
    border-bottom: 0.01rem solid #eceff2;
    &:nth-last-child(1) {
      // background: red;
      border_bottom: none;
    }
  }
  .list-group-item i {
    cursor: pointer;
  }
  .handle {
    float: left;
    padding-top: 0.08rem;
    padding-bottom: 0.08rem;
  }
</style>