<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input"></el-input>
    </div>
    <el-table :data="filterBy(cargos,input)" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column label="图片" width="200">
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
            <router-link :to="'/Home/Shopping/'+scope.row.id">购买</router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cargos: [],
      input: ""
    };
  },
  methods: {
    fetchCargos(type) {
      this.$http
        .get("http://localhost:3000/cargos?type=" + type)
        .then(function(response) {
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
    this.fetchCargos(this.$route.params.type);
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchCargos(to.params.type);
    next();
  }
};
</script>

<style lang="scss" scoped>
</style>