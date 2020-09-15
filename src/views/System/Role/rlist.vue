<template>
  <div class="table-bg">
    <el-table :data="roleList" row-key="id">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" align="center"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="warning"
            size="small"
            @click="add(scope.row)"
            circle
            icon="el-icon-view"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            @click="del(scope.row.id)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { delRole } from "../../../request/role";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.get_menu_list()
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_menu_list:"menu/get_menu_list"
    }),
    edit(info) {
      this.$emit("edit",info);
    },
    add() {},
    async del(id) {
      // console.log(id)     //id值
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delRole(id);
          console.log(res)
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_role_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },
  components: {},
};
</script>
<style scoped>
</style>