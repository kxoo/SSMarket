// 前端购物车页面，支持全选，显示总额，根据后端数据库接口判断
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
// 通过axios 进行http 请求，类似与ajax，触发局部刷新
import axios from 'axios';

export default {
  // 购物车数据，选择数目， 总额，默认是零，根据请求数据变化
  data() {
    return {
      cartList: [],
      multipleSelection: [],
      summary: 0,
    };
  },

  // 页面准备完成后进行初始化操作
  created() {
    this.init();
  },

  methods: {
    // 初始化操作 通过接口获取购物车数据
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
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        });
    },

    // 在前端界面改变选择状态
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

    // 遍历购物车，计算出总价，在页面下方显示
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

    // 对编辑购物车的操作作出处理，提交给后台数据库保存
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

    // 对删除购物车内容作出反应，并提交数据库保存
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

    // 提交按钮，根据是否选择了商品。来阻止用户进入下一步操作
    onPress() {
      if (!this.multipleSelection.length) {
        return this.$message({
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
