// 将mongoose 引入项目
const mongoose = require('mongoose');

// 引入mongoo Schema 映射定义的文档集
const Schema = mongoose.Schema;

// 定义表结构
const userSchema = new Schema({
  "userId": String,
  "userName": String,
  "userEmail": String,
  "userTel": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [{
    "productId": String,
    "productName": String,
    "salePrice": String,
    "productImage": String,
    "checked": String,
    "productNum": Number
  }],
  "addressList": [{
    "addressId": String,
    "userName": String,
    "streetName": String,
    "postCode": Number,
    "tel": Number,
    "isDefault": Boolean
  }]
})

//通过model 生成模型，用来操作数据库
module.exports = mongoose.model("User", userSchema)
