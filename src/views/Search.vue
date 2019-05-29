<template>
  <el-table
    :data="orderList"
    style="width: 100%">
    <el-table-column
      prop="createDate"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orderId"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="addressInfo.userName"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orderStatus"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="orderTotal"
      label="金额">
    </el-table-column>
    <el-table-column
      prop="status"
      label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type=""
            @click="onPress(scope.$index, scope.row)">查看</el-button>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orderList: [],
      multipleSelection: [],
      summary: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      console.log(this.$router)
      axios.get('goods/search', {
        params: {
          search: this.$route.query.search
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.status === '0') {
            this.orderList = res.data.result;
            if (!this.orderList) return Promise.reject();
            for (const [index, item] in res.data.result) {
              if (this.orderList[index].orderStatus == 1) this.orderList[index].orderStatus = '完成';
              if (this.orderList[index].orderStatus == 0) this.orderList[index].orderStatus = '未完成';
            }
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        });
    },

    onPress(index, row) {
      console.log(row)
      this.$router.push({
        path: '/finishOrder',
        query: {
          orderId: row.orderId,
          addressId: row.addressId,
          orderTotal: row.total,
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
