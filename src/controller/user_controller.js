const service = require("../service/user_service")

const views = {
    index: (req, res) => {
        res.render("index")
    },
    login: (req, res) =>{
        res.render("login")
    },
    join: (req, res) =>{
        res.render("join")
    },
    idcheckform: (req, res) =>{
        res.render("idcheck_form")
    }

}

const process = {
    loginuser: async (req, res) => {
        const data = await service.userServ.loginServ(req.body)
        console.log("중간체크 process.loginuser",data)
        

        if(!data.exist){ 
        
            console.log("usercontrl.process.loginuser 메세지",data.msg);
            console.log("usercontrl.process.loginuser",data);
            res.json(data);
        }//일치한 정보가 있으면 ~~
        else {
            req.session.user ={
                id :data.id,
                username:data.name
            }
            console.log("로그인성공",req.session.user);
            res.json(data)

        }
      
    },
    logout: (req,res)=>{
        req.session.destroy((err) => {
            if (err) {
              console.error(err);
            } else {
              res.redirect('/user/login');
            }
        })
    },
    checkDupID: async(req, res) =>{
      const data = await service.userServ.idcheckServ(req.body);
      res.json(data)
    },
    joinuser: async (req, res) => {
        console.log("userctrl.process.joinuser의 req.body:",req.body);
        console.log("userctrl.process.joinuser의 res:",res);
        await service.userServ.joinServ(req.body)
        const data={}
        data.success =true;
        res.json(data)
        },

      
    }
    

module.exports = { views, process }