const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const session = require("express-session")
require('dotenv').config()
//process.env.DB


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static',express.static(__dirname+"/public"))
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
}))

const router = require("./src/routes/router")(app)
app.use("/", router)

app.set("views","./src/views")
app.set("view engine","ejs")

app.listen(3001,()=> console.log("3001 port server"))