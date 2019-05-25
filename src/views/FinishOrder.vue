<template>
<div>
  <el-table
    :data="data"
    border
    style="width: 100% ;height: 18%">
    <el-table-column
      prop="productId"
      label="商品ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="productName"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="productNum"
      label="数量"
      width="220"
      >
    </el-table-column>
    <el-table-column
      prop="salePrice"
      label="商品单价"
      width="220"
      >
    </el-table-column>
  </el-table>
  <el-form :inline="true" :model="address" class="inline" width="100%" style="margin-top: 24px">
    <el-form-item label="收货人">
      <el-input v-model="address.userName" disabled></el-input>
    </el-form-item>
    <el-form-item label="联系电话">
      <el-input v-model="address.tel" disabled></el-input>
    </el-form-item>
    <el-form-item label="订单金额">
      <el-input v-model="total" disabled></el-input>
    </el-form-item>
    <el-form-item label="收货地址" width="100%">
      <el-input v-model="address.streetName" disabled></el-input>
    </el-form-item>
  </el-form>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      data: [],
      address: [],
      total: 0,
    };
  },
  created() {
    this.getOrder();
  },
  methods: {

    getOrder() {
      axios.get('users/user')
        .then((res) => {
          console.log(res.data.result);
          const item = this.$route.query;
          console.log(item);
          for (const index in res.data.result.orderList) {
            const message = Reflect.get(res.data.result.orderList, index);
            if (message.orderId === item.orderId) {
              this.data = message.goodsList;
              this.address = message.addressInfo;
              console.log(this.data, this.address);
              this.total = message.orderTotal;
            }
          }
        });
    },
  },
};
</script>


<style lang="stylus" scoped>

.inline
  margin:0 24px

</style>
