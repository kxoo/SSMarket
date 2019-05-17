<template>
  <div class="main">
  <router-link to="/person"><el-button type="primary" class="person">用户管理</el-button></router-link>
  <router-link to="/edit"><el-button type="success" class="order">订单管理</el-button></router-link>
  <router-link to="/addware"><el-button type="warning" class="wares">商品添加</el-button></router-link>
  <router-link to="/wares"><el-button type="danger" class="manage">商品管理</el-button></router-link>

  </div>
</template>

<style lang="stylus" scoped>

button
  width 42%
  height 300px
  margin 0
  float left
  margin 0 auto

</style>

