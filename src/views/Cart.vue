<template>
  <div>
    <el-table
    :data="cartList"
    stripe
    show-summary
    ref="multipleTable"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        min-width="68">
      </el-table-column>
      <el-table-column
        prop ="productName"
        label="商品"
        sortable
        min-width="280">
      </el-table-column>

      <el-table-column
        prop="salePrice"
        label="单价"
        sortable
        empty-text="空"
        min-width="120">
      </el-table-column>
      <el-table-column></el-table-column>
      <el-table-column
        prop="productNum"
        label="数量"
        empty-text="0"
        sortable
        min-width="120">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-input-number :min="1" size="small" v-model="scope.row.productNum" @change="handleSelectionChange(multipleSelection);"></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="sum-footer">
      <span style="display:inline-block; padding-right: 60px">总计: {{this.summary}}</span>
      <el-button type="primary" style="margin-right: 44px" @click="this.onPress">购买</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Promise } from 'q';

export default {
  data() {
    return {
      cartList: [],
      multipleSelection: [],
      summary: 0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      axios.get('users/cartList')
        .then((res) => {
          if (res.data.status === '0') {
            this.cartList = res.data.result;
            if (!this.cartList) return Promise.reject();
            const arr = [];
            for (const item in this.cartList) {
              this.cartList[item].productNum = Number(this.cartList[item].productNum);
              if (Number(this.cartList[item].checked) === 1) arr.push(this.cartList[item]);
            }
            this.toggleSelection([...arr]);
            console.log([...arr]);
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
      this.cartList.forEach((res) => {
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

.sum-footer
  position fixed
  width 100%
  height 66px
  z-index 999
  text-align right
  background-color #e9eaf5
  padding-top 22px
  bottom 0

</style>
