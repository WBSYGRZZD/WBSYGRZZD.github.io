<template>
  <div>
    <el-col :span="11" :offset="6">
      <el-table
        :data="users[users.findIndex(
          item => item.id == logging.loggingid
        )].shoppingcarts"
      >
        <el-table-column prop="id" label="序号"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <el-image style="width: 75px; height: 75px" :src="scope.row.picurl" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="price" label="单价（元）"></el-table-column>
        <el-table-column label="数量" width="180">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.count"
              @change="handleChange()"
              :min="1"
              :max="10"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="金额（元）">
          <template slot-scope="scope">{{scope.row.price*scope.row.count}}</template>
        </el-table-column>
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
      <el-button type="primary" @click="addOrder()">添加订单</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkeds: [],
      users: [],
      logging: [],
      sum: 0
    };
  },
  methods: {
    addOrder() {
      var userindex = this.users.findIndex(
        item => item.id == this.logging.loggingid
      );
      this.users[userindex].shoppingcarts.forEach((item, index) => {
        if (this.checkeds[index]) {
          for (var i = 0; i < item.count; i++) {
            let newOrder = {
              type: item.type,
              name: item.name,
              price: item.price,
              picurl: item.picurl,
              time:
                new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate(),
              username: this.logging.loggingname
            };
            this.$http.post("http://localhost:3000/orders", newOrder);
          }
        }
      });
      this.$message({
        message: "订单添加成功",
        type: "success"
      });
    },
    handleChange() {
      var userindex = this.users.findIndex(
        item => item.id == this.logging.loggingid
      );
      this.$http.put(
        "http://localhost:3000/users/" + this.logging.loggingid,
        this.users[userindex]
      );
      this.calculationSum();
    },
    calculationSum() {
      this.sum = 0;
      this.users[
        this.users.findIndex(item => item.id == this.logging.loggingid)
      ].shoppingcarts
        .filter((item, index) => this.checkeds[index])
        .forEach(
          Element => (this.sum += Number(Element.price) * Number(Element.count))
        );
    },
    deleteShoppingCart(id) {
      var userindex = this.users.findIndex(
        item => item.id == this.logging.loggingid
      );
      var shoppingcartsindex = this.users[userindex].shoppingcarts.findIndex(
        item => item.id == id
      );
      this.users[userindex].shoppingcarts.splice(shoppingcartsindex, 1);
      this.$http
        .put(
          "http://localhost:3000/users/" + this.logging.loggingid,
          this.users[userindex]
        )
        .then(function() {
          this.$message({
            message: "购物车删除成功",
            type: "success"
          });
          this.fetchUsers();
          this.calculationSum();
        });
    },
    fetchLogging() {
      this.$http.get("http://localhost:3000/logging").then(function(response) {
        this.logging = response.body[0];
      });
    },
    fetchUsers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.users = response.body;
      });
    }
  },
  created() {
    this.fetchUsers();
    this.fetchLogging();
  }
};
</script>

<style lang="scss" scoped>
</style>