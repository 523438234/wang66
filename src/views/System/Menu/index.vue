<template>
  <div>
    <el-button type="primary" class="MenuBtn" @click="add">添加菜单</el-button>
    <!-- 列表组件 -->
    <vlist @edit="edit"></vlist>
    <!-- 弹窗 -->
    <vinfo :info="info" ref="dialog"></vinfo>
  </div>
</template>

<script>
import vlist from "../Menu/vlist";
import vinfo from "../Menu/vinfo";

export default {
  data() {
    return {
      info: {
        isAdd: true,
        isShow: false,
      },
    };
  },
  created() {},
  methods: {
    add() {
      this.info.isAdd = this.info.isShow = true;
    },
    edit(val) {
      this.info.isAdd = false;
      this.info.isShow = true;
      // console.log(val)
      // console.log(this.$refs.dialog.setinfo)   //利用ref属性进行组件之间互相传参
      this.$refs.dialog.setinfo(val);
    },
  },
  components: {
    vlist,
    vinfo,
  },
};
</script>
<style scoped>
.MenuBtn {
  margin: 20px;
}
</style>