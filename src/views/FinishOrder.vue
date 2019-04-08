<template>
  <div class="main">
    <div class="status"><i class="el-icon-check"></i> Nice ! 购买成功 !</div>
    <div>{{this.route.query.orderId}}</div>
  </div>
</template>

<script>

export default {

};
</script>


<style lang="stylus" scoped>

.main
  display flex
  justify-content center
  align-items center
  font-size 32px

</style>
