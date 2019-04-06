<template>

</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      toggle: false,
      address: [],
      currentAddress: 0,
      name: '',
      location: '',
      tel: '',
      post:''
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      axios.get('users/addressList')
      .then((res) => {
        this.address = res.data.result;
        this.currentAddress = this.address[0];
      })
    },
    createAddress() {
      axios.post('users/createAddress', {
        userName : this.name,
        streeName : this.location,
        postCode : this.postCode,
        tel : this.tel
      })
      .then(res => {
        if(res.data.status === '0') {
          this.toggle = false;
          this.init();
        } else {
          this.$message({
            message: `添加地址失败`,
            type: 'error',
          })
        }
      })
    },
    delAddress() {
      axios.post("users/delAddress", {
        addressId : this.addressId
      })
      .then(res => {
        if(res.data.status === '0') {
          this.$message({
            message: `删除成功`,
          });
          this.init();
        } else {
          this.$message({
            message: `失败, ${res.data.msg}`,
            type: 'error',
          });
        }
      })
    }
  }
}
</script>
