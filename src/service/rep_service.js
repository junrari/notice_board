const dao = require("../database/repDAO")
const repInsert ={
    register : async(body) =>{
        const result = await dao.repInsert.register(body)
        console.log("result.affectedRows: ",result);
        return result.affectedRows
    }
}

const repRead ={
    replyData: async(groupNum) =>{
        let result = await dao.repRead.replyData(groupNum)
        if(result!= undefined){
            for(let i=0; i<result.length;i++){
                const dateString = result[i].save_date;
                const date = new Date(dateString)
                const formattedDate = date.toLocaleString();
                result[i].save_date = formattedDate
                }
                console.log(result);
        return result
        }
       
        
     
        
    }
}

module.exports = {repInsert,repRead}