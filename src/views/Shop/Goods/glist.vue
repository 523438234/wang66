<template>
  <div class="table-bg">
    <el-table :data="goodsList" row-key="id">
      <el-table-column prop="firstcatename" label="一级分类" align="center"></el-table-column>
      <el-table-column prop="secondcatename" label="二级分类" align="center"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="img" label="商品图片" align="center">
        <template slot-scope="scope">
          <img style="width:80px" v-if="scope.row.img" :src="scope.row.img | pixImg" alt />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column label="规格名" align="center">
              <template slot-scope="scope">
                    <el-tag v-for="(item,index) in specsList" :key="index" v-if="item.id==scope.row.specsid" type="success">
                      {{ item.specsname }}
                    </el-tag>
              </template>
          </el-table-column>
          <el-table-column label="规格值" align="center">
              <template slot-scope="scope">
                  <el-tag v-for="(item,index) in scope.row.specsattr" :key="index"  type="success">{{item}}</el-tag>
              </template>
          </el-table-column>
      <el-table-column prop="price" label="销售价格" align="center"></el-table-column>
      <el-table-column prop="market_price" label="市场价格" align="center"></el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.ishot" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isnew" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="商品状态">
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
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { delGoods } from "../../../request/goods";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      goodsList: "goods/goodsList",
      specsList:"specs/specsList",
      total: "goods/total",
      page: "goods/page",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      get_Goods_list: "goods/get_Goods_list",
      set_size: "goods/set_size",
      set_page: "goods/set_page",
    }),
    ...mapMutations({
      SET_PAGE: "goods/SET_PAGE",
    }),
    edit(info) {
      console.log(info);
      this.$emit("edit", { ...info });
    },
    async del(id) {
      // console.log(id)     //id值
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await delGoods(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            if (this.goodsList.length == 1 && this.page != 1) {
              this.SET_PAGE(this.page - 1);
            }
            this.get_Goods_list(); // 重新获取列表！
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
  },
  mounted(){
      if (! this.goodsList.length) {
        this.get_Goods_list()
      }
  },
  components: {},
};
</script>
<style scoped>
</style>