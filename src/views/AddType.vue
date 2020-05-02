<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品类型">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>
          <router-link to="/Backstage/CargoManagement">取消</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        type: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.type) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let newType = {
          type: this.form.type
        };
        this.$http
          .post("http://localhost:3000/types", newType)
          .then(function() {
            this.$router.push({ path: "/Backstage/TypeManagement" });
            this.$message({
              message: "类型添加成功",
              type: "success"
            });
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
