<template>
  <div class="aside">
    <!-- 菜单组件！！！ -->
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#333"
      text-color="#FFF"
      router
      active-text-color="green"
    >
      <h3 class="layoutTitle">小U商城后台</h3>
      <el-menu-item index="/index">
        <i class="el-icon-house"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>   
      <template v-for="(item,index) in menus">
        <el-submenu v-if="item.type==1" :index="index+''">
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </template>
          <el-menu-item :index="val.url" v-for="(val,idx) in item.children" :key="idx">{{val.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.url">
          <i :class="item.icon"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    // console.log(this.$route)
  },
  computed: {
    ...mapGetters({
      menus: "user/menus",
    }),
  },
  methods: {},
  components: {},
};
</script>
<style scoped>
.aside {
  width: 250px;
  height: 100%;
}
.aside > ul {
  height: 100%;
}
.layoutTitle {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #555;
  color: #fff;
  letter-spacing: 6px;
  font-size: 20px;
}
</style>