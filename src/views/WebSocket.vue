<template>
<div>
  <div   class="chat">
    <div
  v-for="(domain, index) in dynamicValidateForm.domains"
  :key="index"
  >
    <span>{{domain.value}}</span>
  </div>
  </div>

  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" class="from">

  <el-form-item
    :prop="dynamicValidateForm.data"
  >
    <el-input  type="textarea" :rows="6" placeholder="请输入内容" v-model="dynamicValidateForm.data"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
  </el-form-item>
</el-form>
</div>

</template>
<script>
import io from 'socket.io-client';

export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          value: '',
        }],
        client: [{
          value: '',
        }],
        data: '12',
      },
    };
  },
  mounted() {
    this.socket = io.connect('http://localhost:2743', {
      transports: ['websocket'],
      reconnectionDelay: 2 * 1000,
      reconnectionDelayMax: 5 * 1000,
    });

    this.socket.on('receive', (data) => {
      if (!this.addDomain) return;
      this.addDomain(JSON.stringify(data));
    });

    this.socket.on('connect', () => {
      console.log('连接socket');
    });

    this.socket.on('connecting', () => {
      console.log('连接中socket');
    });

    this.socket.on('error', (msg) => {
    // console.log('出错了socket', msg)
    });

    this.socket.on('connect_failed', (msg) => {

    });

    this.socket.on('connect_timeout', (e) => {
      console.log(e.response, 'connect e---rr');
    });
  },
  methods: {
    addDomain(item) {
      this.dynamicValidateForm.domains.push({
        value: item,
        key: Date.now(),
      });
    },
    addClient(item) {
      this.dynamicValidateForm.client.push({
        value: `”我“:"${item}"`,
        key: Date.now(),
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.socket.emit('send', this.dynamicValidateForm.data, (res) => {
            if (typeof res === 'object' && res.error) {
              Promise.reject(res.message ? res.message : '请求数据验证失败, 请联系管理员!');
            } else {
              Promise.resolve(res);
            }
          });
          this.addDomain(String(`"我":"${this.dynamicValidateForm.data}"`));
          this.dynamicValidateForm.data = '';
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

  },

};
</script>

<style lang="stylus" scoped>
.from
  position fixed
  left 0
  bottom 400
  width 100%

.chat
  border 1px solid #434
  height 400px
  max-height 400px
  overflow scroll
  text-align left

</style>
