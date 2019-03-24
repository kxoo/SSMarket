<template>
  <div>
    <el-button type="text" @click="dialogVisible = true">登陆/注册</el-button>
    <el-dialog
      title="登陆"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input autosize v-model="userName" placeholder="用户名"></el-input>
      <div style="margin: 4px 0;"></div>
      <el-input autosize v-model="userPwd" placeholder="密码"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="login()">登陆</el-button>
        <el-button @click="dialogVisible = false"><router-link to="/register">注册</router-link></el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userName: '',
      userPwd: '',
      errorTip: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      axios.get('/users/checkLogin')
        .then((res) => {
          const data = res.data;
          if (data.status == '0') {
            this.name = data.result;
          }
        });
    },
    login() {
      if (!this.userName || !this.userPwd) {
        this.errorTip = true;
        return;
      }
      axios.post('/users/login', {
        userName: this.userName,
        userPwd: this.userPwd,
      })
        .then((res) => {
          const data = res.data;
          if (data.status == '0') {
            this.dialogVisible = false;
            this.name = data.userName;
          // TODO:
          } else {
            this.errorTip = true;
          }
        });
    },
    // TODO: 添加界面 块
    logout() {
      axios.post('/users/logout')
        .then((res) => {
          const data = res.data;
          if (data == '0') {
            this.name = '';
          }
        });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>
