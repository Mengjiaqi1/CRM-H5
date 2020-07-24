<template>
  <div>
    <header>
      <img src="../common/images/goBack.png" @click="$router.go(-1)" alt="" />
      <img src="../common/images/close.png" alt="" />
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>
<style lang="scss" scoped>
div {
  width: 100%;
  height: 8rem;
  background: plum;
}
</style>
