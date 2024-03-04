 function login(){
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        console.log('username:%s password:%s',username,password);
        fetch('/user/login/loginuser', {
            method :'post',
            headers :{
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                'username':username,
                'password':password
            })
        }).then((res)=>console.log(res))
        .then((res)=>{
            console.log("login()버튼 실행",res.data);
           result = res.data
            if(!result.exist){
                console.log("exist는 false", result.msg); 
                alert("일치하는 정보가 없습니다")
            }
        
        })
        
    }