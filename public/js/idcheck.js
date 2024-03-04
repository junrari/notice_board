function btnConfirm(){
    console.log('아이디 중복확인중',username);
    checkDuplicateIds(username.value)
}
checkDuplicateIds= (username)=> {
    console.log('username=', username);
    let open = Pattern.test(username);
    console.log('유효성체크=', open); // 영문 숫자조합
    document.getElementById('result').textContent = '';
    // username 유효성 검사
    if (username === '') {
        document.getElementById('usernameError').textContent = 'Please enter a username.';
        return;
    } if(!Pattern.test(username)){
        document.getElementById('usernameError').textContent = '숫자 영어조합으로 8자리이상으로 입력하세요 ';
        document.getElementById('usernameInput').value=null; 
        btnUse.setAttribute('class','btn_hidden') 
    }
    else {
        // Clear the error message
        document.getElementById('usernameError').textContent = '';
    }


    fetch('/user/checkDuplicateId', {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            'username': username
        })
    }).then((res)=>res.json())
        .then((res) => {
            //받아온 데이터(res)를 가지고, 아이디중복확인을한다.
            console.log(res)
            if(open){
                if (!res) {
                
                btnUse.setAttribute('class','btn_use')
                text.setAttribute('class','resultBlue')
                document.getElementById('result').textContent = '사용할 수 있는 아이디 입니다';
                
            }
            else {
                btnUse.setAttribute('class','btn_hidden')
                text.setAttribute('class','resultRed')
                document.getElementById('result').textContent = '이미 존재하는 아이디 입니다';
            }
            
            }
           
        })
        .catch(error => {
            console.error('Error:', error);
        }); 
}