<template>
  <div class="home">
    <el-row>
      <el-col :span="2">
        <el-menu v-for="type in types" :key="type.id" @open="handleOpen" @close="handleClose">
          <el-menu-item>
            <span slot="title">
              <router-link :to="'/Home/Type/'+type.type">{{type.type}}</router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="22">
        <div class="block">
          <span class="demonstration">Click 指示器触发</span>
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3 class="small">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <router-view />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      types: []
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    fetchTypes() {
      this.$http.get("http://localhost:3000/types").then(function(response) {
        this.types = response.body;
      });
    }
  },
  created() {
    this.fetchTypes();
  }
};
</script>

<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>