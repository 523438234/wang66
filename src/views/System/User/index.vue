<template>
  <div>
    <el-button type="primary" class="UserBtn" @click="add">添加角色</el-button>
    <ulist @edit="edit"></ulist>
    <uinfo :info="info" ref="dialog"></uinfo>
  </div>
</template>

<script>
import uinfo from "../User/uinfo";
import ulist from "../User/ulist";
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
    edit(val){
      this.info.isAdd = false;
      this.info.isShow = true;
      this.$refs.dialog.setinfo(val);
    }
  },
  components: {
    uinfo,
    ulist,
  },
};
</script>
<style scoped>
.UserBtn {
  margin: 20px;
}
</style>