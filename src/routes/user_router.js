const router = require("express").Router()

const userCtrl = require("../controller/user_controller")

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