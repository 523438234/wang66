<template>
  <el-dialog
    :title="info.isAdd ? '添加商品规格':'修改商品规格'"
    @close="origin"
    :visible.sync="info.isShow"
    width="40%"
  >
    <el-form :model="forminfo" ref="form" validate :rules="rules" label-width="80px">
      <el-form-item label="属性名" prop="specsname">
        <el-input v-model="forminfo.specsname" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="属性值" prop="attrs">
        <label v-for="(item,index) in list" :key="index">
          <el-input
            style="display:inline-block;width:220px;margin-bottom:10px;"
            v-model="item.value"
            placeholder="请输入属性值"
          ></el-input>
          <el-button v-if="index==0" type="primary" @click="addAttrs">添加属性</el-button>
          <el-button v-else type="danger" @click="delAttrs(index)">删除属性</el-button>
        </label>
      </el-form-item>
      <el-form-item label="商品状态">
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
import { addSpecs, editSpecs } from "@/request/specs";
import { mapGetters, mapMutations, mapActions } from "vuex";
let defaultItem = {
  specsname: "",
  attrs: "",
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
        // specsname: [
        //   { required: true, message: "请输入标题名称", trigger: "blur" },
        // ],
      },
      list: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({
      specsList: "specs/specsList",
    }),
  },
  mounted() {
    if (!this.specsList.length) {
      this.get_Specs_list();
    }
  },
  methods: {
    addAttrs() {
      this.list.push({ value: "" });
    },
    delAttrs(index) {
      this.list.splice(index, 1);
    },
    ...mapActions({
      get_Specs_list: "specs/get_Specs_list",
    }),
    setinfo(val) {
      // 要变成对象赋值给this.list
      this.list=val.attrs.map(item=>{
        return {value:item};   
        //返回一个数组，数组每一项是个对象，并这个对象属性名为value 所以要这样写value:item
      })
      // this.list=val.attrs.map(item=>({
      //   value:item
      // }))
      console.log(this.list)
      defaultItem = { ...val };
      this.forminfo = { ...val };
    },
    submit() {
      //表单验证 没有输入不能提交
      if (!this.list.every((val) => val.value)) {
        this.$message.warning("请输入规格值");
        return;
      }
      this.forminfo.attrs = this.list.map((val) => val.value).join(",");
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.info.isAdd) {
            //判断是添加行为 还是修改
            res = await addSpecs(this.forminfo);
          } else {
            res = await editSpecs(this.forminfo);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            // 再次获取列表，让仓库里面的数据是最新的！
            this.get_Specs_list();
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
      this.list=[{value:''}];
      this.forminfo = { ...setItem }; // 无论是修改成功还是添加成功，都应该让表单为空！
    },
  },
  components: {},
};
</script>
<style scoped>
</style>