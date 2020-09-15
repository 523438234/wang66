<template>
  <div>
    <el-button type="primary" class="RoleBtn" @click="add">添加规格</el-button>
    <glist @edit="edit"></glist>
    <ginfo :info="info" ref="dialog"></ginfo>
  </div>
</template>

<script>
import ginfo from "../Goods/ginfo";
import glist from "../Goods/glist";
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
      this.$refs.dialog.setinfo(val);
    },
  },
  components: {
    ginfo,
    glist,
  },
};
</script>
<style scoped>
.RoleBtn {
  margin: 20px;
}
</style>