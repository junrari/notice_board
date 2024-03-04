const ser = require("../service/rep_service")
const process ={
    register : async(req,res)=>{
        const result = await ser.repInsert.register(req.body)
        console.log("rep.con.proc.register.result:",result);
        res.json(result)
    }
}

const views ={
    replyData: async(req,res)=>{
        const result = await ser.repRead.replyData(req.params.groupNum)
        res.json(result)
    }
}

module.exports = {process,views}