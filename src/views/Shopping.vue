<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div>
          <img :src="cargo.picurl" width="300px" />
          <h3>{{cargo.name}}</h3>
          <h3>{{cargo.price}}</h3>
          <el-button type="primary" @click="addShoppingCart">加入购物车</el-button>
          <el-button type="primary" @click="addOrder">购买</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cargo: {},
      users: [],
      logging: {}
    };
  },
  methods: {
    addOrder() {
      if (!this.logging.islogging) {
        this.$message("您还没有登录，请先登录");
      } else {
        let newOrder = {
          type: this.cargo.type,
          name: this.cargo.name,
          price: this.cargo.price,
          picurl: this.cargo.picurl,
          time:
            new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            new Date().getDate(),
          username: this.logging.loggingname
        };
        this.$http
          .post("http://localhost:3000/orders", newOrder)
          .then(function() {
            this.$message({
              message: "商品购买成功",
              type: "success"
            });
          });
      }
    },
    addShoppingCart() {
      if (!this.logging.islogging) {
        this.$message("您还没有登录，请先登录");
      } else {
        var userindex = this.users.findIndex(
          item => item.id == this.logging.loggingid
        );
        var shoppingcartindex = this.users[userindex].shoppingcarts.findIndex(
          item => item.id == this.cargo.id
        );
        if (shoppingcartindex == -1) {
          this.cargo.count = 1;
          this.users[userindex].shoppingcarts.push(this.cargo);
          this.$http
            .put(
              "http://localhost:3000/users/" + this.logging.loggingid,
              this.users[userindex]
            )
            .then(function() {
              this.$message({
                message: "购物车添加成功",
                type: "success"
              });
            });
        } else {
          this.users[userindex].shoppingcarts[shoppingcartindex].count++;
          this.$http
            .put(
              "http://localhost:3000/users/" + this.logging.loggingid,
              this.users[userindex]
            )
            .then(function() {
              this.$message({
                message: "购物车添加成功",
                type: "success"
              });
            });
        }
        this.fetchUsers();
      }
    },
    fetchUsers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.users = response.body;
      });
    },
    fetchCargo(id) {
      this.$http
        .get("http://localhost:3000/cargos/" + id)
        .then(function(response) {
          this.cargo = response.body;
        });
    },
    fetchLogging() {
      this.$http.get("http://localhost:3000/logging").then(function(response) {
        this.logging = response.body[0];
      });
    }
  },
  created() {
    this.fetchCargo(this.$route.params.id);
    this.fetchLogging();
    this.fetchUsers();
  }
};
</script>

<style lang="scss" scoped>
</style>