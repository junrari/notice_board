const router = require("express").Router()
const multer = require("multer")
//const upload = multer({dest:"upload_file"})
const stg = multer.diskStorage({
    destination : (req,file,cb)=>{
        console.log("req=>",req.body);
        console.log("file=>",file);
        console.log("cb=>",cb)
        cb(null,"upload_file")
    },
    filename : (req, file, cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
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
const fileCtrl = require("../controller/file_controller")

router.get("/",fileCtrl.views.index)
router.post("/upload",upload.single("file_name"),fileCtrl.process.upload)
router.get("/list",fileCtrl.views.list)
router.get("/download/:fileName",fileCtrl.views.download)
router.get("/deleteFile/:fileName",fileCtrl.process.deleteFile)
router.get("/modify_form/:fileName",fileCtrl.views.modifyForm)
router.post("/modify",upload.single("newFileName"),fileCtrl.process.modify)


module.exports = router