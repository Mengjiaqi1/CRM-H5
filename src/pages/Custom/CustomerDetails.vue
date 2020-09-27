<template>
  <div class="wrap">
    <main>
      <div class="header">
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
          title="标题"
        />
        <div class="header_tit">
          <div class="h_left">
            <img
              src="../../common/images/d_right.png"
              class="goBack"
              @click="changeReturn"
              alt=""
            />
            <img
              src="../../common/images/d_close.png"
              class="close"
              @click="changeClose"
              alt=""
            />
          </div>
          <div class="h_center"></div>
          <div class="h_right">
            <span class="operation" @click="show = true">操作</span>
          </div>
        </div>
        <div class="header_content">
          <div class="h_c_left">
            <div class="company">{{ Fullname }}</div>
            <div class="personnel_wrap">
              <span class="personnel">负责人 ：</span>
              <div class=" leading">
                <span class="name">{{ textTree ? textTree : '-' }}</span>
                <span v-if="textList.length < 4 ? false : true">
                  等{{ textList.length }}人
                </span>
              </div>
            </div>
            <div class="personnel_wrap">
              <span class="personnel">最后跟进时间 ：</span>
              <span class="time">{{ followTime }}</span>
            </div>
          </div>
          <div class="h_c_right">
            <img src="../../common/images/Notfiled.png" alt="" />
          </div>
        </div>
        <div class="header_team">
          <div class="header_t_left" @click="goTeam">
            <div class="header_t_center">
              <div class="head">
                <img
                  :class="head == '' ? 'ImgHide' : ''"
                  :src="head + '_100x100.jpg'"
                  alt=""
                />
                <p :class="head == '' ? 'ImgShow' : 'ImgHide'">
                  {{
                    textOnly && textOnly.length >= 3
                      ? textOnly.substring(textOnly.length - 2, textOnly.length)
                      : textOnly
                  }}
                </p>
              </div>
              <p class="text">
                {{ textOnly }}
                <span class="wait" v-if="textList.length"
                  >等{{ textList.length }}人
                </span>
              </p>
            </div>
          </div>
          <div class="header_t_right">
            <div class="header_t_center">
              <img src="../../common/images/2.jpg" alt="" />
              <span class="text">派大星</span>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll">
        <div class="scroll_list">
          <div class="scroll_li">
            <span class="num">{{ count != '' ? count : '-' }}</span>
            <span class="scroll_text">跟进次数</span>
          </div>
          <div class="line"></div>
          <div class="scroll_li">
            <span class="num">989</span>
            <span class="scroll_text">跟进次数</span>
          </div>
          <div class="line"></div>
          <div class="scroll_li">
            <span class="num">989</span>
            <span class="scroll_text">跟进次数</span>
          </div>
          <div class="line"></div>
          <div class="scroll_li">
            <span class="num">989</span>
            <span class="scroll_text">跟进次数</span>
          </div>
          <div class="line"></div>
          <div class="scroll_li">
            <span class="num">989</span>
            <span class="scroll_text">跟进次数</span>
          </div>
          <div class="line"></div>
          <div class="scroll_li">
            <span class="num">989</span>
            <span class="scroll_text">跟进次数</span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="nav">
          <van-tabs style="height:100%,backgroung:red">
            <van-tab title="基本信息">
              <div class="Basic_infor">
                <div class="none"></div>
                <div class="form">
                  <van-field v-model="customerNo" label="编号" readonly />
                  <van-field
                    v-model="text"
                    label="负责人"
                    type="text"
                    readonly
                  />
                  <van-field
                    v-model="Fullname"
                    type="text"
                    label="客户全称"
                    autosize
                    readonly
                  />
                  <van-field
                    v-model="type"
                    type="text"
                    label="客户类型"
                    readonly
                  />
                  <van-field
                    v-model="abbreviation"
                    type="text"
                    label="客户简称"
                    readonly
                  />
                  <van-field
                    v-model="address"
                    type="textarea"
                    label="客户地址"
                    readonly
                    rows="1"
                    autosize
                  />
                  <van-field
                    v-model="GW"
                    type="text"
                    label="客户官网"
                    readonly
                  />
                  <van-field
                    v-model="synopsis"
                    type="text"
                    label="客户简介"
                    readonly
                  />
                </div>
                <div class="none"></div>
                <div class="files">
                  <div class="files_tit">
                    <div class="Pictures">相关图片</div>
                  </div>
                  <div class="files_imgList">
                    <div
                      class="files_img"
                      v-for="each in imageList"
                      :key="each.fileId"
                    >
                      <img :src="each.urlThumbnail" alt="" />
                    </div>
                    <div class="files_img">
                      <img src="../../common/images/2.jpg" alt="" />
                    </div>
                  </div>
                  <!-- <iframe :src="url" class="chenkExecl"></iframe> -->
                  <div class="none"></div>
                </div>
                <div class="form">
                  <div class="enclosure_wrap">
                    <div
                      class="enclosure"
                      v-for="(val, index) in accessoryList"
                      :key="index"
                    >
                      <span class="enclosure_tit">附件</span
                      ><span
                        class="enclosure_content"
                        @click="handleLoopUp(val.url)"
                        ref="preview"
                        >{{ val.fileOldName }}</span
                      >
                    </div>
                  </div>

                  <van-field
                    maxlength="20"
                    v-model="remarks"
                    label="备注"
                    type="text"
                    readonly
                  />
                  <van-field
                    v-model="Abandonment"
                    type="text"
                    label="弃用"
                    autosize
                    readonly
                  />
                </div>
              </div>
            </van-tab>
            <van-tab title="跟进记录">
              <div class="Follow_record ">
                <div
                  class="con_follow_li"
                  v-for="each in FollowrecordData"
                  :key="each.recordsId"
                >
                  <div class="none"></div>
                  <div class="con_follow_li_tit">
                    <div class="head">
                      <img
                        :class="each.createUserProfile == '' ? 'ImgHide' : ''"
                        :src="each.createUserProfile"
                        alt=""
                      />
                      <div
                        :class="
                          each.createUserProfile == '' ? 'ImgShow' : 'ImgHide'
                        "
                      >
                        {{
                          each.createUserName.length >= 3
                            ? each.createUserName.substring(
                                each.createUserName.length - 2,
                                each.createUserName.length
                              )
                            : each.createUserName
                        }}
                      </div>
                    </div>
                    <div class="msg">
                      <div class="msg_top">
                        <div class="msg_top_tit">
                          <span class="company">{{
                            each.customerFullName
                          }}</span>
                          <span class="type">{{
                            each.followWorkType == 1
                              ? '当面拜访'
                              : each.followWorkType == 2
                              ? '电话拜访'
                              : each.followWorkType == 3
                              ? '网络拜访'
                              : null
                          }}</span>
                        </div>
                        <div class="occupation">{{ each.createUserName }}</div>
                      </div>
                      <div class="msg_down">
                        <p class="msg_down_text text">
                          {{ each.followContent }}
                        </p>
                        <p class="msg_down_text AIter">
                          <span class="alter_name"
                            >{{ each.contactsName }}：</span
                          >
                          <span class="followWorkId"
                            >{{
                              each.followWorkId == 1
                                ? '销售机会'
                                : each.followWorkId == 2
                                ? '合同订单'
                                : each.followWorkId == 3
                                ? '报价单'
                                : null
                            }}<i class="followWorkNo">
                              ({{ each.followWorkNo }})</i
                            ></span
                          >
                        </p>
                      </div>
                    </div>
                    <div class="goTo">
                      <img src="../../common/images/rights.png" alt="" />
                    </div>
                  </div>
                  <div class="con_follow_li_time">
                    <div class="con_follow_li_time_min">
                      <p class="ymd">
                        <span>{{ each.visitTime }}</span>
                      </p>
                      <ul class="comments">
                        <li class="comment_li">
                          <img src="../../common/images/comment.png" alt="" />
                          <span>{{ each.commentNum }}</span>
                        </li>
                        <li class="line"></li>
                        <li class="comment_li">
                          <img src="../../common/images/zan.png" alt="" />
                          <span>{{ each.likeNum }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="工单记录"> 内容 1</van-tab>
            <van-tab title="回款管理"> 内容 2 </van-tab>
            <van-tab title="开票信息">
              <div class="Billing_infor">
                <div class="tit">发票信息</div>
                <div class="form">
                  <van-field
                    maxlength="50"
                    v-model="Invoice_type"
                    label="发票类型"
                    readonly
                  />
                  <van-field
                    maxlength="20"
                    v-model="Invoice_title"
                    label="发票抬头"
                    type="text"
                    readonly
                  />
                  <van-field
                    v-model="taxpayer"
                    type="text"
                    label="纳税人识别号"
                    autosize
                    readonly
                  />
                  <van-field
                    v-model="tel"
                    type="text"
                    label="注册电话"
                    readonly
                  />
                  <van-field
                    v-model="Invoice_address"
                    type="text"
                    label="开票地址"
                    readonly
                  />
                  <van-field
                    v-model="GW"
                    type="text"
                    label="客户官网"
                    readonly
                  />
                  <van-field
                    v-model="Bank"
                    type="text"
                    label="开户行"
                    readonly
                  />
                </div>
              </div>
            </van-tab>
            <van-tab title="上下级">
              <div class="superior">
                <div class="tit">
                  <span class="customer">上级客户</span>
                  <router-link tag="span" to="/associated">
                    <van-icon name="add" />
                  </router-link>
                </div>
                <div class="s_content">
                  <div class="content_li">
                    <div class="c_tit">
                      <span class="company">中国东方航空集团有限公司</span>
                      <span>
                        <van-icon name="delete" />
                      </span>
                    </div>
                    <div class="center">
                      <p class="c_li">
                        <span class="left">联系电话:</span
                        ><span class="right">12345678</span>
                      </p>
                      <p class="c_li">
                        <span class="left">负责人:</span
                        ><span class="right">12345678</span>
                      </p>
                      <p class="c_li">
                        <span class="left">最后跟进时间:</span
                        ><span class="right">12345678</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="superior">
                <div class="tit">
                  <span class="customer">下级客户</span>
                  <router-link tag="span" to="/associated">
                    <van-icon name="add" />
                  </router-link>
                </div>
                <div class="s_content">
                  <div class="content_li">
                    <div class="c_tit">
                      <span class="company">中国东方航空集团有限公司</span>
                      <span>
                        <van-icon name="delete" />
                      </span>
                    </div>
                    <div class="center">
                      <p class="c_li">
                        <span class="left">联系电话:</span
                        ><span class="right">12345678</span>
                      </p>
                      <p class="c_li">
                        <span class="left">负责人:</span
                        ><span class="right">12345678</span>
                      </p>
                      <p class="c_li">
                        <span class="left">最后跟进时间:</span
                        ><span class="right">12345678</span>
                      </p>
                    </div>
                  </div>
                  <div class="content_li">
                    <div class="empty"></div>
                    <div class="c_tit">
                      <span class="company">中国东方航空集团有限公司</span>
                      <span>
                        <van-icon name="delete" />
                      </span>
                    </div>
                    <div class="center">
                      <p class="c_li">
                        <span class="left">联系电话:</span
                        ><span class="right">12345678</span>
                      </p>
                      <p class="c_li">
                        <span class="left">负责人:</span
                        ><span class="right">12345678</span>
                      </p>
                      <p class="c_li">
                        <span class="left">最后跟进时间:</span
                        ><span class="right">12345678</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title="文件柜">
              <div class="File_cabinet">
                <div class="tit">
                  <span class="total">共计文件</span
                  ><span class="num">{{ total }}</span>
                </div>
                <div class="file_wrap">
                  <div class="file_nav">
                    <div class="filenav">
                      <van-tabs
                        type="card"
                        @click="onClickName"
                        v-model="activeType"
                      >
                        <van-tab title="客户" name="1">
                          <div class="file_content">
                            <van-swipe-cell
                              v-for="(each, index) in fileList"
                              :key="each.cabinetId"
                            >
                              <div class="file_content_li">
                                <div class="left" @click="changeImg(each.url)">
                                  <img
                                    src="../../common/images/excel.png"
                                    alt=""
                                  />
                                  <van-uploader v-model="uploader" />
                                </div>
                                <div class="center">
                                  <p class="Scheduling">
                                    {{ each.fileOldName }}
                                  </p>
                                  <div class="nameAndtime">
                                    <span class="surname">{{
                                      each.createUserName
                                    }}</span>
                                    <li class="time">
                                      <span>{{ each.createTime }}</span>
                                    </li>
                                  </div>
                                  <div class="size">
                                    {{ (each.fileSize / 1024).toFixed(1) }}KB
                                  </div>
                                </div>
                                <div
                                  class="right"
                                  @click="handlecheck(each.url, each.cabinetId)"
                                >
                                  <img
                                    :src="uploadType(each.url) ? check : xiazai"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <template #right>
                                <van-button
                                  type="danger"
                                  class="delete-button-none"
                                />
                                <van-button
                                  square
                                  text="删除"
                                  type="danger"
                                  class="delete-button"
                                  @click="handlerDel(each.cabinetId, index)"
                                />
                              </template>
                            </van-swipe-cell>
                          </div>
                        </van-tab>
                        <van-tab title="合同" name="2">
                          <div class="file_content">
                            <van-swipe-cell
                              v-for="(each, index) in fileList"
                              :key="each.cabinetId"
                            >
                              <div class="file_content_li">
                                <div class="left" @click="changeImg(each.url)">
                                  <img
                                    src="../../common/images/excel.png"
                                    alt=""
                                  />
                                  <van-uploader v-model="uploader" />
                                </div>
                                <div class="center">
                                  <p class="Scheduling">
                                    {{ each.fileOldName }}
                                  </p>
                                  <div class="nameAndtime">
                                    <span class="surname">{{
                                      each.createUserName
                                    }}</span>
                                    <li class="time">
                                      <span>{{ each.createTime }}</span>
                                    </li>
                                  </div>
                                  <div class="size">
                                    {{ (each.fileSize / 1024).toFixed(1) }}KB
                                  </div>
                                </div>
                                <div
                                  class="right"
                                  @click="handlecheck(each.url, each.cabinetId)"
                                >
                                  <img
                                    src="../../common/images/check.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <template #right>
                                <van-button
                                  type="danger"
                                  class="delete-button-none"
                                />
                                <van-button
                                  square
                                  text="删除"
                                  type="danger"
                                  class="delete-button"
                                  @click="handlerDel(each.cabinetId, index)"
                                />
                              </template>
                            </van-swipe-cell>
                          </div>
                        </van-tab>
                        <van-tab title="机会" name="3">
                          <div class="file_content">
                            <van-swipe-cell
                              v-for="(each, index) in fileList"
                              :key="each.cabinetId"
                            >
                              <div class="file_content_li">
                                <div class="left" @click="changeImg(each.url)">
                                  <img
                                    src="../../common/images/excel.png"
                                    alt=""
                                  />
                                  <van-uploader v-model="uploader" />
                                </div>
                                <div class="center">
                                  <p class="Scheduling">
                                    {{ each.fileOldName }}
                                  </p>
                                  <div class="nameAndtime">
                                    <span class="surname">{{
                                      each.createUserName
                                    }}</span>
                                    <li class="time">
                                      <span>{{ each.createTime }}</span>
                                    </li>
                                  </div>
                                  <div class="size">
                                    {{ (each.fileSize / 1024).toFixed(1) }}KB
                                  </div>
                                </div>
                                <div
                                  class="right"
                                  @click="handlecheck(each.url, each.cabinetId)"
                                >
                                  <img
                                    src="../../common/images/check.png"
                                    alt=""
                                  />
                                </div>
                              </div>
                              <template #right>
                                <van-button
                                  type="danger"
                                  class="delete-button-none"
                                />
                                <van-button
                                  square
                                  text="删除"
                                  type="danger"
                                  class="delete-button"
                                  @click="handlerDel(each.cabinetId, index)"
                                />
                              </template>
                            </van-swipe-cell>
                          </div>
                        </van-tab>
                      </van-tabs>
                      <div class="file_upload">
                        <van-uploader
                          class="uploadImg"
                          :after-read="onRead"
                          ref="upload"
                        >
                          <img src="../../common/images/upload.png" alt="" />
                        </van-uploader>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </main>

    <van-overlay :show="showImg" @click="showImg = false">
      <div class="wrapper" @click="showImg = false" @click.stop>
        <div class="block">
          <img :src="imgUrl" alt="" id="img" />
        </div>
      </div>
    </van-overlay>
    <CustomerNav />
  </div>
</template>
<script>
import {
  findBase,
  findRecordBaseList,
  findByCustomerNo,
  findRecordsCount,
  remove,
  add,
} from '../../services/CustomerDetails'

import { findChargeList } from '../../services/organization'
import CustomerNav from '@/components/CustomerNav'
import upLoaderImg from '../../common/js/upLoaderImg'

export default {
  data() {
    return {
      // 头部信息
      textOnly: null, //一个负责人
      textTree: null, // 三个负责人
      textList: [], // 负责人list
      textLen: null, // 负责人数
      head: '', //头像
      followTime: null, // 跟进时间
      reg: /\.(png|jpg|gif|jpeg|webp)$/,
      check: require('../../common/images/check.png'),
      xiazai: require('../../common/images/xiazai.png'),
      show: false,
      showImg: false,
      total: 0, // 文件总数
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      customerNo: '', // 编号
      businessNo: '', //业务编号
      text: '', // 负责人
      Fullname: '', // 客户全称
      type: '', // 客户类型
      address: '', // 客户地址
      GW: '', // 客户官网
      abbreviation: '', // 客户简称
      enclosure: '', // 附件
      synopsis: '', // 简介
      remarks: '', //备注
      Abandonment: '', // 弃用
      imageList: '', // 图片列表
      accessoryList: '', // 附件信息
      Urlshumbnail: '', // 图片
      Invoice_type: '', // 发票类型
      Invoice_title: '', // 发票抬头
      taxpayer: '', // 纳税人识别号
      Invoice_address: '', // 发票地址
      tel: '', //注册电话
      Bank: '', //开户行
      customerId: '',
      Fileshow: false,
      index: 0,
      FollowrecordData: '', // 跟进记录数据
      url: '',
      fileList: [],
      activeType: '1', // 文件柜类型1客户2合同3机会
      count: '',
      uploader: [], // 点击图片放大
      imgUrl: '',
      upload: '',
    }
  },
  watch: {},
  created() {
    this.customerId = this.$store.state.customerId
    this.followTime = this.$store.state.followTime
    this.tel = '王大陆'
    this.getfindBase()
    this.getfindRecordBaseList()
    this.getfindRecordsCount()
  },
  methods: {
    changeReturn() {
      this.$router.push({ path: '/allcustom' })
    },
    goTeam() {
      this.$router.push({ path: '/team', query: { id: this.customerNo } })
    },
    // 查询负责人信息
    getfindChargeList() {
      findChargeList(this.customerNo, '1').then((res) => {
        if (res.code == 200) {
          this.textList = res.data.principalList
          this.textOnly = this.textList[0].userName
          this.head = this.textList[0].userProfile
          this.textTree = `${this.textList[0].userName}、
          ${this.textList[1].userName}、
          ${this.textList[2].userName}`
        }
      })
    },
    //正则判断上传文件类型
    uploadType(url) {
      return /(png|jpg|gif|jpeg|webp)$/.test(
        url.substring(url.lastIndexOf('.') + 1, url.length)
      )
    },
    // 文件柜
    changeImg(url) {
      this.uploader.push({ url: url })
    },
    // 文件柜查看文件
    handlecheck(url) {
      if (this.uploadType(url)) {
        this.showImg = true
        this.imgUrl = url
      } else {
        this.showImg = false
        this.$router.push({ path: '/xls', query: { url } })
      }
    },
    // 文件柜上传文件
    async onRead(file) {
      await upLoaderImg(file.file).then((res) => {
        this.fileId = res.result.fileId
      })
      await this.getAdd()
    },
    // 文件柜添加文件
    getAdd() {
      add(this.customerNo, this.activeType, this.customerNo, this.fileId).then(
        (res) => {
          if (res.code == 200) {
            console.log(res)
            this.getfindByCustomerNo()
          }
        }
      )
    },
    // 文件柜删除文件
    handlerDel(id, ind) {
      this.fileList.splice(ind, 1)
      remove(id).then((res) => {
        if (res.code == 200) {
          console.log(res)
          this.$toast({
            message: '删除成功',
            position: 'center',
          })
        }
      })
    },
    onClickName(name) {
      this.activeType = name
      this.getfindByCustomerNo()
    },

    handleOk(convertedData) {
      console.log(convertedData)
    },
    //跟进次数
    getfindRecordsCount() {
      findRecordsCount(this.customerId).then((res) => {
        if (res.code == 200) {
          this.count = res.data
        }
      })
    },
    // 基本信息查看附件
    handleLoopUp(url) {
      this.$router.push({ path: 'xls', query: { url: url } })
    },
    onChange(index) {
      this.index = index
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      this.$Toast(item.name)
    },
    changeClose() {
      location.replace('/')
    },

    // 基本信息
    getfindBase() {
      findBase(this.customerId).then((res) => {
        if (res.code == 200) {
          let success = res.data
          this.customerNo = success.customerNo
          this.$store.commit('set_customerNo', success.customerNo)
          this.businessNo = success.businessNo
          this.text = success.personInCharge
          this.type =
            success.customerTypeId == 1
              ? '局内客户'
              : success.customerTypeId == 2
              ? '外省客户'
              : success.customerTypeId == 3
              ? '行业客户'
              : success.customerTypeId == 4
              ? '纯社会客户'
              : null
          this.address = success.customerAddress
          this.Fullname = success.customerFullName
          this.enclosure = success.customerOfficialWebsite
          this.remarks = success.remark
          this.imageList = success.imageList
          this.accessoryList = success.accessoryList
          this.Abandonment = 'qingxuanze'
          this.accessoryList.map((each) => {
            this.enclosure = each.fileOldName
            // this.url = each.url;
          })
          this.getfindByCustomerNo()
          this.getfindChargeList()
        }
      })
    },
    // 跟进记录
    getfindRecordBaseList() {
      findRecordBaseList(this.customerId, 0).then((res) => {
        if (res.code == 200) {
          this.FollowrecordData = res.rows
        }
      })
    },
    // 文件柜
    getfindByCustomerNo() {
      findByCustomerNo(this.customerNo, this.activeType, 0, 10).then((res) => {
        if (res.code == 200) {
          this.fileList = res.rows
          this.total = res.rows.length
        }
      })
    },
  },

  components: { CustomerNav },
}
</script>
<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

// 弹框样式
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.block {
  width: 100%;
  height: 50%;
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
  }
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  main {
    // flex: 1;
    // overflow: scroll;
    margin-bottom: 0.6rem;
  }

  .chenkExecl {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  .header {
    width: 100%;
    height: 2rem;
    box-sizing: border-box;
    background: url('../../common/images/BG.png') no-repeat center center;
    background-size: 100%;
    position: relative;
    /deep/.van-popup--bottom.van-popup--round {
      border-radius: 0 0;
    }
    .header_tit {
      width: 100%;
      height: 0.45rem;
      padding: 0 0.15rem;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .h_left {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        .goBack {
          width: 0.25rem;
          height: 0.25rem;
          margin-right: 0.1rem;
        }
        .close {
          width: 0.25rem;
          height: 0.25rem;
        }
      }
      .h_center {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.16rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 0.22rem;
      }
      .h_right {
        flex: 1;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        span {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
        }
      }
    }
    .header_content {
      width: 100%;
      height: 1.12rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.12rem;
      box-sizing: border-box;
      .h_c_left {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .company {
          width: 1.6rem;
          display: flex;
          font-size: 0.16rem;
          font-weight: 600;
          color: #ffffff;
          line-height: 0.22rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .personnel_wrap {
          display: flex;
          align-items: center;
          margin-top: 0.07rem;
          .leading {
            display: flex;
            align-items: center;
            font-size: 0.14rem;
            font-weight: 400;
            color: #ffffff;
            line-height: 0.2rem;
          }
          .personnel {
            font-size: 0.14rem;
            font-weight: 400;
            color: #ffffff;
            line-height: 0.2rem;
            margin-right: 0.05rem;
          }
          .names {
            font-size: 0.14rem;
            font-weight: 400;
            color: #ffffff;
            line-height: 0.2rem;
          }
          .time {
            width: 0.6rem;
            height: 0.18rem;
            background: #ffb000;
            border-radius: 0.02rem;
            color: #fff;
            font-size: 0.12rem;
            margin-left: 0.1rem;
            display: inline-block;
            line-height: 0.18rem;
          }
        }
      }
      .h_c_right {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .header_team {
      width: 100%;
      height: 0.44rem;
      display: flex;
      justify-content: space-between;
      position: absolute;
      left: 0;
      bottom: 0;
      .header_t_center {
        height: 100%;
        display: flex;
        align-items: center;
        .text {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 0.17rem;
          text-align: center;
          margin-left: 0.2rem;
          .wait {
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
          }
        }
        img {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
        }
      }
      .header_t_left {
        flex: 1;
        height: 100%;
        background: rgba(0, 0, 0, 0.06);
        display: flex;
        justify-content: center;
        align-items: center;
        .head img {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
        }
        .ImgHide {
          display: none;
        }
        .ImgShow {
          width: 0.24rem;
          height: 0.24rem;
          border-radius: 50%;
          //   margin-right: 0.11rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #006aff;
          color: #fff;
          font-size: 0.1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
      }
      .header_t_right {
        flex: 1;
        height: 100%;
        background: rgba(0, 0, 0, 0.06);
        margin-left: 0.01rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .scroll {
    width: 100%;
    height: 0.98rem;
    display: flex;
    align-items: center;
    overflow-x: scroll;
    background: #f8f9fa;
    &::-webkit-scrollbar {
      display: none;
    }
    .scroll_list {
      width: 200%;
      height: 0.74rem;
      display: flex;
      align-items: center;
      background: #fff;
      .line {
        width: 0.01rem;
        height: 0.3rem;
        background: #e8eaed;
      }
      .scroll_li {
        width: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        :last-child {
          border-right: none;
        }
        .num {
          font-size: 0.18rem;
          font-weight: 400;
          color: #333333;
          line-height: 0.25rem;
        }
        .scroll_text {
          font-size: 0.12rem;
          font-weight: 400;
          color: #999999;
          line-height: 0.17rem;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    margin-bottom: 0.5rem;
    .nav {
      width: 100%;
      height: 100%;
      background: #f8f9fa !important;
      .none {
        width: 100%;
        height: 0.1rem;
        background: #f8f9fa;
        /deep/.van-tabs__content {
          height: 100%;
        }
      }

      /deep/.van-tabs__wrap--scrollable {
        background: #fff;
        padding-left: 0.12rem;
        padding-right: 0.12rem;
      }
      /deep/.van-tabs__line {
        width: 0.32rem !important;
      }
      /deep/.van-tab {
        margin-right: 0.45rem;
        padding: 0 0;
      }
      /deep/.van-tab--active {
        .van-tab__text {
          color: #006aff;
        }
      }
      /deep/.van-tabs__line {
        background-color: #006aff;
      }
    }
    .form {
      background: #fff;
      /deep/.van-cell {
        min-height: 0.44rem;
        display: flex;

        span {
          display: inline-block;
          margin-top: 0.12rem;
          height: 0.2rem;
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
        }
      }
      /deep/ .van-cell__value {
        margin-top: 0.12rem;
      }
      /deep/ .van-field__label {
        width: 0.84rem;
        margin-left: 0.12rem;
      }
    }
    .Basic_infor {
      width: 100%;
      height: 100%;
      .files {
        background: #fff;
        .files_tit {
          width: 100%;
          height: 0.44rem;
          padding: 0 0.12rem;
          box-sizing: border-box;
          .Pictures {
            width: 100%;
            height: 0.44rem;
            display: flex;
            align-items: center;
            border-bottom: 0.01rem solid #eceff2;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
        .files_imgList {
          width: 100%;
          height: 1.1rem;
          display: flex;
          align-items: center;
        }
        .files_img {
          margin-left: 0.11rem;
          img {
            width: 0.64rem;
            height: 0.64rem;
          }
        }
      }
      .form {
        .enclosure_wrap {
          width: 100%;
          padding: 0 0.12rem;
          box-sizing: border-box;
        }
        .enclosure {
          width: 100%;
          height: 0.44rem;
          border-bottom: 0.01rem solid #eceff2;
          display: flex;
          align-items: center;
          font-size: 0.14rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          .enclosure_tit {
            width: 0.28rem;
          }
          .enclosure_content {
            margin-left: 0.6rem;
          }
        }
        /deep/.van-cell {
          min-height: 0.44rem;
          display: flex;
          // align-items: center;
          span {
            display: inline-block;
            height: 0.2rem;
            margin-top: 0.12rem;
            font-size: 0.14rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
          }
        }
        /deep/.van-cell__value {
          margin-top: 0.12rem;
        }
        /deep/.van-field__label {
          width: 0.84rem;
          margin-left: 0.12rem;
        }
      }
    }
    .Follow_record {
      width: 100%;
      height: 100%;
      .con_follow_li {
        width: 100%;
        background: #fff;
        padding-bottom: 0.12rem;
        .con_follow_li_tit {
          display: flex;
          justify-content: space-between;
          padding: 0 0.12rem;
          .head {
            margin-top: 0.17rem;
            width: 0.44rem;
            img {
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 50%;
            }
            .ImgHide {
              display: none;
            }
            .ImgShow {
              width: 0.44rem;
              height: 0.44rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #006aff;
              color: #fff;
              font-size: 0.14rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
            }
          }
          .msg {
            flex: 1;
            margin: 0.19rem 0 0 0.2rem;
            .msg_top {
              .msg_top_tit {
                display: flex;
                align-items: center;
                .company {
                  font-size: 0.16rem;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 500;
                  color: #333333;
                  line-height: 0.22rem;
                }
                .type {
                  width: 0.48rem;
                  height: 0.17rem;
                  background: #006aff;
                  border-radius: 0.02rem;
                  font-size: 0.12rem;
                  display: flex;
                  align-items: center;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #ffffff;
                  margin-left: 0.07rem;
                }
              }
              .occupation {
                display: flex;
                font-size: 0.14rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 0.2rem;
              }
            }
            .msg_down {
              margin-top: 0.15rem;
              .msg_down_text {
                display: flex;
              }
              .text {
                font-size: 0.16rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
                line-height: 0.22rem;
                // text-overflow: -o-ellipsis-lastline;
                // overflow: hidden;
                // text-overflow: ellipsis;
                // display: -webkit-box;
                // -webkit-line-clamp: 2;
                // line-clamp: 2;
                // -webkit-box-orient: vertical;
              }
              .AIter {
                font-size: 0.12rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                margin-top: 0.05rem;
                .alter_name {
                  color: #578eff;
                }
                .followWorkId {
                  display: flex;
                }
                .followWorkNo {
                  margin-left: 0.01rem;
                }
              }
            }
          }
          .goTo {
            width: 0.15rem;
            margin-top: 0.24rem;
            img {
              width: 0.14.4rem;
              height: 0.14.4rem;
            }
          }
        }
        .con_follow_li_time {
          width: 100%;
          height: 0.34rem;
          padding: 0 0.12rem;
          box-sizing: border-box;
          margin-top: 0.18rem;
          .con_follow_li_time_min {
            width: 100%;
            height: 0.34rem;
            background: #fbfbfb;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .ymd {
            margin-left: 0.11rem;
            font-size: 0.12rem;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 0.17rem;
            .hms {
              margin-left: 0.05rem;
            }
          }
          .comments {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-right: 0.2rem;
            .comment_li {
              span {
                margin-left: 0.06rem;
              }
            }
            .line {
              width: 0.01rem;
              height: 0.1rem;
              background: #e8eaed;
              margin: 0 0.23rem;
            }
          }
        }
      }
    }
    .Billing_infor {
      width: 100%;
      height: 100%;
      .tit {
        width: 100%;
        padding: 0.07rem 0 0.07rem 0.09rem;
        background: #f8f9fa;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        font-size: 0.12rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 0.17rem;
      }
    }
    .File_cabinet {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      .tit {
        width: 100%;
        padding: 0.07rem 0 0.07rem 0.12rem;
        background: #f8f9fa;
        box-sizing: border-box;
        display: flex;
        align-items: center;

        .total {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 0.17rem;
        }
        .num {
          width: 0.2rem;
          height: 0.14rem;
          background: #017cff;
          border-radius: 0.06rem;
          margin-left: 0.1rem;
          font-size: 0.13rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .file_wrap {
        width: 100%;
        background: #f8f9fa;
        padding: 0 0.12rem;
        box-sizing: border-box;
        .file_nav {
          width: 100%;
          min-height: 5rem;
          display: flex;
          // 文件柜样式
          .filenav {
            width: 100%;
            position: relative;
            /deep/.van-tabs__wrap {
              height: 0.34rem;
              display: flex;
              padding-left: 0;
            }
            /deep/.van-tab--active {
              color: #017cff;
              font-size: 0.14rem;
              font-family: PingFangSC-Regular, PingFang SC;
            }
            /deep/.van-tabs__nav--card {
              height: 0.34rem;
              margin: 0 0 0 0;
              color: #666666;
              font-size: 0.14rem;
              border: none;
              border-radius: 0.04rem;
              margin-right: 0.05rem;
              font-family: PingFangSC-Regular, PingFang SC;
            }
            /deep/.van-tab {
              width: 0.88rem;
              height: 0.34rem;
              color: #666666;
              background: #fff;
              border: none;
              border-radius: 0.04rem;
              margin-right: 0.05rem;
            }

            /deep/.van-tabs__nav {
              background-color: #f8f9fa;
            }
            .file_content {
              width: 100%;
              height: 100%;
              border-radius: 0.08rem;
              background: #fff;
              margin-top: 0.1rem;
              padding: 0 0.11rem;
              box-sizing: border-box;
              /deep/element.style {
                transform: translate3d(-79px, 0px, 0px);
              }
              /deep/.van-swipe-cell__right {
                display: flex;
              }
              /deep/.van-button--danger {
                background: #ff6189;
                border: none;
              }
              /deep/ .goods-card {
                margin: 0;
                background-color: #fff;
              }
              /deep/.delete-button-none {
                width: 0.15rem;
                background: #fff;
                height: 100%;
                border-bottom: 0.01rem solid #eceff2;
              }
              /deep/.delete-button {
                width: 0.64rem;
                height: 100%;
              }
              .file_content_li {
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 0.01rem solid #eceff2;
                background: #fff;
                box-sizing: border-box;
                padding-bottom: 0.16rem;

                .left {
                  margin-top: 0.24rem;
                  width: 0.4rem;
                  height: 0.4rem;
                  position: relative;
                  img {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                  /deep/.van-uploader {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                  /deep/.van-uploader__upload {
                    display: none;
                  }
                  /deep/.van-uploader__preview-image {
                    width: 0.4rem;
                    height: 0.4rem;
                  }
                  /deep/.van-uploader__preview-delete {
                    display: none;
                  }
                  /deep/.van-uploader__preview {
                    position: absolute;
                    top: -0.4rem;
                    opacity: 0;
                  }
                }
                .center {
                  flex: 1;
                  margin-left: 0.2rem;
                  margin-top: 0.16rem;

                  .Scheduling {
                    width: 2rem;
                    text-align: justify;
                    text-justify: newspaper;
                    word-break: break-all;
                    text-align: left;
                    font-size: 0.16rem;
                    font-weight: 400;
                    color: #333333;
                    line-height: 0.22rem;
                  }
                  .nameAndtime {
                    display: flex;
                    line-height: 0.17rem;
                    margin-top: 0.05rem;
                    .surname {
                      display: flex;
                      min-width: 0.39rem;
                      font-size: 0.12rem;
                      font-family: PingFangSC-Regular, PingFang SC;
                      font-weight: 400;
                      color: #666666;
                    }
                    .time {
                      margin-left: 0.18rem;
                    }
                  }

                  .size {
                    display: flex;
                    line-height: 0.17rem;
                    margin-top: 0.05rem;
                    font-size: 0.12rem;
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                  }
                }
                .right {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-right: 0.08rem;
                  margin-top: 0.2rem;
                  img {
                    widows: 0.2rem;
                    height: 0.2rem;
                    position: relative;
                  }
                  /deep/.van-uploader {
                    width: 0.2rem;
                    height: 0.2rem;
                    position: absolute;
                    top: 50%;
                    right: 0;
                    margin-top: -0.1rem;
                  }
                  /deep/.van-uploader__upload {
                    display: none;
                  }
                  /deep/.van-uploader__wrapper {
                    width: 0.2rem;
                    height: 0.2rem;
                  }
                  /deep/.van-uploader__preview-image {
                    width: 0.14rem;
                    height: 0.14rem;
                  }
                  /deep/.van-uploader__preview-delete {
                    display: none;
                  }
                  /deep/.van-uploader__preview {
                    // display: none;
                  }
                }
              }
            }
          }
          .file_upload {
            box-sizing: border-box;
            position: absolute;
            right: 0;
            top: 0;
            img {
              width: 0.34rem;
              height: 0.34rem;
              position: relative;
            }
            .uploadImg {
              width: 0.34rem;
              height: 0.34rem;
            }
          }
        }
      }
    }
    .superior {
      width: 100%;
      .tit {
        width: 100%;
        height: 0.4rem;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.12rem;
        padding-right: 0.12rem;
        box-sizing: border-box;
        .customer {
          font-size: 0.12rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .van-icon-add {
          width: 0.16rem;
          height: 0.16rem;
          color: #006aff;
        }
      }
      .s_content {
        .content_li {
          background: #fff;
          .empty {
            width: 100%;
            height: 0.12rem;
            background: #f8f9fa;
          }
          .c_tit {
            width: 100%;
            height: 0.44rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 0.01rem solid #eceff2;
            padding-left: 0.12rem;
            padding-right: 0.12rem;
            box-sizing: border-box;
            .company {
              font-size: 0.16rem;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
            }
            .van-icon-delete {
              width: 0.16rem;
              height: 0.19rem;
              color: #d8d8d8;
            }
          }
          .center {
            width: 100%;
            margin-top: 0.11rem;
            padding-bottom: 0.17rem;
            padding-left: 0.12rem;
            padding-right: 0.12rem;
            box-sizing: border-box;
            .c_li {
              display: flex;
              margin-top: 0.08rem;
              .left {
                flex: 3;
                display: flex;
                font-size: 0.12rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
              }
              .right {
                flex: 7;
                display: flex;
                font-size: 0.12rem;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
              }
            }
          }
        }
      }
    }
  }
}
</style>
