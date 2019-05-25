<template>
<el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
  <el-form-item
  v-for="(client, index) in dynamicValidateForm.client"
    :label="'我' + index"
    :key="client.key"
    :prop="'client.' + index + '.value'"
  >
    <el-input disabled v-model="dynamicValidateForm.client"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'主页' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
  >
    <el-input disabled v-model="domain.value"></el-input>
  </el-form-item>
  <el-form-item
    label="发送"
    :prop="dynamicValidateForm.data"
  >
    <el-input v-model="dynamicValidateForm.data"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
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
        value: item,
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
              console.log(this.dynamicValidateForm.data);
              this.addClient(String(this.dynamicValidateForm.data));
              this.dynamicValidateForm.data = '';
              console.log(res);
              Promise.resolve(res);
            }
          });
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
