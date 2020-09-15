<template>
  <el-dialog
    :title="info.isAdd ? '添加商品规格':'修改商品规格'"
    @close="origin"
    :visible.sync="info.isShow"
    width="40%"
  >
    <el-form :model="forminfo" ref="form" validate :rules="rules" label-width="80px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <el-form-item label="一级分类">
            <el-select v-model="forminfo.first_cateid" @change="cateChange" placeholder="请选择">
              <el-option
                v-for="item in cateList"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select v-model="forminfo.second_cateid" placeholder="请选择">
              <el-option
                v-for="item in secondCate"
                :key="item.id"
                :label="item.catename"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称" prop="goodsname">
            <el-input v-model="forminfo.goodsname" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="forminfo.price" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="市场价格" prop="market_price">
            <el-input v-model="forminfo.market_price" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-upload
              action
              :auto-upload="false"
              list-type="picture-card"
              :limit="1"
              :on-preview="see"
              :on-change="change"
              :on-remove="remove"
              :file-list="filelist"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-select v-model="forminfo.specsid" @change="specsChange" placeholder="请选择">
              <el-option
                v-for="item in specsList"
                :key="item.id"
                :label="item.specsname"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性值">
            <el-select v-model="forminfo.specsattr" multiple placeholder="请选择">
              <el-option v-for="item in secondSpecs" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="详细描述" name="second">
          <el-form-item label="是否新品">
            <el-switch v-model="forminfo.isnew" :active-value="1" :inactive-value="2"></el-switch>
          </el-form-item>
          <el-form-item label="是否热卖">
            <el-switch v-model="forminfo.ishot" :active-value="1" :inactive-value="2"></el-switch>
          </el-form-item>
          <el-form-item label="商品状态" prop="status">
            <el-radio-group v-model="forminfo.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-tab-pane>
        <el-form-item label>
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>

<script>
import { addGoods, editGoods } from "@/request/goods";
import { mapGetters, mapMutations, mapActions } from "vuex";
let defaultItem = {
  first_cateid: "", //一级分类编号  (必须)
  second_cateid: "", //二级分类编号(必须)
  goodsname: "", //商品名称(必须)
  price: "", //商品价格
  market_price: "", //市场价格
  img: "", //商品图片（文件）
  description: "", //商品描述
  specsid: "", //商品规格编号  (必须)
  specsattr: [], //商品规格属性  (必须)
  isnew: 2, //是否新品   1表示新品
  ishot: 2, //是否热卖推荐   1表示热卖
  status: 1, //状态
};
let setItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false,
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...defaultItem },
      rules: {},
      activeName: "first",
      dialogImageUrl: "",
      dialogVisible: false,
      filelist: [],
      secondCate: [],
      secondSpecs: [],
    };
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/goodsList",
      specsList: "specs/specsList", //这里获取规格列表和分类列表的原因是，弹框中  分类和规格要进入循环渲染
      cateList: "category/cateList",
    }),
  },
  mounted() {
    if (!this.cateList.length) {
      this.get_cate_list();
    }
    if (!this.specsList.length) {
      this.get_Specs_list();
    }
  },
  methods: {
    ...mapActions({
      get_Goods_list: "goods/get_Goods_list",
      get_Specs_list: "specs/get_Specs_list",
      get_cate_list: "category/get_cate_list",
    }),
    specsChange(id) {
      this.secondSpecs = [];
      this.forminfo.specsattr = "";
      this.specsList.forEach((item, index) => {
        // console.log(item, index);
        if (item.id == id) {
          //循环specsList当与选择的那项的id一致时，将attrs数组赋值给规格属性值
          // console.log(item.attrs)
          this.secondSpecs = item.attrs;
        }
      });
    },
    cateChange(id) {
      this.secondCate = [];
      this.forminfo.second_cateid = "";
      console.log(id);
      this.cateList.forEach((item, index) => {
        if (item.id == id) {
          this.secondCate = item.children;
        }
      });
    },
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url; // JS 生成的预览地址！
    },
    change(file, filelist) {
      this.forminfo.img = file.raw; // file.raw 是原生文件信息！
    },
    remove(file, filelist) {
      this.forminfo.img = "";
    },
    setinfo(val) {
      console.log(val);
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      };
      this.cateChange(val.first_cateid);    // 数据回写，二级分类和规格属性会变成id，所以这样再次调用这2个方法
      this.specsChange(val.specsid);
      "firstcatename" in val ? delete val.firstcatename : "";      
      //  对象.hasOwnProperty("属性名")  当属性值为空字符串时，会判断为true  和in方法一样
      "secondcatename" in val ? delete val.secondcatename : "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    submit() {
      //表单验证 没有输入不能提交
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          // 提交FormData类型！
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          if (this.info.isAdd) {
            //判断是添加行为 还是修改
            res = await addGoods(fd);
          } else {
            res = await editGoods(fd);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            // 再次获取列表，让仓库里面的数据是最新的！
            if (this.specsList.length == 1 && this.page != 1) {
              this.SET_PAGE(this.page - 1);
            }
            this.get_Goods_list();
            // 无论是修改成功还是添加成功，都应该让表单为空！
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        this.forminfo = { ...setItem }; // 无论是修改成功还是添加成功，都应该让表单为空！
      } else {
        this.setinfo(defaultItem);
      }
    },
    origin() {
      //当使用弹窗的  X号关闭弹框时,执行的代码
      this.forminfo = { ...setItem }; // 无论是修改成功还是添加成功，都应该让表单为空！
    },
  },
  components: {},
};
</script>
<style scoped>
</style>