<template>
  <div>
    <el-form ref="form" :model="cargo" label-width="80px">
      <el-form-item label="类型">
        <el-select v-model="cargo.type" placeholder="请选择类型">
          <div v-for="type in types" :key="type.id">
            <el-option :label="type.type" :value="type.type"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="cargo.name"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="cargo.price"></el-input>
      </el-form-item>
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
      types: [],
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
      if (
        !this.cargo.name ||
        !this.cargo.type ||
        !this.cargo.price ||
        !this.fileList[0]
      ) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let updateCargo = {
          type: this.cargo.type,
          name: this.cargo.name,
          price: this.cargo.price,
          sales: 0,
          picurl: await this.base64(this.fileList[0])
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