<template>
  <div>
    <el-button type="primary" class="RoleBtn" @click="add">添加规格</el-button>
    <slist @edit="edit"></slist>
    <sinfo :info="info" ref="dialog"></sinfo>
  </div>
</template>

<script>
import sinfo from "../Specs/sinfo";
import slist from "../Specs/slist";
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
    sinfo,
    slist,
  },
};
</script>
<style scoped>
.RoleBtn {
  margin: 20px;
}
</style>