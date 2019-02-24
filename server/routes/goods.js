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
  // let page = parseInt(req.param('page'))
  let page = Number(req.query.page);
  // let priceMin = Number(req.query.priceMin)
  // let priceMax = Number(req.query.priceMax)
  let pageSize = Number(req.query.pageSize);
  let sort = req.query.sort;
  
  let skip = (page-1) * pageSize;
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

router.post("/addCart", function(req, res, next) {
  let userId = '100000077';
  console.log(req.body)
  let productId = req.body.productId;
  // let User = require('../models/user')
console.log(1)
  User.findOne({ userId: userId })
  .then((UserDoc) => {
    let goodsItem = '';
    if(!UserDoc) {
      return Promise.reject()
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
      .then((res) => {
        // goodsItem = doc
        let doc = res
        Reflect.set(doc._doc, 'productNum', 1)
        Reflect.set(doc._doc, 'checked', 1)
        console.log(doc._doc)
        return doc
        // return UserDoc.cartList.push(res);
        // console.log(goodsItem, doc.checked,doc)
      })
      .then((res) => {
        // res.productNum = 1;
        // res.checked = 1;
        

        console.log(res)
        UserDoc.cartList.push(res)
        UserDoc.save()
      })
    } else {
      UserDoc.save()
    }
  })
  .then(() => {
    return res.json({
      status: '0',
      msg: '',
      result: 'succeed'
    })
    return Promise.resolve('succeed')
  })
  .catch(e => {
    res.json({
      status: '1',
      msg: e
    })
    console.log(e)
  }) 
})

module.exports = router
