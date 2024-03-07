const router = require("express").Router()
const passport = require('passport');
const axios = require('axios');
require('dotenv').config()
const express = require("express")
const app = express()
const authCtrl = require("../controller/user_controller")

 
router.get('/kakao', passport.authenticate('kakao')); // Kakao 로그인 요청 핸들러
router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/', // kakaoStrategy에서 실패한다면 실행
 }),
 // kakaoStrategy에서 성공한다면 콜백 실행
 (req, res) => {
    console.log("콜백 req",req.user);
    req.session.user ={
        id :req.user.kakao_id,
        username:req.user.name,
        email:req.user.email,
        profile_image: req.user.profile_image,
        iskakao: true
    }
    console.log("req.session.user", req.session.user);
    res.redirect('/page');
 },
)
router.get('/kakao/logout', async (req, res) => {
    console.log("req.user 토큰이 있으려나",req.user);

    const apiUrl = 'https://kapi.kakao.com/v1/user/unlink';
    const accessToken = req.user.accessToken

    try {
        const response = await axios.post(
            apiUrl,
            null,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${accessToken}`,
                },
            }
        ); 

       
        // Handle the response as needed
    } catch (error) {
        console.error(error.response.data);
        // Handle errors or response data as needed
    }
   
    
    req.session.destroy();
    res.redirect("/user")
});



module.exports = router