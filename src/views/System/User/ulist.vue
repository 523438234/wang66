<template>
  <div class="table-bg">
    <el-table :data="userList" row-key="id">
      <el-table-column prop="uid" label="UID" align="center"></el-table-column>
      <el-table-column prop="username" label="管理员名称" align="center"></el-table-column>
      <el-table-column label="管理员权限">
        <template slot-scope="scope">
          <el-tag type="success">{{scope.row.rolename}}</el-tag>
        </template>
      </el-table-column>
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
            type="danger"
            size="small"
            @click="del(scope.row.uid)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="set_size"
      @current-change="set_page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { delUser } from "../../../request/user";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userList: "user/userList",
      page: "user/page",
      size: "user/size",
      total: "user/total",
    }),
  },
  methods: {
    ...mapMutations({
      SET_PAGE:"user/SET_PAGE"
    }),
    ...mapActions({
      get_user_list: "user/get_user_list",
      get_user_total: "user/get_user_total",
      set_page: "user/set_page",
      set_size: "user/set_size",
    }),
    edit(info) {
      this.$emit("edit", info);
    },
    async del(uid) {
      // console.log(id)     //id值
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delUser(uid);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            // 如果本页只有1条数据！且不是第1页！
            if (this.userList.length == 1 && this.page != 1) {
              this.SET_PAGE(this.page - 1);
            }
            this.get_user_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },
  mounted() {
    if (!this.userList.length) {
      //当挂载完成后，判断menuList.length没有长度上，调用 this.get_menu_list()去请求数据库数据添加到state中menulist中保存
      this.get_user_list();
    }
  },
  components: {},
};
</script>
<style scoped>
</style>