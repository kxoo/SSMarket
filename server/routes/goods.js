var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_shop', {
  useNewUrlParser: true
})

mongoose.connection.on("connected", function() {
  console.log('连接成功');
})
mongoose.connection.on("error", function () {
  console.log('连接error');
})
mongoose.connection.on("disconnected", function () {
  console.log('连接disconnected');
})

/* GET users listing. */
router.get('/', function (req, res, next) {
  // {} 查找条件
  Goods.find({}, function(err, doc) {
    if(err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        message: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
  // res.send('respond with goods');
});

module.exports = router;
