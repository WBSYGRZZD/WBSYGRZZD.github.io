<template>
  <div>
    <el-form ref="form" :model="cargo" label-width="80px">
      <el-form-item label="商品类型">
        <el-select v-model="cargo.type" placeholder="请选择商品类型">
          <div v-for="type in types" :key="type.id">
            <el-option :label="type.type" :value="type.type"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="cargo.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="cargo.price"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button>
          <router-link to="/Backstage/CargoManagement">取消</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cargo: {},
      types: []
    };
  },
  methods: {
    onSubmit() {
      if (!this.cargo.name || !this.cargo.type || !this.cargo.price) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let updateCargo = {
          type: this.cargo.type,
          name: this.cargo.name,
          price: this.cargo.price,
          sales: 0
        };
        this.$http
          .put(
            "http://localhost:3000/cargos/" + this.$route.params.id,
            updateCargo
          )
          .then(function() {
            this.$router.push({ path: "/Backstage/CargoManagement" });
            this.$message({
              message: "商品修改成功",
              type: "success"
            });
          });
      }
    },
    fetchCargo(id) {
      this.$http
        .get("http://localhost:3000/cargos/" + id)
        .then(function(response) {
          this.cargo = response.body;
        });
    },
    fetchTypes() {
      this.$http.get("http://localhost:3000/types").then(function(response) {
        this.types = response.body;
      });
    }
  },
  created() {
    this.fetchCargo(this.$route.params.id);
    this.fetchTypes();
  }
};
</script>

<style lang="scss" scoped>
</style>