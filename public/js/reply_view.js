function init(groupNum){
    fetch("/rep/replyData/"+groupNum)
    .then(res=>res.json())
    .then(data=>{
        let html =""
        data.forEach(d => {
            html += "<div align='left'><b>아이디: </b>"+ d.id+"님 /";
            html += "<b>작성일: </b>"+ d.save_date+"<br>";
            html += "<b>제목: </b>"+ d.title+"<br>";
            html += "<b>내용: </b>"+ d.content+"<hr></div>";
        });
        const content = document.getElementById("content")
        content.innerHTML = html
    })
}