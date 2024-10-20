const express = require("express");
const router = express.Router();
const authUser = require("../middleware/authuser") 
const {Insert, View, Delete  }  = require("../controller/feedback");
router.post ("/feed",authUser, Insert)
router.get ("/View", View)
router.delete ("/delete/:id", Delete)



module. exports = router;