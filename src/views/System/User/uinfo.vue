<template>
  <el-dialog
    :title="info.isAdd ? '管理员添加':'管理员修改'"
    @close="origin"
    :visible.sync="info.isShow"
    width="40%"
  >
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" validate :rules="rules" label-width="90px">
      <el-form-item label="角色名称" prop>
        <el-select v-model="forminfo.roleid" placeholder="请选择">
          <el-option
            v-for="item in roleList"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="管理员名称" prop>
        <el-input v-model="forminfo.username" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop>
        <el-input v-model="forminfo.password" :placeholder="info.isAdd ?'请填入密码':'密码为空表示不修改密码'"></el-input>
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
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapMutations, mapActions } from "vuex";
let defaultItem = {
  roleid: "",
  username: "",
  password: "",
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
          roleid: [{ required: true, message: "必填！", trigger: "blur" }],
          username: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
      userList: "user/userList",
    }),
  },
  mounted() {
    if (!this.roleList.length) {
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list",
    }),
    setinfo(val) {
      val.password = "";
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
            console.log("添加");
            res = await addUser(this.forminfo);
          } else {
            console.log("修改");
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            // 再次获取列表，让仓库里面的数据是最新的！
            this.get_user_list();
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