<template>
  <div class="wrap">
    <main>
      <div class="company">
        <form class="form" action="/">
          <van-search
            v-model="value"
            placeholder="请输入您想搜索的内容"
            @input="handleInput"
            @search="onSearch"
          />
          <template>
            <div @click="onSearch" class="search">
              <img src="../common/images/search2.png" alt="" />
            </div>
          </template>
        </form>
        <ul class="breadcrumb">
          <li class="cd-breadcrumb">
            <span class="Companywide">全公司</span>
          </li>
          <li class="cd-breadcrumb " @click="headquarters">
            <div class="triangle"></div>
            <span class="Companywide active" ref="headquarters"
              >北京首邮实业发展总公司</span
            >
          </li>
          <li
            class="cd-breadcrumb"
            v-for="(each, ind) in parentData"
            :key="each.id"
            @click="DelparentName(ind, each.deptId)"
          >
            <div class="triangle"></div>
            <span class="Companywide">{{ each.deptName }}</span>
          </li>
        </ul>
      </div>
      <div class="second_level">
        <li
          class="second_li"
          v-for="each in treeselectName"
          :key="each.deptId"
          @click="AddParentName(each.parentId, each.deptId, each.deptName)"
        >
          <div class="deptName">{{ each.deptName }}</div>
          <div class="num">
            <span>{{ each.count ? each.count : "" }}</span
            ><img src="../common/images/rights.png" alt="" />
          </div>
        </li>
      </div>
      <div class="none" v-if="flag"></div>
      <div class="Three_levels">
        <!-- <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <li
            class="three_li"
            v-for="val in userData"
            :key="val.userId"
            :title="val.nickName"
          >
            <div>
              <input
                ref="checked"
                type="checkbox"
                :id="val.userId"
                :checked="val.checkStatus"
                :value="val.nickName"
                class="inp"
                @click.stop="handlechecked(val.userId)"
              />
            </div>
            <img class="head" src="../common/images/2.jpg" alt="" />
            <span>{{ val.nickName }}</span>
          </li>
        </van-list> -->
        <li class="three_li" v-for="val in userData" :key="val.userId">
          <div class="headewrap">
            <img class="head" src="../common/images/2.jpg" alt="" />
            <span class="Name">{{ val.nickName }}</span>
          </div>
          <div>
            <input
              ref="checked"
              type="checkbox"
              name="userlist"
              :id="val.userId"
              :checked="val.checkStatus"
              :value="val.nickName"
              class="color-input-green"
              @click.stop="handlechecked(val.userId, val.nickName)"
            />
            <label for="color-input-green"></label>
          </div>
        </li>
      </div>
    </main>
    <footer>
      <div class="Selected">
        已选 :<span class="num">{{ userLen }}</span
        >人
      </div>
      <div class="footer_right"><span class="determine">确定</span></div>
    </footer>
  </div>
