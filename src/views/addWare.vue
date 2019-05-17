<template>
  <el-form :model="goodItem" class="form-inline">
    <el-form-item label="产品id">
      <el-input v-model="goodItem.productId" placeholder="产品id"></el-input>
    </el-form-item>
    <el-form-item label="产品名称">
      <el-input v-model="goodItem.productName" placeholder="产品名称"></el-input>
    </el-form-item>
    <el-form-item label="品牌">
      <el-input v-model="goodItem.brand" placeholder="品牌"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-input v-model="goodItem.type" placeholder="类型"></el-input>
    </el-form-item>
    <el-form-item label="价格">
      <el-input v-model="goodItem.salePrice" placeholder="价格"></el-input>
    </el-form-item>
    <el-form-item label="图片">
      <el-input v-model="goodItem.productImage" placeholder="图片"></el-input>
      <el-upload
        class="upload-demo"
        action="`${publicPath}static/img/`"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">添加</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import Axios from 'axios';

  export default {
    data() {
      return {
        publicPath: process.env.BASE_URL,
        goodItem: {
          productId: '',
          productName: '',
          productImage: '',
          brand: '',
          type: '',
          salePrice: ''
        }
      }
    },
    methods: {
         handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>


<style lang="stylus" scoped>
.form-inline
  width 66%
  margin 0 auto
</style>
