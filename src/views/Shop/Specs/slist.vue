<template>
  <div class="table-bg">
    <el-table :data="specsList" row-key="id">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="specsname" label="属性名称" align="center"></el-table-column>
      <el-table-column label="规格值" align="center">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.attrs" :key="index" type="success">{{item}}</el-tag>
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
            @click="del(scope.row.id)"
            circle
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="set_size"
      @current-change="set_page"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { delSpecs } from "../../../request/specs";
import { mapGetters, mapActions,mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      specsList: "specs/specsList",
      total:"specs/total",
      page:"specs/page",
      size:"specs/size",
    }),
  },
  methods: {
    ...mapActions({
      get_Specs_list: "specs/get_Specs_list",
      set_size:"specs/set_size",
      set_page:"specs/set_page",
    }),
    ...mapMutations({
        SET_PAGE:"specs/SET_PAGE"
    }),
    edit(info) {
      console.log(info.attrs)
      this.$emit("edit",{...info});
    },
    async del(id) {
      // console.log(id)     //id值
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delSpecs(id);
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            if (this.specsList.length == 1 && this.page != 1) {
              this.SET_PAGE(this.page - 1);
            }
            this.get_Specs_list(); // 重新获取列表！
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