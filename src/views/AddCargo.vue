<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="商品类型">
        <el-select v-model="form.type" placeholder="请选择商品类型">
          <div v-for="type in form.types" :key="type.id">
            <el-option :label="type.type" :value="type.type"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>

      <el-upload
        class="upload-demo"
        action="#"
        :http-request="httpRequest"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
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
      form: {
        name: "",
        types: [],
        type: "",
        price: ""
      },
      fileList: []
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    httpRequest(data) {
      this.fileList.push(data.file);
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
      if (!this.form.name || !this.form.type || !this.form.price) {
        this.$message({
          message: "请添加对应的信息！",
          type: "warning"
        });
      } else {
        let newCargo = {
          type: this.form.type,
          name: this.form.name,
          price: this.form.price,
          sales: 0,
          picurl: await this.base64(this.fileList[0])
        };
        this.$http
          .post("http://localhost:3000/cargos", newCargo)
          .then(function() {
            this.$router.push({ path: "/Backstage/CargoManagement" });
            this.$message({
              message: "商品添加成功",
              type: "success"
            });
          });
      }
    },
    fetchTypes() {
      this.$http.get("http://localhost:3000/types").then(function(response) {
        this.form.types = response.body;
      });
    }
  },
  created() {
    this.fetchTypes();
  }
};
</script>

<style lang="scss" scoped></style>
