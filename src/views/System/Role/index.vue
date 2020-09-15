<template>
  <div>
    <el-button type="primary" class="RoleBtn" @click="add">添加角色</el-button>
    <rlist @edit="edit"></rlist>
    <rinfo :info="info" ref="dialog"></rinfo>
  </div>
</template>

<script>
import rinfo from "../Role/rinfo";
import rlist from "../Role/rlist";
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
    rinfo,
    rlist,
  },
};
</script>
<style scoped>
.RoleBtn {
  margin: 20px;
}
</style>