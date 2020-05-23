<template>
  <div>
    <el-col :span="11" :offset="6">
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input"></el-input>
      </div>
      <el-table :data="filterBy(orders,input,logging.loggingname)">
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
      </el-table>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      logging: {},
      input: ""
    };
  },
  methods: {
    fetchOrders() {
      this.$http.get("http://localhost:3000/orders").then(function(response) {
        this.orders = response.body;
      });
    },
    fetchlogging() {
      this.$http.get("http://localhost:3000/logging").then(function(response) {
        this.logging = response.body[0];
      });
    },
    filterBy(orders, input, username) {
      return orders.filter(function(order) {
        return (
          order.username == username &&
          (order.name.match(input) ||
            order.type.match(input) ||
            order.username.match(input))
        );
      });
    }
  },
  created() {
    this.fetchOrders();
    this.fetchlogging();
  }
};
</script>

<style lang="scss" scoped>
</style>