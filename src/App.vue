<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="首页" name="Home"></el-tab-pane>
      <el-tab-pane label="后台" name="Backstage"></el-tab-pane>
      <el-tab-pane label="购物车" name="ShoppingCart"></el-tab-pane>
      <el-tab-pane label="未登录" name="login"></el-tab-pane>
    </el-tabs>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",

  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick(tab) {
      this.$router.push({ path: "/" + tab.name });
    },
    login() {}
  }
};
</script>

<style>
</style>