// 引入express 作为后端项目
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//引入经过mongoose 构建的模型
var Goods = require('../models/goods');
var User = require('../models/user');
var Board = require('../models/boards');

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/db_shop', {
  useNewUrlParser: true
})
// 链接成果、失败、 断开的指示
mongoose.connection.on("connected", function() {
  console.log('连接成功');
})
mongoose.connection.on("error", function () {
  console.log('连接error');
})
mongoose.connection.on("disconnected", function () {
  console.log('连接disconnected');
})


router.get('/getBoard', (req, res, next) => {
  Board.find().sort({ time: -1 }).limit(1)
    .then(doc => {
      if (doc) {
        Board.updateOne({ time: doc[0].time }, { $inc: { reader: 1 } }, (res, err) => {
          console.log(res)
        })
        res.json({
          status: '0',
          msg: '显示公告',
          result: doc
        })
      }
    })
    .then(err => {
      console.log(err)
    })
})

/* GET goodss listing. */
router.get('/view', function (req, res, next) {
  // 查看商品请求，能够根据请求商品显示的数量和页数，进行指定商品的请求
  let page = Number(req.query.page);
  let pageSize = Number(req.query.pageSize);
  let sort = req.query.sort;

  let skip = (page - 1) * pageSize;
  // 能够根据请求的商品价格，来获取指定的商品进行显示
  startPrice = Number(req.query.startPrice);

  let data = {
    // $gt $lte 获取区间内指定数值
    salePrice: {
      $gt: Number(req.query.startPrice),
      $lte: Number(req.query.endPrice),
    },
  };


  // 查找数据库内容，通过mongoose api fing() 查找，skip() limit(), 做出限制，获得指定的数据
  let goodsModel = Goods.find(data).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice': sort})

  // 执行查找之后，得到的数据作为doc，传递给前台系统，同样还能够将发生的错误报文传递
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

router.get("/board", (req, res, next) => {

  Board.find().sort({ time: -1 }).limit(1)
    .then(doc => {
      if (doc) {
        Board.updateOne({ time: doc[0].time }, { $inc: { reader: 1 } }, (doc, err) => {
          return res.json({
            status: '0',
            msg: 'board',
            result: doc
          })
        })
      }
    })
    .then(err => {
      console.log(err)
    })
})

router.get("/good", (req, res, next) => {
  let param = {
    productId: req.query.productId
  }
  Good.findOne(param)
    .then(doc => {
      if (doc) {
        res.json({
          status: '0',
          msg: '存在商品',
          result: doc
        })
      } else {
        res.json({
          status: '1',
          msg: '错误'
        })
      }
    })
    .catch(err => {
      res.json({
        status: '1',
        msg: err.message
      })
    })
})

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
