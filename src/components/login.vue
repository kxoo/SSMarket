<template>
  <div>
    <el-popover
    v-if="!toggle"
    placement="top-start"
    title="我的资料"
    width="200"
    trigger="hover"
    >
    <div>
      <div>用户名： {{name}}</div>
      <div>账户余额： {{wallet}}元</div>
    </div>
    <el-button type="text" @click="logout()">登出</el-button>
    <el-button type="text" slot="reference" @click="logout()">我的</el-button>
  </el-popover>
    <el-button type="text" @click="dialogVisible = true" v-if="toggle">登陆/注册</el-button>
    <el-dialog
      title="登陆"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-input autosize v-model="userName" placeholder="用户名"></el-input>
      <div style="margin: 4px 0;"></div>
      <el-input type="password" autosize v-model="userPwd" placeholder="密码" show-password></el-input>
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
      toggle: true,
      userName: '',
      name: '',
      userPwd: '',
      errorTip: false,
      dialogVisible: false,
    };
  },
  mounted() {
    this.checkLogin();
  },
  computed: {
    wallet() {
      console.log(this.$store.state.status)
      return this.$store.state.wallet
    }
  },
  methods: {
    checkLogin() {
      axios.post('/users/checkLogin')
        .then((res) => {
          console.log(res.data.msg);
          const data = res.data;
          if (data.status == '0') {
            this.name = data.result;
            this.toggle = false;
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
            console.log(data)
            this.dialogVisible = false;
            this.name = data.result.userName;
            this.toggle = false;
            console.log(res.data.result.wallet)
            this.$store.commit('set_wallet', res.data.result.wallet)
            this.userName = '';
            this.userPwd = '';
            // this.$router.go(0);
          } else {
            this.$message({
              message: `登陆 失败, ${res.data.msg}`,
              type: 'error',
            });
            this.errorTip = true;
          }
        });
    },

    logout() {
      this.$confirm('退出登陆?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          axios.post('/users/logout')
            .then((res) => {
              const data = res.data;
              this.$router.go(0);
              if (data.status === '0') {
                this.name = '';
                this.toggle = true;
                this.$message({
                  type: 'success',
                  message: '登出成功!',
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
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
