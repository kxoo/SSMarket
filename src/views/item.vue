


<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orderid"
      label="订单号">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
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
    export default {
      data() {
        return {
          tableData: [{
            date: '2018-04-26',
            name: 'ddd',
            orderid: '015545594693860',
            status: '已付款'
          }, {
            date: '2018-4-30',
            name: 'ddd',
            orderid: '915545595068824',
            status: '已付款'
          }, {
            date: '2018-05-01',
            name: 'ddd',
            orderid: '915545595167178',
            status: '已付款'
          }, {
            date: '2018-05-03',
            name: 'ddd',
            orderid: '015546074052524',
            status: '已付款'
          }]
        }
      },

  mounted() {
    this.getGoodlist();
  },
  components: {
  },
  methods: {
    getGoodlist(next) {
      const param = {
        page: this.page,
        pageSize: this.pageSize,
        startPrice: this.priceChecked.startPrice,
        endPrice: this.priceChecked.endPrice,
        sort: this.sortFlag ? 1 : -1,
      };

      axios.get('/goods/view', {
        params: param,
      })
        .then((res) => {
          if (res.data.status === '0') {
            if (res.data.result.count === 0) return this.toggle = false;
            this.toggle = true;
            if (next) return this.goodList = this.goodList.concat(res.data.result.list);
            this.goodList = (res.data.result.list);
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }

          console.log(res.data.msg);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    nextPage() {
      this.page++;
      this.getGoodlist(true);
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodlist();
    },
    setPriceFilter(index) {
      if (typeof (index) !== 'number') {
        this.priceChecked = {
          startPrice: 0,
          endPrice: 5000,
        };
      } else {
        this.priceChecked = this.priceRange[index];
      }
      this.page = 1;
      this.getGoodlist();
    },
    addCart(productId) {
      axios.post('/goods/addCart', {
        productId,
      })
        .then((res) => {
          if (res.data.status == 0) {
            this.$message({
              message: res.data.msg,
            });
            console.log(res.data.msg);
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        })
        .catch((e) => {
          this.$message({
            message: `失败, ${e}`,
            type: 'error',
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>


</style>
