<template>
  <div class="main">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <router-link to="/list"><img class="slide-img" src="../assets/static/img/swiperOne.jpg" alt=""></router-link>
        </div>
        <div class="swiper-slide">
          <router-link to="/list"><img class="slide-img" src="../assets/static/img/swiperTwo.jpg" alt=""></router-link>
        </div>
        <div class="swiper-slide">
          <router-link to="/list"><img class="slide-img" src="../assets/static/img/swiperThree.jpg" alt=""></router-link>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
    <item v-bind:goodList="goodList" ></item>
  </div>
</template>

<script>
// import axios from 'axios';
import Swiper from 'swiper';
import Item from '@/components/Item.vue';

export default {
  data() {
    return {
      goodList: [
        {
          title: '356722',
          price: '539',
          img: require('../assets/static/img/card_0.jpg'),
        },
        {
          title: '356741',
          price: '499',
          img: require('../assets/static/img/card_1.jpg'),
        },
        {
          title: '359863',
          price: '259',
          img: require('../assets/static/img/card_2.jpg'),
        },
        {
          title: '367980',
          price: '869',
          img: require('../assets/static/img/card_3.jpg'),
        },
        {
          title: '367046',
          price: '869',
          img: require('../assets/static/img/card_4.jpg'),
        },
        {
          title: '367811',
          price: '699',
          img: require('../assets/static/img/card_5.jpg'),
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

.clearfix:before,
.clearfix:after
  display table
  content ""

.clearfix:after
  clear both

</style>
