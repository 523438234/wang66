<template>
  <div class="header">
    <!-- NavMenu 导航菜单 -->
    <el-menu mode="horizontal" class="headerMenu">
      <el-menu-item>
        <el-button type="primary" size="small" class="toggle-btn" icon="el-icon-s-unfold"></el-button>
      </el-menu-item>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="mbx">
        <el-breadcrumb-item>
          <router-link to="/">首页</router-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <router-link to="/">{{$route.meta.title}}</router-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button icon="el-icon-back" circle size="small" class="headerBack" @click="$router.back()"></el-button>
    </el-menu>
    <el-dropdown class="Hdropdown">
      <span class="el-dropdown-link">
        {{username}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-full-screen">全屏操作</el-dropdown-item>
        <el-dropdown-item icon="el-icon-user">个人信息</el-dropdown-item>
        <el-dropdown-item icon="el-icon-switch-button" @click.native="QUIT">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from "vuex"
export default {
  data() {
    return {};
  },
  created() {
    //   console.log(this.$route)
  },
  computed: {
    ...mapGetters({
      username:"user/username"
    })
  },
  methods: {
    ...mapMutations({
      QUIT:"user/QUIT"
    })
  },
  components: {},
};
</script>
<style scoped>
.header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
}
.headerMenu {
  display: flex;
  align-items: center;
}
.headerBack {
  margin-left: 20px;
}
.Hdropdown {
  margin-right: 30px;
}
</style>