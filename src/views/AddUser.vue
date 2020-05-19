<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <el-col :span="7">
          <el-input v-model="user.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="7">
          <el-input v-model="user.password" show-password></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>
          <router-link to="/Backstage/UserManagement">取消</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    onSubmit() {
      if (!this.user.name || !this.user.password) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let newUser = {
          name: this.user.name,
          password: this.user.password
        };
        this.$http
          .post("http://localhost:3000/users", newUser)
          .then(function() {
            this.$router.push({ path: "/Backstage/UserManagement" });
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

<style lang="scss" scoped>
</style>