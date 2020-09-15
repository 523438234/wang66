<template>
  <el-dialog
    :title="info.isAdd ? '角色信息添加':'角色信息修改'"
    @close="origin"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" validate :rules="rules" label-width="80px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="forminfo.rolename" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="角色权限" prop>
        <el-tree
          default-expand-all
          node-key="id"
          ref="tree"
          :data="menuList"
          show-checkbox
          :props="{children:'children',label:'title'}"
          :check-strictly="checkStrictly"
        ></el-tree>
      </el-form-item>
      <el-form-item label="角色状态">
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
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapMutations, mapActions } from "vuex";
let defaultItem = {
  rolename: "",
  menus: "",
  status: 1, // 状态1正常2禁用
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
      rules: {
        rolename: [
          { required: true, message: "请输入标题名称", trigger: "blur" },
        ],
      },
      checkStrictly: false,
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
      menuList: "menu/menuList",
    }),
  },
  mounted() {
    if (!this.roleList.length) {
      //当挂载完成后，判断menuList.length没有长度上，调用 this.get_menu_list()去请求数据库数据添加到state中menulist中保存
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
    }),
    setinfo(val) {
      let idarr = val.menus.split(",");
      console.log(idarr);
      console.log(idarr[0]);
      if (idarr[0]) {
        this.checkStrictly = true; // 父子互不关联！
        // 等到节点渲染完成再做某个事情！ this.$nextTick(()=>{  等到vue把节点渲染完成再做某些事情！ })
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.checkStrictly = false; // 又要父子互相关联！
        });
      }
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    submit() {
      // 获取选中的树形控件   ui框架有对应的方法
      // console.log(this.$refs.tree.getCheckedKeys())      // node-key="id"指获取其中每项的id字段
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        // idarr.length 为0的时候相当于是false  不能进行添加管理
        this.forminfo.menus = idarr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }
      //表单验证 没有输入不能提交
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加行为 还是修改
            res = await addRole(this.forminfo);
          } else {
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            // 再次获取列表，让仓库里面的数据是最新的！
            this.get_role_list();
            this.origin();
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
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.setinfo(defaultItem);
      }
    },
    origin() {
      //当使用弹窗的  X号关闭弹框时,执行的代码
      
      this.forminfo = { ...setItem }; // 无论是修改成功还是添加成功，都应该让表单为空！
      this.$refs.tree.setCheckedKeys([]);
    },
  },
  components: {},
};
</script>
<style scoped>
</style>