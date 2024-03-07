const service = require("../service/page_service")
const user_service = require("../service/user_service")
const path = require('path');

const views = {
    index: (req, res) => {
        if (req.session.user) {
            userInfo = { id: req.session.user.id, name: req.session.user.username }

        } res.redirect("/page/list")
    },
    list: async (req, res) => {

        // 세션에 유저가 존재한다면
        console.log("start: ", req.query.start);
        const totalContent = await service.pageRead.totalContent();
        const data = await service.pageRead.list(req.query.start, totalContent)
        console.log('totalContent:', totalContent);
        dataList = {
            list: data.list,
            page: data.page,
            start: data.start,
            totalContent,
            image_check: data.image_path,
            check: false,
            iskakao:false
        }
        if (req.session.user) {
           let  cleanedProfile = req.session.user.profile_image.replace('public\\', '');
            Object.assign(dataList, {
                id: req.session.user.id,
                name: req.session.user.username,
                profile_image: cleanedProfile,
                check: true,
                iskakao: req.session.user.iskakao
            })

        }
        console.log("dataList", dataList);
        // console.log('dataList', dataList);
        res.render("list", dataList)


    },
    writeForm: async (req, res) => {
        if (req.session.user) {
            res.render("write_form")
        }
        else {
            res.redirect("/user")
        }
    },
    content: async (req, res) => {

        const data = await service.pageRead.content(req.params.num);
        const likeData = await service.likeServ.pagelike(req.params.num);
        
        dataList = {
            num: data.num,
            title: data.title,
            text: data.text,
            pdate: data.pdate,
            count: data.count,
            writer_username: data.username,
            writer_fullname: data.fullname,
            image_path: null,
            like: likeData,
            check: false,
            profile_image: null,
            iskakao: false
        };
        if (req.session.user) {
            const post = { username: req.session.user.id, postnum: data.num }   //좋아요도 불러오기 
            const isLike = await service.likeServ.isLike(post);
            if (req.session.profile_image){
                let cleanedImagePath = req.session.profile_image
                cleanedImagePath = data.image_path.replace('public\\', '');
                dataList.image_path = cleanedImagePath;
            }
           
            let  cleanedProfile = req.session.user.profile_image.replace('public\\', '');
            Object.assign(dataList, {
                id: req.session.user.id,
                name: req.session.user.username,
                isLiked: isLike,
                check: true,
                profile_image: cleanedProfile,
                iskakao: req.session.user.iskakao
            });

        } console.log("dataList:", dataList);
        res.render("content", dataList)
    },
    mypage: async (req, res) => {
        if (req.session.user) {
            const userid = { username: req.session.user.id }
            const userliketotalContent = await service.pageRead.userliketotalContent(userid);
            const usertotalContent = await service.pageRead.usertotalContent(userid);
            const userContentdata = await service.pageRead.userContentList(req.query.userConentstart, usertotalContent, userid.username)
            const userlikedata = await service.pageRead.userlikelist(req.query.likestart, userliketotalContent, userid.username)
            console.log('userliketotalContent:', userliketotalContent);
         dataList = {
                likelist: userlikedata.list, 
                likepage: userlikedata.page, 
                likestart: userlikedata.start, 
                userliketotalContent, 
               
                userContentlist: userContentdata.list, 
                userContentpage: userContentdata.page, 
                userConentstart: userContentdata.start, 
                usertotalContent,
                iskakao: false
            }
            if(req.session.user.iskakao){ // 카카오 로그인 일때
                Object.assign(dataList, {
                    id: req.session.user.id,
                    name: req.session.user.username,
                    profile_image: req.session.user.profile_image,
                    email: req.session.user.email,
                    iskakao: req.session.user.iskakao
                });
            }else {         // 일반 로그인 일때
                const userid = { username: req.session.user.id }
                const userinfo = await user_service.userServ.idcheckServ(userid)
                let  cleanedProfile = userinfo.profile_image.replace('public\\', '');
               req.session.user.profile_image = cleanedProfile
                   
                console.log("userInfo: !!",userinfo);
                Object.assign(dataList, {
                    id: userinfo.username, 
                    name: userinfo.fullname,
                    email: userinfo.email,
                    profile_image: cleanedProfile
                })
               
            }
            

            console.log("pagectrl의 mypage dataList: ", dataList);
            res.render("mypage", dataList)
        } else {
            res.redirect("/user");
        }
    }
}

const process = {
    write: async (req, res) => {
        data = req.body
        data.username = req.session.user.id,
        data.fullname = req.session.user.username
        if (req.file) {
            data.image_path = req.file.path;
        }
        console.log("중간체크 process.write", data)
        if (req.변수) {
            console.log(req.변수);
        }
        await service.pageInsert.write(data)

        res.json(data)

    },
    delete: async (req, res) => {
        console.log("!!!!!!!이거 실행되나?????????????????", req.params.num);
        await service.pageDelete.delete(req.params.num);
        res.redirect("/page/list")

    },
    likeProcess: async (req, res) => {
        const data = req.body//좋아요 업데이트할 정보(유저,게시물번호) 
        const isLike = await service.likeServ.isLike(data); //username 뿐만 아니라 게시글 정보도 가야함
        if (isLike) {
            //좋아요 지우기
            await service.likeServ.likeminus(data)
            const likeData = await service.likeServ.pagelike(data.postnum);
            res.json({ updatedLikeCount: likeData })
        }
        else {
            //좋아요 추가
            console.log("좋아요 추가 실행");
            await service.likeServ.likeplus(data)
            const likeData = await service.likeServ.pagelike(data.postnum);
            res.json({ updatedLikeCount: likeData })
        }
    }
}
module.exports = { views, process }















//사진 업로드 기능 추가해 보기