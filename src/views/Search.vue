<template>
  <div>

    <el-dialog title="商品详情" :visible.sync="dialogTableVisible">
      <el-card style=" margin: 4px ; border: 0 " shadow="hover">
        <img :src="`${publicPath}static/img/${item.productImage}`" class="image">
        <div style="padding:14px 4px;">
          <div class="item_price">¥{{item.salePrice}}.00</div>
          <div class="item_name clearfix">{{item.productName}}</div>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="addCart(item.productId)">加入购物车</el-button>
          </div>
        </div>
      </el-card>
    </el-dialog>
      <el-table
    :data="goodsList"
    style="width: 100%">
        <el-table-column
          prop="productId"
          label="产品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          width="266"
          label="产品名称">
        </el-table-column>
          <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
          <el-table-column
          prop="brand"
          label="品牌">
        </el-table-column>
        <el-table-column
          prop="salePrice"
          label="价格"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type=""
                @click="getGood(scope.row.productId)">查看</el-button>
            </template>
        </el-table-column>
      </el-table>
  </div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      item: '',
      publicPath: process.env.BASE_URL,
      goodsList: [],
      multipleSelection: [],
      summary: 0,
      dialogTableVisible: false,
    };
  },
  watch: {
  '$route'(to, from) { //监听路由是否变化
		  if(to.query.search != from.query.search){
			  this.init(to.query.search);//重新加载数据
      }
    }
  },
  methods: {
    init(data) {
      console.log(data)
      if(data) {
        axios.get('goods/search', {
        params: {
          search: data
        }
      })
        .then((res) => {
          console.log(res)
          if (res.data.status === '0') {
            this.goodsList = res.data.result;
            if (!this.goodsList) return Promise.reject();
            console.log(this.goodsList)
            for (const [index, item] in res.data.result) {
              if (this.goodsList[index].orderStatus == 1) this.goodsList[index].orderStatus = '完成';
              if (this.goodsList[index].orderStatus == 0) this.goodsList[index].orderStatus = '未完成';
            }
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        });
      }

    },

     getGood(id) {
      // 选择参数
      const param = {
        productId: id,
      };
      // 发送请求，根据获取的结果获得参数
      axios.get('/manage/good', {
        params: param,
      })
        .then((res) => {
          if (res.data.status === '0') {
            if (res.data.result.count === 0) return;
            // this.item = true;
            // if (next) return this.goodList = this.goodList.concat(res.data.result.list);
            this.item = (res.data.result);
            this.dialogTableVisible = true;
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
