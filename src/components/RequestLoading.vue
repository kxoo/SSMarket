<template>
  <transition name="fade-transform" mode="out-in">
    <div class="request-loading-component" v-if="requestLoading">加载中 ( *｀ω´)</div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'RequestLoading',
  computed: {
    ...mapGetters([
      'requestLoading',
    ]),
  },
};
</script>

<style lang="stylus" scoped>
.request-loading-component
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  background-color transparent
  font-size 150px
  display flex
  flex-direction row
  justify-content center
  align-items center
  z-index 9999
</style>
