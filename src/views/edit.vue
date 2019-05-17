<template>
<div>
    <el-table
    :data="cartList"
    ref="multipleTable"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        prop ="productName"
        label="商品"

        min-width="280">
      </el-table-column>

      <el-table-column
        prop="salePrice"
        label="单价"

        empty-text="空"
        min-width="120">
      </el-table-column>
      <el-table-column></el-table-column>
      <el-table-column
        prop="productNum"
        label="数量"
        empty-text="0"

        min-width="120">
        <!-- <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-input-number :min="1" size="small" v-model="scope.row.productNum" @change="handleSelectionChange(multipleSelection);"></el-input-number>
          </div>
        </template> -->
      </el-table-column>
    </el-table>

    <div class="item">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="订单号">
 <el-input
  placeholder="015545594693860"
  v-model="input"
  :disabled="true">
</el-input>
    </el-form-item>
          <el-form-item label="订单总额">
    <el-input v-model="formLabelAlign.type" placeholder="1298"  :disabled="true"></el-input>
    </el-form-item>
  <el-form-item label="联系电话">
    <el-input v-model="formLabelAlign.region" placeholder="13752661896"></el-input>
  </el-form-item>
  <el-form-item label="联系人">
    <el-input v-model="formLabelAlign.type" placeholder="分"></el-input>
  </el-form-item>
  <el-form-item label="地址">
    <el-input v-model="formLabelAlign.name" placeholder="xiqing"></el-input>
  </el-form-item>
  <el-form-item label="邮政编码">
    <el-input placeholder="300000"></el-input>
  </el-form-item>
  <el-button type="primary" placeholder="015545594693860">保存</el-button>
    <el-button>退出</el-button>
</el-form>
    </div>

</div>

</template>

<script>
import axios from 'axios';

export default {

  data() {
    return {
      labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
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

.item
  padding 32px 0 0 32px

</style>
