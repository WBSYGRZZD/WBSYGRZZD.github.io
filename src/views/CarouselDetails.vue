<template>
  <div>
    <el-form ref="form" :model="carousel" label-width="80px">
      <el-form-item label="名称">
        <el-col :span="7">
          <el-input v-model="carousel.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="#"
          :http-request="httpRequest"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>
          <router-link to="/Backstage/CarouselManagement">取消</router-link>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carousel: {},
      fileList: []
    };
  },
  methods: {
    handleRemove() {},
    handlePreview() {},
    handleExceed() {
      this.$message.warning(`当前限制选择1个文件`);
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    httpRequest(data) {
      this.fileList[0] = data.file;
    },
    base64: file =>
      new Promise(resolve => {
        let reader = new FileReader();
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      }),
    async onSubmit() {
      if (!this.carousel.name || !this.fileList[0]) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let updateCarousel = {
          name: this.carousel.name,

          picurl: await this.base64(this.fileList[0])
        };
        this.$http
          .put(
            "http://localhost:3000/carousels/" + this.$route.params.id,
            updateCarousel
          )
          .then(function() {
            this.$router.push({ path: "/Backstage/CarouselManagement" });
            this.$message({
              message: "轮播图修改成功",
              type: "success"
            });
          });
      }
    },
    fetchCarousel(id) {
      this.$http
        .get("http://localhost:3000/carousels/" + id)
        .then(function(response) {
          this.carousel = response.body;
        });
    }
  },
  created() {
    this.fetchCarousel(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
</style>