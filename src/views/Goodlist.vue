<template>
  <div class="main">
    <el-aside width="18%" class="aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <div  style="margin-top:60px; font-weight:700; font-size: 16px">分类</div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-circle-check-outline"></i>
              <span>按价格</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="setPriceFilter()" style="padding-left: 68px">ALL</el-menu-item>
              <el-menu-item v-for="(item,index) in priceRange" index="index" style="padding-left: 68px"
              :key="index" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
    </el-aside>
    <el-row class="content">
      <el-col :span="6" v-for="item in goodList" :key="item.productId" :offset="1" style="margin-bottom: 12px">
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
      </el-col>
      <el-col  v-show="toggle" style="margin-top: 24px">
        <span @click="nextPage()">加载更多</span>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      goodList: [],
      sortFlag: true,
      toggle: true,
      page: 1,
      pageSize: 9,
      priceChecked: {
        startPrice: 0,
        endPrice: 5000,
      },
      priceRange: [
        {
          startPrice: 0.00,
          endPrice: 300.00,
        },
        {
          startPrice: 300.00,
          endPrice: 800.00,
        },
        {
          startPrice: 800.00,
          endPrice: 1600.00,
        },
        {
          startPrice: 1600.00,
          endPrice: 5000.00,
        },
      ],
    };
  },
  watch: {
  '$route'(to, from) { //监听路由是否变化
		  if(to.params.id != from.params.id){
        this.page = 1,
        this.pageSize = 9,
        this.priceChecked = {
          startPrice: 0,
          endPrice: 5000,
        },
			  this.getGoodlist();//重新加载数据
      }
    }
  },
  mounted() {
    this.getGoodlist()
  },
  // computed: {
  //   type() {
  //     console.log(this.$route.param.id)
  //     return this.$route.param.id
  //     }
  // },
  methods: {
    // 获取商品列表，根据前台指定的参数提交给数据库进行查询
    getGoodlist(next) {
      // 选择参数
      const param = {
        id: this.$route.params.id,
        page: this.page,
        pageSize: this.pageSize,
        startPrice: this.priceChecked.startPrice,
        endPrice: this.priceChecked.endPrice,
        sort: this.sortFlag ? 1 : -1,
      };
      // 发送请求，根据获取的结果获得参数
      axios.get('/goods/view', {
        params: param,
      })
        .then((res) => {
          if (res.data.status === '0') {
            if (res.data.result.count === 0) {
              this.goodList = []
              return this.toggle = false;
            }

            this.toggle = true;
            if (next) return this.goodList = this.goodList.concat(res.data.result.list);
            this.goodList = (res.data.result.list);
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

    // 支持翻页操作，再次提交上述的方法，实现代码复用
    nextPage() {
      this.page++;
      this.getGoodlist(true);
    },

    // 修改商品排列顺序，复用方法 getGoodslist()
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodlist();
    },

    //  设置价格过滤，显示符合指定参数的商品
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

    // 能够把商品添加到购物车当中，失败后还能够提供错误信息告知用户
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

.main
  display flex

.el-aside
  color: #333;
  text-align: center;
  // line-height: 200px;

.aside
  box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)

.aside-item
  padding-left 68px

.content
  flex 4

.item
  height 380px

.item_name
  overflow hidden
  white-space nowrap
  text-overflow ellipsis
  width 100%
  height 24px
  float left

.item_price
  float left
  color #da003d
  margin 6px 0 6px 6px

</style>
