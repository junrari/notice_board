const fs = require("fs")
const views={
    index:(req,res) =>{
        console.log("컨트롤러 연동");
        res.render("file_index")
    },
    list : (req,res)=>{
        const fileList = fs.readdir("./upload_file",(err,files)=>{
            if (err) {
                console.error("디렉토리 읽기 오류:", err);
                // 적절하게 오류 처리
              } else {
                // files 배열 처리
                console.log("디렉토리 내 파일:", files);
                res.render("file_list",{files:files})
              }
        })
        
    },
    download: (req,res)=>{
        const filePath = "./upload_file/"+req.params.fileName
        res.download(filePath)
    },
    modifyForm:(req,res)=>{
        const fileName = req.params.fileName
        res.render("modify_form",{fileName})
    }
}
const process = {
    upload :(req,res)=>{
        console.log(req.file);
        console.log("--------");
        console.log(req.body);
        console.log("결과:",req.변수)
        if (req.변수) {
            return res.send(req.변수)
        }
        res.redirect("/")
    },
    deleteFile : (req,res) =>{
        fs.unlinkSync("./upload_file/"+req.params.fileName)
        res.redirect("/file/list")
    },
    modify: (req,res)=>{
        if(req.file){
            return res.redirect("/file/deleteFile/"+req.body.originFileName)
        }
        console.log(req.body);
        console.log(req.file);
        res.redirect("/file/list")
    }
}


module.exports = {views,process}