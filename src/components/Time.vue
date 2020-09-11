<template>
  <div class="times">
    <!--年月日-->
        <van-popup v-model="msgs.isPopShow" position="bottom" :style="{ height: '50%',width:'100%' }">
          <van-datetime-picker
                  @cancel="cancelPicker"
                  @confirm="confirmPicker"
                  v-model="startTime"
                  v-if="msgs.showTime"
                  type="date"
                  :min-date="minDate"
                  :max-date="maxDate"
          />
        </van-popup>
        <van-popup v-model="msgs.isPop" position="bottom" :style="{ height: '50%' }">
          <van-datetime-picker
                  @cancel="cancelPickers"
                  @confirm="confirmPickers"
                  v-if="msgs.showTime"
                  v-model="endTime"
                  type="date"
                  :min-date="minDate"
                  :max-date="maxDate"
          />
        </van-popup>
  </div>

</template>
<script>
    export default {
        props: ['msgs'],
        data() {
            return {
                // 年月日弹框
                startTime: new Date(), // 开始时间
                endTime: new Date(), // 结束时间
                isPopShow: false, // 弹出层隐藏与显示
                isPop: false, // 弹出层隐藏与显示
                showTime:false,
                minDate: new Date(2009, 12,1),
                maxDate: new Date(2030, 11,31),
            };
        },
        methods: {
            // 公共日期弹框按钮-开始时间-结束时间
            cancelPicker() { // 选择器取消按钮点击事件
                this.$emit('childs-start-cancel','我是子组件传过来的值');
            },
            confirmPicker(value) {// 确定按钮，时间格式化并显示在页面上
                this.$emit('childs-start-confirm',value,'我是子组件传过来的值');
            },
            cancelPickers() { // 选择器取消按钮点击事件
                this.$emit('childs-end-cancel',);
            },
            confirmPickers(value) {// 确定按钮，时间格式化并显示在页面上
                this.$emit('childs-end-confirm',value,);
            },
        }
    };
</script>
<style lang="scss" scoped>

</style>