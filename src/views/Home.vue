<template>
  <div class="main">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <router-link to="/list"><img class="slide-img" :src="`${publicPath}static/img/swiperOne.jpg`" alt=""></router-link>
        </div>
        <div class="swiper-slide">
          <router-link to="/list"><img class="slide-img" :src="`${publicPath}static/img/swiperTwo.jpg`" alt=""></router-link>
        </div>
        <div class="swiper-slide">
          <router-link to="/list"><img class="slide-img" :src="`${publicPath}static/img/swiperThree.jpg`" alt=""></router-link>
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
          <img src="${publicPath}static/img/banner1.jpg" alt="" class="banner_img">
          <div>品质保证</div>
        </div>
        <div class="banner_item">
          <img src="${publicPath}static/img/banner2.jpg" alt="" class="banner_img">
          <div>研发创新</div>
        </div>
        <div class="banner_item">
          <img src="`${publicPath}static/img/banner3.jpg`" alt="" class="banner_img">
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

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      goodList: [
        {
          title: '356722',
          message: '',
          price: '539',
          img: 'img/card_0.jpg',
        },
        {
          title: '356741',
          message: '',
          price: '499',
          img: 'img/card_1.jpg',
        },
        {
          title: '359863',
          message: '',
          price: '259',
          img: 'img/card_2.jpg',
        },
        {
          title: '367980',
          message: '',
          price: '869',
          img: 'img/card_3.jpg',
        },
        {
          title: '367046',
          message: '',
          price: '869',
          img: 'img/card_4.jpg',
        },
        {
          title: '367811',
          message: '',
          price: '699',
          img: 'img/card_5.jpg',
        },
      ],
    };
  },
  components: {
    Item,
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
