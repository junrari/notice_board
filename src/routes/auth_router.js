const router = require("express").Router()
const passport = require('passport');
const axios = require('axios');
require('dotenv').config()
const authCtrl = require("../controller/auth_controller")


router.get('/kakao', passport.authenticate('kakao')); // Kakao 로그인 요청 핸들러
router.get('/kakao/callback', passport.authenticate('kakao', {failureRedirect: '/',}),authCtrl.social.kakaoLoginCallback)
router.get('/kakao/logout', authCtrl.social.kakaoLogout);




module.exports = router