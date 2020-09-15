import Vue from 'vue'
import Router from 'vue-router'
import store from "@/store"
Vue.use(Router)

let router = new Router({
  routes: [
    // 会自动解析layout文件夹的index.vue index要小写
    {
      path: "/login",
      component: () => import("@/views/Login"),
      meta: { title: '登录' }
    },
    {
      path: "/",
      component: () => import("@/views/Layout"),
      meta: { title: "小u商城管理系统" },
      redirect: "/index",
      children: [
        {
          path: "/index",
          component: () => import("@/views/Index"),
          meta: { title: "后台首页" }
        },
        {
          path: "/menu",
          component: () => import("@/views/System/Menu"),
          meta: { title: "菜单管理" }
        },
        {
          path: "/role",
          component: () => import("@/views/System/Role"),
          meta: { title: "角色管理" }
        },
        {
          path: "/user",
          component: () => import("@/views/System/User"),
          meta: { title: "管理员管理" }
        },
        {
          path: "/banner",
          component: () => import("@/views/Shop/Banner"),
          meta: { title: "轮播图管理" }
        },
        {
          path: "/category",
          component: () => import("@/views/Shop/Category"),
          meta: { title: "商品分类" }
        },
        {
          path: "/goods",
          component: () => import("@/views/Shop/Goods"),
          meta: { title: "商品管理" }
        },
        {
          path: "/member",
          component: () => import("@/views/Shop/Member"),
          meta: { title: "会员管理" }
        },
        {
          path: "/seckill",
          component: () => import("@/views/Shop/Seckill"),
          meta: { title: "秒杀活动" }
        },
        {
          path: "/specs",
          component: () => import("@/views/Shop/Specs"),
          meta: { title: "商品规格" }
        },

      ]
    },
  ],

});
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    document.title = to.meta.title;
    next();
  } else {
    if (localStorage.getItem("userinfo")) {
      let whiteList = store.getters['user/menus_url'];
      whiteList.push("/index")
      if (whiteList.includes(to.path)) {
        document.title = to.meta.title;
        next();
      }
    }else{
      next("/login");
    }
  }
})

export default router;