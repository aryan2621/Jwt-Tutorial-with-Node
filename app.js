const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const router = require("./routes/routes");
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
dotenv.config();
app.use(express.json());
app.use(express.static("public"));
// middleware
app.use(cookieParser());

// view engine
const dbURI = process.env.MONGO_URL;
// database connection
mongoose.connect(
  dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  function (err) {
    if (err) console.log(err);
    else {
      console.log("databse connected");
    }
  }
);
app.get("*", checkUser);
// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(router);

//concepts of the cookie

// in any website cookie -> store data in the users browser
//like a name or any things in any request we can create
//a cookie in server and with cookie with request with its expirey time
//server return the response and in browser coookie attached
//ow in this way we can attach the jwt token in form of cookie
//server can verify and authenticate them

// app.get("/set-cookie", (req, res) => {
//name ,value format ---> old way
// res.setHeader("Set-Cookie", "newUser");
//newuser value will get overite if exist already
//maxage default value is session means that expire afte the window close
//secure :true set cookie only at the https connection
//httpOnly :true accessed not by the frontend

//   res.cookie("newUser", false, { maxAge: 1000 * 3600 * 24, httpOnly: true });
//   res.cookie("isEmployee", true);
//   res.send("You got the cookie");
// });

//we can now access the cookies at any point in the browser
// with any request after the assigbment

// app.get("/read-cookie", (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies);
//   res.json(cookies);
//   console.log(cookies.newUser);
// });

app.listen(port, console.log("server is runninng!!!"));

//jwt concept
// login form ------------------> email and password--------------> check them for stored
// in the db if correct then create a json web token  and return them a cookie
// jwt contain encoded data retun the cookie that make them authenticated and logged
//now cookie of jwt stored and in every request they will be send for others pages
//and now when the server get the jwt cookie they verify it in every  request
// and identify the user if valid they they are valid user and they will see the private routes

// jwt component ->header /payload /signature

//header->what knid of signature is being used it tells
// payload -> identify the user
// signature -> make the token secure

//header-
//  -
//              -
//               ->hashed together-----------> secret
//                                             'secure secret string'
//            -         +signature
//payload

//header.payload.signature--------------------->//dnvjhuheahuiea.uaudvieyohdhoe.egualdgeiG

//this encodeded data is then stored in form of cookie
//for every request now req taken server verify it by the header and payload
// hasing them and convert to a secret and if them that matched with  signature
//them it will allow
//hashed value change if payload change

//tasks signup -> hash pw and store userin db  instant login
//create a jwt
