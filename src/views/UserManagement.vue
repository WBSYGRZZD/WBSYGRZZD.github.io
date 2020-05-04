<template>
  <div>
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="input"></el-input>
    </div>
    <el-button type="primary">
      <router-link to="/Backstage/AddUser">添加</router-link>
    </el-button>
    <el-table :data="filterBy(users,input)" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180"></el-table-column>
      <el-table-column prop="name" label="用户名" width="180"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="'/Backstage/UserDetails/'+scope.row.id">查看详情</router-link>
          </el-button>
          <el-button type="primary" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      input: ""
    };
  },
  methods: {
    fetchUsers() {
      this.$http.get("http://localhost:3000/users").then(function(response) {
        this.users = response.body;
      });
    },
    deleteUser(id) {
      this.$http.delete("http://localhost:3000/users/" + id).then(function() {
        this.$message({
          message: "用户删除成功",
          type: "success"
        });
        this.fetchUsers();
      });
    },
    filterBy(users, input) {
      return users.filter(function(user) {
        return user.name.match(input);
      });
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style lang="scss" scoped>
</style>