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
      label="商品名称"
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
  <el-button @click="onPress()" v-if="Number(display) === 0">付款</el-button>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      userId: '',
      data: [],
      address: [],
      total: 0,
      orderId: 0
    };
  },
  computed: {
    display() {
      return this.$store.state.app.status
    }
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder() {
      axios.get('users/user')
        .then((res) => {
          const item = this.$route.query;
          this.userId = res.data.result.userId
          this.$store.commit('set_wallet', res.data.result.wallet)
          for (const index in res.data.result.orderList) {
            const message = Reflect.get(res.data.result.orderList, index);
            if (message.orderId === item.orderId) {
              this.orderId = message.orderId;
              this.data = message.goodsList;
              this.address = message.addressInfo;
              this.total = message.orderTotal;
              this.$store.commit('set_status', message.orderStatus)
              return
            }
          }
        });
    },
    onPress() {
      axios.post('users/payment', {
        userId: this.userId,
        orderId: this.orderId,
        orderTotal: String(this.total)
      })
      .then(res => {
        if(res.data.status === 1) {
           this.$message({
          message: `购买成功`,
          type: 'danger'
        });
        }
        this.$store.dispatch('SetWallet', this.$store.state.app.wallet - this.total)
        this.$store.dispatch('SetStatus', 1)
        this.$message({
          message: `购买成功`,
        });
      })
    }
  },
};
</script>


<style lang="stylus" scoped>

.inline
  margin:0 24px

</style>
