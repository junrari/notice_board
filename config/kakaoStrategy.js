const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const dao = require("../src/database/userDAO");
require('dotenv').config()
module.exports = (app) => {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_CLIENTID,
        clientSecret: process.env.KAKAO_CLIENTSECRET,
        callbackURL: process.env.KAKAO_CALLBACKURL,
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("카카오 프로필?:", profile);
                console.log("accessToken",accessToken);
                
                const exUser = await dao.social.getUserById(profile.id)
                console.log("카카오 로그인 정보 존재?",exUser);
                if (exUser) {
                    exUser.accessToken = accessToken;
                    done(null, exUser);
                } else {
                    const newUser = await dao.social.kakaoAdduser(profile)
                    newUser.accessToken = accessToken;
                    done(null, newUser);
                }
            } catch (error) {
                console.error(error);
                done(error);

            }
        })); 
        passport.serializeUser((user,done)=>{ 
            done(null,user);
        });
        passport.deserializeUser((user,done)=>{
            done(null,user);
        });
} 
