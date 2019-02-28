<template>
  <div>
    <div class="aside">
      <div>
        <span>sort by</span>
        <span>Default</span>
        <a href="" @click="sortGoods"></a>
      </div>
      <div>
        <dl>
          <dt>Price</dt>
          <dd @click="setPriceFilter()">ALL</dd>
          <dd v-for="(item,index) in priceRange"
          :key="index" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</dd>
          <dd><a href="" @click="addCart(item.productId)"></a></dd>
        </dl>
      </div>
    </div>

    <div v-for="item in goodList" :key="item.productId">
      <img src="item.productImage" alt="">
      <div>{{item.productName}}</div>
      <div>{{item.salePrice}}</div>
      <div>
        <span @click="addCart(item.productId)">加入购物车</span>
      </div>
    </div>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
import NavFooter from '@/components/Footer.vue';
import axios from 'axios';
import { isNumber } from 'util';

export default {
  data() {
    return {
      goodList: [],
      sortFlag: true,
      page: 1,
      pageSize: 17,
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
    NavFooter,
  },
  methods: {
    getGoodlist() {
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
          this.goodList = (res.data.result.list);
          console.log(res);
        });
    },
    sortGoods() {
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodlist();
    },
    setPriceFilter(index) {
      if (!isNumber(index)) {
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
            console.log('ok');
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
