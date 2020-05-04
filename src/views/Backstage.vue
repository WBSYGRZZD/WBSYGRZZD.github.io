<template>
  <div>
    <el-row>
      <el-col :span="3">
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
              <router-link to="/Backstage/TypeManagement">类别管理</router-link>
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
      <el-col :span="21">
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
  }
};
</script>

<style lang="scss" scoped>
</style>
