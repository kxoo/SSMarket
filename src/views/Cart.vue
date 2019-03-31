<template>
   <el-table
    ref="multipleTable"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="商品"
      width="360">
    </el-table-column>
    <el-table-column
      prop="price"
      label="单价"
      width="120">
    </el-table-column>
    <el-table-column
      prop="total"
      label="小计"
      width="120">
    </el-table-column>
    <el-table-column
      prop="num"
      label="总计"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
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
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      axios.get('users/cartList')
      .then((res) => {
        if (res.status === '0') {
          const data = res.data;
          this.cartList = data;
        } else {
          console.log(res.data.msg);
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
    },
  },
};
</script>
