<template>
  <div class="table-bg">
    <el-table :data="cateList" row-key="id" :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="catename" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="url" label="分类图片" align="center">
        <template slot-scope="scope">
          <img style="width:80px" v-if="scope.row.img" :src="scope.row.img | pixImg" alt />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.status==1">已启用</el-tag>
          <el-tag type="warning" v-if="scope.row.status==2">已禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="修改">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="edit(scope.row)"
            circle
            icon="el-icon-edit"
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
import { delCategory } from "../../../request/category";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      cateList: "category/cateList",
    }),
  },
  methods: {
    ...mapActions({
      get_cate_list: "category/get_cate_list",
    }),
    edit(info) {     
//子传父  调用父亲的edit自定义函数，并把info传送到父，父在根据cinfo的refs属性调用cinfo的setinfo方法，将info数据在传送到cinfo里
      this.$emit("edit", info);
    },
    async del(id) {
      // console.log(id)     //id值
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delCategory(id);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_cate_list(); // 重新获取列表！
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