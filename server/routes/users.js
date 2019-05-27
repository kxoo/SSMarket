const express = require('express');
const router = express.Router();

const User = require('./../models/user')
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 检查登陆
router.post("/checkLogin", function (req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '已登陆',
      result: req.cookies.userName || '',
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})

// 注册账号
router.post("/register", (req, res, next) => {
  let params = {
    userId: Math.ceil(Math.random() * 10000000),
    userName: req.body.name,
    userEmail: req.body.email,
    userTel: req.body.tel,
    userPwd: req.body.pass,
    // userAddress : req.body.address,
  }
  User.findOne({ userName: params.userName })
    .then(doc => {
      if (doc) {
        res.json({
          status: '1',
          msg: '用户名已存在'
        })
        return
      }
      const user = new User(params)
      user.save()
      res.json({
        status: '0',
        msg: '注册成功'
      })

    })
    .catch(err => {
      res.json({
        status: '1',
        msg: err.message
      })
    })
})

// 登陆
router.post("/login", (req, res, next) => {
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd,
  }
  User.findOne(param)
    .then(doc => {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        });
        res.json({
          status: '0',
          msg: '登陆成功',
          result: {
            userName: res.userName
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

// 登出
router.post("/logout", (req, res, next) => {
  res.cookie("userId ", "", {
    path: "/",
    maxAge: -1
  })
  res.cookie("userName ", "", {
    path: "/",
    maxAge: -1
  })
  res.json({
    status: "0",
    msg: "成功登出",
    result: ""
  })
})

// 查询历史订单
router.get("/order", (req, res, next) => {
  const userId = req.cookies.userId;
  User.findOne({ userId: userId })
    .then(doc => {
      if (doc) {
        res.json({
          status: '0',
          msg: '查询订单',
          result: doc.orderList
        })
      } else {
        res.json({
          status: '0',
          msg: '订单为空'
        })
      }
    })
    .catch(e => {
      res.json({
        status: '1',
        msg: e.message
      })
    })
})

// 查询购物车
router.get("/cartList", (req, res, next) => {
  const userId = req.cookies.userId;
  User.findOne({ userId: userId })
    .then(doc => {
      if (doc) {
        res.json({
          status: '0',
          msg: '查询购物车',
          result: doc.cartList
        })
      } else {
        res.json({
          status: '0',
          msg: '购物车为空'
        })
      }
    })
    .catch(e => {
      res.json({
        status: '1',
        msg: e.message
      })
    })
})

// 编辑购物车
router.post("/cartEdit", (req, res, next) => {
  const userId = req.cookies.userId;
  const productId = req.body.productId;
  const productNum = req.body.productNum;
  const checked = req.body.checked;
  User.updateOne(
    { userId, "cartList.productId": productId },
    {
      "cartList.$.productNum": productNum,
      "cartList.$.checked": checked
    },
    (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err,
          result: ''
        })
      } else {
        res.json({
          status: '0',
          msg: '修改成功',
          result: ''
        })
      }
    })
})

// 删除购物车商品
router.post("/cartDel", (req, res, next) => {
  const userId = req.cookies.userId;
  const productId = req.body.productId;
  User.updateOne(
    { userId },
    {
      $pull: {
        "cartList": {
          productId
        }
      }
    },
    (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err,
          result: ''
        })
      } else {
        res.json({
          status: '0',
          msg: '删除成功',
          result: ''
        })
      }
    })
})

// 地址获取
router.get('/addressList', (req, res, next) => {
  const userId = req.cookies.userId;
  User.findOne({ userId: userId })
    .then(doc => {
      if (doc) {
        res.json({
          status: '0',
          msg: '查询地址列表',
          result: doc.addressList
        })
      } else {
        res.json({
          status: '0',
          msg: '地址列表为空'
        })
      }
    })
    .catch(e => {
      res.json({
        status: '1',
        msg: e.message
      })
    })
})

// 添加地址
router.post('/createAddress', (req, res, next) => {
  const userId = req.cookies.userId;
  const args = req.body;
  args.addressId = Math.floor(Math.random() * 1000000000);
  User.updateOne(
    { userId },
    {
      $push: {
        "addressList": args
      }
    },
    (err, doc) => {
      console.log(err)
      if (err) {
        res.json({
          status: '1',
          msg: err,
          result: ''
        })
      } else {
        res.json({
          status: '0',
          msg: '添加成功',
          result: ''
        })
      }
    })
})

// 删除地址
router.post('/delAddress', (req, res, next) => {
  const userId = req.cookies.userId;
  const addressId = req.body.addressId;
  User.updateOne(
    { userId },
    {
      $pull: {
        "addressList": {
          addressId
        }
      }
    },
    (err, doc) => {
      if (err) {
        res.json({
          status: '1',
          msg: err,
          result: ''
        })
      } else {
        res.json({
          status: '0',
          msg: '删除成功',
          result: ''
        })
      }
    })
})

// 付款
router.post('/payment', (req, res, next) => {
  const userId = req.cookies.userId;
  const addressId = req.body.addressId;
  const orderTotal = req.body.orderTotal;

  User.findOne({ userId }, (err, doc) => {
    if (err) return Promise.reject(err);
  })
    .then(doc => {
      doc.wallet -= orderTotal;
      User.updateOne({ userId }, { $inc: { wallet: -orderTotal } }, (res, err) => {
        console.log(res)
      })
      let address = '';
      let goodsList = [];
      let orderId = `${Math.floor(Math.random() * 10)}${new Date().getTime()}${Math.floor(Math.random() * 10)}`;

      doc.addressList.forEach(item => {
        if (addressId == item.addressId) {
          address = item
        }
      })

      goodsList = doc.cartList.filter(item => item.checked == '1');
      createDate = String(new Date());
      const args = {
        orderId,
        orderTotal,
        addressInfo: address,
        goodsList: goodsList,
        orderStatus: '1',
        createDate,
      }

      doc.orderList.push(args);

      doc.save((err, doc) => {
        if (err) {
          res.json({
            status: '1',
            msg: err,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '购买成功',
            result: {
              orderId: args.orderId,
              orderTotal: args.orderTotal
            }
          })
        }
      })
    })
})

router.get("/user", (req, res, next) => {
  let param = {
    userId: req.cookies.userId
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


module.exports = router;
