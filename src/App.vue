<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
  async created() {
    // console.log(this.$store);
    // console.log(await this.$store.state.menu.menuList);
  },
};
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
/* Layout header里图标颜色 */
.toggle-btn>i{   
    color: #FFF;
}
.table-bg{
  background: #fff;
  padding: 20px;
  margin: 20px;
}
</style>
