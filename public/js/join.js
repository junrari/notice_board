function validateForm() {

    let fullname = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    console.log(fullname, email, username, password, confirmPassword)
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false
    }

    if (fullname === '' || email === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields');
        return false

    }

    if (document.getElementById("idDuplication").getAttribute("disabled") === "true") {
        alert('Please check duplication');
        return false


    }
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false

    }
    else {
        fetch("/user/joinuser", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fullname: fullname,
                email: email,
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(result => {
                if (result.success === true) {
        alert(`${username}님 환영합니다`);
        window.location.href = "/user/login";
    } else {
        alert("회원 가입에 실패하였습니다. 다시 시도해주세요.");
    }      
            })
        return true;
    } 

}
function opencheckIDwindow() {
    const url = "/user/join/usercheck"

    window.open(url, '_blank', 'width=600, height=400');
}