<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view class="main"></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/Header.vue';
import NavFooter from '@/components/Footer.vue';

export default {
  name: 'app',
  components: {
    NavHeader,
    NavFooter,
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

.main {
  min-height: 820px
}
</style>
