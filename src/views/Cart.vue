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
        min-width="680">
      </el-table-column>
      <el-table-column
        prop="salePrice"
        label="单价"
        sortable
        min-width="180">
      </el-table-column>
      <el-table-column
        prop="productNum"
        label="数量"
        sortable
        min-width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-input-number :min="0" size="small" v-model="cartList[scope.$index].productNum" @change="handleSelectionChange(multipleSelection)"></el-input-number>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="sum-footer">
      <span style="display:inline-block; padding-right: 60px">总计: {{this.summary}}</span>
      <el-button type="primary" style="margin-right: 44px">购买</el-button>
    </div>
  </div>

  <!-- <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div> -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartList: [],
      multipleSelection: [],
      summary: 0
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
          const data = res.data.result;
          this.cartList = data;
          if (!this.cartList) return Promise.reject()
          for(let item in this.cartList) {
            this.cartList[item].productNum = Number(this.cartList[item].productNum);
          }
        } else {
          this.$message({
            message: `失败, ${res.data.msg}`,
            type: 'error'
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
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.summary = 0;
      for(let item of this.multipleSelection) {
        this.summary += (Number(item.productNum) * Number(item.salePrice))
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

