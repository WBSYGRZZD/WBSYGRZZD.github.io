<template>
  <div>
    <el-button type="primary">
      <router-link to="/Backstage/AddCarousel">添加</router-link>
    </el-button>
    <el-table :data="carousels" style="width: 100%">
      <el-table-column prop="id" label="序号" width="200"></el-table-column>
      <el-table-column label="图片" width="200">
        <template slot-scope="scope">
          <el-image style="width: 75px" :src="scope.row.picurl" fit="cover"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button type="text">
            <router-link :to="'/Backstage/CarouselDetails/'+scope.row.id">查看详情</router-link>
          </el-button>
          <el-button type="primary" @click="deleteCarousel(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousels: []
    };
  },
  methods: {
    deleteCarousel(id) {
      this.$http
        .delete("http://localhost:3000/carousels/" + id)
        .then(function() {
          this.$message({
            message: "轮播图删除成功",
            type: "success"
          });
          this.fetchCarousels();
        });
    },
    fetchCarousels() {
      this.$http
        .get("http://localhost:3000/carousels")
        .then(function(response) {
          this.carousels = response.body;
        });
    }
  },
  created() {
    this.fetchCarousels();
  }
};
</script>

<style lang="scss" scoped>
</style>