</template>
<script>
import { getUserList } from "../services/organization";
import { get } from "../services/http";
export default {
  data() {
    return {
      value: "", // 搜索框val
      treeselectName: [],
      parentData: [],
      parentId: 1,
      deptId: 1,
      userData: [],
      userId: "",
      userIdList: [],
      userLen: 0,
      nickName: "",
      loading: false,
      finished: false,
      flag: true
    };
  },
  created() {
    this.getSonDeptData();
    // this.getdepartment();
    this.getUserListData();
    this.onSearch();
  },
  methods: {
    clickNode(target) {
      console.log("you clicked " + target.id);
    },
    headquarters() {
      this.parentId = 1;
      this.deptId = 1;
      this.parentData = [];
      this.getSonDeptData();
      this.getUserListData();
      this.$refs.headquarters.classList.add("active");
    },
    // 添加父部门名称
    AddParentName(parentId, deptId, deptName) {
      this.$refs.headquarters.classList.remove("active");
      this.parentId = deptId;
      this.deptId = deptId;
      this.parentData.push({ deptId, deptName, parentId });
      this.getSonDeptData();
      this.getUserListData();
    },
    // 删除父部门名称
    DelparentName(indx, deptId) {
      this.parentId = deptId;
      this.deptId = deptId;
      this.parentData = this.parentData.slice(0, indx + 1);
      this.getSonDeptData();
      this.getUserListData();
    },
    // 根据父部门id查询子部门信息
    getSonDeptData() {
      get(`/system/dept/getSonDept/${this.parentId}`).then(res => {
        if (res.code == 200) {
          this.treeselectName = res.data;
          if (this.treeselectName.length == 0) {
            this.flag = false;
          } else if (this.treeselectName.length > 0) {
            this.flag = true;
          }
        }
      });
    },
    //根据部门id查询部门信息
    getdepartment() {
      get(`/system/dept/${this.deptId}`).then(res => {
        console.log(res);
      });
    },
    //根据部门id查询用户
    getUserListData() {
      getUserList(this.deptId).then(res => {
        if (res.code == 200) {
          this.userData = res.data;
        }
      });
    },

    // 搜索框查询
    handleInput(e) {
      this.nickName = e;
      getUserList(this.deptId, e, this.userId).then(res => {
        if (res.code == 200) {
          this.userData = res.data;
        }
      });
    },
    onSearch() {
      getUserList(this.deptId, this.value, this.userId).then(res => {
        if (res.code == 200) {
          this.userData = res.data;
        }
      });
    },
    // 多选框选中为选中状态
    handlechecked(userId, name) {
      console.log(name, "user");
      var str = this.$refs.checked;
      str.map(each => {
        if (each.id == userId) {
          if (each.checked == true) {
            this.userIdList.push(userId);
          } else if (each.checked == false) {
            this.userIdList = this.userIdList.filter(each => {
              return each != userId;
            });
          }
          this.userId = this.userIdList.length
            ? Array.from(this.userIdList).join(",")
            : null;
          this.userLen = this.userIdList.length;
          getUserList(this.deptId, null, this.userId).then(res => {
            if (res.code == 200) {
              this.userData = res.data;
            }
          });
        }
      });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {}, 1000);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  input[type="checkbox"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: 0.2em;
    width: 0.9em;
    height: 0.9em;
    margin-right: 0.02rem;
    border-radius: 0.02rem;
    background-color: #fff;
    text-indent: 0.15em;
    line-height: 0.75; /*行高不加单位，子元素将继承数字乘以自身字体尺寸而非父元素行高*/
    border: 0.01rem solid #d6d6d6;
  }
  input[type="checkbox"]:checked + label::before {
    content: "\2713";
    width: 0.14rem;
    height: 0.14rem;
    background-color: #17dd83;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    font-size: 0.12rem;
    font-weight: 400;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  input {
    position: absolute;
    opacity: 0;
    // clip: rect(0, 0, 0, 0);
  }

  input[type="checkbox"]:disabled + label::before {
    background-color: gray;
    box-shadow: none;
    color: #555;
  }
  .company {
    .form {
      width: 100%;
      justify-content: center;
      display: flex;
      align-items: center;
      .search {
        margin-right: 0.12rem;
        width: 0.68rem;
        height: 0.34rem;
        background: #006aff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.04rem;
        position: absolute;
        top: 0.11rem;
        right: 0;
      }
    }
    /deep/form {
      //   border-bottom: 0.01rem solid #dbe4ef;
    }
    /deep/.van-search {
      width: 100%;
    }
    /deep/.van-search__content {
      width: 100%;
      height: 0.34rem;
      background: #ffffff;
      border-radius: 0.04rem;
      border: 0.01rem solid #e1e1e1;
      position: relative;
    }
    /deep/.van-field__left-icon {
      display: none;
    }
    .breadcrumb {
      width: 100%;
      min-height: 0.4rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #f8f9fa;
      //   justify-content: space-between;
      padding: 0 0.12rem 0.05rem 0.12rem;
      box-sizing: border-box;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .cd-breadcrumb {
        margin: 0.1rem 0 0.1rem 0;
      }
      li:last-child span {
        background: #f2f7ff;
        border-radius: 0.04rem;
        border: 0.01rem solid #006aff;
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #006aff;
        padding: 0.03rem 0.08rem;
      }

      .Companywide {
        padding: 0.04rem 0.08rem;
        text-align: center;
        line-height: 0.24rem;
        background: #ffffff;
        border-radius: 0.04rem;
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
      }
      .active {
        background: #f2f7ff;
        border-radius: 0.04rem;
        border: 0.01rem solid #006aff;
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #006aff;
        padding: 0.03rem 0.08rem;
      }
      .triangle {
        width: 0;
        height: 0;
        border-top: 0.05rem solid transparent;
        border-left: 0.05rem solid #d5d5d5;
        border-bottom: 0.05rem solid transparent;
        display: inline-block;
        margin: 0 0.12rem;
      }
    }
  }
  main {
    flex: 1;
    overflow: scroll;
    // margin-bottom: 0.7rem;
    .none {
      width: 100%;
      height: 0.12rem;
      background: rgba(248, 249, 250, 1);
    }
    .second_level {
      width: 100%;
      padding: 0 0.12rem;
      box-sizing: border-box;
      .second_li {
        height: 0.54rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-bottom: 0.01rem solid #eceff2;
        .deptName {
          font-size: 0.16rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
        .num {
          display: flex;
          align-items: center;
          img {
            width: 0.12rem;
            height: 0.12rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
    .Three_levels {
      width: 100%;
      padding: 0 0.12rem;
      box-sizing: border-box;
      .three_li {
        width: 100%;
        height: 0.45rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-bottom: 0.01rem solid #dbe4ef;
        // .inp {
        //   width: 0.14rem;
        //   height: 0.14rem;
        //   border-radius: 0.02rem;
        //   border: 0.01rem solid #d6d6d6;
        // }
        // input[type="checkbox"]:checked::after {
        //   background-color: chartreuse;
        // }
        .headewrap {
          display: flex;
          align-items: center;
        }
        .head {
          width: 0.28rem;
          height: 0.28rem;
          border-radius: 50%;
          margin-right: 0.11rem;
        }
        .Name {
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 0.5rem;
    padding-left: 0.12rem;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    .Selected {
      height: 0.44rem;
      font-size: 0.14rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
      display: flex;
      align-items: center;

      .num {
        font-size: 0.16rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #006aff;
        margin: 0 0.05rem;
      }
    }
    .determine {
      display: inline-block;
      width: 1.48rem;
      height: 0.44rem;
      background: #006aff;
      font-size: 0.16rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
