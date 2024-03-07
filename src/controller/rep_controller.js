const ser = require("../service/rep_service")
const process ={
    register : async(req,res)=>{
        if(req.session.user){
            data = req.body
            data.id = req.session.user.id
            data.name = req.session.user.username
            const result = await ser.repInsert.register(data)
            console.log("rep.con.proc.register.result:",result);
            res.json(result)
        }
      else {
        const data = false // 수정중 session 로그인 관련
        res.json(data);
      }
    }
}

const views ={
    replyData: async(req,res)=>{
        const result = await ser.repRead.replyData(req.params.groupNum)
        res.json(result)
    }
}

module.exports = {process,views}