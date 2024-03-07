function reply_form(){
  
if(check){
    $("#first").slideDown("slow")
    $("#modal_wrap").slideDown("slow")
}else{
    alert('로그인 후 이용가능합니다.')
}
    
}
function reply_hide(){
    $("#first").hide()
    $("#modal_wrap").hide()
}
function rep(){
    let form = {}
    let arr = $("#frm").serializeArray()
    arr.forEach(d=>{form[d.name]=d.value})
    console.log('form:  ',form);
    fetch("/rep/register",{
        method:"post",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(form)
    }).then(res=>res.json())
    .then(result =>{
        if(result ===1) alert("답글이 달렸습니다")
        reply_hide();
        init(form['write_group'])
    })
}