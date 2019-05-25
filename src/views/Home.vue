<template>
  <div class="main">
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
    <dialog v-bind:item="data" v-bind:dialogTableVisible="dialogTableVisible"></Dialog>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img class="slide-img" :src="`${publicPath}static/img/swiperOne.jpg`" alt="" @click="getGood(String(201710013))">
        </div>
        <div class="swiper-slide">
          <img class="slide-img" :src="`${publicPath}static/img/swiperTwo.jpg`" alt="" @click="getGood(String(201710014))">
        </div>
        <div class="swiper-slide">
          <img class="slide-img" :src="`${publicPath}static/img/swiperThree.jpg`" alt="" @click="getGood(String(201710015))">
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <item v-bind:goodList="goodList" ></item>
    <div class="">
      <!-- <div class="banner_tile"><h2>如何打造人民喜闻乐见的体育商城</h2></div> -->
      <div class="banner_main">
        <div class="banner_item">
          <img :src="`${publicPath}static/img/banner1.jpg`" alt="" class="banner_img">
          <div>品质保证</div>
        </div>
        <div class="banner_item">
          <img :src="`${publicPath}static/img/banner2.jpg`" alt="" class="banner_img">
          <div>研发创新</div>
        </div>
        <div class="banner_item">
          <img :src="`${publicPath}static/img/banner3.jpg`" alt="" class="banner_img">
          <div>提升表现</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
import Swiper from 'swiper';
import Item from '@/components/Item.vue';
import Dialog from '@/components/Dialog.vue';
import axios from 'axios';

export default {
  data() {
    return {
      item: '',
      data: '0000',
      dialogTableVisible: false,
      publicPath: process.env.BASE_URL,
      goodList: [
        {
          title: '2019 A2K 1787 SUPERSKIN 11.75 INFIELD BASEBALL GLOVE ',
          message: '',
          productId: '201710017',
          col: 12,
          price: '2160',
          img: 'img/1.jpg',
        },
        {
          title: '2018 A2000 1789 11.5 INFIELD/PITCHER\'S BASEBALL GLOVE',
          message: '',
          productId: '201710005',
          col: 12,
          price: '1560',
          img: 'img/2.jpg',
        },
        {
          title: 'EVOLUTION GAME BASKETBALL',
          message: '',
          productId: '201710004',
          col: 8,
          price: '360',
          img: 'img/7.jpg',
        },
        {
          title: 'NCAA OFFICIAL GAME BASKETBALL',
          message: '',
          productId: '201710008',
          col: 8,
          price: '420',
          img: 'img/8.jpg',
        },
        {
          title: 'EVOLUTION BLACK EDITION BASKETBALL',
          message: '',
          productId: '201710009',
          col: 8,
          price: '360',
          img: 'img/9.jpg',
        },
      ],
    };
  },
  components: {
    Item,
    Dialog,
  },
  mounted: () => {
    // eslint-disable-next-line
    new Swiper('.swiper-container', {
      loop: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  methods: {
    selectItem(id) {
      this.data = id;
      this.dialogTableVisible = true;
      console.log(123);
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

    // getGoodList() {
    //   axios.get('/goods').then((result) => {
    //     const res = result.data;
    //     this.goodList = res.result;
    //   });
    // },
  },

};

</script>

<style lang="stylus" scoped>
.whitespace
  width 10%

.main
  width 100%

.swiper-container
  width 100%
  height 360px
  text-align center

.swiper-slide
  display block
  width 1080px
  height 100%
  text-align center
  font-size 18px
  background #fff

.slide-img
  vertical-align middle
  width 100%
  height 100%

.time
    font-size 13px
    color #999

.bottom
  margin-top 13px
  line-height 12px

.button
  padding 0
  float right

.image
  width 100%
  display block

.banner_main
  display flex
  width 100%
  padding-left 3%
  margin-top 12px
  border-top #ccc thin solid

.banner_item
  flex-basis calc(33.3% - 32px)

.banner_img
  width 100%

h2
  font-family Biotif,"Noto Sans, Noto Sans JP, Noto Sans KR",Helvetica
  font-weight 700
  font-size 1.61rem
  line-height 2rem
  color #1a1a1a
  text-transform none
  letter-spacing -.5px
  text-shadow 0 0 black

</style>
