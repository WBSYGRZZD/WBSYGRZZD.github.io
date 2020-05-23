<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-col :span="3">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码">
        <el-col :span="3">
          <el-input v-model="form.password" show-password></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      users: []
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.name || !this.form.password) {
        this.$message({
          message: "请填写对应的信息",
          type: "warning"
        });
      } else {
        var index = this.users.findIndex(item => item.name == this.form.name);
        if (index == -1) {
          this.$message({
            message: "该用户未注册",
            type: "warning"
          });
        } else {
          var flag = this.users[index].type == "管理员";
          if (this.users[index].password == this.form.password) {
            let logging = {
              id: 1,
              islogging: 1,
              loggingid: this.users[index].id,
              loggingname: this.users[index].name,
              isadministrator: flag
            };
            this.$http
              .put("http://localhost:3000/logging/1", logging)
              .then(function() {
                this.$router.push({
                  path: "/PersonalCenter/" + this.users[index].id
                });
                this.$message({
                  message: "登录成功",
                  type: "success"
                });
              });
          } else {
            this.$message({
              message: "密码错误",
              type: "warning"
            });
          }
        }
      }
    },
    fetchusers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.users = response.body;
      });
    }
  },
  created() {
    this.fetchusers();
  }
};
</script>

<style lang="scss" scoped>
</style>