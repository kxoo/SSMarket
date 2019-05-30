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

          <el-menu-item index="/cart" style="float: right">购物车</el-menu-item>
          <el-menu-item index="/order" style="float: right">我的订单</el-menu-item>
          <el-menu-item index ="" style="float: right"><Login></Login></el-menu-item>
          <el-menu-item index = "search" style="float: right">
            <el-input v-model="input" name ="search" placeholder="搜索商品" @keyup.enter.native="onSubmit"></el-input>
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-menu class="el-menu-demo" mode="horizontal" :router = true           :default-active="$route.path">
        <el-menu-item class="space" index = "/list/all">所有商品</el-menu-item>
        <el-submenu index="1">
          <template slot="title">小球器具</template>
          <el-menu-item index="/list/tennis">网球</el-menu-item>
          <el-menu-item index="/list/baseball">棒球</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">大球器具</template>
          <el-menu-item index="/list/basketball">篮球</el-menu-item>
          <el-menu-item index="/list/football">橄榄球</el-menu-item>
        </el-submenu>
        <el-menu-item index="/list/all">配件</el-menu-item>
        <el-menu-item index="/list/children">儿童</el-menu-item>
        <el-menu-item index="/webSocket" style="float: right"><el-button type="info" plain >在线咨询</el-button></el-menu-item>
        <el-menu-item index="/board" style="float: right"><el-button type="info" plain>公告</el-button></el-menu-item>
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
    onSubmit() {
      this.$router.push({ path: 'search', query: { search: this.input }})
    },
    onPress(id) {
      this.$router.push({ path: 'list', query: { id: id }})
    }
  },
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
