

module.exports = (app) =>{
    const pageRouter = require("./page_router")
    const repRouter = require("./rep_router")
    const userRouter = require("./user_router")
    const authRouter = require("./auth_router")
  


    app.use("/page",pageRouter)
    app.use("/rep",repRouter)
    app.use("/user",userRouter)
    app.use("/auth",authRouter)


    
    const router = require("express").Router()

    router.get("/",(req,res)=>{
        
            res.redirect("/page"); 
          
          
    })

    return router;
}

