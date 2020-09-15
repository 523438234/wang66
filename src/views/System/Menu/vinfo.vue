<template>
  <el-dialog :title="info.isAdd ? '添加':'修改'" @close="origin" :visible.sync="info.isShow" width="40%">
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" validate :rules="rules" label-width="80px">
      <el-form-item label="菜单类型">
        <el-radio-group v-model="forminfo.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="forminfo.type==2" label="上级目录">
        <el-select v-model="forminfo.pid" placeholder="请选择">
          <el-option label="顶级目录" :value="0"></el-option>
          <el-option
            v-for="item in menuList"
            v-if="item.type==1"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
          <!-- 因为插件的原因，会报错，不过不用管-->
        </el-select>
      </el-form-item>
      <el-form-item :label="forminfo.type==1 ?'目录名称':'菜单名称'" prop="title">
        <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-if="forminfo.type==2" prop="url">
        <el-input v-model="forminfo.url" placeholder="请输入菜单地址"></el-input>
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
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapMutations, mapActions } from "vuex";
let defaultItem = {
  pid: 0,
  title: "",
  icon: "",
  type: 1, // 1目录2菜单
  url: "",
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
      forminfo: { ...defaultItem },
      rules: {
        title: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入菜单地址", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  mounted() {
    // console.log(this.forminfo)
    if (!this.menuList.length) {
      //当挂载完成后，判断menuList.length没有长度上，调用 this.get_menu_list()去请求数据库数据添加到state中menulist中保存
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
    }),
    setinfo(val) {
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    submit() {
      //表单验证 没有输入不能提交
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加行为 还是修改
            res = await addMenu(this.forminfo);
          } else {
            res = await editMenu(this.forminfo);
            console.log(res);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            // this.get_menu_list(); // 再次获取列表，让仓库里面的数据是最新的！
            this.get_menu_list();
            reset() // 无论是修改成功还是添加成功，都应该让表单为空！
          } else {
            this.$message.error(res.msg);
          }
        }
      });
    },
    reset() {
      if (this.info.isAdd) {
        this.forminfo={...resetItem}
      } else {
        this.forminfo = { ...defaultItem };
      }
    },
    origin(){
        this.forminfo={...resetItem}
    }
  },
  components: {},
};
</script>
<style scoped>
</style>