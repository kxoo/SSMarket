const express = require('express');
const router = express.Router();

const User = require('./../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/checkLogin", function (req, res, next) {
  if (req.cookies.userId) {
    console.log(req.cookies)
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

router.post("/register", (req, res, next) => {
  let params = {
    userId: Math.ceil(Math.random() * 10000000),
    userName: req.body.name,
    userEmail: req.body.email,
    userTel: req.body.tel,
    userPwd: req.body.pass,
    // userAddress : req.body.address,
  }
  User.findOne({userName: params.userName})
  .then(doc => {
    if(doc) {
      res.json({
        status: '1',
        msg: '用户名已存在'
      })
      return
    }
    console.log(params)
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

router.post("/login", (req, res, next) => {
  let param = {
    userName:req.body.userName,
    userPwd: req.body.userPwd,
  }
  User.findOne(param)
  .then(doc => {
    if(doc) {
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

router.post("/logout", (req, res, next) => {
  res.cookie("userId ", "", {
    path:"/",
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

// 查询购物车
router.get("/cartList", function(req, res, next) {
  var userId = req.cookies.userId;
  User.findOne({userId : userId})
  .then(doc => {
    if (doc) {
      res.json({
        status: '0',
        msg: '查询购物车',
        result: doc.cartList
      })
    }
  })
  .catch(e => {
    res.json({
      status: '1',
      msg: e
    })
  })
})


module.exports = router;
