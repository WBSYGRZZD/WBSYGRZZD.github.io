<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input"></el-input>
    </div>
    <el-table :data="filterBy(orders,input)">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image style="width: 75px; height: 75px" :src="scope.row.picurl" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="time" label="时间"></el-table-column>
      <el-table-column prop="username" label="买家"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="deleteOrder(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      input: ""
    };
  },
  methods: {
    deleteOrder(id) {
      this.$http.delete("http://localhost:3000/Orders/" + id).then(function() {
        this.$message({
          message: "订单删除成功",
          type: "success"
        });
        this.fetchOrders();
      });
    },
    fetchOrders() {
      this.$http.get("http://localhost:3000/orders").then(function(response) {
        this.orders = response.body;
      });
    },
    filterBy(orders, input) {
      return orders.filter(function(order) {
        return (
          order.name.match(input) ||
          order.type.match(input) ||
          order.username.match(input)
        );
      });
    }
  },
  created() {
    this.fetchOrders();
  }
};
</script>

<style lang="scss" scoped>
</style>