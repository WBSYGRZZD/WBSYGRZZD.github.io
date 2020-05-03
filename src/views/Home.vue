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
        <div v-if="!this.$route.params.type&&!this.$route.params.id">
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入内容" v-model="input"></el-input>
          </div>
          <div class="block">
            <el-carousel trigger="click" height="150px">
              <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small">{{ item }}</h3>
              </el-carousel-item>
            </el-carousel>
          </div>
          <el-table :data="filterBy(cargos,input)" style="width: 100%">
            <el-table-column prop="id" label="序号" width="200"></el-table-column>
            <el-table-column prop="picurl" label="图片" width="200">
              <template slot-scope="scope">
                <el-image style="width: 75px; height: 75px" :src="scope.row.picurl" fit="cover"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="类型" width="200"></el-table-column>
            <el-table-column prop="name" label="名称" width="200"></el-table-column>
            <el-table-column prop="price" label="价格" width="200"></el-table-column>
            <el-table-column prop="sales" label="销量" width="200"></el-table-column>
            <el-table-column label="操作" min-width="100">
              <template slot-scope="scope">
                <el-button type="text">
                  <router-link :to="'/Home/Shopping/'+cargos[scope.$index].id">购买</router-link>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
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
      types: [],
      cargos: [],
      input: ""
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
    },
    fetchCargos() {
      this.$http.get("http://localhost:3000/cargos").then(function(response) {
        this.cargos = response.body;
      });
    },
    filterBy(cargos, input) {
      return cargos.filter(function(cargo) {
        return cargo.name.match(input) || cargo.type.match(input);
      });
    }
  },
  created() {
    this.fetchCargos();
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