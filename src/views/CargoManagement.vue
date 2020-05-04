<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input"></el-input>
    </div>
    <el-button type="primary">
      <router-link to="/Backstage/AddCargo">添加</router-link>
    </el-button>
    <el-table :data="filterBy(cargos,input)" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <el-image style="width: 75px; height: 75px" :src="scope.row.picurl" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" width="200"></el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="price" label="价格" width="200"></el-table-column>
      <el-table-column prop="sales" label="销量" width="200"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="'/Backstage/CargoDetails/'+scope.row.id">查看详情</router-link>
          </el-button>
          <el-button type="primary" @click="deleteCargo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cargos: [],
      input: ""
    };
  },
  methods: {
    deleteCargo(id) {
      this.$http.delete("http://localhost:3000/cargos/" + id).then(function() {
        this.$message({
          message: "商品删除成功",
          type: "success"
        });
        this.fetchCargos();
      });
    },
    fetchCargos() {
      this.$http.get("http://localhost:3000/cargos").then(function(response) {
        this.cargos = response.body;
      });
    },
    filterBy(cargos, input) {
      return cargos.filter(function(cargo) {
        return cargo.name.match(input) || cargo.type.match(input);
      });
    }
  },
  created() {
    this.fetchCargos();
  }
};
</script>

<style lang="scss" scoped>
</style>
