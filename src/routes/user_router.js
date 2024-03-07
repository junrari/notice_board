const router = require("express").Router()
const multer = require("multer")
const path = require('path');

const userCtrl = require("../controller/user_controller")

const stg = multer.diskStorage({
    destination : (req,file,cb)=>{
        console.log("req=>",req.body);
        console.log("file=>",file);
        console.log("cb=>",cb)
        cb(null,"public/profile")
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


router.post("/profile_image",upload.single("file_name"),userCtrl.process.edit_profile)

router.get("/",userCtrl.views.index)
router.get("/login",userCtrl.views.login)
router.post("/login/loginuser",userCtrl.process.loginuser)
router.get("/join",userCtrl.views.join)
router.get("/join/usercheck",userCtrl.views.idcheckform)
router.get("/logout",userCtrl.process.logout)
router.post("/checkDuplicateId",userCtrl.process.checkDupID)
router.post("/joinuser",userCtrl.process.joinuser)

// router.get("/write_form",userCtrl.views.writeForm)

// router.post("/write",userCtrl.process.write)
// router.get("/content/:num",userCtrl.views.content)

module.exports = router