require('dotenv').config();
const env = process.env.environment;
console.log(env);

var createError = require("http-errors");
var express = require("express");
var session = require('express-session');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var baseRouter = require('./routes/base.js');
var apiRouter = require("./routes/api/index.js");
var register = require('./routes/organization/register.js');
var login = require('./routes/organization/login.js');
var logout = require('./routes/organization/logout.js');
var home = require('./routes/organization/home.js');
var normal_login = require('./routes/normal/login.js');
var normal_logout = require('./routes/normal/logout.js');
var normal_home = require('./routes/normal/home.js');


// セッション管理
var setOrganizationUser = require('./setOrganizationUser');
var setNormalUser = require('./setNormalUser');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.set('view engine', 'ejs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use("/", baseRouter);

// API ルーティングファイル
app.use("/api", apiRouter);

// 組織管理ユーザ登録
app.use('/organization/register', register);

// 組織管理ユーザログイン
app.use('/organization/login', login);

// 組織管理ユーザログアウト
app.use('/organization/logout', logout);

// 組織管理ユーザホーム
app.use('/organization/home', setOrganizationUser, home);

// 一般ユーザログイン
app.use('/normal/login', normal_login);

// 一般ユーザログアウト
app.use('/normal/logout', normal_logout);

// 一般ユーザホーム
app.use('/normal/home', setNormalUser, normal_home);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).send("<h1>ページが見つかりません</h1>");
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
