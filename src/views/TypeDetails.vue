<template>
  <div>
    <el-form ref="form" :model="type" label-width="80px">
      <el-form-item label="类型">
        <el-input v-model="type.type"></el-input>
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
      type: {}
    };
  },
  methods: {
    onSubmit() {
      if (!this.type.type) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let updateType = {
          type: this.type.type
        };
        this.$http
          .put(
            "http://localhost:3000/types/" + this.$route.params.id,
            updateType
          )
          .then(function() {
            this.$router.push({ path: "/Backstage/TypeManagement" });
            this.$message({
              message: "类型修改成功",
              type: "success"
            });
          });
      }
    },
    fetchType(id) {
      this.$http
        .get("http://localhost:3000/types/" + id)
        .then(function(response) {
          this.type = response.body;
        });
    }
  },
  created() {
    this.fetchType(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>