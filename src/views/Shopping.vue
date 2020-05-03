<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div>
          <img :src="cargo.picurl" width="300px" />
          <h3>{{cargo.name}}</h3>
          <h3>{{cargo.price}}</h3>
          <el-button type="primary">加入购物车</el-button>
          <el-button type="primary">购买</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cargo: {}
    };
  },
  methods: {
    fetchCargo(id) {
      this.$http
        .get("http://localhost:3000/cargos/" + id)
        .then(function(response) {
          this.cargo = response.body;
        });
    }
  },
  created() {
    this.fetchCargo(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>