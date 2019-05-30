// 引入express 作为后端项目
var express = require('express');
const path = require('path')

var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer')
const app = express()

// var upload = multer({ dest: 'uploads/' })
// app.use(express.static(path.join(__dirname, 'public')));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/static/img');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})


var upload = multer({ storage: storage })
//引入经过mongoose 构建的模型
var Good = require('../models/goods');
var User = require('../models/user');
var Board = require('../models/boards');
var Manage = require('../models/manages');

router.post('/upload', upload.single('avatar'), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any

  res.json({
    status: '0',
    msg: '存在',
    result: req.file.path
  })
});

router.post("/login", (req, res, next) => {
  let param = {
    manager: req.body.userName,
    password: req.body.userPwd,
  }
  Manage.findOne(param)
    .then(doc => {
      if (doc) {
        res.cookie("manageId", doc.manageId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: '0',
          msg: '登陆成功',
          result: {
            manager: res.manager
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '用户名或密码错误'
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

router.get('/users', function (req, res, next) {
  let userModel = User.find()

  userModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '显示用户',
        result: doc,
      })
    }
  })
});

router.get("/user", (req, res, next) => {
  let param = {
    userId: req.query.userId
  }
  User.findOne(param)
    .then(doc => {
      if (doc) {
        res.json({
          status: '0',
          msg: '存在用户',
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

router.post('/editUser', (req, res, next) => {
  let params = {
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userTel: req.body.userTel,
    userPwd: req.body.userPwd,
  }
  User.findOneAndUpdate({ userId: req.body.userId }, { $set: params }, {}, function (err, docs) {
    if (err) {
      res.json({
        status: '0',
        msg: '存在',
        result: docs
      })
    }
    res.json({
      status: '0',
      msg: '存在',
      result: docs
    })
  })
})

router.get('/goods', function (req, res, next) {
  let goodModel = Good.find()

  goodModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '显示商品',
        result: doc,
      })
    }
  })
});

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
        msg: err
      })
    })
})

router.post("/reject", (req, res, next) => {
  userId = req.body.userId
  reject = req.body.reject
  User.updateOne({ userId }, { $inc: { wallet: reject } }, (res, err) => {
  })
})

// 添加商品
router.post("/addGood", (req, res, next) => {
  let params = {
    productId: Math.ceil(Math.random() * 100000000),
    brand: req.body.brand,
    productName: req.body.productName,
    productImage: req.body.productImage,
    type: req.body.type,
    salePrice: req.body.salePrice,
  }
  Good.findOne({ productName: params.productName })
    .then(doc => {
      if (doc) {
        res.json({
          status: '1',
          msg: '已存在'
        })
        return
      }
      const good = new Good(params)
      good.save()
      res.json({
        status: '0',
        msg: '成功'
      })
    })
    .catch(err => {
      res.json({
        status: '1',
        msg: err.message
      })
    })
})


router.post('/editGood', (req, res, next) => {
  let params = {
    brand: req.body.brand,
    productName: req.body.productName,
    productImage: req.body.productImage,
    type: req.body.type,
    salePrice: req.body.salePrice,
  }
  Good.findOneAndUpdate({productId: req.body.productId}, { $set: params }, {}, function (err, docs) {
    if (err) {
      res.json({
        status: '0',
        msg: '存在',
        result: docs
      })
    }
    res.json({
      status: '0',
      msg: '存在',
      result: docs
    })
  })
})

router.get('/boards', function (req, res, next) {
  // 查找数据库内容，通过mongoose api find() 查找，skip() limit(), 做出限制，获得指定的数据
  let goodModel = Board.find()
  // goodsModel.sort({ 'salePrice': sort })

  // 执行查找之后，得到的数据作为doc，传递给前台系统，同样还能够将发生的错误报文传递
  goodModel.exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        message: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '显示公告',
        result: doc,
      })
    }
  })
});

router.get("/board", (req, res, next) => {
  let param = {
    _id: req.query._id
  }
  Board.findById(param)
    .then(doc => {
      if (doc) {
        res.json({
          status: '0',
          msg: '存在',
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

router.post("/addBoard", (req, res, next) => {
  let params = {
    header: req.body.header,
    content: req.body.content,
    reader: 0,
    time: String(new Date()),
  }
  const board = new Board(params)
  board.save()
  res.json({
    status: '0',
    msg: '添加公告成功'
  })
})

router.post('/editBoard', (req, res, next) => {
  let params = {
    header: req.body.header,
    content: req.body.content,
    reader: 0,
    time: String(new Date()),
  }
  Board.findByIdAndUpdate(req.body._id, { $set: params } ,{}, function (err, docs) {
    if(err) {
      res.json({
        status: '0',
        msg: '存在',
        result: docs
      })
    }
    res.json({
      status: '0',
      msg: '存在',
      result: docs
    })
  })
})

module.exports = router
