<template>
  <div>
    <el-col :span="11" :offset="6">
      <el-table :data="shoppingcarts">
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image style="width: 75px; height: 75px" :src="scope.row.picurl" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="price" label="单价（元）"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-checkbox v-model="checkeds[scope.$index]" @change="calculationSum"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="deleteShoppingCart(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <h3>总价：{{sum}}</h3>
    </el-col>
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
    deleteShoppingCart(id) {
      this.$http
        .delete("http://localhost:3000/shoppingcarts/" + id)
        .then(function() {
          this.$message({
            message: "购物车删除成功",
            type: "success"
          });
          this.checkeds.splice(id, 1);
          this.fetchShoppingCarts();
          this.calculationSum();
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