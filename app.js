var express = require("express"),
  app = express(),
  ejs = require("ejs"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  layout = require("express-layout"),
  passport = require("passport"),
  expressSession = require("express-session"),
  connectMongo = require("connect-mongo")(expressSession),
  expressFlash = require("express-flash"),
  cookieParser = require("cookie-parser");

var config = require("./config/secret"),
  indexRoute = require("./routes/indexRoute"),
  clientRoute = require("./routes/clientRoute"),
  consigneeRoute = require("./routes/consigneeRoute"),
  cargoRoute = require("./routes/cargoRoute"),
  roroRoute = require("./routes/roroRoute"),
  powerOfAttroney_nraRoute = require("./routes/powerOfAttroney_nraRoute"),
  booking_confirmRoute = require("./routes/booking_confirmRoute"),
  merge_nra_bc = require("./routes/merge_nra_bc"),
  nextpageRoute = require("./routes/nextpageRoute"),
  dock_rROute = require("./routes/dock_rROute"),
  roro_rROute = require("./routes/roro_rROute"),
  authRoute = require("./routes/authRoute"),
  ectnRoute = require("./routes/ectnRoute"),
  invoiceRoute = require("./routes/invoiceRoute"),
  adminRoute = require("./routes/adminRoute"),
  expenseRoute = require("./routes/expenseRoute");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(layout());
app.set("layouts", "./views/layouts");
app.set("layout", "layout");

//connect to db
mongoose.Promise = global.Promise;
mongoose.connect(config.database, function (err) {
  if (err) {
    console.log(err.message);
  } else {
    console.log("database connected");
  }
});

//sessesion midleware
app.use(
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: config.secret,
    store: new connectMongo({ url: config.database, autoReconnect: true }),
  })
);
app.use(expressFlash());
////////////////////////passport config/////////////
app.use(cookieParser());
app.use(passport.initialize()); //initialize passport
app.use(passport.session()); //for session handling (persistent logins)
app.use(function (req, res, next) {
  res.locals.user = req.user;
  res.locals.moment = require("moment");
  res.locals.displayCars = function (str, idx, array) {
    if (str !== "") {
      if (idx === array.length - 1) {
        return str;
      }

      return str + ",";
    } else {
      return str;
    }
  };
  res.locals.string_ID = function (str) {
    return `OLD-${str}`.substring(0, 14).toUpperCase();
  };
  res.locals.String_ID_2 = function (str) {
    return `${str}`.substring(0, 14).toUpperCase();
  };
  res.locals.string_ID_1 = function (str) {
    return `OLD${str}`.substring(0, 15).toUpperCase();
  };

  res.locals.stringText = function (str) {
    // var str = "COMPANY ADDRESS";
    var r = str.split(" ").join("\xa0");
    // console.log(r)
    return r;
  };

  res.locals.stringText1 = function (str) {
    // var str = "COMPANY ADDRESS";
    var r = str.split("").join("\xa0");
    return r;
  };

  next();
});
//////////////////////////////////////////////////////////

//end session middleware

app.use(indexRoute);
app.use(clientRoute);
app.use(consigneeRoute);
app.use(cargoRoute);
app.use(roroRoute);
app.use(powerOfAttroney_nraRoute);
app.use(booking_confirmRoute);
app.use(merge_nra_bc);
app.use(nextpageRoute);
app.use(dock_rROute);
app.use(roro_rROute);
app.use(authRoute);
app.use(ectnRoute);
app.use(invoiceRoute);
app.use(adminRoute);
app.use(expenseRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("oldsailor connected successfully at port: ", port);
});
