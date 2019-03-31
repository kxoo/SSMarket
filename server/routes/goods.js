var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');
var User = require('../models/user')
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
router.get('/view', function (req, res, next) {
  let page = Number(req.query.page);
  let pageSize = Number(req.query.pageSize);
  let sort = req.query.sort;

  let skip = (page - 1) * pageSize;
  startPrice = Number(req.query.startPrice);

  let data = {
    salePrice: {
      $gt: Number(req.query.startPrice),
      $lte: Number(req.query.endPrice),
    },
  };
  let goodsModel = Goods.find(data).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort})
  goodsModel.exec(function(err, doc) {
    if(err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '显示货品',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

router.post("/addCart", function(req, res, next) {
  let userId = req.cookies.userId;
  let productId = req.body.productId;
  User.findOne({ userId: userId })
  .then((UserDoc) => {
    let goodsItem = '';
    if(!UserDoc) {
      return Promise.reject();
    }
    UserDoc.cartList.forEach((item) => {
      if (item.productId === productId) {
        goodsItem = item;
        item.productNum++;
      }
    })
    if (!goodsItem) {
      Goods.findOne({
        productId: productId
      })
      .then((data) => {
        let doc = data;
        Reflect.set(doc._doc, 'productNum', 1);
        Reflect.set(doc._doc, 'checked', 1);
        return doc;
      })
      .then((data) => {
        UserDoc.cartList.push(data);
        UserDoc.save();
      })
    } else {
      UserDoc.save();
    }
  })
  .then(() => {
    return res.json({
      status: '0',
      msg: '添加购物车成功',
      result: ''
    })
  })
  .catch(e => {
    res.json({
      status: '1',
      msg: e.message
    })
  })
})

module.exports = router
