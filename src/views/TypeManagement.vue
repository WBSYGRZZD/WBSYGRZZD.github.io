<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input"></el-input>
    </div>
    <el-button type="primary">
      <router-link to="/Backstage/AddType">添加</router-link>
    </el-button>
    <el-table :data="filterBy(types,input)" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="type" label="商品类型" width="180"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="'/Backstage/TypeDetails/'+types[scope.$index].id">查看详情</router-link>
          </el-button>
          <el-button type="primary" @click="deleteType(types[scope.$index].id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [],
      input: ""
    };
  },
  methods: {
    fetchTypes() {
      this.$http.get("http://localhost:3000/types").then(function(response) {
        this.types = response.body;
      });
    },
    deleteType(id) {
      this.$http.delete("http://localhost:3000/types/" + id).then(function() {
        this.$message({
          message: "类型删除成功",
          type: "success"
        });
        this.fetchTypes();
      });
    },
    filterBy(types, input) {
      return types.filter(function(type) {
        return type.type.match(input);
      });
    }
  },
  created() {
    this.fetchTypes();
  }
};
</script>

<style lang="scss" scoped></style>
