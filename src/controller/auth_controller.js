const axios = require('axios');
const social = {
    kakaoLoginCallback: (req,res)=> {
        console.log("콜백 req", req.user);
        req.session.user = {
            id: req.user.kakao_id,
            username: req.user.name,
            email: req.user.email,
            profile_image: req.user.profile_image,
            iskakao: true
        }
        console.log("req.session.user", req.session.user);
        res.redirect('/page');
    },


    kakaoLogout: async (req, res) => {
        if (req.session.user) {
            console.log("req.user 토큰이 있으려나", req.user);

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
            } catch (error) {
                console.error(error.response);
            }
            req.session.destroy();
            res.redirect("/user")
        }
        else {
            res.redirect("/page")
        }
    }
}

module.exports = { social }