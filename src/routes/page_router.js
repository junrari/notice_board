const router = require("express").Router()
const multer = require("multer")
const pageCtrl = require("../controller/page_controller")
const path = require('path');


const stg = multer.diskStorage({
    destination : (req,file,cb)=>{
        console.log("req=>",req.body);
        console.log("file=>",file);
        console.log("cb=>",cb)
        cb(null,"public/upload_file")
    },
    filename : (req, file, cb)=>{
        cb(null,Date.now()+"-"+path.extname(file.originalname))
    }
})
const f_filter = (req,file,cb)=>{
    const type = file.mimetype.split("/")
    const fileType = type[0]
    if (fileType === 'image'){
        cb(null,true)
    } else {
        req.변수 = "이미지가 아니거나 없습니다"
        cb(null,false)
    }
}
const upload = multer({storage: stg, fileFilter:f_filter});


router.get("/",pageCtrl.views.index)
router.get("/list",pageCtrl.views.list)
router.get("/write_form",pageCtrl.views.writeForm)
router.get("/content/:num",pageCtrl.views.content)
router.get("/mypage",pageCtrl.views.mypage)


router.post("/write",upload.single("file_name"),pageCtrl.process.write)
router.get("/content/delete/:num",pageCtrl.process.delete)
router.post("/update-like-status",pageCtrl.process.likeProcess)


module.exports = router