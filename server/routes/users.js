const express = require('express');
const router = express.Router();

const User = require('./../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register", (req, res, next) => {
  let params = {
    userName = req.body.name,
    userEmail = req.body.email,
    userTel = req.body.tel,
    userPwd = req.body.pass,
    userAddress = req.body.address,
  }
  User.findOne(param.userName)
  .then(res => {
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
  .then(res => {
    if(res) {
      res.cookie("userId", doc.userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.cookie("userName", doc.userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.json({
        status: '0',
        msg: '',
        result: {
          userName: res.userName
        }
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

router.post("/logout", () => {
  res.cookie("userId ", "", {
    path:"/",
    maxAge: -1
  })
  res.json({
    status: "0",
    msg: "",
    result: ""
  })
})

router.post("/checkLogin", function(req, res, next) {
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || '',
    })
  } else {
    res.json({
      status: '1',
      msg: '',
      result: ''
    })
  }
})

// 查询购物车
router.get("/cartList", function(req, res, next) {
  var userId = req.cookies.userId;
  console.log(2)
  User.findOne({userId : userId})
  .then(res => {
    res.json({
      status: '0',
      msg: '',
      result: res.cartList
    })
  })
  .catch(e => {
    res.json({
      status: '1',
      msg: e
    })
  })
})


module.exports = router;
