<template>
  <div>
    <el-row>
      <el-col :span="2">
        <el-menu @open="handleOpen" @close="handleClose">
          <el-menu-item index="1">
            <i class="el-icon-s-goods"></i>
            <span slot="title">
              <router-link to="/Backstage/CargoManagement">商品管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">
              <router-link to="/Backstage/TypeManagement">类型管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-picture"></i>
            <span slot="title">
              <router-link to="/Backstage/CarouselManagement">轮播图管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">
              <router-link to="/Backstage/OrderManagement">订单管理</router-link>
            </span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-s-custom"></i>
            <span slot="title">
              <router-link to="/Backstage/UserManagement">用户管理</router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="11" :offset="6">
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Backstage",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.$router.push({ path: "/Backstage/CargoManagement" });
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #000;
  text-decoration: none;
  display: inline-block;
  width: 100%;
}
a:hover,
.el-menu > .el-menu-item:hover a {
  font-size: 120%;
  font-weight: bold;
  color: #190d0d;
}
</style>
