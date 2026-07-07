const express = require("express")
const uploadFile = require("../utils/multer")
const {analyseResume} = require("../controllers/uploadController")

const router = express.Router()

router.post("/upload",uploadFile.single("file"),analyseResume)

module.exports = router