<template>
  <el-dialog
    :title="info.isAdd ? '添加':'修改'"
    @close="origin"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" validate :rules="rules" label-width="80px">
      <el-form-item label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名称" prop="catename">
        <el-input v-model="forminfo.catename" placeholder="请输入分类名"></el-input>
      </el-form-item>
      <el-form-item label="分类图片">
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
          <img width="100%" :src="dialogImageUrl" alt="无图片" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="reset">重 置</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCategory, editCategory } from "@/request/category";
import { mapGetters, mapMutations, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  catename: "",
  img: "", //图片(文件，一般用于二级分类)
  status: 1, // 状态1正常2禁用
};
let resetItem = { ...defaultItem };
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
      dialogVisible: false,
      dialogImageUrl: "",
      forminfo: { ...defaultItem },
      rules: {
        catename: [
          { required: true, message: "请输入catename", trigger: "blur" },
        ],
      },
      filelist: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "category/cateList",
    }),
  },
  mounted() {
    // console.log(this.forminfo)
    if (!this.cateList.length) {
      //当挂载完成后，判断menuList.length没有长度上，调用 this.get_menu_list()去请求数据库数据添加到state中menulist中保存
      this.get_cate_list();
    }
  },
  methods: {
    ...mapActions({
      get_cate_list: "category/get_cate_list",
    }),
    setinfo(val) {
      console.log(val);
      /*
          catename: (...)
          id: (...)
          img: "/uploads/category/b6ca6400-f682-11ea-8a2a-fda30312a4d5.jfif"
          pid: (...)
          status: (...)      
      */
      if (val.img) {
        this.filelist = [
          {
            name: val.catename,
            url: this.$host + val.img,
          },
        ];
      }
      console.log(val, this.filelist);
      //delete原生js方法,删除对象中的某一个属性;
      // 因为有子列表的项,返回val对象中会有children这个属性，提交修改时，会造成传输数据不正确。所以要删除
      val.children ? delete val.children : "";
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    submit() {
      //表单验证 没有输入不能提交
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          //要使用formdata数据格式传送
          let fd = new FormData();
          for (let k in this.forminfo) {
            fd.append(k, this.forminfo[k]);
          }
          //要使用formdata数据格式传送
          if (this.info.isAdd) {
            //判断是添加行为 还是修改
            res = await addCategory(fd);
          } else {
            res = await editCategory(fd);
            console.log(res);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            // 再次获取列表，让仓库里面的数据是最新的！
            this.get_cate_list();
            this.reset(); // 无论是修改成功还是添加成功，都应该让表单为空！
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        // 添加时候的重置！
        this.filelist = [];
        this.forminfo = { ...defaultItem };
      } else {
        // 修改时候的重置！
        this.setinfo({ ...defaultItem });
      }
    },
    origin() {
      this.forminfo = { ...resetItem };
      this.filelist = []; // 设为空，就没有了！
    },
    see(file) {
      console.log("当查看图片的时候");
      console.log(file.url);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url; // JS 生成的预览地址！
    },
    change(file, fileList) {
      console.log("当添加图片的时候" + file, fileList);
      this.forminfo.img = file.raw; // file.raw 是原生文件信息！
    },
    remove(file, fileList) {
      this.forminfo.img = "";
    },
  },
  components: {},
};
</script>
<style scoped>
</style>