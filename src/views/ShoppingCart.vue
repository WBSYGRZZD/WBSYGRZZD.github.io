<template>
  <div>
    <el-table :data="shoppingcarts" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column label="商品图片" width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 75px; height: 75px"
            :src="shoppingcarts[scope.$index].picurl"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="商品类型" width="200"></el-table-column>
      <el-table-column prop="name" label="商品名称" width="200"></el-table-column>
      <el-table-column prop="price" label="商品价格" width="200"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingcarts: [],
      input: ""
    };
  },
  methods: {
    deleteCargo(id) {
      this.$http
        .delete("http://localhost:3000/shoppingcarts/" + id)
        .then(function() {
          this.$message({
            message: "商品删除成功",
            type: "success"
          });
          this.fetchShoppingCarts();
        });
    },
    fetchShoppingCarts() {
      this.$http
        .get("http://localhost:3000/shoppingcarts")
        .then(function(response) {
          this.shoppingcarts = response.body;
        });
    }
  },
  created() {
    this.fetchShoppingCarts();
  }
};
</script>

<style lang="scss" scoped>
</style>