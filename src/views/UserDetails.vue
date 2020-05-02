<template>
  <div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
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
        let updateUser = {
          name: this.user.name,
          password: this.user.password
        };
        this.$http
          .put(
            "http://localhost:3000/users/" + this.$route.params.id,
            updateUser
          )
          .then(function() {
            this.$router.push({ path: "/Backstage/UserManagement" });
            this.$message({
              message: "用户修改成功",
              type: "success"
            });
          });
      }
    },
    fetchUser(id) {
      this.$http
        .get("http://localhost:3000/users/" + id)
        .then(function(response) {
          this.user = response.body;
        });
    }
  },
  created() {
    this.fetchUser(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>