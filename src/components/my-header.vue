<template>
  <header>
    <slot></slot>
  </header>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../css/_minix.scss";
@import "../css/common.scss";
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
header {
  width: 100%;
  height: 0.55rem;
  padding: 0 0.15rem;
  background: orange;
  color: #fff;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  .left {
    height: 100%;
    display: flex;
    align-items: center;
    // line-height: 0.55rem;
    .goback {
      margin-left: 0.05rem;
    }
  }
  .center {
    height: 100%;
    line-height: 0.55rem;
  }
  .right {
    height: 100%;
    line-height: 0.55rem;
  }
  & > span {
    color: #fff;
    font-size: 0.14rem;
  }
}
</style>
