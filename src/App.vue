<template>
  <div id="app">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <router-link to="/Home">首页</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/ShoppingCart">购物车</router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <router-link to="/Backstage">后台</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style></style>