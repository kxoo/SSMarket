<template>
  <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
    <el-table :data="gridData">
      <img :src="`${publicPath}static/img/banner1.jpg`" alt="" class="banner_img">
      <el-table-column property="date" label="日期" width="150"></el-table-column>
      <el-table-column property="name" label="姓名" width="200"></el-table-column>
      <el-table-column property="address" label="地址"></el-table-column>
      <el-button type="primary" round>添加购物车</el-button>
    </el-table>
  </el-dialog>

</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      data: {},
    };
  },
  props: {
    item: {
      type: String,
      required: true,
    },
    dialogTableVisible: {
      type: Boolean,
      required: true,
    },
  },
  updated: () => {
    console.log(456);
    axios.get('goods/good', {
      params: {
        productId,
      },
    })
      .then((res) => {
        this.data = res.data.result;
      });
  },

};
</script>
