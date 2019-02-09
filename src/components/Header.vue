<template>
  <el-container>
    <el-header style="padding: 0">
      <el-menu
        :router=true
        class="el-menu-demo"
        mode="horizontal"
        background-color="#292525"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item class="logo" index = 'home'><span><img src="../assets/logo.png" alt="" style="margin: -10px 0 0 -10px"></span> sportShop</el-menu-item>
        <el-menu-item class="whitespace" index = '0'></el-menu-item>
        <el-menu-item index='1'><el-input v-model="input" placeholder="搜索商品"></el-input></el-menu-item>
        <el-menu-item index="2">我的订单</el-menu-item>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">管理</el-menu-item>
      </el-menu>
    </el-header>
    <el-menu class="el-menu-demo" mode="horizontal">
    <el-menu-item class="space" index = "5">首页</el-menu-item>
    <el-submenu index="1">
      <template slot="title">服装</template>
      <el-menu-item index="1-1">男性</el-menu-item>
      <el-menu-item index="1-2">女性</el-menu-item>
      <el-menu-item index="2-3">健身器具</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">器具</template>
      <el-menu-item index="2-1">大球类</el-menu-item>
      <el-menu-item index="2-2">小球类</el-menu-item>
      <el-menu-item index="2-3">健身器具</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3">配件</el-menu-item>
    <el-menu-item index="4">儿童</el-menu-item>
  </el-menu>
  </el-container>

</template>

<script>
// import Loading from './RequestLoading.vue'

export default {
  data() {
    return {
      input: '',
    };
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
  width 40%

.space
  width: 10%
</style>

