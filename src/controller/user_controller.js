const service = require("../service/user_service")

const views = {
    index: (req, res) => {
        res.render("index")
    },
    login: (req, res) => {
        res.render("login")
    },
    join: (req, res) => {
        res.render("join")
    },
    idcheckform: (req, res) => {
        res.render("idcheck_form")
    }

}

const process = {
    loginuser: async (req, res) => {
        const data = await service.userServ.loginServ(req.body)

        if (!data.exist) {

            console.log("usercontrl.process.loginuser", data);
            res.json(data);
        }//일치한 정보가 있으면 
        else {
            req.session.user = {
                id: data.id,
                username: data.name,
                email: data.email,
                profile_image:data.profile_image
            }
            console.log("로그인성공", req.session.user);
            res.json(data)

        }

    },
    logout: (req, res) => {


        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/user/login');

        })

    },
    checkDupID: async (req, res) => {
        const data = await service.userServ.idcheckServ(req.body);
        res.json(data)
    },
    joinuser: async (req, res) => {
        console.log("userctrl.process.joinuser의 req.body:", req.body);
        console.log("userctrl.process.joinuser의 res:", res);
        await service.userServ.joinServ(req.body)
        const data = {}
        data.success = true;
        res.json(data)
    },
    edit_profile: async (req, res) => {
        data = req.body
        data.username = req.session.user.id
        console.log("req file?!",req.file);
        if (req.file) {
            data.image_path = req.file.path;
        }
        console.log("중간체크 mypage의 프로필 수정", data)
        if (req.변수) {
            console.log(req.변수);
        }
        await service.userServ.edit_profile(data)
        res.redirect("/page/mypage")
    }



}





module.exports = { views, process }