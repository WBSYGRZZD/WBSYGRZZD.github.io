<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input"></el-input>
    </div>
    <el-table :data="filterBy(cargos,input)" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column label="商品图片" width="200">
        <template slot-scope="scope">
          <img :src="cargos[scope.$index].picurl" width="75" />
        </template>
      </el-table-column>
      <el-table-column prop="type" label="商品类型" width="200"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="200"></el-table-column>
      <el-table-column prop="sales" label="商品销量" width="200"></el-table-column>
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