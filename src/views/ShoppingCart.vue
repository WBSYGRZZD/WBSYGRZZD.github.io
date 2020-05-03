<template>
  <div>
    <el-table :data="shoppingcarts" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column prop="picurl" label="图片" width="200">
        <template slot-scope="scope">
          <el-image style="width: 75px; height: 75px" :src="scope.row.picurl" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="200"></el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="price" label="单价（元）" width="200"></el-table-column>
      <el-table-column width="200">
        <template slot-scope="scope">
          <el-checkbox v-model="checkeds[scope.$index]" @change="calculationSum"></el-checkbox>
        </template>
      </el-table-column>
    </el-table>
    <h3>总价：{{sum}}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingcarts: [],
      checkeds: [],
      input: "",
      sum: 0
    };
  },
  methods: {
    calculationSum() {
      this.sum = 0;
      this.shoppingcarts
        .filter((item, index) => this.checkeds[index])
        .forEach(Element => (this.sum += Number(Element.price)));
    },
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