<template>
  <div>
    <nav-header></nav-header>
    <div class="main">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><router-link to=""><img src="../../static/img/homeOne.jpg" alt=""></router-link></div>
          <div class="swiper-slide"><router-link to=""><img src="../../static/img/homeTwo.jpg" alt=""></router-link></div>
          <div class="swiper-slide"><router-link to=""><img src="../../static/img/homeThree.jpg" alt=""></router-link></div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
    <el-row :gutter="12">
      <el-col :span="8" v-for="(o, index) in 3" :key="o">
        <el-card :body-style="{ padding: '0px' }">
          <img src="" class="image">
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
// import axios from 'axios';
import Swiper from 'swiper';
import NavHeader from '@/components/Header.vue';
import NavFooter from '@/components/Footer.vue';

export default {
  data() {
    return {
      goodList: ['ss', 'dd'],
    };
  },
  components: {
    NavHeader,
    NavFooter,
  },
  mounted: () => {
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
  height 600px

.swiper-container
  width 100%
  height 100%

.swiper-slide
  text-align center
  font-size 18px
  background #fff

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
