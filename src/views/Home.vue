<template>
  <div class="home">
    <el-row>
      <el-col :span="2">
        <el-menu v-for="type in types" :key="type.id" @open="handleOpen" @close="handleClose">
          <el-menu-item>
            <span slot="title">
              <router-link :to="'/Home/Type/'+type.id">{{type.type}}</router-link>
            </span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="22">
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
</style>
