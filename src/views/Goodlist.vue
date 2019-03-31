<template>
  <div class="main">
    <el-row class="aside">
      <el-col :span="24">
        <h5>分类</h5>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>按价格</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="setPriceFilter()" style="padding-left: 68px">ALL</el-menu-item>
              <el-menu-item v-for="(item,index) in priceRange" index="index" style="padding-left: 68px"
              :key="index" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-row class="content">
      <el-col :span="6" v-for="item in goodList" :key="item.productId" :offset="1">
        <el-card :body-style="{ padding: '4px' , height: '380px' }">
          <img src="" class="image">
          <div style="padding: 14px 4px;" class="clearfix">
            <span style="display:inline-block; float:left">{{item.productName}}</span>
            <span style="display:inline-block; float:right">{{item.salePrice}}</span>
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
          endPrice: 100.00,
        },
        {
          startPrice: 100.00,
          endPrice: 500.00,
        },
        {
          startPrice: 500.00,
          endPrice: 1000.00,
        },
        {
          startPrice: 1000.00,
          endPrice: 5000.00,
        },
      ],
    };
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
          if(res.data.status === "0") {
            if (res.data.result.count === 0) return this.toggle = false;
            this.toggle = true;
            if (next) return this.goodList = this.goodList.concat(res.data.result.list);
            this.goodList = (res.data.result.list);
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error'
            })
          }

          console.log(res.data.msg);
        })
        .catch(e => {
          console.log(e)
        })
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
      if (typeof(index) !== 'number') {
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
            })
            console.log(res.data.msg);
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error'
            })
          }
        })
        .catch((e) => {
          this.$message({
            message: `失败, ${e}`,
            type: 'error'
          })
        });
    },
  },
};
</script>

<style lang="stylus" scoped>

.main
  display flex
  margin-top 20px

.aside
  flex 1
  box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  color #333

.aside-item
  padding-left 68px

.content
  flex 4

.item
  height 380px

.image
  height 320px

</style>

