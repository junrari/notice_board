const dao =require("../database/userDAO")


const userServ = {
    loginServ: async(req) =>{
        let [result] = await dao.userDB.login(req)
        console.log("유저 서비스 단계에서 체크",result);
        const data = {}
        
        if (!result){ // 정보가 없으면
            data.exist = false
            data.msg = '일치하는 정보가 없습니다'
            console.log("메세지는:",data);
            return data;
        }else {
            data.exist = true
            data.msg = '일치하는 정보가 있습니다'
            data.id = result.username
            data.name = result.fullname
            data.email = result.email
            data.profile_image = result.profile_image
            console.log("메세지는:",data);
            return data;
        }
        
    },
    idcheckServ: async(req) =>{
        let [result] = await dao.userDB.idcheckDB(req)
        console.log("userServ.idcheckServ의 결과:",result);
        if (!result){
            console.log("userServ.idcheckServ의 결과 없음");
            return false
        }
        else {
             console.log("userServ.idcheckServ의 결과 있음");
             console.log("!!!!!!!!!!!:",result);
             return result;
        } // 수정 한번 해보실??
    },
    joinServ: async(req) =>{
        await dao.userDB.join(req)
    },
    edit_profile: async(data)=>{
        await dao.userDB.edit_profile(data);
    }
}

module.exports = {userServ}