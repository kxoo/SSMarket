<template>
  <div class="main">
    <el-row :gutter="12">
      <el-col :span="6" v-for="item in address" :key="item.addressId" >
        <el-card shadow="hover" @click="selectItem(item)">
          <dl style="text-align: left">
            <dd class="address">{{'收件人:' + item.userName}}</dd>
            <dd class="address" >{{'收货地址:' + item.streetName}}</dd>
            <dd class="address">{{'联系电话:' + item.tel}}</dd>
          </dl>
          <div style="text-align: right">
            <el-button type="info" plain icon="el-icon-delete" @click="delAddress(item)"></el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-button type="text" @click="dialogFormVisible = true" class="addrButton">添加新的地址</el-button>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="收件人" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.location" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" :label-width="formLabelWidth">
          <el-input v-model="form.postCode" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createAddress">确 定</el-button>
      </div>
    </el-dialog>
    <div class="sum-footer">
      <el-button type="primary" style="margin-right: 44px" @click="onPress">下一步</el-button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialogFormVisible: false,
      address: [],
      currentAddress: 0,
      form: {
        name: '',
        location: '',
        postCode: '',
        tel: '',
      },
      formLabelWidth: '120px',
    };
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
          return Promise.resolve();
        });
    },
    createAddress() {
      axios.post('users/createAddress', {
        userName: this.form.name,
        streetName: this.form.location,
        postCode: this.form.postCode,
        tel: this.form.tel,
      })
        .then((res) => {
          if (res.data.status === '0') {
            this.$message({
              message: '添加成功',
            });
            return this.init();
          }
          return Promise.reject();
        })
        .then(() => {
          this.form = {
            name: '',
            location: '',
            post: '',
            tel: '',
          };
          this.dialogFormVisible = false;
        })
        .catch((e) => {
          this.$message({
            message: `添加地址失败${e}`,
            type: 'error',
          });
        });
    },
    delAddress(item) {
      axios.post('users/delAddress', {
        addressId: item.addressId,
      })
        .then((res) => {
          if (res.data.status === '0') {
            this.$message({
              message: '删除成功',
            });
            this.init();
          } else {
            this.$message({
              message: `失败, ${res.data.msg}`,
              type: 'error',
            });
          }
        });
    },
    selectItem(item) {
      this.currentAddress = item;
      axios.post();
    },
    onPress() {
      axios.post('users/payMent', {
        addressId: this.currentAddress.addressId,
        orderTotal: this.$route.query.summary,
      })
        .then((res) => {
          if (res.data.status === '0') {
            this.$router.push({
              path: '/finishOrder',
              query: {
                addressId: this.currentAddress.addressId,
                orderTotal: this.$route.query.summary,
              },
            });
          } else {
            Promise.reject(res.data.msg);
          }
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>

.main
  margin-top 32px
  margin-left 32px

.addrButton
  margin-top 34px

.address
  margin-bottom 12px

.sum-footer
  position fixed
  width 100%
  height 66px
  z-index 999
  text-align right
  background-color #e9eaf5
  padding-top 22px
  bottom 0

</style>
