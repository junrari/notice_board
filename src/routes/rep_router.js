const router = require("express").Router()

const repCtrl = require("../controller/rep_controller")

router.post("/register", repCtrl.process.register)
router.get("/replyData/:groupNum",repCtrl.views.replyData)

module.exports = router;