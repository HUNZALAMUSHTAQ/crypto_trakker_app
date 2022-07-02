require("dotenv").config(); // For Env Variables 
const cors = require('cors')
const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./auth/passport-auth") // auth
const checkAuth = require("./middlewares/check-auth") // custom middlewares to check authentication
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(
  cors({
       origin: "http://localhost:3000", // allow to server to accept request from different origin
       methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
       credentials: true, // allow session cookie from browser to pass through
 })
);
// Auth passport-auth
initializePassport()

// Sessions 
app.use(session({
  secret: process.env.SESSION_SECRET,
  
  resave: false,
  saveUninitialized:false
}))

// Passport Auth 
app.use(passport.initialize())
app.use(passport.session())

// Views 
app.set("view engine", "ejs")
app.use(flash())

// Middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json()); // parse json bodies in the request object

// Redirect requests to endpoint starting with /posts to postRoutes.js
app.use("/posts", require("./routes/postRoutes"));
app.use("/user", require("./routes/userRoutes"))


app.get("/home", checkAuth.checkNotAuthenticated , (req, res)=>{
  console.log(req.user)
  console.log(req)
  res.render("dashboard", {user: req.user})
});
// app.get("/account", (req, res)=>{
//   console.log(req.user)

//   if(req.user == undefined){
    
//     res.status(400).send({success: "false"})
//   }else{

//     res.status(200).send({success: "True"})
//   }
// });

app.get("/auth", (req, res) => {
  console.log(req);
  if (req.user) {
    console.log("----------",req.user)

    res.json({auth:false })

  }else{
    res.json(req.user);

  }
    console.log("-----jkjk-----",req.user)
});
// app.post("/account", checkAuth.checkNotAuthenticated , (req, res)=>{
//   const {account_id} = req.body 

//   res.render("dashboard", {user: req.user})
// });




// app.post('/login', (req,res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(email, password);
// });




// Global Error Handler. IMPORTANT function params MUST start with err
app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
