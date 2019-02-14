<template>
  <div>
    <NavHeader></NavHeader>
    <div v-for="item in goodList" :key="item.productId">
      <div>{{item.productName}}</div>
    </div>
    <NavFooter></NavFooter>
  </div>
</template>
<script>
import NavHeader from '@/components/Header.vue';
import NavFooter from '@/components/Footer.vue';
import axios from 'axios';

export default {
  data() {
    return {
      goodList: [],
    };
  },
  mounted() {
    axios.get('/goods').then((res) => {
      // console.log(Reflect.get(res, ))
      this.goodList = (res.data.result.list);
      console.log(res.data.result);
      console.log(this.goodList);
    });
  },
  components: {
    NavHeader,
    NavFooter,
  },

};
</script>
