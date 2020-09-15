<template>
  <div class="layoutIndex">
    <div class="le">
      <Tab />
    </div>
    <div class="ri">
      <Header />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/views/Layout/Header";
import Tab from "@/views/Layout/Tab";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    Header,
    Tab,
  },
};
</script>
<style scoped>
.layoutIndex{
    display: flex;
    height: 100vh;
}
.ri{
    flex: 1;
    background-color: azure;
    width: 80vw;
    height: 100%;
    /* position: relative;
    z-index: 1000; */
}
.layoutIndex{
  overflow-x: hidden;
}
.le{
  height: 100%;
}
</style>