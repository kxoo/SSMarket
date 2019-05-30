// 引入错误管理 http-error
var createError = require('http-errors');
// 引入 express
var express = require('express');
// 引入 path 路径管理
var path = require('path');
// 引入 cookie-parser cookie 解析
var cookieParser = require('cookie-parser');
// 引入日志记录 morgan
var logger = require('morgan');

// 引入如路径模块 index useres goods
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var manageRouter = require('./routes/manage');

// 引入 express 主方法
var app = express();

// view engine setup
//  express 主方法 中进行配置操作
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录验证
app.use(function (req, res, next) {
  if (req.cookies.userId || req.cookies.manageId) {
    next()
  } else {
    if(req.originalUrl == '/users/login' ||
    req.originalUrl == '/users/logout' ||
    req.originalUrl == '/users/register' ||
      req.path == "/goods/view" ||
      req.path == "/goods/getBoard" ||
      req.path == "/manage/good" ||
      req.originalUrl == '/manage/login'
    ) {
      next()
    } else {
      res.json({
        status: '1001',
        msg: '当前未登陆',
        result: ''
      })
    }
  }
})

app.use('/', indexRouter);
app.use('/goods', goodsRouter);
app.use('/users', usersRouter);
app.use('/manage', manageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
