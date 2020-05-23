<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="Home"></el-tab-pane>
      <el-tab-pane v-if="logging.isadministrator" label="后台" name="Backstage"></el-tab-pane>
      <el-tab-pane v-if="logging.islogging" label="购物记录" name="ShoppingHistory"></el-tab-pane>
      <el-tab-pane v-if="logging.islogging" label="购物车" name="ShoppingCart"></el-tab-pane>
      <el-tab-pane v-if="logging.islogging" label="个人中心" name="PersonalCenter"></el-tab-pane>
      <el-tab-pane v-if="!logging.islogging" label="未登录" name="login"></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      activeName: "Home",
      logging: {}
    };
  },
  methods: {
    handleClick(tab) {
      if (this.activeName == "PersonalCenter") {
        this.$router.push({
          path: "/PersonalCenter/" + this.logging.loggingid
        });
      } else {
        this.$router.push({ path: "/" + tab.name });
      }
    },
    fetchlogging() {
      this.$http.get("http://localhost:3000/logging").then(function(response) {
        this.logging = response.body[0];
      });
    }
  },
  created() {
    this.fetchlogging();
  },
  watch: {
    $route(to, from) {
      if (to.path.slice(0, 16) == "/PersonalCenter/" && from.path == "/login") {
        this.fetchlogging();
        this.activeName = "PersonalCenter";
      } else if (
        from.path.slice(0, 16) == "/PersonalCenter/" &&
        to.path == "/Home"
      ) {
        this.fetchlogging();
        this.activeName = "Home";
      }
    }
  }
};
</script>

<style>
</style>