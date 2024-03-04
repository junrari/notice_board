const service = require("../service/page_service")
const user_service = require("../service/user_service")
const path = require('path');

const views = {
    index: (req, res) => {
        if (req.session.user) {
            userInfo = { id: req.session.user.id, name: req.session.user.username }
            res.redirect("/page/list")
        }
        else {
            res.redirect("/user")
        }
    },
    list: async (req, res) => {
        if (req.session.user) {
            // 세션에 유저가 존재한다면
            console.log("start: ", req.query.start);
            const totalContent = await service.pageRead.totalContent();
            const data = await service.pageRead.list(req.query.start, totalContent)
            console.log('totalContent:', totalContent);
            dataList = {
                list: data.list, page: data.page, start: data.start, totalContent, id: req.session.user.id,
                name: req.session.user.username,image_check:data.image_path
            }
           // console.log('dataList', dataList);
            res.render("list", dataList)
        } else {

            res.redirect("/user"); // 
        }

    },
    writeForm: async (req, res) => {
        if (req.session.user){
            res.render("write_form")
        }
       else {
        res.redirect("/user")
       }
    },
    content: async (req, res) => {
        if (req.session.user) {
            const data = await service.pageRead.content(req.params.num);
            const likeData = await service.likeServ.pagelike(req.params.num);
            const post = {username:req.session.user.id, postnum:data.num}   //좋아요도 불러오기 
            const isLike = await service.likeServ.isLike(post);
            let cleanedImagePath =null
            if (data.image_path !==null){
                cleanedImagePath = data.image_path.replace('public\\', '');
            }     
            dataList = {
                num: data.num, title: data.title, text: data.text, pdate: data.pdate, count: data.count,
                writer_username: data.username, writer_fullname :data.fullname, image_path:cleanedImagePath,
                id: req.session.user.id, name: req.session.user.username, like: likeData, isLiked: isLike
            }
            console.log("dataList:", dataList);
            res.render("content", dataList)
        } else {
            res.redirect("/user"); // 
        }
    },
    mypage: async(req,res)=>{
        if (req.session.user){
            const userid = {username:req.session.user.id }
            const userinfo = await user_service.userServ.idcheckServ(userid)
            const userliketotalContent = await service.pageRead.userliketotalContent(userid);
            const usertotalContent = await service.pageRead.usertotalContent(userid);
            const userContentdata =await service.pageRead.userContentList(req.query.userConentstart, usertotalContent,userid.username)
            const userlikedata = await service.pageRead.userlikelist(req.query.likestart, userliketotalContent,userid.username)
            console.log('userliketotalContent:', userliketotalContent);
            dataList = {
                likelist: userlikedata.list, likepage: userlikedata.page, likestart: userlikedata.start, userliketotalContent
                , id: userinfo.username, name: userinfo.fullname,
                userContentlist: userContentdata.list, userContentpage:userContentdata.page, userConentstart:userContentdata.start, usertotalContent
            }
          
            console.log("pagectrl의 mypage dataList: ",dataList);
            res.render("mypage", dataList)
        }else{
            res.redirect("/user");
        }
    }
}

const process = {
    write: async (req, res) => {
        data = req.body
        data.username = req.session.user.id,
        data.fullname= req.session.user.username
        if(req.file){
        data.image_path = req.file.path;
        }
        console.log("중간체크 process.write",data)
        if(req.변수){
            console.log(req.변수);
        }
        await service.pageInsert.write(data)
       
        res.json(data)

    },
    delete: async (req, res) => {
        console.log("!!!!!!!이거 실행되나?????????????????",req.params.num);
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