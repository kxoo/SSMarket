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
      <el-button>编辑</el-button>
      <el-button type="danger">取消</el-button>
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
      axios.get('users/order')
        .then((res) => {
          if (res.data.status === '0') {
            this.orderList = res.data.result;
            console.log(this.orderList)
            if (!this.orderList) return Promise.reject();
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        this.handleSelectionChange();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.orderList.forEach((res) => {
        res.checked = 0;
        this.handleEdit(res);
      });

      this.summary = 0;
      for (const item of this.multipleSelection) {
        item.checked = 1;
        this.summary += (Number(item.productNum) * Number(item.salePrice));
        this.handleEdit(item);
      }
    },

    handleEdit(row) {
      axios.post('users/cartEdit', {
        productId: row.productId,
        productNum: row.productNum,
        checked: row.checked,
      })
        .then((res) => {
          if (res.data.status !== '0') return Promise.reject(res);
        })
        .catch((e) => {
          this.$message({
            message: `失败, ${e.msg}`,
            type: 'error',
          });
        });
    },

    handleDelete(index, row) {
      axios.post('users/cartDel', { productId: row.productId })
        .then((res) => {
          if (res.data.status === '0') {
            return this.init();
          }
          return Promise.reject(res);
        })
        .then(() => {
          this.$message({
            message: '修改成功',
          });
        })
        .catch((e) => {
          this.$message({
            message: `失败, ${e}`,
            type: 'error',
          });
        });
    },

    onPress() {
      if (!this.multipleSelection) {
        this.$message({
          message: '请选择商品进行购买',
          type: 'error',
        });
      } else {
        this.$router.push({
          path: '/address',
          query: { summary: this.summary },
        });
      }
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
