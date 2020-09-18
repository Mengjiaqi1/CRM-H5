<template>
  <div>
    <iframe
      id="frmsReferrer1"
      :src="url"
      name="frmsReferrer1"
      runat="server"
      marginwidth="0"
      frameborder="1"
      width="100%"
      height="500"
      scrolling="auto"
      allowtransparency="true"
    ></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: ""
    };
  },
  created() {
    this.url = this.$route.query.url;
  }
};
</script>
