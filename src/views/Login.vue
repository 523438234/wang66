<template>
  <div class="login">
    <el-row :span="8" class="login-box">
      <h3>小U商城管理系统</h3>
      <el-form :model="forminfo" ref="form" :rules="rules">
        <el-form-item prop="username">
          <el-input placeholder="请输入账号" v-model="forminfo.username" class="inps">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input placeholder="请输入密码" v-model="forminfo.password" class="inps">
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" class="login-btn">立即登录</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";
export default {
  data() {
    return {
      forminfo: {
        username: "王德舜",
        password: "admin",
      },
      rules: {
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    
  },
  created() {},
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login(this.forminfo);
        }
      });
    },
  },
  components: {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/bg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 500px;
  height: 300px;
  background-color: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  padding: 30px 40px;
  border-radius: 5px;
  border: 1px solid #eee;
}
.login-box h3 {
  text-align: center;
  margin-bottom: 20px;
}
.login-btn {
  width: 100%;
}
</style>