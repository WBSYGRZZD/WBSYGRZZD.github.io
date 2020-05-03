<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12" :offset="6">
        <div>
          <img :src="cargo.picurl" width="300px" />
          <h3>{{cargo.name}}</h3>
          <h3>{{cargo.price}}</h3>
          <el-button type="primary" @click="addShoppingCart">加入购物车</el-button>
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
      cargo: {},
      shoppingcarts: [],
      shoppingcart: {}
    };
  },
  methods: {
    addShoppingCart() {
      if (
        this.shoppingcarts.findIndex(item => item.id == this.cargo.id) == -1
      ) {
        this.cargo.count = 1;
        console.log(this.cargo);
        this.$http
          .post("http://localhost:3000/shoppingcarts", this.cargo)
          .then(function() {
            this.$message({
              message: "购物车添加成功",
              type: "success"
            });
          });
      } else {
        this.cargo.count = this.shoppingcart.count + 1;
        this.$http
          .put(
            "http://localhost:3000/shoppingcarts/" + this.$route.params.id,
            this.cargo
          )
          .then(function() {
            this.$message({
              message: "购物车添加成功",
              type: "success"
            });
          });
      }
    },
    fetchShoppingCarts() {
      this.$http
        .get("http://localhost:3000/shoppingcarts")
        .then(function(response) {
          this.shoppingcarts = response.body;
        });
    },
    fetchShoppingCart(id) {
      this.$http
        .get("http://localhost:3000/shoppingcarts/" + id)
        .then(function(response) {
          this.shoppingcart = response.body;
        });
    },
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
    this.fetchShoppingCarts();
    this.fetchShoppingCart(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>