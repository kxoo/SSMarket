<template>
  <div>
    <el-container>
      <!-- // TODO: 需要带个名字显示用户名 this.name -->
      <el-header style="padding: 0">
        <el-menu
          :router = true
          class="el-menu-demo"
          mode="horizontal"
          background-color="#292525"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item class="logo" index = "/">
            <!-- <span><img src="../assets/logo.png" alt="" style="margin: -10px 0 0 -10px"></span> -->
            <img style="height: 98%; margin-top: -6px;" src="../assets/icon.png" alt="">
            </el-menu-item>
          <el-menu-item class="whitespace" index = '0'></el-menu-item>
          <el-menu-item index='1'>
            <el-input v-model="input" name ="search" placeholder="搜索商品"></el-input>
          </el-menu-item>
          <el-menu-item index =""><Login></Login></el-menu-item>
          <el-menu-item index="2">我的订单</el-menu-item>
          <el-menu-item index="/cart">购物车</el-menu-item>
        </el-menu>
      </el-header>
      <el-menu class="el-menu-demo" mode="horizontal" :router = true>
        <el-menu-item class="space" index = "/">首页</el-menu-item>
        <el-submenu index="1">
          <template slot="title">大球道具</template>
          <el-menu-item index="1-1">网球</el-menu-item>
          <el-menu-item index="1-2">棒球</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">小球道具</template>
          <el-menu-item index="2-1">篮球</el-menu-item>
          <el-menu-item index="2-2">橄榄球</el-menu-item>
        </el-submenu>
        <el-menu-item index="3">配件</el-menu-item>
        <el-menu-item index="4">儿童</el-menu-item>
      </el-menu>
    </el-container>
  </div>
</template>

<script>
// import './../assets/css/login.css'
import axios from 'axios';
import Login from '@/components/Login.vue';
// import Loading from './RequestLoading.vue'

export default {
  data() {
    return {
      input: '',
      name: '',
      userName: '',
      userPwd: '',
      errorTip: false,
      loginModalFlag: false,
    };
  },
  components: {
    Login,
  },
  mounted() {
  },
  methods: {
  },
  // components: {
  //   Loading,
  // },
};
</script>

<style lang="stylus" scoped>
.logo
  font-size 30px

.whitespace
  width 36%

.space
  width: 10%
</style>
