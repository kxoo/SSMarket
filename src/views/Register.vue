<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="register">
    <!-- // TODO: -->
    <!-- <span class="title">注册用户</span> -->
    <el-form-item
     label="用户名"
     :rules="[
        { required: true, message: '请输入用户名', trigger: 'blur' },
      ]">
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
      ]"
    >
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item
      label="电话"
      prop="tel"
      :rules="[
        { required: true, message: '电话不能为空'},
        { type: 'number', message: '电话必须为数字值'}
      ]"
    >
      <el-input type="tel" v-model.number="ruleForm.tel" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item
      label="地址"
      :rules="[
        { required: true, message: '请输入地址', trigger: 'blur' },
       ]">
      <el-input v-model="ruleForm.address" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        email: '',
        tel: '',
        pass: '',
        checkPass: '',
        address: '',
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    goBack() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/');
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/users/register', this.ruleForm)
            .then((res) => {
              if (res.data.status === '0') {
                this.$message({
                  showClose: true,
                  message: '注册成功',
                  type: 'success',
                });
                this.goBack();
              } else {
                this.$message({
                  message: `失败, ${res.data.msg}`,
                  type: 'error',
                });
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.$message({
            message: '失败, 请填写所有项目',
            type: 'error',
          });
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
.register
  margin-top 40px
  width 40%
  margin-left 30%

.title
  display block
  margin-left 30px

</style>
