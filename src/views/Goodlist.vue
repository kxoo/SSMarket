<template>
  
</template>
<script>
import NavHeader from '@/components/Header.vue';
import NavFooter from '@/components/Footer.vue';
import axios from 'axios';

export default {
  data() {
    return {
      goodList: []
    }
  },
  mounted() {
    axios.get('/goods').then((res) => {
      
    })
  },
  components: {
    NavHeader,
    NavFooter
  }

}
</script>
