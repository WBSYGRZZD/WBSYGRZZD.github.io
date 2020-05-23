<template>
  <div>
    <h1>{{users[users.findIndex(item=>item.id==this.$route.params.loggingid)].name+"("+users[users.findIndex(item=>item.id==this.$route.params.loggingid)].type+")"}}</h1>
    <h1>欢迎您登录本系统</h1>
    <el-button type="primary" @click="onSubmit">退出登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    onSubmit() {
      let logging = {
        id: 1,
        islogging: 0,
        loggingid: 0,
        isadministrator: 0
      };
      this.$http
        .put("http://localhost:3000/logging/1", logging)
        .then(function() {
          this.$router.push({
            path: "/Home"
          });
          this.$message({
            message: "退出登录成功",
            type: "success"
          });
        });
    },
    fetchUsers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.users = response.body;
      });
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style lang="scss" scoped>
</style>