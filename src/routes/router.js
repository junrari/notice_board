module.exports = (app) =>{
    const pageRouter = require("./page_router")
    const repRouter = require("./rep_router")
    const userRouter = require("./user_router")
    const fileRouter = require("./file_router")

    app.use("/page",pageRouter)
    app.use("/rep",repRouter)
    app.use("/user",userRouter)
    app.use("/file",fileRouter)

    const router = require("express").Router()

    router.get("/",(req,res)=>{
        if (req.session.user) {
            // 세션에 유저가 존재한다면
            res.redirect("/page"); // 
          } else {
            res.redirect("/user"); // 
          }
    })

    return router;
}

