const social ={
    kakaoLogout: async(req, res) => {
        if (req.session.user){
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
        }
       else{
        res.redirect("/page")
       }
    }
}