<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from '@/components/Header.vue';

export default {
  name: 'app',
  components: {
    NavHeader,
  },
};
</script>

<style>
#app {
  font-family: "Helvetica",Helvetica,"PingFang SC",
  "Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
