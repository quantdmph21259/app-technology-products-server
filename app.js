var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// session
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// san pham
var spRouter = require("./routes/sanpham");
//logn
var loginRouter = require("./routes/login");
//api
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// //phải để trước router của index và users
// //session
app.use(
    session({
        secret: "mysecretkey", //// chuỗi ký tự  đặc biệt để session mã hóa do mình tự tạo
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true }
    })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
// sp
app.use("/sp", spRouter);
//login
app.use("/register", loginRouter);
//api
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);

    // link api sẽ có tiền tố /api ở đầu
    if (req.originalUrl.indexOf("/api") == 0) {
        // nếu = 0 thì có api
        res.json({
            status: err.status,
            msg: err.message,
        });
    } else {
        res.render("error");
    }

    res.render("error");
});

module.exports = app;
