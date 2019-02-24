const express = require('express');
const router = express.Router();

const User = require('./../models/user')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
      // req.session.user = doc;
      res.json({
        status: '0',
        msg: '',
        result: {
          userName: res.userName
        }
      })
    }
  }) 
  .catch(e => {
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

module.exports = router;
