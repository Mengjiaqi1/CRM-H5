<template>
  <div class="wrap">
    <myHeader>
      <div class="h_center">组织架构选择</div>
      <div class="h_right">更多</div>
    </myHeader>
    <main>
      <div class="company">
        <form action="/">
          <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
            @input="handleInput"
          />
        </form>
        <ul class="breadcrumb">
          <li class="cd-breadcrumb active"><span>全公司</span></li>
          <li class="cd-breadcrumb " @click="headquarters">
            <span>/</span><span>北京首邮实业发展总公司</span>
          </li>
          <li
            class="cd-breadcrumb"
            v-for="(each, ind) in parentData"
            :key="each.id"
            @click="DelparentName(ind, each.deptId)"
          >
            <span>/</span><span>{{ each.deptName }}</span>
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
          <div>{{ each.deptName }}</div>
          <div class="num">
            <span>{{ each.count ? each.count : "" }}</span
            ><img src="../common/images/rights.png" alt="" />
          </div>
        </li>
      </div>
      <div class="none"></div>
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
          <div>
            <input
              ref="checked"
              type="checkbox"
              name="userlist"
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
      </div>
    </main>
    <footer>
      <div class="footer_left">
        已选<span>{{ userLen }}</span
        >人
      </div>
      <div class="footer_right"><span>确定</span></div>
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
      finished: false
    };
  },
  created() {
    this.getSonDeptData();
    // this.getdepartment();
    this.getUserListData();
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
    },
    // 添加父部门名称
    AddParentName(parentId, deptId, deptName) {
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
    onSearch(val) {
      this.$toast(val);
    },
    onCancel() {
      this.$toast("取消");
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
    // 多选框选中为选中状态
    handlechecked(userId) {
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
  .company {
    /deep/form {
      border-bottom: 0.01rem solid #dbe4ef;
    }

    .breadcrumb {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      //   justify-content: space-between;
      padding: 0.05rem 0.12rem 0.05rem 0.12rem;
      box-sizing: border-box;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      border-bottom: 0.01rem solid #dbe4ef;
      .active {
        color: #ff9201;
      }
    }
  }
  main {
    flex: 1;
    overflow: scroll;
    margin-top: 0.45rem;
    margin-bottom: 0.7rem;
    .none {
      width: 100%;
      height: 0.18rem;
      background: rgba(248, 249, 250, 1);
    }
    .second_level {
      width: 100%;
      box-sizing: border-box;
      .second_li {
        height: 0.45rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-bottom: 0.01rem solid #dbe4ef;
        padding: 0 0.12rem;
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
      .three_li {
        width: 100%;
        height: 0.45rem;
        display: flex;
        align-items: center;
        padding: 0 0.12rem;
        box-sizing: border-box;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        border-bottom: 0.01rem solid #dbe4ef;
        .head {
          width: 0.18rem;
          height: 0.18rem;
          border-radius: 50%;
          padding: 0 0.1rem;
        }
      }
    }
  }
  footer {
    width: 100%;
    height: 0.5rem;
    padding: 0 0.12rem;
    background: lightgoldenrodyellow;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
